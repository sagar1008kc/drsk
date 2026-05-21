'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FEATURED_BOOKS } from '@/lib/featured-books';

const accentRing: Record<string, string> = {
  indigo: 'ring-indigo-400/35 hover:ring-indigo-400/60',
  amber: 'ring-amber-400/35 hover:ring-amber-400/60',
};

export default function HeroFeaturedBooks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="flex h-full min-h-[380px] w-full flex-col gap-4 sm:min-h-[420px] sm:gap-5 lg:min-h-0 lg:gap-6"
    >
      {FEATURED_BOOKS.map((book, index) => (
        <a
          key={book.id}
          href={book.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex min-h-[200px] flex-1 basis-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]/80 shadow-lg ring-1 transition hover:-translate-y-0.5 sm:min-h-[220px] lg:min-h-[240px] ${accentRing[book.accent]}`}
        >
          <div className="relative w-[44%] min-w-[120px] shrink-0 self-stretch overflow-hidden sm:min-w-[140px]">
            <Image
              src={book.image}
              alt={book.alt}
              fill
              className="object-cover object-center transition duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 44vw, 260px"
              priority={index === 0}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5 lg:p-6">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 sm:text-xs">
              {book.shortTitle}
            </span>
            <p className="mt-2 text-sm font-bold leading-snug text-white sm:text-[15px]">
              {book.title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm sm:leading-relaxed">
              {book.body}
            </p>
            <p className="mt-3 text-xs font-semibold text-violet-300/90 group-hover:text-violet-200 sm:text-sm">
              {book.cta} →
            </p>
          </div>
        </a>
      ))}
    </motion.div>
  );
}
