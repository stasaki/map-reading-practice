import type { Choice } from '../../types/question';

type ChoiceState = 'default' | 'selected' | 'correct' | 'incorrect';

interface AnswerChoiceProps {
  choice: Choice;
  state: ChoiceState;
  onClick: () => void;
  disabled: boolean;
}

const stateStyles: Record<ChoiceState, string> = {
  default: 'border-gray-300 bg-white hover:border-map-blue-light hover:bg-blue-50 cursor-pointer',
  selected: 'border-map-blue bg-blue-50 ring-2 ring-map-blue-light cursor-pointer',
  correct: 'border-map-green bg-green-50 ring-2 ring-map-green-light',
  incorrect: 'border-map-red bg-red-50 ring-2 ring-map-red-light',
};

export function AnswerChoice({ choice, state, onClick, disabled }: AnswerChoiceProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left border-2 rounded-lg p-4 transition-all flex items-start gap-3 ${stateStyles[state]} ${disabled && state === 'default' ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 ${
        state === 'correct' ? 'bg-map-green text-white' :
        state === 'incorrect' ? 'bg-map-red text-white' :
        state === 'selected' ? 'bg-map-blue text-white' :
        'bg-gray-200 text-gray-700'
      }`}>
        {choice.label}
      </span>
      <span className="text-gray-800 pt-1">{choice.text}</span>
    </button>
  );
}
