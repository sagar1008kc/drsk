'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { FEATURED_BOOKS } from '@/lib/featured-books';

const PRIMARY_NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/project', label: 'Project' },
  { href: '/books', label: 'Books' },
  { href: '/portfolio', label: 'Portfolio' },
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
      className="group relative inline-flex h-9 items-center px-3.5 text-sm font-bold text-[#000000] transition-colors hover:text-[#000000] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {active ? (
        <span className="absolute inset-0 rounded-full border border-black/10 bg-black/[0.06] shadow-sm" />
      ) : null}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

function DesktopBookLink({ book }: { book: (typeof FEATURED_BOOKS)[number] }) {
  return (
    <a
      href={book.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-9 items-center gap-1.5 rounded-full border border-transparent px-3 text-sm font-bold text-[#000000] transition hover:border-black/10 hover:bg-black/[0.04]"
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
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <Link
        href={href}
        onClick={onNavigate}
        className={`flex min-h-[48px] w-full items-center justify-between rounded-xl border px-4 text-sm font-bold transition ${
          active
            ? 'border-black/15 bg-white text-[#000000] shadow-sm'
            : 'border-black/10 bg-white/90 text-[#000000] hover:border-black/20 hover:bg-white'
        }`}
      >
        <span>{label}</span>
        {active ? (
          <span className="h-2 w-2 rounded-full bg-[#000000]" />
        ) : (
          <span className="text-xs text-black/40">→</span>
        )}
      </Link>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
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
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] border-b bg-[#0d9488] ${
        scrolled ? 'border-emerald-400/30 shadow-md' : 'border-white/15'
      }`}
    >
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:px-4">
        <Link
          href="/"
          className="relative z-10 flex min-w-0 shrink items-center gap-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d9488]"
          aria-label="SK Creation home"
        >
          <span className="box-border flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-violet-300 bg-[#0d9488]">
            <img
              src="/sk_logo.svg"
              alt=""
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="truncate font-gugi text-[1rem] font-bold leading-none tracking-wide text-white sm:text-[1.125rem]">
            SK CREATION
          </span>
        </Link>

        <nav
          className="relative z-10 hidden items-center gap-0.5 rounded-full border border-black/10 bg-white/95 p-1 shadow-sm md:flex"
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
          <span className="mx-0.5 h-5 w-px bg-black/15" aria-hidden />
          {FEATURED_BOOKS.map((book) => (
            <DesktopBookLink key={book.id} book={book} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white/95 text-[#000000] hover:bg-white md:hidden"
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
              className="fixed inset-0 top-14 z-[999] bg-[#0d9488]/70 backdrop-blur-md md:hidden"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[1001] overflow-hidden border-t border-emerald-300/25 bg-[#0d9488] md:hidden"
              aria-label="Mobile"
            >
              <div className="relative flex flex-col gap-2 px-3 py-3">
                <p className="mb-1 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#000000]">
                  Navigation
                </p>
                {PRIMARY_NAV.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={isActive(item.href)}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
                <p className="mb-1 mt-3 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#000000]">
                  Books
                </p>
                {FEATURED_BOOKS.map((book) => (
                  <a
                    key={book.id}
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] w-full items-center justify-between rounded-xl border border-black/10 bg-white/90 px-4 text-sm font-bold text-[#000000] hover:border-black/20 hover:bg-white"
                  >
                    {book.shortTitle}
                    <ExternalIcon className="h-3.5 w-3.5 opacity-70" />
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
