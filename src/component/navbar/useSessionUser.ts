'use client';

import { useEffect, useState } from 'react';

export type SessionUser = {
  id: string;
  email: string | null;
  fullName: string | null;
  username: string | null;
};

export function useSessionUser() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const response = await fetch('/api/auth/me', { cache: 'no-store' });
        const result = (await response.json()) as { user?: SessionUser | null };
        if (mounted) setUser(result.user || null);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setCheckingSession(false);
      }
    }

    loadSession();
    return () => {
      mounted = false;
    };
  }, []);

  return { user, checkingSession };
}
