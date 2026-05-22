'use client';

import { motion } from 'framer-motion';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';

const pillars = [
  {
    id: 'agentic-ai',
    label: 'Agentic AI',
    hint: 'Assistants · automation · integration',
    ring: 'border-violet-400/40 bg-violet-500/15 text-violet-200',
    dot: 'bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]',
  },
  {
    id: 'digital',
    label: 'Digital solutions',
    hint: 'Web · apps · cloud · support',
    ring: 'border-indigo-400/40 bg-indigo-500/15 text-indigo-200',
    dot: 'bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.6)]',
  },
  {
    id: 'wellness',
    label: 'Mental health',
    hint: 'Awareness · sessions · resilience',
    ring: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200',
    dot: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]',
  },
] as const;

export default function ServicesHeroSection() {
  return (
    <section className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden border-b border-white/10 bg-[#020205] pt-[3.75rem] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <AiHeroDiagram theme="dark" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(139,92,246,0.22),transparent_60%),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(52,211,153,0.12),transparent_50%),radial-gradient(ellipse_45%_40%_at_90%_75%,rgba(99,102,241,0.14),transparent_50%)]" />
      <div className="dot-pattern-dark pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Agentic AI integration, digital solutions, and mental health awareness — book
            sessions, request project work, or explore cohort and community options.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mx-auto mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {pillars.map((pillar, i) => (
            <div key={pillar.id} className="relative flex flex-col items-center">
              {i > 0 ? (
                <span
                  className="pointer-events-none absolute -left-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-violet-500/50 to-indigo-500/50 sm:block sm:-left-3 sm:w-6"
                  aria-hidden
                />
              ) : null}
              <div
                className={`flex w-full flex-col items-center rounded-2xl border px-4 py-4 text-center backdrop-blur-sm sm:py-5 ${pillar.ring}`}
              >
                <span className={`mb-2 h-2.5 w-2.5 rounded-full ${pillar.dot}`} aria-hidden />
                <p className="text-sm font-bold sm:text-base">{pillar.label}</p>
                <p className="mt-1 text-[11px] leading-snug opacity-80 sm:text-xs">{pillar.hint}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs text-zinc-500">
          Scroll for booking options and pricing
        </p>
      </div>
    </section>
  );
}
