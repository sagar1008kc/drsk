'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FEATURED_BOOKS } from '@/lib/featured-books';

type SessionUser = {
  id: string;
  email: string | null;
  fullName: string | null;
  username: string | null;
};

const linkActive =
  'text-white bg-violet-500/25 border-violet-400/50';
const linkIdle =
  'text-zinc-300 border-transparent hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white';

function navClass(active: boolean, mobile = false) {
  const size = mobile ? 'min-h-[44px] w-full justify-center text-sm' : 'h-9 px-3.5 text-sm';
  return `inline-flex items-center whitespace-nowrap rounded-full border font-medium transition ${size} ${
    active ? linkActive : linkIdle
  }`;
}

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

function BookNavLink({ book, mobile = false }: { book: (typeof FEATURED_BOOKS)[number]; mobile?: boolean }) {
  return (
    <a
      href={book.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${navClass(false, mobile)} gap-1.5`}
    >
      {book.shortTitle}
      <ExternalIcon className={mobile ? 'h-3.5 w-3.5 shrink-0 opacity-80' : 'h-3 w-3 shrink-0 opacity-70'} />
    </a>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      window.location.href = '/login';
    }
  }

  const navLinks = (
    <>
      <Link href="/" className={navClass(isActive('/'))}>
        Home
      </Link>
      <Link href="/services" className={navClass(isActive('/services'))}>
        Services
      </Link>
      <Link href="/project" className={navClass(isActive('/project'))}>
        Project
      </Link>
      {FEATURED_BOOKS.map((book) => (
        <BookNavLink key={book.id} book={book} />
      ))}
      <Link href="/about" className={navClass(isActive('/about'))}>
        About
      </Link>
    </>
  );

  function AuthControl({ mobile = false }: { mobile?: boolean }) {
    if (checkingSession) {
      return (
        <span
          className={`inline-flex items-center text-zinc-500 ${mobile ? 'min-h-[44px] w-full justify-center text-sm' : 'h-9 px-3 text-sm'}`}
        >
          …
        </span>
      );
    }
    if (user) {
      return (
        <>
          <Link href="/dashboard" className={navClass(isActive('/dashboard'), mobile)}>
            Dashboard
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className={`${navClass(false, mobile)} disabled:opacity-50`}
          >
            {loggingOut ? '…' : 'Logout'}
          </button>
        </>
      );
    }
    return (
      <Link href="/login" className={navClass(isActive('/login'), mobile)}>
        Login
      </Link>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-white/10 bg-[#020205]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[3.75rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="SK Creation home">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ring-2 ring-violet-400/40">
            <Image
              src="/logo.png"
              alt=""
              width={80}
              height={80}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="hidden font-bold text-white sm:inline">SK Creation</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks}
          <AuthControl />
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-zinc-200 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {mobileOpen ? (
        <nav
          className="flex flex-col gap-2 border-t border-white/10 px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <Link href="/" className={navClass(isActive('/'), true)}>
            Home
          </Link>
          <Link href="/services" className={navClass(isActive('/services'), true)}>
            Services
          </Link>
          <Link href="/project" className={navClass(isActive('/project'), true)}>
            Project
          </Link>
          {FEATURED_BOOKS.map((book) => (
            <BookNavLink key={book.id} book={book} mobile />
          ))}
          <Link href="/about" className={navClass(isActive('/about'), true)}>
            About
          </Link>
          <AuthControl mobile />
        </nav>
      ) : null}
    </header>
  );
}
