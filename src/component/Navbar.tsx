'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type SessionUser = {
  id: string;
  email: string | null;
  fullName: string | null;
  username: string | null;
};

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const response = await fetch('/api/auth/me', { cache: 'no-store' });
        const result = (await response.json()) as { user?: SessionUser | null };
        if (mounted) {
          setUser(result.user || null);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    }

    loadSession();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      window.location.href = '/login';
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-white/10 bg-black backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3">
        <Link
          href="/"
          className="min-w-0 max-w-[min(100%,11rem)] shrink sm:max-w-none"
          aria-label="Dr. SK — home"
        >
          <div className="leading-tight">
            <div className="truncate text-sm font-bold tracking-tight text-white sm:text-lg md:text-xl">
              Dr. SK
            </div>
            <div className="mt-0.5 hidden truncate text-[11px] text-gray-400 sm:block sm:text-xs">
              Author • Technologist
            </div>
          </div>
        </Link>

        <nav
          className="flex min-w-0 shrink-0 flex-nowrap items-center justify-end gap-1 sm:gap-2"
          aria-label="Main"
        >
          <Link
            href="/services"
            className={`whitespace-nowrap rounded-full border px-2 py-1.5 text-[11px] font-bold transition sm:px-4 sm:py-2 sm:text-sm ${
              isActive('/services')
                ? 'border-white bg-white text-black shadow-md'
                : 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
            }`}
          >
            Services
          </Link>

          <Link
            href="/project"
            className={`whitespace-nowrap rounded-full border px-2 py-1.5 text-[11px] font-bold transition sm:px-4 sm:py-2 sm:text-sm ${
              isActive('/project')
                ? 'border-white bg-white text-black shadow-md'
                : 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
            }`}
          >
            Project
          </Link>

          {checkingSession ? (
            <span className="rounded-full border border-white/10 px-2 py-1.5 text-[11px] font-bold text-gray-400 sm:px-4 sm:py-2 sm:text-sm">
              ...
            </span>
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className={`whitespace-nowrap rounded-full border px-2 py-1.5 text-[11px] font-bold transition sm:px-4 sm:py-2 sm:text-sm ${
                  isActive('/dashboard')
                    ? 'border-white bg-white text-black shadow-md'
                    : 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="whitespace-nowrap rounded-full border border-white/10 px-2 py-1.5 text-[11px] font-bold text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-sm"
              >
                {loggingOut ? '...' : 'Logout'}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`whitespace-nowrap rounded-full border px-2 py-1.5 text-[11px] font-bold transition sm:px-4 sm:py-2 sm:text-sm ${
                isActive('/login')
                  ? 'border-white bg-white text-black shadow-md'
                  : 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
              }`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}