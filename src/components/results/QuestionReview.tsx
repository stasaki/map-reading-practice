import type { AnswerRecord } from '../../types/session';
import { allQuestions } from '../../data/loader';

interface QuestionReviewProps {
  answers: AnswerRecord[];
}

export function QuestionReview({ answers }: QuestionReviewProps) {
  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-4">Question Review</h3>
      <div className="space-y-4">
        {answers.map((answer, idx) => {
          const question = allQuestions.find(q => q.id === answer.questionId);
          if (!question) return null;
          return (
            <div
              key={answer.questionId}
              className={`border-2 rounded-lg p-4 ${
                answer.isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white shrink-0 ${
                  answer.isCorrect ? 'bg-map-green' : 'bg-map-red'
                }`}>
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 mb-2">{question.questionText}</p>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-gray-500">Your answer:</span>{' '}
                      <span className={answer.isCorrect ? 'text-map-green font-medium' : 'text-map-red font-medium'}>
                        {answer.selectedAnswer}. {question.choices.find(c => c.label === answer.selectedAnswer)?.text}
                      </span>
                    </p>
                    {!answer.isCorrect && (
                      <p>
                        <span className="text-gray-500">Correct answer:</span>{' '}
                        <span className="text-map-green font-medium">
                          {answer.correctAnswer}. {question.choices.find(c => c.label === answer.correctAnswer)?.text}
                        </span>
                      </p>
                    )}
                    <p className="text-gray-600 mt-2 italic">{question.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
