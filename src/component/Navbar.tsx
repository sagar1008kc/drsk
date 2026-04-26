'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type SessionUser = {
  id: string;
  email: string | null;
  fullName: string | null;
  username: string | null;
};

const purpleActive =
  'border-violet-400 bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]';
const purpleIdle =
  'border-white/10 text-zinc-300 hover:border-violet-400/45 hover:bg-white/5 hover:text-white';

function navButtonClass(active: boolean) {
  return `shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition sm:px-3.5 sm:py-2 sm:text-sm ${
    active ? purpleActive : purpleIdle
  }`;
}

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
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-violet-400/25 bg-zinc-950/95 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-1 sm:gap-3 sm:px-4 sm:py-1">
        <Link
          href="/"
          className="flex min-w-0 max-w-[min(100%,16rem)] shrink-0 flex-col gap-0.5 sm:max-w-none"
          aria-label="Dr. SK — home"
        >
          <Image
            src="/logo.png"
            alt=""
            width={200}
            height={200}
            priority
            className="h-11 w-auto shrink-0 object-contain object-left sm:h-12 md:h-14"
          />
        </Link>

        <nav
          className="no-scrollbar flex min-w-0 max-w-[calc(100%-9rem)] items-center justify-end gap-1 overflow-x-auto scroll-smooth sm:max-w-none sm:gap-1.5 sm:pl-2 md:gap-2"
          aria-label="Main"
        >
          <Link href="/services" className={navButtonClass(isActive('/services'))}>
            Services
          </Link>
          <Link href="/project" className={navButtonClass(isActive('/project'))}>
            Project
          </Link>
          {checkingSession ? (
            <span className="shrink-0 rounded-full bg-white/5 px-2 py-1.5 text-[11px] font-bold text-zinc-500 sm:px-4 sm:py-2 sm:text-sm">
              …
            </span>
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className={navButtonClass(isActive('/dashboard'))}
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-2 py-1.5 text-[11px] font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-3 sm:py-2 sm:text-sm"
              >
                {loggingOut ? '…' : 'Logout'}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={navButtonClass(isActive('/login'))}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
