import type { Question, QuestionType, Passage, QuestionBank } from '../types/question';
import type { DifficultyOption } from '../types/session';

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function filterByType(questions: Question[], type: QuestionType | 'mixed'): Question[] {
  if (type === 'mixed') return questions;
  return questions.filter(q => q.type === type);
}

export function filterByDifficulty(questions: Question[], difficulty: DifficultyOption): Question[] {
  if (difficulty === 'adaptive') return questions;
  return questions.filter(q => q.difficulty === difficulty);
}

export function selectQuestions(
  questions: Question[],
  type: QuestionType | 'mixed',
  difficulty: DifficultyOption,
  count: number
): Question[] {
  let filtered = filterByType(questions, type);
  filtered = filterByDifficulty(filtered, difficulty);
  const shuffled = shuffle(filtered);
  return shuffled.slice(0, count);
}

export function selectAdaptiveNext(
  remaining: Question[],
  currentRit: number
): Question | null {
  if (remaining.length === 0) return null;

  // Sort by how close the question RIT is to current RIT, pick closest
  const sorted = [...remaining].sort(
    (a, b) => Math.abs(a.ritLevel - currentRit) - Math.abs(b.ritLevel - currentRit)
  );

  // Pick from top 3 closest to add some variety
  const candidates = sorted.slice(0, Math.min(3, sorted.length));
  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx];
}

export function getPassageForQuestion(
  passages: Passage[],
  passageId: string | null
): Passage | null {
  if (!passageId) return null;
  return passages.find(p => p.id === passageId) ?? null;
}

export function loadAllQuestions(banks: QuestionBank[]): { questions: Question[]; passages: Passage[] } {
  const questions: Question[] = [];
  const passages: Passage[] = [];
  for (const bank of banks) {
    questions.push(...bank.questions);
    passages.push(...bank.passages);
  }
  return { questions, passages };
}
