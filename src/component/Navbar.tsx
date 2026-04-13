'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-white/10 bg-black backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
          aria-label="Go to home"
        >
          <div className="h-10 w-10 shrink-0 overflow-hidden bg-gray-800 sm:h-12 sm:w-12">
            <Image
              src="/drskauthor.png"
              alt="Dr. SK"
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 leading-tight">
            <div className="truncate text-base font-bold text-white sm:text-xl">
              Dr. SK
            </div>
            <div className="hidden text-xs text-gray-400 sm:block">
              Author • Technologist
            </div>
          </div>
        </Link>

        <nav
          className="flex shrink-0 flex-nowrap items-center justify-end gap-0.5 sm:gap-2"
          aria-label="Main"
        >
          <Link
            href="/services"
            className={`whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
              isActive('/services')
                ? 'bg-white text-black shadow-md'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            Services
          </Link>

          <Link
            href="/project"
            className={`whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
              isActive('/project')
                ? 'bg-white text-black shadow-md'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            Project
          </Link>
        </nav>
      </div>
    </header>
  );
}