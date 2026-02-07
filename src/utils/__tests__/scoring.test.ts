import { describe, it, expect } from 'vitest';
import { getStartingRit, calculateRitAdjustment, clampRit, updateRit } from '../scoring';
import { GRADE_BANDS } from '../../types/gradeBand';

const g35 = GRADE_BANDS['grades-3-5'];
const g912 = GRADE_BANDS['grades-9-12'];

describe('getStartingRit', () => {
  it('returns 187 for easy (grades 3-5)', () => {
    expect(getStartingRit('easy', g35)).toBe(187);
  });

  it('returns 200 for medium (grades 3-5)', () => {
    expect(getStartingRit('medium', g35)).toBe(200);
  });

  it('returns 210 for hard (grades 3-5)', () => {
    expect(getStartingRit('hard', g35)).toBe(210);
  });

  it('returns 197 for adaptive (grades 3-5)', () => {
    expect(getStartingRit('adaptive', g35)).toBe(197);
  });

  it('returns 237 for easy (grades 9-12)', () => {
    expect(getStartingRit('easy', g912)).toBe(237);
  });

  it('returns 245 for medium (grades 9-12)', () => {
    expect(getStartingRit('medium', g912)).toBe(245);
  });

  it('returns 255 for hard (grades 9-12)', () => {
    expect(getStartingRit('hard', g912)).toBe(255);
  });

  it('returns 245 for adaptive (grades 9-12)', () => {
    expect(getStartingRit('adaptive', g912)).toBe(245);
  });
});

describe('calculateRitAdjustment', () => {
  it('gives +4 for correct answer on much harder question', () => {
    expect(calculateRitAdjustment(190, 210, true)).toBe(4);
  });

  it('gives +3 for correct answer on harder question', () => {
    expect(calculateRitAdjustment(195, 200, true)).toBe(3);
  });

  it('gives +2 for correct answer on same-level question', () => {
    expect(calculateRitAdjustment(200, 200, true)).toBe(2);
  });

  it('gives +1 for correct answer on easier question', () => {
    expect(calculateRitAdjustment(210, 200, true)).toBe(1);
  });

  it('gives -4 for incorrect answer on much easier question', () => {
    expect(calculateRitAdjustment(210, 190, false)).toBe(-4);
  });

  it('gives -3 for incorrect answer on easier question', () => {
    expect(calculateRitAdjustment(205, 200, false)).toBe(-3);
  });

  it('gives -2 for incorrect answer on same-level question', () => {
    expect(calculateRitAdjustment(200, 200, false)).toBe(-2);
  });

  it('gives -1 for incorrect answer on harder question', () => {
    expect(calculateRitAdjustment(190, 200, false)).toBe(-1);
  });
});

describe('clampRit', () => {
  it('clamps below 180 to 180 (grades 3-5)', () => {
    expect(clampRit(175, g35)).toBe(180);
  });

  it('clamps above 220 to 220 (grades 3-5)', () => {
    expect(clampRit(225, g35)).toBe(220);
  });

  it('does not clamp values in range (grades 3-5)', () => {
    expect(clampRit(200, g35)).toBe(200);
  });

  it('clamps below 230 to 230 (grades 9-12)', () => {
    expect(clampRit(225, g912)).toBe(230);
  });

  it('clamps above 260 to 260 (grades 9-12)', () => {
    expect(clampRit(265, g912)).toBe(260);
  });

  it('does not clamp values in range (grades 9-12)', () => {
    expect(clampRit(245, g912)).toBe(245);
  });
});

describe('updateRit', () => {
  it('increases RIT on correct answer (grades 3-5)', () => {
    expect(updateRit(200, 200, true, g35)).toBeGreaterThan(200);
  });

  it('decreases RIT on incorrect answer (grades 3-5)', () => {
    expect(updateRit(200, 200, false, g35)).toBeLessThan(200);
  });

  it('does not exceed 220 (grades 3-5)', () => {
    expect(updateRit(219, 210, true, g35)).toBeLessThanOrEqual(220);
  });

  it('does not go below 180 (grades 3-5)', () => {
    expect(updateRit(181, 190, false, g35)).toBeGreaterThanOrEqual(180);
  });

  it('increases RIT on correct answer (grades 9-12)', () => {
    expect(updateRit(245, 245, true, g912)).toBeGreaterThan(245);
  });

  it('decreases RIT on incorrect answer (grades 9-12)', () => {
    expect(updateRit(245, 245, false, g912)).toBeLessThan(245);
  });

  it('does not exceed 260 (grades 9-12)', () => {
    expect(updateRit(259, 255, true, g912)).toBeLessThanOrEqual(260);
  });

  it('does not go below 230 (grades 9-12)', () => {
    expect(updateRit(231, 240, false, g912)).toBeGreaterThanOrEqual(230);
  });
});
