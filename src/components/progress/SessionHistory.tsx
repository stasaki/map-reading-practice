import type { SessionResult } from '../../types/session';
import { GRADE_BANDS, DEFAULT_GRADE_BAND } from '../../types/gradeBand';

interface SessionHistoryProps {
  sessions: SessionResult[];
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No sessions yet. Complete a practice quiz to see your history!
      </div>
    );
  }

  const sorted = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-2 font-semibold text-gray-600">Date</th>
            <th className="text-left py-3 px-2 font-semibold text-gray-600">Grade</th>
            <th className="text-left py-3 px-2 font-semibold text-gray-600">Type</th>
            <th className="text-left py-3 px-2 font-semibold text-gray-600">Difficulty</th>
            <th className="text-right py-3 px-2 font-semibold text-gray-600">Score</th>
            <th className="text-right py-3 px-2 font-semibold text-gray-600">RIT</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(session => (
            <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-2 text-gray-700">
                {new Date(session.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-2 text-gray-700">
                {GRADE_BANDS[session.config.gradeBand ?? DEFAULT_GRADE_BAND]?.shortLabel ?? '3\u20135'}
              </td>
              <td className="py-3 px-2 text-gray-700 capitalize">{session.config.questionType}</td>
              <td className="py-3 px-2 text-gray-700 capitalize">{session.config.difficulty}</td>
              <td className="py-3 px-2 text-right text-gray-700">
                {session.totalCorrect}/{session.totalQuestions} ({session.percentage}%)
              </td>
              <td className="py-3 px-2 text-right font-semibold text-map-blue">{session.finalRit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
