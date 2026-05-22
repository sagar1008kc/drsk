'use client';

import { motion } from 'framer-motion';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import PageHeroTitle from '@/component/shared/PageHeroTitle';

const pillars = [
  {
    id: 'agentic-ai',
    label: 'Agentic AI',
    hint: 'Assistants · automation · integration',
    ring: 'border-violet-200 bg-violet-50/80 text-violet-800',
    dot: 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]',
  },
  {
    id: 'digital',
    label: 'Digital solutions',
    hint: 'Web · apps · cloud · support',
    ring: 'border-indigo-200 bg-indigo-50/80 text-indigo-800',
    dot: 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]',
  },
  {
    id: 'wellness',
    label: 'Mental health',
    hint: 'Awareness · sessions · resilience',
    ring: 'border-emerald-200 bg-emerald-50/80 text-emerald-800',
    dot: 'bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.4)]',
  },
] as const;

export default function ServicesHeroSection() {
  return (
    <section className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden border-b border-violet-200/60 bg-gradient-to-br from-[#F8F7FF] via-white to-indigo-50/90 pt-[3.75rem] text-zinc-900">
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <AiHeroDiagram theme="light" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(139,92,246,0.14),transparent_60%),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(52,211,153,0.08),transparent_50%),radial-gradient(ellipse_45%_40%_at_90%_75%,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto w-full max-w-4xl text-center"
        >
          <PageHeroTitle gradientClass="from-violet-600 via-indigo-600 to-emerald-600">
            Services
          </PageHeroTitle>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:mt-8 sm:text-lg">
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
                  className="pointer-events-none absolute -left-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-violet-300 to-indigo-300 sm:block sm:-left-3 sm:w-6"
                  aria-hidden
                />
              ) : null}
              <div
                className={`flex w-full flex-col items-center rounded-2xl border px-4 py-4 text-center shadow-sm backdrop-blur-sm sm:py-5 ${pillar.ring}`}
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
