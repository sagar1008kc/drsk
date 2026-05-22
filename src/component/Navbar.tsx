'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { FEATURED_BOOKS } from '@/lib/featured-books';

type SessionUser = {
  id: string;
  email: string | null;
  fullName: string | null;
  username: string | null;
};

const PRIMARY_NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/project', label: 'Project' },
  { href: '/about', label: 'About' },
] as const;

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M4 2h6v6M10 2 5 7M7 5H2v5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

function DesktopNavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex h-9 items-center px-3.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020205]"
    >
      {active ? (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full border border-violet-400/45 bg-gradient-to-r from-violet-500/25 via-indigo-500/15 to-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.25)]"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      ) : null}
      <span className="relative z-10">{label}</span>
      {!active ? (
        <span className="pointer-events-none absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/80 to-transparent transition-all duration-300 group-hover:w-[70%]" />
      ) : null}
    </Link>
  );
}

function DesktopBookLink({ book }: { book: (typeof FEATURED_BOOKS)[number] }) {
  return (
    <a
      href={book.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-9 items-center gap-1.5 rounded-full border border-transparent px-3 text-sm font-medium text-zinc-400 transition hover:border-white/10 hover:bg-white/5 hover:text-zinc-100"
    >
      <span>{book.shortTitle}</span>
      <ExternalIcon className="h-3 w-3 shrink-0 opacity-60 transition group-hover:opacity-100" />
    </a>
  );
}

function MobileNavLink({
  href,
  label,
  active,
  index,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  index: number;
  onNavigate?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 + index * 0.04, duration: 0.35 }}
    >
      <Link
        href={href}
        onClick={onNavigate}
        className={`flex min-h-[48px] w-full items-center justify-between rounded-xl border px-4 text-sm font-medium transition ${
          active
            ? 'border-violet-400/50 bg-violet-500/15 text-white shadow-[inset_0_0_24px_rgba(139,92,246,0.12)]'
            : 'border-white/8 bg-white/[0.03] text-zinc-300 hover:border-violet-400/25 hover:bg-violet-500/10 hover:text-white'
        }`}
      >
        <span>{label}</span>
        {active ? (
          <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
        ) : (
          <span className="text-xs text-zinc-600">→</span>
        )}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      window.location.href = '/login';
    }
  }

  function AuthControl({ mobile = false }: { mobile?: boolean }) {
    if (checkingSession) {
      return (
        <span
          className={`inline-flex items-center gap-2 text-zinc-500 ${
            mobile ? 'min-h-[48px] w-full justify-center text-sm' : 'h-9 px-3 text-sm'
          }`}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400/60" />
          Syncing…
        </span>
      );
    }
    if (user) {
      return (
        <>
          <Link
            href="/dashboard"
            className={
              mobile
                ? `flex min-h-[48px] w-full items-center justify-center rounded-xl border px-4 text-sm font-medium transition ${
                    isActive('/dashboard')
                      ? 'border-violet-400/50 bg-violet-500/15 text-white'
                      : 'border-cyan-400/30 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20'
                  }`
                : `relative inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition ${
                    isActive('/dashboard')
                      ? 'border-cyan-400/45 bg-cyan-500/15 text-cyan-100'
                      : 'border-transparent text-zinc-300 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-100'
                  }`
            }
          >
            {!mobile && isActive('/dashboard') ? (
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            ) : null}
            Dashboard
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className={
              mobile
                ? 'flex min-h-[48px] w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-300 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-100 disabled:opacity-50'
                : 'inline-flex h-9 items-center rounded-full border border-transparent px-3.5 text-sm font-medium text-zinc-400 transition hover:border-rose-400/25 hover:bg-rose-500/10 hover:text-rose-200 disabled:opacity-50'
            }
          >
            {loggingOut ? '…' : 'Logout'}
          </button>
        </>
      );
    }
    return (
      <Link
        href="/login"
        className={
          mobile
            ? `flex min-h-[48px] w-full items-center justify-center rounded-xl border px-4 text-sm font-semibold transition ${
                isActive('/login')
                  ? 'border-violet-400/50 bg-violet-600 text-white'
                  : 'border-violet-400/40 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:brightness-110'
              }`
            : `inline-flex h-9 items-center rounded-full border px-4 text-sm font-semibold transition ${
                isActive('/login')
                  ? 'border-violet-400/60 bg-violet-600/90 text-white shadow-[0_0_16px_rgba(139,92,246,0.4)]'
                  : 'border-violet-400/35 bg-violet-600/80 text-white hover:border-violet-300/50 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]'
              }`
        }
      >
        Login
      </Link>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-[background,box-shadow,border-color] duration-500 ${
        scrolled
          ? 'border-b border-violet-500/15 bg-[#020205]/95 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_1px_rgba(139,92,246,0.2)_inset]'
          : 'border-b border-white/10 bg-[#020205]/75'
      } backdrop-blur-xl backdrop-saturate-150`}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <div className="drsk-nav-scan h-full w-1/2 bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
      </div>

      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 ${
          scrolled ? 'h-[3.5rem]' : 'h-[3.75rem]'
        }`}
      >
        <Link
          href="/"
          className="group relative flex shrink-0 items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020205] rounded-lg"
          aria-label="SK Creation home"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <span
              className="drsk-nav-logo-ring pointer-events-none absolute -inset-0.5 rounded-full opacity-70 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
            <span className="drsk-nav-logo-glow pointer-events-none absolute inset-0 rounded-full bg-violet-500/25 blur-md" aria-hidden />
            <span className="relative flex h-10 w-10 overflow-hidden rounded-full ring-2 ring-violet-400/50 transition group-hover:ring-violet-300/70">
              <Image
                src="/logo.png"
                alt=""
                width={80}
                height={80}
                priority
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </span>
          </span>
          <span className="font-gugi bg-gradient-to-r from-violet-200 via-white to-indigo-200 bg-clip-text text-[1.05rem] leading-none tracking-wide text-transparent sm:text-[1.2rem]">
            SK CREATION
          </span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.03] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:flex"
          aria-label="Main"
        >
          {PRIMARY_NAV.map((item) => (
            <DesktopNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={isActive(item.href)}
            />
          ))}
          <span className="mx-0.5 h-5 w-px bg-white/10" aria-hidden />
          {FEATURED_BOOKS.map((book) => (
            <DesktopBookLink key={book.id} book={book} />
          ))}
          <span className="mx-0.5 h-5 w-px bg-white/10" aria-hidden />
          <AuthControl />
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-zinc-200 transition hover:border-violet-400/35 hover:bg-violet-500/10 md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className="relative h-4 w-5" aria-hidden>
            <motion.span
              className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current"
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[3.5rem] z-[999] bg-[#020205]/80 backdrop-blur-md md:hidden"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[1001] overflow-hidden border-t border-violet-500/20 md:hidden"
              aria-label="Mobile"
            >
              <div className="drsk-nav-grid pointer-events-none absolute inset-0 opacity-60" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-600/10 via-transparent to-transparent" />
              <div className="relative flex flex-col gap-2 px-4 py-4">
                <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400/80">
                  Navigation
                </p>
                {PRIMARY_NAV.map((item, i) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={isActive(item.href)}
                    index={i}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
                <p className="mb-1 mt-3 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Books
                </p>
                {FEATURED_BOOKS.map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 + i * 0.04, duration: 0.35 }}
                  >
                    <a
                      href={book.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[48px] w-full items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 text-sm font-medium text-zinc-300 transition hover:border-violet-400/25 hover:bg-violet-500/10 hover:text-white"
                    >
                      {book.shortTitle}
                      <ExternalIcon className="h-3.5 w-3.5 opacity-70" />
                    </a>
                  </motion.div>
                ))}
                <p className="mb-1 mt-3 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Account
                </p>
                <div className="flex flex-col gap-2">
                  <AuthControl mobile />
                </div>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
