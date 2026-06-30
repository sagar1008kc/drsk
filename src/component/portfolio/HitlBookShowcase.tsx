'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ShieldCheck,
  Target,
  type LucideIcon,
} from 'lucide-react';

type HitlSlide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  stats: { label: string; value: string }[];
};

const HITL_SLIDES: HitlSlide[] = [
  {
    id: 'slide-1',
    title: 'Action Approval Workflows',
    subtitle: 'Preventing Unintended Consequences',
    description:
      'Require explicit human authorization before AI agents execute high-stakes actions, such as modifying production databases, sending external communications, or transferring funds. This establishes a clear boundary between agent planning and autonomous execution.',
    icon: ShieldCheck,
    color: 'from-blue-500 to-indigo-600',
    stats: [
      { label: 'Risk Reduction', value: '99.9%' },
      { label: 'Approval Latency', value: '< 2s' },
    ],
  },
  {
    id: 'slide-2',
    title: 'Anomaly Detection & Handoff',
    subtitle: 'Graceful Degradation to Human Operators',
    description:
      'Continuously monitor agent reasoning traces and confidence scores. When the model encounters edge cases, hallucinates, or falls below a safety threshold, the workflow automatically pauses and alerts a human supervisor for intervention and course correction.',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    stats: [
      { label: 'False Positives', value: '< 5%' },
      { label: 'Handoff Success', value: '100%' },
    ],
  },
  {
    id: 'slide-3',
    title: 'Goal Misalignment Prevention',
    subtitle: 'Ensuring Intent Adherence',
    description:
      "Implement intermediate review checkpoints during long-running, multi-step agentic tasks. Human reviewers can inspect the agent's proposed plan and current trajectory to ensure it remains strictly aligned with the original user intent before proceeding.",
    icon: Target,
    color: 'from-emerald-500 to-teal-600',
    stats: [
      { label: 'Task Alignment', value: 'Verified' },
      { label: 'Drift Rate', value: '0%' },
    ],
  },
  {
    id: 'slide-4',
    title: 'Continuous Reinforcement Learning',
    subtitle: 'Improving from Human Feedback',
    description:
      'Every human intervention, correction, and approval is captured as valuable training data. This data is fed back into the system to fine-tune the underlying models (RLHF), progressively reducing the need for human intervention over time while increasing accuracy.',
    icon: RefreshCw,
    color: 'from-purple-500 to-pink-600',
    stats: [
      { label: 'Model Improvement', value: '+15% / mo' },
      { label: 'Intervention Drop', value: '-20% / task' },
    ],
  },
];

type HitlBookShowcaseProps = {
  className?: string;
};

export default function HitlBookShowcase({ className = '' }: HitlBookShowcaseProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const slide = HITL_SLIDES[currentPage];
  const SlideIcon = slide.icon;
  const atStart = currentPage === 0;
  const atEnd = currentPage === HITL_SLIDES.length - 1;

  const goToPage = useCallback((index: number) => {
    setCurrentPage(Math.max(0, Math.min(index, HITL_SLIDES.length - 1)));
  }, []);

  return (
    <div className={`flex min-h-0 flex-1 flex-col font-sans text-slate-100 ${className}`}>
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex h-[min(58vh,460px)] min-h-0 w-full flex-1 flex-col overflow-y-auto sm:h-full md:flex-row md:overflow-hidden"
          >
            <div
              className={`relative flex w-full shrink-0 flex-col items-center justify-center bg-gradient-to-br ${slide.color} p-6 sm:p-8 md:w-1/2 md:p-10`}
            >
              <div className="absolute inset-0 bg-slate-950/25" aria-hidden />
              <SlideIcon
                className="relative z-10 h-16 w-16 text-white sm:h-20 sm:w-20 md:h-24 md:w-24"
                strokeWidth={1.25}
                aria-hidden
              />
              <div className="relative z-10 mt-5 text-center sm:mt-6">
                <h3 className="text-lg font-bold text-white sm:text-xl md:text-2xl">{slide.title}</h3>
                <p className="mt-1 text-xs font-medium text-white/85 sm:text-sm">{slide.subtitle}</p>
              </div>
            </div>

            <div className="flex min-h-0 w-full flex-1 flex-col justify-between border-t border-slate-700/50 bg-slate-900/95 p-5 backdrop-blur-sm sm:p-6 md:w-1/2 md:border-l md:border-t-0 md:p-8">
              <div className="min-h-0 flex-1 overflow-y-auto">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">
                  Concept {currentPage + 1} / {HITL_SLIDES.length}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base">
                  {slide.description}
                </p>
              </div>

              <div className="mt-5 grid shrink-0 grid-cols-2 gap-3 border-t border-slate-700/80 pt-5 sm:mt-6 sm:gap-4 sm:pt-6">
                {slide.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[10px] uppercase text-slate-500 sm:text-xs">{stat.label}</p>
                    <p className="text-base font-bold text-white sm:text-lg">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-2 flex shrink-0 flex-col items-stretch gap-2 sm:mt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={atStart}
          className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[44px] sm:gap-2 sm:px-5 sm:text-sm"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
          Previous
        </button>

        <div className="flex items-center justify-center gap-2">
          {HITL_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goToPage(i)}
              aria-label={`Go to concept ${i + 1}`}
              aria-current={currentPage === i ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all ${
                currentPage === i ? 'w-6 bg-indigo-500' : 'w-2.5 bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={atEnd}
          className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[44px] sm:gap-2 sm:px-5 sm:text-sm"
        >
          Next
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
