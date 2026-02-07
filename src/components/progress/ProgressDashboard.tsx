interface ProgressDashboardProps {
  totalSessions: number;
  averageRit: number | null;
  overallPercentage: number | null;
  totalQuestions: number;
}

export function ProgressDashboard({ totalSessions, averageRit, overallPercentage, totalQuestions }: ProgressDashboardProps) {
  const stats = [
    { label: 'Sessions Completed', value: totalSessions },
    { label: 'Average RIT', value: averageRit ?? '—' },
    { label: 'Overall Accuracy', value: overallPercentage != null ? `${overallPercentage}%` : '—' },
    { label: 'Questions Answered', value: totalQuestions },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-map-blue">{stat.value}</div>
          <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
