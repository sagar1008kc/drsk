'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  Search,
  Edit3,
  Code2,
  Puzzle,
  TrendingUp,
  Rocket,
  Settings,
  RefreshCw,
  ArrowRight,
  Network,
} from 'lucide-react';
import MultiAgentChatbotSection from '@/component/home/MultiAgentChatbotSection';

type Layer = {
  id: number;
  title: string;
  icon: ReactNode;
  description: string;
};

const LAYERS: Layer[] = [
  {
    id: 1,
    title: 'Discover',
    icon: <Search className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    description: 'Customer discovery and mapping complex problem spaces into clear AI opportunities.',
  },
  {
    id: 2,
    title: 'Design',
    icon: <Edit3 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    description: 'Rapid prototyping and AI agent architecture with secure system boundaries.',
  },
  {
    id: 3,
    title: 'Build',
    icon: <Code2 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    description: 'Production-grade agents, RAG pipelines, and measurable MVP delivery.',
  },
  {
    id: 4,
    title: 'Integrate',
    icon: <Puzzle className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    description: 'Enterprise bridging — data pipelines, tools, and existing business systems.',
  },
  {
    id: 5,
    title: 'Evaluate',
    icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    description: 'Benchmarks, guardrails, safety tuning, and compliance-ready evaluation.',
  },
  {
    id: 6,
    title: 'Deploy',
    icon: <Rocket className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    description: 'Scalable cloud orchestration and production rollout.',
  },
  {
    id: 7,
    title: 'Operate',
    icon: <Settings className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    description: 'Monitoring, reliability, and day-to-day agent operations in production.',
  },
  {
    id: 8,
    title: 'Improve',
    icon: <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    description: 'Continuous learning loops, feedback, and iterative system improvement.',
  },
];

export default function HomeLandingHero() {
  const [hubOpen, setHubOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openHub = useCallback(() => {
    setHubOpen(true);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '#multi-agent-platform');
    }
  }, []);

  const closeHub = useCallback(() => {
    setHubOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#multi-agent-platform') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    if (window.location.hash === '#multi-agent-platform') setHubOpen(true);
    const onHash = () => {
      if (window.location.hash === '#multi-agent-platform') setHubOpen(true);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const activeLayer = LAYERS[activeIndex];

  return (
    <>
      <section
        aria-labelledby="home-landing-heading"
        className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden bg-[#030b18] pt-[3.75rem] text-white selection:bg-cyan-500 selection:text-black"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(6,182,212,0.16),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.04) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-10 lg:px-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400 sm:text-xs sm:tracking-[0.35em]">
            AI Forward Deployed Engineering
          </p>

          <h1
            id="home-landing-heading"
            className="mt-3 max-w-3xl text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-white sm:mt-4 sm:text-4xl sm:leading-[1.12] lg:text-5xl"
          >
            From complex business problems to{' '}
            <span className="text-cyan-400">production-ready AI.</span>
          </h1>

          <div className="relative my-8 sm:my-10">
            <div className="pointer-events-none absolute -inset-8 rounded-full border border-dashed border-cyan-500/20 sm:-inset-10" />
            <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl border-2 border-cyan-400 bg-gradient-to-br from-[#0a2342] to-[#040f1d] shadow-[0_0_50px_rgba(34,211,238,0.45)] sm:h-40 sm:w-40">
              <div className="absolute -top-2 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-2 w-1 rounded-t-sm bg-cyan-400/70" />
                ))}
              </div>
              <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-2 w-1 rounded-b-sm bg-cyan-400/70" />
                ))}
              </div>
              <div className="absolute -left-2 top-1/2 flex -translate-y-1/2 flex-col gap-1.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-1 w-2 rounded-l-sm bg-cyan-400/70" />
                ))}
              </div>
              <div className="absolute -right-2 top-1/2 flex -translate-y-1/2 flex-col gap-1.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-1 w-2 rounded-r-sm bg-cyan-400/70" />
                ))}
              </div>
              <p className="font-mono text-3xl font-extrabold tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] sm:text-4xl">
                AI
              </p>
              <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300 sm:text-xs">
                Agents
              </p>
            </div>
          </div>

          <div className="w-full">
            <div
              className="flex w-full items-center justify-between overflow-x-auto rounded-2xl border border-cyan-500/35 bg-[#06182c]/90 px-1.5 py-2 backdrop-blur-xl sm:rounded-full sm:px-3 sm:py-2.5"
              role="list"
              aria-label="Engineering sequence"
            >
              {LAYERS.map((layer, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div key={layer.id} className="flex min-w-0 flex-1 items-center" role="listitem">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onFocus={() => setActiveIndex(idx)}
                      onClick={() => setActiveIndex(idx)}
                      aria-pressed={isActive}
                      aria-controls="home-layer-detail"
                      className={`flex w-full flex-col items-center rounded-xl border px-1 py-2 transition-colors duration-150 sm:rounded-2xl sm:px-1.5 ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.35)]'
                          : 'border-transparent text-slate-400 hover:bg-cyan-950/40 hover:text-cyan-400'
                      }`}
                    >
                      <span className="mb-1">{layer.icon}</span>
                      <span
                        className={`font-mono text-[9px] tracking-wide sm:text-[11px] md:text-xs ${
                          isActive ? 'font-bold text-white' : 'font-medium'
                        }`}
                      >
                        {layer.title}
                      </span>
                    </button>
                    {idx < LAYERS.length - 1 ? (
                      <span
                        className="pointer-events-none hidden shrink-0 px-0.5 font-mono text-[10px] text-cyan-500/55 sm:inline md:px-1 md:text-xs"
                        aria-hidden
                      >
                        →
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div id="home-layer-detail" aria-live="polite" className="mx-auto mt-3 max-w-2xl text-left">
              <div className="rounded-2xl border border-cyan-500/30 bg-[#06182c]/70 p-3.5 backdrop-blur-md sm:p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                  {activeLayer.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200 sm:text-[15px]">
                  {activeLayer.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={openHub}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(34,211,238,0.45)] transition hover:bg-cyan-300 sm:w-auto"
            >
              <Network className="h-4 w-4" aria-hidden />
              Open Multi-Agent Hub
            </button>
            <Link
              href="/portfolio"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-[#06182c] px-6 py-3 text-xs font-bold uppercase tracking-wider text-cyan-300 transition hover:bg-cyan-950 sm:w-auto"
            >
              Portfolio
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <MultiAgentChatbotSection variant="modal" open={hubOpen} onClose={closeHub} />
    </>
  );
}
