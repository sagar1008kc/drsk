'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MultiAgentChatbotSection from '@/component/home/MultiAgentChatbotSection';

export default function HomeMissionHero() {
  const [hubOpen, setHubOpen] = useState(false);

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

  return (
    <>
      <section
        id="mission"
        aria-labelledby="home-mission-heading"
        className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden bg-[#031614] pt-[3.75rem] text-white selection:bg-teal-400 selection:text-black"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(13,148,136,0.2),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(45,212,191,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(45,212,191,0.045) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-3 py-6 text-center sm:px-6 sm:py-10 lg:px-8">
          <h1
            id="home-mission-heading"
            className="max-w-4xl text-[1.55rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl sm:leading-[1.12] lg:text-5xl"
          >
            Build practical AI. Share useful knowledge.{' '}
            <span className="text-teal-400">Create human impact.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
            SK Creation is built around three things: practical resources, AI agent integration, and
            mental-health awareness — so people can understand the shift, use AI in real work, and
            stay human through it.
          </p>

          <div className="relative my-8 sm:my-10">
            <div className="pointer-events-none absolute -inset-8 rounded-full border border-dashed border-teal-500/25 sm:-inset-10" />
            <button
              type="button"
              onClick={openHub}
              aria-label="Open SK Agent"
              className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl border-2 border-teal-400 bg-gradient-to-br from-[#0a3a34] to-[#041816] shadow-[0_0_50px_rgba(45,212,191,0.42)] transition hover:border-teal-300 hover:shadow-[0_0_60px_rgba(45,212,191,0.55)] sm:h-40 sm:w-40"
            >
              <div className="absolute -top-2 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-2 w-1 rounded-t-sm bg-teal-400/70" />
                ))}
              </div>
              <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-2 w-1 rounded-b-sm bg-teal-400/70" />
                ))}
              </div>
              <div className="absolute -left-2 top-1/2 flex -translate-y-1/2 flex-col gap-1.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-1 w-2 rounded-l-sm bg-teal-400/70" />
                ))}
              </div>
              <div className="absolute -right-2 top-1/2 flex -translate-y-1/2 flex-col gap-1.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-1 w-2 rounded-r-sm bg-teal-400/70" />
                ))}
              </div>
              <p className="font-mono text-3xl font-extrabold tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] sm:text-4xl">
                SK
              </p>
              <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-teal-300 sm:text-xs">
                Agent
              </p>
            </button>
          </div>

          <div className="mt-2 flex w-full flex-col gap-3 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Link
              href="/resources"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(45,212,191,0.45)] transition hover:bg-teal-300 sm:w-auto"
            >
              Explore Resources
            </Link>
            <Link
              href="/services#ai-integration"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-teal-500/40 bg-[#062623] px-6 py-3 text-xs font-bold uppercase tracking-wider text-teal-300 transition hover:bg-teal-950 sm:w-auto"
            >
              AI Agent Integration
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/resources/wellness-education"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-teal-500/40 bg-[#062623] px-6 py-3 text-xs font-bold uppercase tracking-wider text-teal-300 transition hover:bg-teal-950 sm:w-auto"
            >
              Mental Health Awareness
            </Link>
          </div>
        </div>
      </section>

      <MultiAgentChatbotSection variant="modal" open={hubOpen} onClose={closeHub} />
    </>
  );
}
