import { useLocation, useNavigate, Link } from 'react-router-dom';
import type { SessionResult } from '../types/session';
import { useProgress } from '../hooks/useProgress';
import { useEffect, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ScoreSummary } from '../components/results/ScoreSummary';
import { PerformanceChart } from '../components/results/PerformanceChart';
import { QuestionReview } from '../components/results/QuestionReview';

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = (location.state as { result?: SessionResult })?.result;
  const { saveSession } = useProgress();
  const saved = useRef(false);

  useEffect(() => {
    if (!result) {
      navigate('/');
      return;
    }
    if (!saved.current) {
      saved.current = true;
      saveSession(result);
    }
  }, [result, navigate, saveSession]);

  if (!result) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="mb-6">
        <ScoreSummary
          finalRit={result.finalRit}
          startingRit={result.startingRit}
          percentage={result.percentage}
          totalCorrect={result.totalCorrect}
          totalQuestions={result.totalQuestions}
        />
      </Card>

      <Card className="mb-6">
        <PerformanceChart breakdown={result.categoryBreakdown} />
      </Card>

      <Card className="mb-6">
        <QuestionReview answers={result.answers} />
      </Card>

      <div className="flex gap-4 justify-center">
        <Link to="/practice/setup">
          <Button>Practice Again</Button>
        </Link>
        <Link to="/progress">
          <Button variant="secondary">View Progress</Button>
        </Link>
      </div>
    </div>
  );
}
