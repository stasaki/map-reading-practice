interface QuizProgressProps {
  current: number; // 0-indexed
  total: number;
  rit: number;
}

export function QuizProgress({ current, total, rit }: QuizProgressProps) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0;
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-gray-600">
          Question {current + 1} of {total}
        </span>
        <div className="flex-1 max-w-xs">
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-map-blue rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-medium text-map-purple">
          RIT: {rit}
        </span>
      </div>
    </div>
  );
}
