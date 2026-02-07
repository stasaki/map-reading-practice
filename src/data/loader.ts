import type { QuestionBank, Question, Passage } from '../types/question';
import type { GradeBandId } from '../types/gradeBand';
import literaryData from './questions/literary.json';
import informationalData from './questions/informational.json';
import vocabularyData from './questions/vocabulary.json';
import foundationalData from './questions/foundational.json';
import hsLiteraryData from './questions/hs/literary.json';
import hsInformationalData from './questions/hs/informational.json';
import hsVocabularyData from './questions/hs/vocabulary.json';
import hsFoundationalData from './questions/hs/foundational.json';
import { loadAllQuestions } from '../utils/questionSelector';

const gradeBandBanks: Record<GradeBandId, QuestionBank[]> = {
  'grades-3-5': [
    literaryData as QuestionBank,
    informationalData as QuestionBank,
    vocabularyData as QuestionBank,
    foundationalData as QuestionBank,
  ],
  'grades-9-12': [
    hsLiteraryData as QuestionBank,
    hsInformationalData as QuestionBank,
    hsVocabularyData as QuestionBank,
    hsFoundationalData as QuestionBank,
  ],
};

const loadedPools: Record<GradeBandId, { questions: Question[]; passages: Passage[] }> = {} as never;

function getPool(id: GradeBandId) {
  if (!loadedPools[id]) {
    loadedPools[id] = loadAllQuestions(gradeBandBanks[id]);
  }
  return loadedPools[id];
}

export function getQuestionsForGradeBand(id: GradeBandId): Question[] {
  return getPool(id).questions;
}

export function getPassagesForGradeBand(id: GradeBandId): Passage[] {
  return getPool(id).passages;
}

// Backward compat: aggregate all banks for QuestionReview etc.
const allBanks = Object.values(gradeBandBanks).flat();
const { questions: allQuestions, passages: allPassages } = loadAllQuestions(allBanks);

export { allQuestions, allPassages };
