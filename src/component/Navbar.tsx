'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Go to home">
          <div className="h-12 w-12 rounded-full overflow-hidden border border-white/20 bg-gray-800">
            <Image
              src="/drsk.png"
              alt="Dr. SK"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="leading-tight">
            <div className="text-xl font-bold text-white">Dr. SK</div>
            <div className="text-xs text-gray-400">Author • Technologist</div>
          </div>
        </Link>

      <nav className="flex items-center gap-3">
        <Link
          href="/"
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            isActive('/')
              ? 'bg-white text-black shadow-md'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Portfolio
        </Link>

        <Link
          href="/services"
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            isActive('/services')
              ? 'bg-white text-black shadow-md'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Services
        </Link>
      </nav>
      </div>
    </header>
  );
}