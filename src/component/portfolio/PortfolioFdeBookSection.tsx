'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FDE_BOOK } from '@/lib/featured-books';

const HIGHLIGHT_TOPICS = FDE_BOOK.topics?.slice(0, 8) ?? [];

export default function PortfolioFdeBookSection() {
  return (
    <section
      id="fde-book"
      aria-labelledby="fde-book-heading"
      className="relative -mt-[3.75rem] flex min-h-[100dvh] scroll-mt-24 flex-col justify-center overflow-hidden border-b border-teal-500/20 bg-[#050810] pt-[3.75rem]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_18%_50%,rgba(13,148,136,0.22),transparent_58%),radial-gradient(ellipse_50%_45%_at_88%_20%,rgba(45,212,191,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-teal-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 py-12 sm:px-8 sm:py-14 md:gap-14 md:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-12">
        <motion.a
          href={FDE_BOOK.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 28, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mx-auto flex w-full max-w-[22rem] items-center justify-center sm:max-w-[26rem] lg:max-w-none"
        >
          <div className="absolute inset-[8%] rounded-full bg-teal-400/25 blur-3xl transition group-hover:bg-teal-300/35" />
          <div className="absolute inset-[18%] rounded-[2rem] border border-teal-400/20 bg-gradient-to-b from-teal-400/10 to-transparent" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <Image
              src={FDE_BOOK.image}
              alt={FDE_BOOK.alt}
              width={720}
              height={960}
              className="relative h-auto w-full max-w-[20rem] object-contain drop-shadow-[0_28px_60px_rgba(13,148,136,0.35)] transition duration-500 group-hover:scale-[1.03] sm:max-w-[24rem] lg:max-w-[26rem]"
              sizes="(max-width: 1024px) 70vw, 420px"
              priority
            />
          </motion.div>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-center lg:text-left"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_0_18px_rgba(220,38,38,0.45)]">
              Hot
            </span>
            <span className="inline-flex items-center rounded-full border border-teal-400/40 bg-teal-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-200 sm:text-[11px]">
              New release
            </span>
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-teal-300 sm:text-base">
            Fundamentals &amp; system design
          </p>
          <h1
            id="fde-book-heading"
            className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.12]"
          >
            {FDE_BOOK.title}
          </h1>
          <p className="mt-4 text-lg font-semibold leading-snug text-teal-100 sm:text-xl">
            {FDE_BOOK.tagline}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base lg:max-w-none">
            {FDE_BOOK.body}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {HIGHLIGHT_TOPICS.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-200"
              >
                {topic}
              </span>
            ))}
          </div>

          <p className="mt-6 hidden text-xs font-medium leading-relaxed text-zinc-500 sm:block sm:text-sm">
            {FDE_BOOK.lifecycle?.join(' → ')}
          </p>

          <div className="mt-6 text-left">
            <p className="text-sm font-semibold text-zinc-200">
              Apply these concepts through 5 scenario-based system designs, including:
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {FDE_BOOK.scenarios?.map((scenario, index) => (
                <li
                  key={scenario}
                  className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-200"
                >
                  <span className="mt-0.5 font-mono text-[11px] font-bold text-teal-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-snug">{scenario}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 lg:max-w-none">
            {FDE_BOOK.audience}
          </p>

          <a
            href={FDE_BOOK.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#0d9488] px-7 py-3 text-sm font-bold text-white shadow-[0_0_32px_rgba(13,148,136,0.45)] transition hover:bg-teal-600"
          >
            {FDE_BOOK.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
