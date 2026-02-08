#!/usr/bin/env node

/**
 * Question Validation Script
 * 
 * Validates all question JSON files to ensure:
 * - Valid JSON syntax
 * - All required fields present
 * - No duplicate IDs
 * - RIT levels in appropriate ranges
 * - Valid difficulty levels
 * - Valid question types
 * - Passage references are valid
 * - Correct answer is A, B, C, or D
 * - All choices have labels A-D
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Valid values
const VALID_TYPES = ['literary', 'informational', 'vocabulary', 'foundational'];
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];
const VALID_ANSWERS = ['A', 'B', 'C', 'D'];
const REQUIRED_QUESTION_FIELDS = [
  'id', 'type', 'difficulty', 'ritLevel', 'skill', 'skillLabel',
  'passageId', 'questionText', 'choices', 'correctAnswer', 'explanation'
];
const REQUIRED_PASSAGE_FIELDS = ['id', 'title', 'text', 'type'];

// RIT level ranges
const RIT_RANGES = {
  'grades-3-5': {
    easy: { min: 180, max: 190 },
    medium: { min: 195, max: 205 },
    hard: { min: 208, max: 220 }
  },
  'grades-9-12': {
    easy: { min: 230, max: 240 },
    medium: { min: 240, max: 250 },
    hard: { min: 250, max: 260 }
  }
};

let errors = [];
let warnings = [];
let allQuestionIds = new Set();
let allPassageIds = new Set();

function addError(file, message) {
  errors.push(`[${file}] ERROR: ${message}`);
}

function addWarning(file, message) {
  warnings.push(`[${file}] WARNING: ${message}`);
}

function validateQuestion(question, file, gradeBand, passagesInFile) {
  const qid = question.id;

  // Check required fields
  for (const field of REQUIRED_QUESTION_FIELDS) {
    if (!(field in question)) {
      addError(file, `Question ${qid} missing required field: ${field}`);
    }
  }

  // Check for duplicate ID
  if (allQuestionIds.has(qid)) {
    addError(file, `Duplicate question ID: ${qid}`);
  }
  allQuestionIds.add(qid);

  // Validate type
  if (!VALID_TYPES.includes(question.type)) {
    addError(file, `Question ${qid} has invalid type: ${question.type}`);
  }

  // Validate difficulty
  if (!VALID_DIFFICULTIES.includes(question.difficulty)) {
    addError(file, `Question ${qid} has invalid difficulty: ${question.difficulty}`);
  }

  // Validate RIT level
  if (typeof question.ritLevel !== 'number') {
    addError(file, `Question ${qid} has non-numeric ritLevel: ${question.ritLevel}`);
  } else if (question.difficulty && gradeBand) {
    const range = RIT_RANGES[gradeBand]?.[question.difficulty];
    if (range) {
      if (question.ritLevel < range.min || question.ritLevel > range.max) {
        addWarning(
          file,
          `Question ${qid} RIT level ${question.ritLevel} outside recommended range for ${gradeBand} ${question.difficulty} (${range.min}-${range.max})`
        );
      }
    }
  }

  // Validate choices
  if (!Array.isArray(question.choices)) {
    addError(file, `Question ${qid} choices is not an array`);
  } else {
    if (question.choices.length !== 4) {
      addError(file, `Question ${qid} must have exactly 4 choices, found ${question.choices.length}`);
    }
    const expectedLabels = ['A', 'B', 'C', 'D'];
    question.choices.forEach((choice, idx) => {
      if (!choice.label || !choice.text) {
        addError(file, `Question ${qid} choice ${idx} missing label or text`);
      }
      if (choice.label !== expectedLabels[idx]) {
        addError(file, `Question ${qid} choice ${idx} has incorrect label: ${choice.label} (expected ${expectedLabels[idx]})`);
      }
    });
  }

  // Validate correct answer
  if (!VALID_ANSWERS.includes(question.correctAnswer)) {
    addError(file, `Question ${qid} has invalid correctAnswer: ${question.correctAnswer} (must be A, B, C, or D)`);
  }

  // Validate passage reference
  if (question.passageId !== null && !passagesInFile.has(question.passageId)) {
    addError(file, `Question ${qid} references non-existent passage: ${question.passageId}`);
  }

  // Check for empty strings
  if (question.questionText?.trim() === '') {
    addError(file, `Question ${qid} has empty questionText`);
  }
  if (question.explanation?.trim() === '') {
    addError(file, `Question ${qid} has empty explanation`);
  }
}

function validatePassage(passage, file) {
  const pid = passage.id;

  // Check required fields
  for (const field of REQUIRED_PASSAGE_FIELDS) {
    if (!(field in passage)) {
      addError(file, `Passage ${pid} missing required field: ${field}`);
    }
  }

  // Check for duplicate ID
  if (allPassageIds.has(pid)) {
    addError(file, `Duplicate passage ID: ${pid}`);
  }
  allPassageIds.add(pid);

  // Validate type
  if (!VALID_TYPES.includes(passage.type)) {
    addError(file, `Passage ${pid} has invalid type: ${passage.type}`);
  }

  // Check for empty strings
  if (passage.text?.trim() === '') {
    addError(file, `Passage ${pid} has empty text`);
  }
  if (passage.title?.trim() === '') {
    addError(file, `Passage ${pid} has empty title`);
  }
}

function validateFile(filePath, gradeBand) {
  const fileName = filePath.split('/').slice(-2).join('/');
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    if (!data.passages || !Array.isArray(data.passages)) {
      addError(fileName, 'Missing or invalid passages array');
      return;
    }

    if (!data.questions || !Array.isArray(data.questions)) {
      addError(fileName, 'Missing or invalid questions array');
      return;
    }

    // Build set of passage IDs in this file
    const passagesInFile = new Set(data.passages.map(p => p.id));

    // Validate all passages
    data.passages.forEach(passage => validatePassage(passage, fileName));

    // Validate all questions
    data.questions.forEach(question => validateQuestion(question, fileName, gradeBand, passagesInFile));

    console.log(`✓ Validated ${fileName}: ${data.questions.length} questions, ${data.passages.length} passages`);

  } catch (err) {
    if (err instanceof SyntaxError) {
      addError(fileName, `Invalid JSON: ${err.message}`);
    } else {
      addError(fileName, `Error reading file: ${err.message}`);
    }
  }
}

function main() {
  console.log('🔍 Validating question files...\n');

  const dataDir = join(__dirname, 'src', 'data', 'questions');
  
  // Validate grades 3-5 files
  const grades35Files = [
    'literary.json',
    'informational.json',
    'vocabulary.json',
    'foundational.json'
  ];

  grades35Files.forEach(file => {
    validateFile(join(dataDir, file), 'grades-3-5');
  });

  // Validate grades 9-12 files
  const grades912Files = [
    'hs/literary.json',
    'hs/informational.json',
    'hs/vocabulary.json',
    'hs/foundational.json'
  ];

  grades912Files.forEach(file => {
    validateFile(join(dataDir, file), 'grades-9-12');
  });

  // Report results
  console.log('\n' + '='.repeat(60));
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All validations passed!');
    console.log(`   Total questions: ${allQuestionIds.size}`);
    console.log(`   Total passages: ${allPassageIds.size}`);
    process.exit(0);
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} WARNING(S):\n`);
    warnings.forEach(warning => console.log(`   ${warning}`));
  }

  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} ERROR(S):\n`);
    errors.forEach(error => console.log(`   ${error}`));
    console.log('\n');
    process.exit(1);
  }

  console.log('\n✅ Validation passed with warnings');
  process.exit(0);
}

main();
