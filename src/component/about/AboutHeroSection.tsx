'use client';

import { motion } from 'framer-motion';
import {
  PROFILE_HERO_BODY,
  PROFILE_HERO_HEADLINE,
} from '@/lib/profile-hero';
import { PROFILE_TAGS } from '@/lib/profile-tags';
import { aboutPadX, badgeClass, container, gradientText } from '@/component/about/styles';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import ExpertProfileCard from '@/component/shared/ExpertProfileCard';
import ThreeParticleBackground from '@/component/shared/ThreeParticleBackground';

export default function AboutHeroSection() {
  return (
    <section className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden border-b border-violet-200/60 bg-gradient-to-br from-[#F8F7FF] via-white to-indigo-50/90 pt-[3.75rem]">
      <ThreeParticleBackground />
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <AiHeroDiagram theme="light" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(139,92,246,0.14),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_60%,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-30" />

      <div
        className={`${container} ${aboutPadX} relative flex w-full max-w-7xl flex-1 flex-col justify-center py-10 sm:py-12 lg:py-14`}
      >
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative z-10 flex items-center justify-center lg:justify-start"
          >
            <ExpertProfileCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10"
          >
            <span className={badgeClass}>About Dr. SK</span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.2] tracking-tight text-zinc-900 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              <span className={gradientText}>{PROFILE_HERO_HEADLINE.highlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg sm:leading-8">
              {PROFILE_HERO_BODY}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg sm:leading-8">
              <span className="mr-2 inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-violet-700">
                Strategic Leader
              </span>
              Strategic leader with a Doctorate in Business Administration, specializing in Information Systems and Enterprise Resource Management — with earlier leadership roles supervising 100+ schools in Nepal&apos;s education sector. Also an Author of practical AI and mental wellness books, and a Mental Health Advocate (MHFA-Certified), bringing clarity, resilience, and a human-centered perspective to high-performance teams.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 mt-auto w-full pt-6 sm:pt-8 lg:pt-10"
        >
          <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:gap-3 xl:flex-nowrap xl:justify-between xl:gap-2">
            {PROFILE_TAGS.map((tag) => (
              <span
                key={tag}
                className="max-w-full shrink-0 rounded-full border border-violet-200/90 bg-white/80 px-2.5 py-1.5 text-center text-[10px] font-semibold leading-snug text-violet-800 shadow-sm backdrop-blur-sm sm:px-3 sm:py-2 sm:text-[11px] lg:px-3 lg:py-1.5 lg:text-xs xl:flex-1 xl:whitespace-nowrap xl:px-2 xl:text-[11px] 2xl:px-3 2xl:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
