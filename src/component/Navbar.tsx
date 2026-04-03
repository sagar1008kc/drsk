'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Logo / Home */}
          <Link href="/" className="flex items-center gap-3" aria-label="Go to home">
            <div className="h-11 w-11 rounded-full overflow-hidden border border-black/10 bg-gray-100">
              <Image
                src="/drsk.png"
                alt="Dr. SK"
                width={44}
                height={44}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="leading-tight">
              <div className="font-bold text-black">Dr. SK</div>
              <div className="text-xs text-gray-600 font-medium">
                Author • Technologist
              </div>
            </div>
          </Link>

          {/* Main Nav */}
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-sm font-semibold text-black hover:bg-gray-100 transition"
            >
              Portfolio
            </Link>

            <Link
              href="/services"
              className="px-4 py-2 rounded-full text-sm font-semibold text-black hover:bg-gray-100 transition"
            >
              Services
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}