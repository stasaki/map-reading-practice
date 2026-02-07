interface AnswerFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
  isLast: boolean;
}

export function AnswerFeedback({ isCorrect, explanation, onNext, isLast }: AnswerFeedbackProps) {
  return (
    <div className={`mt-5 rounded-lg p-5 border-2 ${
      isCorrect
        ? 'bg-green-50 border-map-green'
        : 'bg-red-50 border-map-red'
    }`}>
      <p className={`font-bold text-lg mb-2 ${isCorrect ? 'text-map-green' : 'text-map-red'}`}>
        {isCorrect ? 'Correct!' : 'Incorrect'}
      </p>
      <p className="text-gray-700 mb-4">{explanation}</p>
      <button
        onClick={onNext}
        className="bg-map-blue text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-map-blue-dark transition-colors"
      >
        {isLast ? 'See Results' : 'Next Question'}
      </button>
    </div>
  );
}
