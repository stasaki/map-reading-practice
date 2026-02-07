import { useState, useCallback, useEffect } from 'react';
import type { SessionResult } from '../types/session';
import { loadSessions, addSession, clearSessions as clearStorage } from '../utils/storage';

export function useProgress() {
  const [sessions, setSessions] = useState<SessionResult[]>([]);

  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  const saveSession = useCallback((session: SessionResult) => {
    addSession(session);
    setSessions(prev => [...prev, session]);
  }, []);

  const clearSessions = useCallback(() => {
    clearStorage();
    setSessions([]);
  }, []);

  const averageRit = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.finalRit, 0) / sessions.length)
    : null;

  const totalSessions = sessions.length;
  const totalQuestions = sessions.reduce((sum, s) => sum + s.totalQuestions, 0);
  const totalCorrect = sessions.reduce((sum, s) => sum + s.totalCorrect, 0);
  const overallPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : null;

  return {
    sessions,
    saveSession,
    clearSessions,
    averageRit,
    totalSessions,
    totalQuestions,
    totalCorrect,
    overallPercentage,
  };
}
