import type { GradeBandConfig } from '../types/gradeBand';

export function getStartingRit(difficulty: string, config: GradeBandConfig): number {
  if (difficulty === 'adaptive') return config.difficultyRit.adaptive;
  const rit = config.difficultyRit[difficulty as keyof typeof config.difficultyRit];
  return rit ?? config.difficultyRit.adaptive;
}

export function calculateRitAdjustment(
  currentRit: number,
  questionRitLevel: number,
  isCorrect: boolean
): number {
  const diff = questionRitLevel - currentRit;

  if (isCorrect) {
    if (diff >= 10) return 4;
    if (diff >= 5) return 3;
    if (diff >= 0) return 2;
    return 1;
  } else {
    if (diff <= -10) return -4;
    if (diff <= -5) return -3;
    if (diff <= 0) return -2;
    return -1;
  }
}

export function clampRit(rit: number, config: GradeBandConfig): number {
  return Math.max(config.ritRange.min, Math.min(config.ritRange.max, rit));
}

export function updateRit(
  currentRit: number,
  questionRitLevel: number,
  isCorrect: boolean,
  config: GradeBandConfig
): number {
  const adjustment = calculateRitAdjustment(currentRit, questionRitLevel, isCorrect);
  return clampRit(currentRit + adjustment, config);
}
