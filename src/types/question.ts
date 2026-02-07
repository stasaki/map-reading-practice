export type QuestionType = 'literary' | 'informational' | 'vocabulary' | 'foundational';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Passage {
  id: string;
  title: string;
  text: string;
  source?: string;
  type: QuestionType;
}

export interface Choice {
  label: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  ritLevel: number;
  skill: string;
  skillLabel: string;
  passageId: string | null;
  questionText: string;
  choices: Choice[];
  correctAnswer: string;
  explanation: string;
}

export interface QuestionBank {
  passages: Passage[];
  questions: Question[];
}
