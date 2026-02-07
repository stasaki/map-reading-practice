import type { ReactNode } from 'react';

interface QuestionLayoutProps {
  passage: ReactNode | null;
  question: ReactNode;
}

export function QuestionLayout({ passage, question }: QuestionLayoutProps) {
  if (!passage) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        {question}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 lg:max-h-[calc(100vh-200px)] lg:sticky lg:top-4">
          {passage}
        </div>
        <div className="lg:w-1/2">
          {question}
        </div>
      </div>
    </div>
  );
}
