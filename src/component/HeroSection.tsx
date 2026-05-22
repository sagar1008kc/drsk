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
    <section className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden border-b border-white/5 bg-[#020205] pt-[3.75rem] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.5]">
          <AiHeroDiagram theme="dark" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(139,92,246,0.18),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_60%,rgba(99,102,241,0.12),transparent_50%),radial-gradient(ellipse_70%_50%_at_75%_40%,rgba(139,92,246,0.2),transparent_55%)]" />
        <div className="dot-pattern-dark absolute inset-0 opacity-25" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {/* Left — books */}
          <div className="order-2 flex h-full min-h-0 lg:order-1 lg:pr-2">
            <HeroFeaturedBooks />
          </div>

          {/* Right — copy & CTAs (full AI starry background, no inner card) */}
          <div className="relative order-1 flex h-full min-h-[min(420px,50vh)] overflow-hidden lg:order-2 lg:min-h-0">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_70%_30%,rgba(139,92,246,0.22),transparent_55%),linear-gradient(145deg,rgba(76,29,149,0.1)_0%,transparent_45%)]" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
            {heroStars.map((star, i) => (
              <span
                key={i}
                className="drsk-hero-star pointer-events-none absolute rounded-full bg-violet-200/80 shadow-[0_0_8px_rgba(196,181,253,0.9)]"
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

            <div className="relative flex h-full min-h-full w-full flex-col justify-between gap-10 px-6 py-10 sm:gap-12 sm:px-10 sm:py-12 lg:gap-14 lg:px-12 lg:py-14 xl:gap-16 xl:px-14 xl:py-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-[1.75rem] font-bold leading-[1.28] tracking-tight sm:text-4xl sm:leading-[1.26] md:text-[2.75rem] md:leading-[1.24] lg:text-[3rem] lg:leading-[1.22] xl:text-[3.25rem]"
              >
                AI, digital solutions, and{' '}
                <span className="bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#6366f1] bg-clip-text text-transparent">
                  mental health awareness
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8 md:text-xl md:leading-9"
              >
                Practical AI integration, 1:1 sessions, digital solutions, and wellness-oriented
                frameworks designed to improve performance, increase income potential, and support
                sustainable growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="flex flex-wrap gap-3 sm:gap-4 xl:flex-nowrap xl:gap-3"
              >
                {PROFILE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="shrink-0 whitespace-nowrap rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-violet-100 sm:px-5 sm:py-3 sm:text-sm lg:px-3.5 lg:text-[0.7rem] xl:px-4 xl:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.26 }}
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
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-10 py-3.5 text-base font-semibold text-white transition hover:border-violet-400/50 hover:bg-violet-500/20 sm:w-auto"
                >
                  <PlayIcon className="h-5 w-5 text-violet-300" />
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
          className="mt-auto shrink-0 border-t border-white/10 pt-5 pb-3 sm:pt-6"
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
