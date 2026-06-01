'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroFeaturedBooks from '@/component/home/HeroFeaturedBooks';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import { PROFILE_TAGS } from '@/lib/profile-tags';

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.06-1.06l5.5 5.25a.75.75 0 010 1.06l-5.5 5.25a.75.75 0 11-1.06-1.06l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M6.3 4.2a1 1 0 011.4.2l6.4 8a1 1 0 010 1.2l-6.4 8a1 1 0 01-1.6-1.2L11.67 10 6.1 5.4a1 1 0 01.2-1.4z" />
    </svg>
  );
}

const heroStars = [
  { top: '8%', left: '12%', size: 2, delay: 0 },
  { top: '18%', left: '78%', size: 1.5, delay: 0.4 },
  { top: '42%', left: '6%', size: 1, delay: 0.8 },
  { top: '55%', left: '88%', size: 2, delay: 0.2 },
  { top: '72%', left: '22%', size: 1.5, delay: 0.6 },
  { top: '85%', left: '65%', size: 1, delay: 1 },
  { top: '30%', left: '45%', size: 1, delay: 0.5 },
  { top: '62%', left: '52%', size: 1.5, delay: 0.3 },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden border-b border-violet-200/60 bg-gradient-to-br from-[#F8F7FF] via-white to-indigo-50/90 text-zinc-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.55]">
          <AiHeroDiagram theme="light" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(139,92,246,0.14),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_60%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="dot-pattern absolute inset-0 opacity-30" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8 xl:px-12">
        <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center lg:gap-8 xl:gap-10">
          {/* Left — books + copy (no cards) */}
          <div className="order-2 flex h-full min-h-0 w-full lg:order-1">
            <HeroFeaturedBooks />
          </div>

          {/* Right — copy & CTAs (full AI starry background, no inner card) */}
          <div className="relative order-1 flex h-full min-h-0 overflow-hidden lg:order-2">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_70%_30%,rgba(139,92,246,0.12),transparent_55%)]" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />
            {heroStars.map((star, i) => (
              <span
                key={i}
                className="drsk-hero-star pointer-events-none absolute rounded-full bg-violet-400/70 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  animationDelay: `${star.delay}s`,
                }}
                aria-hidden
              />
            ))}

            <div className="relative flex h-full min-h-full w-full flex-col justify-between gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:gap-10 lg:px-8 lg:py-10 xl:gap-12 xl:px-10 xl:py-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-[1.75rem] font-bold leading-[1.28] tracking-tight text-zinc-900 sm:text-4xl sm:leading-[1.26] md:text-[2.75rem] md:leading-[1.24] lg:text-[3rem] lg:leading-[1.22] xl:text-[3.25rem]"
              >
                AI, digital solutions, and{' '}
                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
                  mental health awareness
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8 md:text-xl md:leading-9"
              >
                AI-Native Full-Stack Engineering, 1:1 sessions, digital solutions, and wellness-oriented
                frameworks designed to improve performance, increase income potential, and support
                sustainable growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:gap-5 lg:pt-0"
              >
                <Link
                  href="/project"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] px-10 py-3.5 text-base font-semibold text-white shadow-[0_0_32px_rgba(139,92,246,0.45)] transition hover:brightness-110 sm:w-auto"
                >
                  Get started
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-violet-300 bg-white px-10 py-3.5 text-base font-semibold text-violet-800 transition hover:border-violet-400 hover:bg-violet-50 sm:w-auto"
                >
                  <PlayIcon className="h-5 w-5 text-violet-600" />
                  Book a session
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-auto shrink-0 border-t border-violet-200/60 pt-5 pb-3 sm:pt-6"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10">
            {PROFILE_TAGS.map((name) => (
              <span
                key={name}
                className="text-center text-xs font-semibold tracking-wide text-zinc-500 sm:text-left sm:text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
