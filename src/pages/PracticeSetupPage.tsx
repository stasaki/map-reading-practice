import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuestionType } from '../types/question';
import type { DifficultyOption } from '../types/session';
import type { GradeBandId } from '../types/gradeBand';
import { GRADE_BANDS, DEFAULT_GRADE_BAND } from '../types/gradeBand';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

type QuestionTypeOption = QuestionType | 'mixed';

const typeOptions: { value: QuestionTypeOption; label: string; description: string }[] = [
  { value: 'mixed', label: 'Mixed', description: 'All question types' },
  { value: 'literary', label: 'Literary', description: 'Stories and poems' },
  { value: 'informational', label: 'Informational', description: 'Non-fiction texts' },
  { value: 'vocabulary', label: 'Vocabulary', description: 'Word meanings' },
  { value: 'foundational', label: 'Foundational', description: 'Grammar and structure' },
];

const countOptions = [10, 15, 20];

const gradeBandOptions: { value: GradeBandId; label: string; description: string }[] = Object.values(GRADE_BANDS).map(gb => ({
  value: gb.id,
  label: gb.label,
  description: `RIT ${gb.ritRange.min}\u2013${gb.ritRange.max}`,
}));

function getDifficultyOptions(gradeBand: GradeBandId) {
  const desc = GRADE_BANDS[gradeBand].difficultyDescriptions;
  return [
    { value: 'easy' as DifficultyOption, label: 'Easy', description: desc.easy },
    { value: 'medium' as DifficultyOption, label: 'Medium', description: desc.medium },
    { value: 'hard' as DifficultyOption, label: 'Hard', description: desc.hard },
    { value: 'adaptive' as DifficultyOption, label: 'Adaptive', description: 'Adjusts to your level' },
  ];
}

export function PracticeSetupPage() {
  const navigate = useNavigate();
  const [gradeBand, setGradeBand] = useState<GradeBandId>(DEFAULT_GRADE_BAND);
  const [questionType, setQuestionType] = useState<QuestionTypeOption>('mixed');
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<DifficultyOption>('adaptive');

  const difficultyOptions = getDifficultyOptions(gradeBand);

  function handleStart() {
    const config = { questionType, questionCount, difficulty, gradeBand };
    navigate('/practice/quiz', { state: { config } });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Practice Setup</h1>

      <Card className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Grade Band</h2>
        <div className="grid grid-cols-2 gap-2">
          {gradeBandOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setGradeBand(opt.value)}
              className={`text-left border-2 rounded-lg p-3 transition-all ${
                gradeBand === opt.value
                  ? 'border-map-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{opt.label}</div>
              <div className="text-xs text-gray-500">{opt.description}</div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Question Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {typeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setQuestionType(opt.value)}
              className={`text-left border-2 rounded-lg p-3 transition-all ${
                questionType === opt.value
                  ? 'border-map-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{opt.label}</div>
              <div className="text-xs text-gray-500">{opt.description}</div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Number of Questions</h2>
        <div className="flex gap-3">
          {countOptions.map(count => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={`flex-1 border-2 rounded-lg py-3 text-center font-semibold transition-all ${
                questionCount === count
                  ? 'border-map-blue bg-blue-50 text-map-blue'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h2 className="font-semibold text-gray-800 mb-3">Difficulty</h2>
        <div className="grid grid-cols-2 gap-2">
          {difficultyOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setDifficulty(opt.value)}
              className={`text-left border-2 rounded-lg p-3 transition-all ${
                difficulty === opt.value
                  ? 'border-map-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{opt.label}</div>
              <div className="text-xs text-gray-500">{opt.description}</div>
            </button>
          ))}
        </div>
      </Card>

      <Button size="lg" className="w-full" onClick={handleStart}>
        Start Practice
      </Button>
    </div>
  );
}
