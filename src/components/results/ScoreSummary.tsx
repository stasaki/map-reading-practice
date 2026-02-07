interface ScoreSummaryProps {
  finalRit: number;
  startingRit: number;
  percentage: number;
  totalCorrect: number;
  totalQuestions: number;
}

export function ScoreSummary({ finalRit, startingRit, percentage, totalCorrect, totalQuestions }: ScoreSummaryProps) {
  const ritChange = finalRit - startingRit;
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Results</h2>
      <div className="inline-flex items-center justify-center w-36 h-36 rounded-full bg-map-blue text-white mb-4">
        <div>
          <div className="text-4xl font-bold">{finalRit}</div>
          <div className="text-sm opacity-80">RIT Score</div>
        </div>
      </div>
      <div className="flex justify-center gap-8 text-sm">
        <div>
          <div className="text-2xl font-bold text-gray-800">{percentage}%</div>
          <div className="text-gray-500">Accuracy</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{totalCorrect}/{totalQuestions}</div>
          <div className="text-gray-500">Correct</div>
        </div>
        <div>
          <div className={`text-2xl font-bold ${ritChange >= 0 ? 'text-map-green' : 'text-map-red'}`}>
            {ritChange >= 0 ? '+' : ''}{ritChange}
          </div>
          <div className="text-gray-500">RIT Change</div>
        </div>
      </div>
    </div>
  );
}
