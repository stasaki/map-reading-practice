import { useReducer, useCallback } from 'react';
import type { Question, Passage, QuestionType } from '../types/question';
import type { SessionConfig, AnswerRecord, SessionResult } from '../types/session';
import type { GradeBandConfig } from '../types/gradeBand';
import { GRADE_BANDS } from '../types/gradeBand';
import { getStartingRit, updateRit } from '../utils/scoring';
import { selectQuestions, selectAdaptiveNext, getPassageForQuestion } from '../utils/questionSelector';
import { getQuestionsForGradeBand, getPassagesForGradeBand } from '../data/loader';

type QuizPhase = 'idle' | 'active' | 'feedback' | 'complete';

interface QuizState {
  phase: QuizPhase;
  config: SessionConfig | null;
  gradeBandConfig: GradeBandConfig | null;
  bandPassages: Passage[];
  questions: Question[];
  currentIndex: number;
  currentQuestion: Question | null;
  currentPassage: Passage | null;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  currentRit: number;
  startingRit: number;
  answers: AnswerRecord[];
  // For adaptive mode: remaining pool
  remainingPool: Question[];
}

type QuizAction =
  | { type: 'START'; config: SessionConfig }
  | { type: 'SELECT_ANSWER'; answer: string }
  | { type: 'SUBMIT' }
  | { type: 'NEXT' }
  | { type: 'RESET' };

function buildCategoryBreakdown(answers: AnswerRecord[]): Record<QuestionType, { correct: number; total: number }> {
  const categories: QuestionType[] = ['literary', 'informational', 'vocabulary', 'foundational'];
  const breakdown = {} as Record<QuestionType, { correct: number; total: number }>;
  for (const cat of categories) {
    const catAnswers = answers.filter(a => a.questionType === cat);
    breakdown[cat] = {
      correct: catAnswers.filter(a => a.isCorrect).length,
      total: catAnswers.length,
    };
  }
  return breakdown;
}

const initialState: QuizState = {
  phase: 'idle',
  config: null,
  gradeBandConfig: null,
  bandPassages: [],
  questions: [],
  currentIndex: 0,
  currentQuestion: null,
  currentPassage: null,
  selectedAnswer: null,
  isCorrect: null,
  currentRit: 197,
  startingRit: 197,
  answers: [],
  remainingPool: [],
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START': {
      const { config } = action;
      const gbConfig = GRADE_BANDS[config.gradeBand];
      const bandQuestions = getQuestionsForGradeBand(config.gradeBand);
      const bandPassages = getPassagesForGradeBand(config.gradeBand);
      const startingRit = getStartingRit(config.difficulty, gbConfig);

      if (config.difficulty === 'adaptive') {
        const pool = selectQuestions(bandQuestions, config.questionType, 'adaptive', bandQuestions.length);
        const first = selectAdaptiveNext(pool, startingRit);
        if (!first) return { ...initialState };
        const remaining = pool.filter(q => q.id !== first.id);
        return {
          ...initialState,
          phase: 'active',
          config,
          gradeBandConfig: gbConfig,
          bandPassages,
          questions: [first],
          currentIndex: 0,
          currentQuestion: first,
          currentPassage: getPassageForQuestion(bandPassages, first.passageId),
          currentRit: startingRit,
          startingRit,
          remainingPool: remaining,
        };
      }

      const questions = selectQuestions(bandQuestions, config.questionType, config.difficulty, config.questionCount);
      const first = questions[0] ?? null;
      return {
        ...initialState,
        phase: first ? 'active' : 'idle',
        config,
        gradeBandConfig: gbConfig,
        bandPassages,
        questions,
        currentIndex: 0,
        currentQuestion: first,
        currentPassage: first ? getPassageForQuestion(bandPassages, first.passageId) : null,
        currentRit: startingRit,
        startingRit,
      };
    }

    case 'SELECT_ANSWER': {
      if (state.phase !== 'active') return state;
      return { ...state, selectedAnswer: action.answer };
    }

    case 'SUBMIT': {
      if (state.phase !== 'active' || !state.selectedAnswer || !state.currentQuestion || !state.gradeBandConfig) return state;
      const isCorrect = state.selectedAnswer === state.currentQuestion.correctAnswer;
      const newRit = updateRit(state.currentRit, state.currentQuestion.ritLevel, isCorrect, state.gradeBandConfig);
      const answer: AnswerRecord = {
        questionId: state.currentQuestion.id,
        questionType: state.currentQuestion.type,
        selectedAnswer: state.selectedAnswer,
        correctAnswer: state.currentQuestion.correctAnswer,
        isCorrect,
        ritAtTime: newRit,
      };
      return {
        ...state,
        phase: 'feedback',
        isCorrect,
        currentRit: newRit,
        answers: [...state.answers, answer],
      };
    }

    case 'NEXT': {
      if (state.phase !== 'feedback' || !state.config) return state;
      const nextIndex = state.currentIndex + 1;
      const isComplete = nextIndex >= state.config.questionCount;

      if (isComplete) {
        return { ...state, phase: 'complete', selectedAnswer: null, isCorrect: null };
      }

      if (state.config.difficulty === 'adaptive') {
        const next = selectAdaptiveNext(state.remainingPool, state.currentRit);
        if (!next) return { ...state, phase: 'complete', selectedAnswer: null, isCorrect: null };
        return {
          ...state,
          phase: 'active',
          currentIndex: nextIndex,
          currentQuestion: next,
          currentPassage: getPassageForQuestion(state.bandPassages, next.passageId),
          selectedAnswer: null,
          isCorrect: null,
          questions: [...state.questions, next],
          remainingPool: state.remainingPool.filter(q => q.id !== next.id),
        };
      }

      const nextQuestion = state.questions[nextIndex] ?? null;
      return {
        ...state,
        phase: nextQuestion ? 'active' : 'complete',
        currentIndex: nextIndex,
        currentQuestion: nextQuestion,
        currentPassage: nextQuestion ? getPassageForQuestion(state.bandPassages, nextQuestion.passageId) : null,
        selectedAnswer: null,
        isCorrect: null,
      };
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const start = useCallback((config: SessionConfig) => dispatch({ type: 'START', config }), []);
  const selectAnswer = useCallback((answer: string) => dispatch({ type: 'SELECT_ANSWER', answer }), []);
  const submit = useCallback(() => dispatch({ type: 'SUBMIT' }), []);
  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const getResult = useCallback((): SessionResult | null => {
    if (state.phase !== 'complete' || !state.config) return null;
    const totalCorrect = state.answers.filter(a => a.isCorrect).length;
    return {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      config: state.config,
      answers: state.answers,
      finalRit: state.currentRit,
      startingRit: state.startingRit,
      totalCorrect,
      totalQuestions: state.answers.length,
      percentage: Math.round((totalCorrect / state.answers.length) * 100),
      categoryBreakdown: buildCategoryBreakdown(state.answers),
    };
  }, [state]);

  return { ...state, start, selectAnswer, submit, next, reset, getResult };
}
