'use client';

import { motion } from 'framer-motion';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import { PROJECT_HERO_STATS } from '@/lib/projects';

export default function ProjectsHeroSection() {
  return (
    <section className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden border-b border-white/10 bg-[#020205] pt-[3.75rem] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <AiHeroDiagram theme="dark" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_30%,rgba(139,92,246,0.24),transparent_58%),radial-gradient(ellipse_50%_45%_at_8%_85%,rgba(34,211,238,0.1),transparent_50%),radial-gradient(ellipse_45%_40%_at_92%_70%,rgba(244,114,182,0.12),transparent_50%)]" />
      <div className="dot-pattern-dark pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-rose-300 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Agentic AI products, career copilots, data platforms, and digital experiences — built
            for clarity, performance, and real-world outcomes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-10 grid w-full max-w-3xl grid-cols-3 gap-3 sm:gap-4"
        >
          {PROJECT_HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-sm sm:px-4 sm:py-5"
            >
              <p className="text-lg font-bold text-violet-200 sm:text-xl">{stat.value}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs text-zinc-500">
          Scroll for live launches and build highlights
        </p>
      </div>
    </section>
  );
}
