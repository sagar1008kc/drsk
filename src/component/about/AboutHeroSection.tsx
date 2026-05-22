'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  PROFILE_HERO_BODY,
  PROFILE_HERO_BODY_SECOND,
  PROFILE_HERO_HEADLINE,
  PROFILE_HERO_RING,
} from '@/lib/profile-hero';
import { PROFILE_TAGS } from '@/lib/profile-tags';
import { badgeClass, container, gradientText } from '@/component/about/styles';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';

function HeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[min(360px,70vw)] flex-col items-center lg:mx-0 lg:max-w-[400px]">
      <div className="relative flex aspect-square w-full items-center justify-center">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-violet-400/25 blur-3xl" />
        <div className="pointer-events-none absolute inset-[6%] rounded-full border border-violet-300/60 bg-gradient-to-br from-violet-100/80 to-indigo-50/80" />
        <div className="relative z-10 h-[78%] w-[78%] overflow-hidden rounded-full border-2 border-violet-300/70 bg-white shadow-[0_12px_48px_rgba(139,92,246,0.3)] ring-4 ring-white/80">
          <Image
            src="/drsk.png"
            alt="Dr. SK"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 70vw, 400px"
          />
        </div>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <span
            key={i}
            className="pointer-events-none absolute h-2 w-2 rounded-full bg-violet-400/80 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
            style={{
              top: `${8 + (i % 4) * 22}%`,
              left: `${6 + Math.floor(i / 2) * 28}%`,
            }}
            aria-hidden
          />
        ))}
      </div>
      <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 sm:text-sm">
        {PROFILE_HERO_RING}
      </p>
    </div>
  );
}

export default function AboutHeroSection() {
  return (
    <section className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden border-b border-violet-200/60 bg-gradient-to-br from-[#F8F7FF] via-white to-indigo-50/90 pt-[3.75rem]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <AiHeroDiagram theme="light" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(139,92,246,0.14),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_60%,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-30" />

      <div
        className={`${container} relative flex w-full max-w-7xl flex-1 flex-col justify-center py-10 sm:py-12 lg:py-14`}
      >
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10"
          >
            <span className={badgeClass}>About Dr. SK</span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.2] tracking-tight text-zinc-900 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {PROFILE_HERO_HEADLINE.prefix}{' '}
              <span className={gradientText}>{PROFILE_HERO_HEADLINE.highlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg sm:leading-8">
              {PROFILE_HERO_BODY}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg sm:leading-8">
              {PROFILE_HERO_BODY_SECOND}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3 xl:flex-nowrap xl:gap-3">
              {PROFILE_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="shrink-0 whitespace-nowrap rounded-full border border-violet-200/90 bg-white/80 px-3.5 py-2 text-xs font-semibold text-violet-800 shadow-sm backdrop-blur-sm sm:px-4 lg:px-3 lg:text-[0.8125rem] xl:px-4 xl:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative z-10 flex items-center justify-center lg:justify-end"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
