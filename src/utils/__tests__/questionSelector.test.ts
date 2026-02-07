import { describe, it, expect } from 'vitest';
import { filterByType, filterByDifficulty, selectQuestions, selectAdaptiveNext, getPassageForQuestion, loadAllQuestions } from '../questionSelector';
import type { Question, Passage, QuestionBank } from '../../types/question';

const mockQuestions: Question[] = [
  {
    id: 'q1', type: 'literary', difficulty: 'easy', ritLevel: 185,
    skill: 'test', skillLabel: 'Test', passageId: null,
    questionText: 'Q1?', choices: [{ label: 'A', text: 'A' }, { label: 'B', text: 'B' }, { label: 'C', text: 'C' }, { label: 'D', text: 'D' }],
    correctAnswer: 'A', explanation: 'E1',
  },
  {
    id: 'q2', type: 'informational', difficulty: 'medium', ritLevel: 200,
    skill: 'test', skillLabel: 'Test', passageId: 'p1',
    questionText: 'Q2?', choices: [{ label: 'A', text: 'A' }, { label: 'B', text: 'B' }, { label: 'C', text: 'C' }, { label: 'D', text: 'D' }],
    correctAnswer: 'B', explanation: 'E2',
  },
  {
    id: 'q3', type: 'vocabulary', difficulty: 'hard', ritLevel: 212,
    skill: 'test', skillLabel: 'Test', passageId: null,
    questionText: 'Q3?', choices: [{ label: 'A', text: 'A' }, { label: 'B', text: 'B' }, { label: 'C', text: 'C' }, { label: 'D', text: 'D' }],
    correctAnswer: 'C', explanation: 'E3',
  },
  {
    id: 'q4', type: 'literary', difficulty: 'medium', ritLevel: 198,
    skill: 'test', skillLabel: 'Test', passageId: null,
    questionText: 'Q4?', choices: [{ label: 'A', text: 'A' }, { label: 'B', text: 'B' }, { label: 'C', text: 'C' }, { label: 'D', text: 'D' }],
    correctAnswer: 'D', explanation: 'E4',
  },
];

const mockPassages: Passage[] = [
  { id: 'p1', title: 'Test Passage', text: 'Hello world.', type: 'informational' },
];

describe('filterByType', () => {
  it('returns all questions for "mixed"', () => {
    expect(filterByType(mockQuestions, 'mixed')).toHaveLength(4);
  });

  it('filters by literary', () => {
    const result = filterByType(mockQuestions, 'literary');
    expect(result).toHaveLength(2);
    expect(result.every(q => q.type === 'literary')).toBe(true);
  });

  it('filters by vocabulary', () => {
    const result = filterByType(mockQuestions, 'vocabulary');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('q3');
  });
});

describe('filterByDifficulty', () => {
  it('returns all for adaptive', () => {
    expect(filterByDifficulty(mockQuestions, 'adaptive')).toHaveLength(4);
  });

  it('filters by easy', () => {
    const result = filterByDifficulty(mockQuestions, 'easy');
    expect(result).toHaveLength(1);
    expect(result[0].difficulty).toBe('easy');
  });

  it('filters by medium', () => {
    const result = filterByDifficulty(mockQuestions, 'medium');
    expect(result).toHaveLength(2);
  });
});

describe('selectQuestions', () => {
  it('returns requested count', () => {
    const result = selectQuestions(mockQuestions, 'mixed', 'adaptive', 2);
    expect(result).toHaveLength(2);
  });

  it('returns fewer if not enough available', () => {
    const result = selectQuestions(mockQuestions, 'vocabulary', 'hard', 10);
    expect(result).toHaveLength(1);
  });

  it('returns shuffled (non-deterministic, just check structure)', () => {
    const result = selectQuestions(mockQuestions, 'mixed', 'adaptive', 4);
    expect(result).toHaveLength(4);
    expect(result.every(q => q.id && q.questionText)).toBe(true);
  });
});

describe('selectAdaptiveNext', () => {
  it('returns null for empty array', () => {
    expect(selectAdaptiveNext([], 200)).toBeNull();
  });

  it('picks a question close to current RIT', () => {
    const result = selectAdaptiveNext(mockQuestions, 200);
    expect(result).not.toBeNull();
    expect(mockQuestions.some(q => q.id === result!.id)).toBe(true);
  });
});

describe('getPassageForQuestion', () => {
  it('returns passage when found', () => {
    const result = getPassageForQuestion(mockPassages, 'p1');
    expect(result).not.toBeNull();
    expect(result!.title).toBe('Test Passage');
  });

  it('returns null for null passageId', () => {
    expect(getPassageForQuestion(mockPassages, null)).toBeNull();
  });

  it('returns null for unknown passageId', () => {
    expect(getPassageForQuestion(mockPassages, 'unknown')).toBeNull();
  });
});

describe('loadAllQuestions', () => {
  it('combines multiple banks', () => {
    const bank1: QuestionBank = { passages: mockPassages, questions: [mockQuestions[0]] };
    const bank2: QuestionBank = { passages: [], questions: [mockQuestions[1]] };
    const { questions, passages } = loadAllQuestions([bank1, bank2]);
    expect(questions).toHaveLength(2);
    expect(passages).toHaveLength(1);
  });
});
