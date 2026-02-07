import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          MAP Reading Practice
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Build your reading skills with practice questions designed for grades 3–5 and 9–12.
          Track your progress and watch your RIT score grow!
        </p>
        <Link to="/practice/setup">
          <Button size="lg">Start Practicing</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-bold text-gray-800 mb-2">Reading Passages</h3>
            <p className="text-sm text-gray-600">
              Practice with literary and informational texts at your level
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-gray-800 mb-2">Adaptive Difficulty</h3>
            <p className="text-sm text-gray-600">
              Questions adjust to challenge you at the right level
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-800 mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600">
              See your RIT score trend and performance over time
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
