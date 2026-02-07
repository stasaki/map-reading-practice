import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { SessionConfig } from '../types/session';
import { useQuiz } from '../hooks/useQuiz';
import { QuizProgress } from '../components/quiz/QuizProgress';
import { QuestionLayout } from '../components/quiz/QuestionLayout';
import { PassageDisplay } from '../components/quiz/PassageDisplay';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { AnswerFeedback } from '../components/quiz/AnswerFeedback';

export function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = (location.state as { config?: SessionConfig })?.config;
  const quiz = useQuiz();
  const started = useRef(false);

  useEffect(() => {
    if (!config) {
      navigate('/practice/setup');
      return;
    }
    if (!started.current) {
      started.current = true;
      quiz.start(config);
    }
  }, [config, navigate, quiz.start]);

  useEffect(() => {
    if (quiz.phase === 'complete') {
      const result = quiz.getResult();
      if (result) {
        navigate('/practice/results', { state: { result } });
      }
    }
  }, [quiz.phase, quiz.getResult, navigate]);

  if (!quiz.currentQuestion || quiz.phase === 'idle') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-500">Loading questions...</div>
      </div>
    );
  }

  return (
    <div>
      <QuizProgress
        current={quiz.currentIndex}
        total={config?.questionCount ?? 0}
        rit={quiz.currentRit}
      />
      <QuestionLayout
        passage={
          quiz.currentPassage ? <PassageDisplay passage={quiz.currentPassage} /> : null
        }
        question={
          <div>
            <QuestionCard
              question={quiz.currentQuestion}
              selectedAnswer={quiz.selectedAnswer}
              isSubmitted={quiz.phase === 'feedback'}
              onSelectAnswer={quiz.selectAnswer}
              onSubmit={quiz.submit}
            />
            {quiz.phase === 'feedback' && quiz.isCorrect !== null && (
              <AnswerFeedback
                isCorrect={quiz.isCorrect}
                explanation={quiz.currentQuestion.explanation}
                onNext={quiz.next}
                isLast={quiz.currentIndex + 1 >= (config?.questionCount ?? 0)}
              />
            )}
          </div>
        }
      />
    </div>
  );
}
