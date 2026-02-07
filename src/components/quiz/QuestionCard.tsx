import type { Question } from '../../types/question';
import { AnswerChoice } from './AnswerChoice';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  isSubmitted: boolean;
  onSelectAnswer: (label: string) => void;
  onSubmit: () => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  isSubmitted,
  onSelectAnswer,
  onSubmit,
}: QuestionCardProps) {
  function getChoiceState(label: string) {
    if (!isSubmitted) {
      return label === selectedAnswer ? 'selected' as const : 'default' as const;
    }
    if (label === question.correctAnswer) return 'correct' as const;
    if (label === selectedAnswer && label !== question.correctAnswer) return 'incorrect' as const;
    return 'default' as const;
  }

  return (
    <div>
      <p className="text-lg font-medium text-gray-900 mb-5">{question.questionText}</p>
      <div className="space-y-3">
        {question.choices.map((choice) => (
          <AnswerChoice
            key={choice.label}
            choice={choice}
            state={getChoiceState(choice.label)}
            onClick={() => onSelectAnswer(choice.label)}
            disabled={isSubmitted}
          />
        ))}
      </div>
      {!isSubmitted && (
        <button
          onClick={onSubmit}
          disabled={!selectedAnswer}
          className="mt-5 w-full bg-map-blue text-white py-3 rounded-lg font-semibold hover:bg-map-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}
