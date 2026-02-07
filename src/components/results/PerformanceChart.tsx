import type { QuestionType } from '../../types/question';

interface PerformanceChartProps {
  breakdown: Record<QuestionType, { correct: number; total: number }>;
}

const categoryLabels: Record<QuestionType, string> = {
  literary: 'Literary',
  informational: 'Informational',
  vocabulary: 'Vocabulary',
  foundational: 'Foundational',
};

const categoryColors: Record<QuestionType, string> = {
  literary: 'bg-map-purple',
  informational: 'bg-map-blue',
  vocabulary: 'bg-map-orange',
  foundational: 'bg-map-green',
};

export function PerformanceChart({ breakdown }: PerformanceChartProps) {
  const categories = (Object.keys(breakdown) as QuestionType[]).filter(
    cat => breakdown[cat].total > 0
  );

  if (categories.length === 0) return null;

  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-4">Performance by Category</h3>
      <div className="space-y-3">
        {categories.map(cat => {
          const { correct, total } = breakdown[cat];
          const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{categoryLabels[cat]}</span>
                <span className="text-gray-500">{correct}/{total} ({pct}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${categoryColors[cat]}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
