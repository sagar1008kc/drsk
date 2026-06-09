'use client';

import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import PageHeroTitle from '@/component/shared/PageHeroTitle';
import { SERVICE_AREAS } from '@/lib/service-areas';

const accentRing: Record<string, string> = {
  violet: 'border-violet-200/80 bg-violet-50/70 text-violet-800',
  indigo: 'border-indigo-200/80 bg-indigo-50/70 text-indigo-800',
  emerald: 'border-emerald-200/80 bg-emerald-50/70 text-emerald-800',
  amber: 'border-amber-200/80 bg-amber-50/70 text-amber-900',
};

const accentDot: Record<string, string> = {
  violet: 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.45)]',
  indigo: 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.45)]',
  emerald: 'bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.45)]',
  amber: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.45)]',
};

export default function ServicesHeroSection() {
  return (
    <section className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden border-b border-violet-200/60 bg-gradient-to-br from-[#F8F7FF] via-white to-indigo-50/90 pt-[3.75rem] text-zinc-900">
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <AiHeroDiagram theme="light" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_30%,rgba(139,92,246,0.16),transparent_60%),radial-gradient(ellipse_50%_40%_at_8%_85%,rgba(52,211,153,0.1),transparent_50%),radial-gradient(ellipse_45%_40%_at_92%_80%,rgba(99,102,241,0.12),transparent_50%)]" />
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto w-full max-w-4xl text-center"
        >
          <div className="mt-5">
            <PageHeroTitle gradientClass="from-violet-600 via-indigo-600 to-emerald-600">
              Services
            </PageHeroTitle>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:mt-8 sm:text-lg">
            Four paths — virtual coaching, digital builds, group cohorts, and nonprofit support.
            Request a tailored quote for any service below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {SERVICE_AREAS.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 + i * 0.06 }}
                className={`flex flex-col items-center rounded-2xl border px-3 py-4 text-center shadow-sm backdrop-blur-sm sm:px-4 sm:py-5 ${accentRing[area.accent]}`}
              >
                <span className={`mb-2 h-2 w-2 rounded-full ${accentDot[area.accent]}`} aria-hidden />
                <Icon className="mb-2 h-5 w-5 opacity-80" aria-hidden />
                <p className="text-xs font-bold sm:text-sm">{area.title}</p>
                <p className="mt-1 text-[10px] leading-snug opacity-75 sm:text-[11px]">{area.eyebrow}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-violet-800 shadow-sm transition hover:border-violet-300 hover:bg-violet-50"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          Explore service cards
        </motion.a>
      </div>
    </section>
  );
}
