import type { SessionResult } from '../types/session';
import { DEFAULT_GRADE_BAND } from '../types/gradeBand';

const SESSIONS_KEY = 'map-reading-sessions';

export function saveSessions(sessions: SessionResult[]): void {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function loadSessions(): SessionResult[] {
  const raw = localStorage.getItem(SESSIONS_KEY);
  if (!raw) return [];
  try {
    const sessions = JSON.parse(raw) as SessionResult[];
    // Migrate old sessions that don't have gradeBand
    for (const session of sessions) {
      if (!session.config.gradeBand) {
        session.config.gradeBand = DEFAULT_GRADE_BAND;
      }
    }
    return sessions;
  } catch {
    return [];
  }
}

export function addSession(session: SessionResult): void {
  const sessions = loadSessions();
  sessions.push(session);
  saveSessions(sessions);
}

export function clearSessions(): void {
  localStorage.removeItem(SESSIONS_KEY);
}
