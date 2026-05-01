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
  'border-white/15 text-zinc-200 hover:border-violet-300/60 hover:bg-violet-500/20 hover:text-white';

function navButtonClass(active: boolean) {
  return `inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-0 text-[11px] font-semibold transition sm:px-3.5 sm:py-0 sm:text-sm ${
    active ? purpleActive : purpleIdle
  }`;
}

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-violet-300/30 bg-[#0d9488] shadow-[0_8px_28px_rgba(13,148,136,0.35)] backdrop-blur-md">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between gap-2 px-3 py-0 sm:gap-3 sm:px-4 sm:py-0">
        <Link
          href="/"
          className="flex min-w-0 max-w-[min(100%,16rem)] shrink-0 flex-col gap-0.5 sm:max-w-none"
          aria-label="Dr. SK — home"
        >
          <div className="flex h-full items-center gap-2">
            <Image
              src="/logo.svg"
              alt=""
              width={300}
              height={300}
              priority
              className="h-10 w-auto max-h-full shrink-0 object-contain object-left"
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex" aria-label="Main">
          <Link href="/about" className={navButtonClass(isActive('/about'))}>
            About
          </Link>
          <Link href="/services" className={navButtonClass(isActive('/services'))}>
            Services
          </Link>
          <Link href="/project" className={navButtonClass(isActive('/project'))}>
            Project
          </Link>
          {checkingSession ? (
            <span className="inline-flex h-8 shrink-0 items-center rounded-full border border-white/10 bg-white/5 px-2 py-0 text-[11px] font-bold text-zinc-400 sm:px-4 sm:py-0 sm:text-sm">
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
                className="inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full border border-white/15 px-2 py-0 text-[11px] font-semibold text-zinc-200 transition hover:border-violet-300/60 hover:bg-violet-500/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-3 sm:py-0 sm:text-sm"
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

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-zinc-200 transition hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-main-menu"
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-main-menu" className="border-t border-violet-300/25 bg-[#0d9488] px-3 pb-3 pt-2 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile main">
            <Link href="/about" className={navButtonClass(isActive('/about'))}>
              About
            </Link>
            <Link href="/services" className={navButtonClass(isActive('/services'))}>
              Services
            </Link>
            <Link href="/project" className={navButtonClass(isActive('/project'))}>
              Project
            </Link>
            {checkingSession ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-zinc-400">
                Loading...
              </span>
            ) : user ? (
              <>
                <Link href="/dashboard" className={navButtonClass(isActive('/dashboard'))}>
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="rounded-full border border-white/15 px-3 py-2 text-left text-xs font-semibold text-zinc-200 transition hover:border-violet-300/60 hover:bg-violet-500/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <Link href="/login" className={navButtonClass(isActive('/login'))}>
                Login
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
