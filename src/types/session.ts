import type { QuestionType, Difficulty } from './question';
import type { GradeBandId } from './gradeBand';

export type DifficultyOption = Difficulty | 'adaptive';

export interface SessionConfig {
  questionType: QuestionType | 'mixed';
  questionCount: number;
  difficulty: DifficultyOption;
  gradeBand: GradeBandId;
}

export interface AnswerRecord {
  questionId: string;
  questionType: QuestionType;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  ritAtTime: number;
  timeSpent?: number;
}

export interface SessionResult {
  id: string;
  date: string;
  config: SessionConfig;
  answers: AnswerRecord[];
  finalRit: number;
  startingRit: number;
  totalCorrect: number;
  totalQuestions: number;
  percentage: number;
  categoryBreakdown: Record<QuestionType, { correct: number; total: number }>;
}
