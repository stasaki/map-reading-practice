import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ProgressDashboard } from '../components/progress/ProgressDashboard';
import { SessionHistory } from '../components/progress/SessionHistory';

export function ProgressPage() {
  const { sessions, clearSessions, averageRit, totalSessions, totalQuestions, overallPercentage } = useProgress();
  const [showClearModal, setShowClearModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
        <div className="flex gap-3">
          <Link to="/practice/setup">
            <Button size="sm">New Practice</Button>
          </Link>
          {sessions.length > 0 && (
            <Button size="sm" variant="danger" onClick={() => setShowClearModal(true)}>
              Clear History
            </Button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <ProgressDashboard
          totalSessions={totalSessions}
          averageRit={averageRit}
          overallPercentage={overallPercentage}
          totalQuestions={totalQuestions}
        />
      </div>

      {sessions.length > 0 && (
        <Card className="mb-6">
          <h2 className="font-bold text-gray-800 mb-4">RIT Score Trend</h2>
          <div className="flex items-end gap-1 h-32">
            {sessions.map((session, idx) => {
              const allRits = sessions.map(s => s.finalRit);
              const minRit = Math.min(...allRits) - 5;
              const maxRit = Math.max(...allRits) + 5;
              const range = maxRit - minRit || 1;
              const height = ((session.finalRit - minRit) / range) * 100;
              return (
                <div
                  key={session.id}
                  className="flex-1 flex flex-col items-center justify-end"
                  title={`Session ${idx + 1}: RIT ${session.finalRit}`}
                >
                  <div className="text-xs text-gray-500 mb-1">{session.finalRit}</div>
                  <div
                    className="w-full max-w-[40px] bg-map-blue rounded-t transition-all"
                    style={{ height: `${Math.max(height, 5)}%` }}
                  />
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="font-bold text-gray-800 mb-4">Session History</h2>
        <SessionHistory sessions={sessions} />
      </Card>

      <Modal
        open={showClearModal}
        title="Clear All History?"
        onConfirm={() => { clearSessions(); setShowClearModal(false); }}
        onCancel={() => setShowClearModal(false)}
        confirmLabel="Clear"
      >
        This will permanently delete all your session history and progress. This action cannot be undone.
      </Modal>
    </div>
  );
}
