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

function navButtonClass(active: boolean, mobile = false) {
  const height = mobile ? 'h-9' : 'h-8';
  const width = mobile ? 'w-full justify-center' : '';
  return `inline-flex ${height} shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 py-0 text-sm font-medium transition ${width} ${
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
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-white/10 bg-[#0d9488] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_4px_24px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2.5 sm:flex-none sm:gap-3"
          aria-label="Dr. SK — SK Creation home"
        >
          <Image
            src="/logo.svg"
            alt=""
            width={300}
            height={300}
            priority
            className="h-9 w-auto shrink-0 object-contain object-left sm:h-10"
          />
          <span
            className="hidden h-5 w-px shrink-0 bg-white/30 sm:block"
            aria-hidden
          />
          <span className="truncate text-lg font-bold leading-none tracking-tight text-white subpixel-antialiased sm:text-xl">
            SK Creation
          </span>
        </Link>

        <nav className="hidden shrink-0 items-center gap-2 md:flex" aria-label="Main">
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
            <span className="inline-flex h-8 shrink-0 items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-0 text-sm font-medium text-zinc-400">
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
                className="inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full border border-white/15 px-3.5 py-0 text-sm font-medium text-zinc-200 transition hover:border-violet-300/60 hover:bg-violet-500/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 text-zinc-100 transition hover:bg-white/10 md:hidden"
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
        <div id="mobile-main-menu" className="border-t border-violet-300/25 bg-[#0d9488] px-4 pb-4 pt-3 md:hidden">
          <nav className="flex flex-col gap-2.5" aria-label="Mobile main">
            <Link href="/about" className={navButtonClass(isActive('/about'), true)}>
              About
            </Link>
            <Link href="/services" className={navButtonClass(isActive('/services'), true)}>
              Services
            </Link>
            <Link href="/project" className={navButtonClass(isActive('/project'), true)}>
              Project
            </Link>
            {checkingSession ? (
              <span className="inline-flex h-10 w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-400">
                Loading...
              </span>
            ) : user ? (
              <>
                <Link href="/dashboard" className={navButtonClass(isActive('/dashboard'), true)}>
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="inline-flex h-10 w-full items-center justify-center rounded-full border border-white/15 px-4 text-sm font-medium text-zinc-200 transition hover:border-violet-300/60 hover:bg-violet-500/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <Link href="/login" className={navButtonClass(isActive('/login'), true)}>
                Login
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
