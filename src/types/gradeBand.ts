export type GradeBandId = 'grades-3-5' | 'grades-9-12';

export interface GradeBandConfig {
  id: GradeBandId;
  label: string;
  shortLabel: string;
  ritRange: { min: number; max: number };
  difficultyRit: { easy: number; medium: number; hard: number; adaptive: number };
  difficultyDescriptions: { easy: string; medium: string; hard: string };
}

export const GRADE_BANDS: Record<GradeBandId, GradeBandConfig> = {
  'grades-3-5': {
    id: 'grades-3-5',
    label: 'Grades 3\u20135',
    shortLabel: '3\u20135',
    ritRange: { min: 180, max: 220 },
    difficultyRit: { easy: 187, medium: 200, hard: 210, adaptive: 197 },
    difficultyDescriptions: {
      easy: 'RIT 180\u2013190',
      medium: 'RIT 195\u2013205',
      hard: 'RIT 208\u2013220',
    },
  },
  'grades-9-12': {
    id: 'grades-9-12',
    label: 'Grades 9\u201312',
    shortLabel: '9\u201312',
    ritRange: { min: 230, max: 260 },
    difficultyRit: { easy: 237, medium: 245, hard: 255, adaptive: 245 },
    difficultyDescriptions: {
      easy: 'RIT 230\u2013240',
      medium: 'RIT 240\u2013250',
      hard: 'RIT 250\u2013260',
    },
  },
};

export const DEFAULT_GRADE_BAND: GradeBandId = 'grades-3-5';
