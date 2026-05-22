'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FEATURED_BOOKS } from '@/lib/featured-books';

export default function HeroFeaturedBooks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="flex h-full min-h-0 w-full flex-col justify-center gap-4 py-1 sm:gap-5 lg:gap-6 lg:py-2"
    >
      {FEATURED_BOOKS.map((book, index) => (
        <a
          key={book.id}
          href={book.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid min-h-0 flex-1 grid-cols-[minmax(7rem,38%)_1fr] items-center gap-3 sm:grid-cols-[minmax(8.25rem,40%)_1fr] sm:gap-4 md:grid-cols-[minmax(9rem,42%)_1fr] lg:grid-cols-[minmax(9.5rem,44%)_1fr] lg:gap-4 xl:grid-cols-[minmax(10.5rem,46%)_1fr]"
        >
          <div className="relative w-full max-w-[10.5rem] justify-self-start sm:max-w-[11.5rem] md:max-w-[12.5rem] lg:max-w-[14rem] xl:max-w-[15.5rem] 2xl:max-w-[17rem]">
            <div
              className={`relative aspect-[2/3] w-full ${
                book.transparentImage ? 'bg-transparent' : ''
              }`}
            >
              <Image
                src={book.image}
                alt={book.alt}
                fill
                className="object-contain object-center transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 38vw, (max-width: 1024px) 42vw, 220px"
                priority={index === 0}
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center gap-1 sm:gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-600 sm:text-xs">
              {book.shortTitle}
            </span>
            <p className="text-sm font-bold leading-snug text-zinc-900 sm:text-[0.95rem] md:text-base lg:text-[1.05rem] lg:leading-snug">
              {book.title}
            </p>
            <p className="line-clamp-3 text-xs leading-relaxed text-zinc-600 sm:line-clamp-4 sm:text-sm sm:leading-relaxed lg:line-clamp-5">
              {book.body}
            </p>
            <p className="text-xs font-semibold text-violet-700 underline-offset-2 transition group-hover:text-violet-600 group-hover:underline sm:text-sm">
              {book.cta} →
            </p>
          </div>
        </a>
      ))}
    </motion.div>
  );
}
