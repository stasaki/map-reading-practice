# Adding New Questions to MAP Reading Practice

This guide explains how to add new questions to the MAP Reading Practice application.

## Overview

Questions are organized by grade band and type:

- **Grade Bands**: Grades 3–5 and Grades 9–12
- **Question Types**: Literary, Informational, Vocabulary, Foundational
- **Files**: 
  - Grades 3–5: `src/data/questions/*.json`
  - Grades 9–12: `src/data/questions/hs/*.json`

Each question type has its own JSON file containing passages and questions.

## Question Structure

Every question follows this structure:

```json
{
  "id": "lit-q1",
  "type": "literary",
  "difficulty": "easy",
  "ritLevel": 187,
  "skill": "character-analysis",
  "skillLabel": "Character Analysis",
  "passageId": "lit-p1",
  "questionText": "How does Sarah feel when she touches the old oak tree?",
  "choices": [
    { "label": "A", "text": "Scared and lonely" },
    { "label": "B", "text": "Angry and upset" },
    { "label": "C", "text": "Comforted and connected to her grandmother" },
    { "label": "D", "text": "Bored and tired" }
  ],
  "correctAnswer": "C",
  "explanation": "The passage says Sarah could 'almost hear her grandmother's voice' and she 'smiled, feeling the strength of the tree.' These details show she feels comforted and connected to her grandmother's memory."
}
```

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier (must be unique across ALL files) | `"lit-q1"`, `"vocab-q15"` |
| `type` | string | Question type: `literary`, `informational`, `vocabulary`, or `foundational` | `"literary"` |
| `difficulty` | string | Difficulty level: `easy`, `medium`, or `hard` | `"easy"` |
| `ritLevel` | number | RIT score level (see RIT Guidelines below) | `187` |
| `skill` | string | Skill identifier (kebab-case, see Skills section) | `"character-analysis"` |
| `skillLabel` | string | Human-readable skill name | `"Character Analysis"` |
| `passageId` | string or null | ID of associated passage, or `null` for standalone questions | `"lit-p1"` or `null` |
| `questionText` | string | The question text | `"How does Sarah feel..."` |
| `choices` | array | Array of 4 choice objects with `label` (A-D) and `text` | See example above |
| `correctAnswer` | string | Letter of correct answer (A, B, C, or D) | `"C"` |
| `explanation` | string | Clear explanation of why the answer is correct | `"The passage says..."` |

## RIT Level Guidelines

RIT levels should match the difficulty and grade band:

### Grades 3–5 (RIT Range: 180–220)

- **Easy**: 180–190 (typical: 185–187)
- **Medium**: 195–205 (typical: 198–200)
- **Hard**: 208–220 (typical: 210–215)

### Grades 9–12 (RIT Range: 230–260)

- **Easy**: 230–240 (typical: 235–237)
- **Medium**: 240–250 (typical: 245–248)
- **Hard**: 250–260 (typical: 252–255)

## Skill Categories

Questions must use one of the following skill categories:

### Literary Analysis Skills
- `character-analysis` - Character Analysis
- `character-motivation` - Character Motivation
- `characterization` - Characterization
- `figurative-language` - Figurative Language
- `inference` - Making Inferences
- `narrative-technique` - Narrative Technique
- `symbolism` - Symbolism
- `theme` - Theme & Central Message
- `theme-synthesis` - Theme Synthesis
- `unreliable-narrator` - Unreliable Narrator

### Informational Text Skills
- `argument-evaluation` - Argument Evaluation
- `authors-purpose` - Author's Purpose
- `cause-effect` - Cause and Effect
- `central-idea` - Central Idea
- `compare-contrast` - Compare and Contrast
- `credibility-assessment` - Source Credibility
- `evidence-synthesis` - Evidence Synthesis
- `key-details` - Key Details
- `main-idea` - Main Idea
- `rhetorical-analysis` - Rhetorical Analysis
- `text-organization` - Text Organization
- `text-structure` - Text Structure

### Vocabulary Skills
- `connotation` - Connotation and Tone
- `context-clues` - Context Clues
- `multiple-meaning` - Multiple-Meaning Words
- `prefixes-suffixes` - Prefixes and Suffixes
- `synonyms-antonyms` - Synonyms and Antonyms
- `word-meaning` - Word Meaning
- `word-roots` - Word Roots and Affixes

### Foundational/Grammar Skills
- `colon-usage` - Colon Usage
- `dangling-modifiers` - Dangling Modifiers
- `grammar` - Grammar
- `parallel-structure` - Parallel Structure
- `pronoun-reference` - Pronoun Reference
- `punctuation` - Punctuation
- `reference-materials` - Reference Materials
- `semicolons` - Semicolon Usage
- `sentence-combining` - Sentence Combining
- `sentence-structure` - Sentence Structure
- `subjunctive-mood` - Subjunctive Mood

## Passages

Some questions require passages. Passages are defined in the same JSON file:

```json
{
  "passages": [
    {
      "id": "lit-p1",
      "title": "The Old Oak Tree",
      "text": "Sarah walked slowly through the forest...",
      "source": "Original passage",
      "type": "literary"
    }
  ],
  "questions": [...]
}
```

### Passage Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier for the passage |
| `title` | string | Title of the passage |
| `text` | string | Full text of the passage (2-3 paragraphs typical) |
| `source` | string (optional) | Source attribution |
| `type` | string | Must match question type |

### When to Create a Passage

- **Literary questions**: Usually need passages for context, character development, plot
- **Informational questions**: Usually need passages for facts, arguments, or explanations
- **Vocabulary questions**: Often standalone (use `passageId: null`), but can reference passages
- **Foundational questions**: Usually standalone (grammar, sentence structure)

**Multiple questions can share the same passage.** This is efficient for testing different skills on the same text.

## Step-by-Step: Adding Questions

### 1. Choose Your Target File

Determine which file to edit based on grade band and question type:

- Grades 3–5:
  - `src/data/questions/literary.json`
  - `src/data/questions/informational.json`
  - `src/data/questions/vocabulary.json`
  - `src/data/questions/foundational.json`

- Grades 9–12:
  - `src/data/questions/hs/literary.json`
  - `src/data/questions/hs/informational.json`
  - `src/data/questions/hs/vocabulary.json`
  - `src/data/questions/hs/foundational.json`

### 2. Create a Unique ID

Choose an ID that doesn't exist anywhere in the codebase:
- Format: `{type-abbrev}-q{number}` for questions
- Format: `{type-abbrev}-p{number}` for passages
- Examples: `lit-q9`, `info-q10`, `vocab-q15`, `found-p5`

**Important**: Check ALL question files to ensure your ID is globally unique.

### 3. Add the Question

Open the appropriate JSON file and add your question to the `questions` array. Make sure to:
- Include all required fields
- Use proper JSON syntax (commas, quotes, brackets)
- Choose an appropriate RIT level for the difficulty
- Write clear, unambiguous question text
- Provide 4 distinct answer choices
- Mark the correct answer
- Write a thorough explanation

### 4. Add a Passage (if needed)

If your question requires a passage:
1. Check if an existing passage works for your question
2. If not, add a new passage to the `passages` array
3. Link the question to the passage using `passageId`

### 5. Validate Your Changes

Run the validation script (if available):
```bash
npm run validate-questions
```

Or manually check:
- Valid JSON syntax (use a JSON validator)
- All required fields present
- Unique ID
- RIT level in appropriate range
- Correct answer is one of A, B, C, D
- All passages referenced by questions exist

### 6. Test Your Changes

```bash
npm run dev
```

Navigate to the quiz and verify:
- Your questions appear in the quiz
- Text displays correctly
- All choices are visible
- Correct answer is registered properly
- Explanation displays after answering

## Examples

### Example 1: Standalone Vocabulary Question

```json
{
  "id": "vocab-q20",
  "type": "vocabulary",
  "difficulty": "easy",
  "ritLevel": 186,
  "skill": "context-clues",
  "skillLabel": "Context Clues",
  "passageId": null,
  "questionText": "The movie was so tedious that many people fell asleep. What does \"tedious\" mean?",
  "choices": [
    { "label": "A", "text": "Exciting" },
    { "label": "B", "text": "Boring and tiresome" },
    { "label": "C", "text": "Scary" },
    { "label": "D", "text": "Funny" }
  ],
  "correctAnswer": "B",
  "explanation": "The context clue 'many people fell asleep' suggests the movie was boring. 'Tedious' means boring, tiresome, or dull."
}
```

### Example 2: Literary Question with Passage

First, add the passage:
```json
{
  "id": "lit-p10",
  "title": "The First Day",
  "text": "Maya's hands trembled as she pushed open the heavy school doors. Everything was different here — the walls were taller, the hallways longer, the students older. She clutched her schedule and tried to remember where Room 203 was supposed to be.\n\nA girl with a bright smile approached her. \"You look lost,\" she said kindly. \"I'm Jessica. Want me to show you around?\"\n\nMaya felt the knot in her stomach loosen just a little. Maybe this wouldn't be so bad after all.",
  "source": "Original passage",
  "type": "literary"
}
```

Then add the question:
```json
{
  "id": "lit-q25",
  "type": "literary",
  "difficulty": "medium",
  "ritLevel": 200,
  "skill": "character-analysis",
  "skillLabel": "Character Analysis",
  "passageId": "lit-p10",
  "questionText": "How does Maya's feeling change throughout the passage?",
  "choices": [
    { "label": "A", "text": "She becomes more nervous and scared" },
    { "label": "B", "text": "She starts nervous but feels slightly better after meeting Jessica" },
    { "label": "C", "text": "She is confident from the beginning" },
    { "label": "D", "text": "She never feels nervous at all" }
  ],
  "correctAnswer": "B",
  "explanation": "The passage shows Maya is initially nervous ('hands trembled', 'knot in her stomach'), but when Jessica offers to help, she feels 'the knot in her stomach loosen just a little,' showing her anxiety decreasing."
}
```

### Example 3: Informational Question (High School)

```json
{
  "id": "info-hs-q20",
  "type": "informational",
  "difficulty": "hard",
  "ritLevel": 254,
  "skill": "evidence-synthesis",
  "skillLabel": "Evidence Synthesis",
  "passageId": "info-hs-p8",
  "questionText": "Which statement best synthesizes the evidence presented in the passage about renewable energy adoption?",
  "choices": [
    { "label": "A", "text": "Solar power is the only viable renewable energy source" },
    { "label": "B", "text": "Multiple factors including cost, policy, and technology are driving renewable energy growth" },
    { "label": "C", "text": "Renewable energy is too expensive to be practical" },
    { "label": "D", "text": "Only developed nations can afford renewable energy" }
  ],
  "correctAnswer": "B",
  "explanation": "The passage discusses declining costs, supportive policies, and technological improvements as interconnected factors driving renewable energy adoption, making B the best synthesis of the evidence presented."
}
```

## Tips for Writing Good Questions

1. **Be Clear and Specific**: Question text should be unambiguous
2. **Avoid Tricks**: Test knowledge, not test-taking skills
3. **Plausible Distractors**: Wrong answers should seem reasonable to someone who doesn't know the material
4. **One Clear Answer**: Only one choice should be definitively correct
5. **Thorough Explanations**: Help students learn by explaining the reasoning
6. **Appropriate Difficulty**: RIT level should match the complexity of the question
7. **Cite Evidence**: Reference specific parts of the passage in explanations
8. **Proofread**: Check for typos, grammar errors, and formatting issues

## Maintaining Balance

Try to maintain a balanced distribution across:
- **Difficulty levels**: Aim for roughly equal numbers of easy, medium, and hard
- **Skills**: Cover a variety of skills within each question type
- **Passage usage**: Mix of passage-based and standalone questions where appropriate

Current distribution (per file): 2-3 easy, 3 medium, 2-3 hard questions

## Common Mistakes to Avoid

❌ **Duplicate IDs**: Always check that your ID is unique across ALL files  
❌ **Wrong RIT Range**: Make sure RIT level matches both difficulty AND grade band  
❌ **Broken Passage References**: If you set `passageId`, that passage must exist  
❌ **Invalid JSON**: Missing commas, unmatched brackets, unescaped quotes  
❌ **Ambiguous Answers**: Multiple choices that could be considered correct  
❌ **Poor Distractors**: Wrong answers that are obviously incorrect  
❌ **Missing Fields**: Every question must have all required fields  

## Need Help?

- Review existing questions in the JSON files for examples
- Use the validation script to catch common errors
- Test your questions in the app before committing
- Refer to the skill categories list to use established skills

## File Structure Reference

```
src/data/questions/
├── literary.json          # Grades 3-5: Literary analysis
├── informational.json     # Grades 3-5: Informational text
├── vocabulary.json        # Grades 3-5: Vocabulary
├── foundational.json      # Grades 3-5: Grammar/mechanics
└── hs/
    ├── literary.json      # Grades 9-12: Literary analysis
    ├── informational.json # Grades 9-12: Informational text
    ├── vocabulary.json    # Grades 9-12: Vocabulary
    └── foundational.json  # Grades 9-12: Grammar/mechanics
```

Happy question writing! 🎓
