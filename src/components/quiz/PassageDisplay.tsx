import type { Passage } from '../../types/question';

interface PassageDisplayProps {
  passage: Passage;
}

export function PassageDisplay({ passage }: PassageDisplayProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 h-full overflow-y-auto">
      <h3 className="text-lg font-bold mb-3 text-gray-800">{passage.title}</h3>
      <div className="font-passage text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
        {passage.text}
      </div>
      {passage.source && (
        <p className="mt-3 text-xs text-gray-400 italic">{passage.source}</p>
      )}
    </div>
  );
}
