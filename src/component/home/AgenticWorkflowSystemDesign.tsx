'use client';

import ParticleWaveBackground from '@/component/shared/ParticleWaveBackground';
import SystemDesignCtaLink from '@/component/shared/SystemDesignCtaLink';

export function AgenticWorkflowSystemDesign() {
  return (
    <section
      id="agentic-workflow-system-design"
      aria-labelledby="agentic-workflow-system-design-heading"
      className="relative flex min-h-screen scroll-mt-[3.75rem] flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 py-16 font-sans sm:px-8"
    >
      <ParticleWaveBackground variant="light-interactive" />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f8fafc_90%)] opacity-95" />

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center text-center">
        <div className="drsk-section-fade-in-up mb-[clamp(1.5rem,4vh,3rem)] inline-block opacity-0">
          <p className="rounded-full border border-teal-200 bg-teal-100/80 px-5 py-2 text-[clamp(0.7rem,1.5vw,1rem)] font-bold uppercase tracking-[0.25em] text-teal-700 shadow-sm backdrop-blur-sm">
            Featured AI System Design
          </p>
        </div>

        <h2
          id="agentic-workflow-system-design-heading"
          className="drsk-section-fade-in-up drsk-section-delay-100 mb-[clamp(1.5rem,4vh,2.5rem)] max-w-[1000px] bg-gradient-to-r from-slate-900 via-teal-800 to-blue-900 bg-clip-text px-2 text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.1] tracking-tight text-transparent opacity-0"
        >
          Enterprise Multi-Agent <br className="hidden md:block" /> AI System Design
        </h2>

        <p className="drsk-section-fade-in-up drsk-section-delay-200 mb-[clamp(2.5rem,6vh,4rem)] max-w-3xl px-4 text-[clamp(1rem,2.5vw,1.5rem)] font-medium leading-[1.6] text-slate-600 opacity-0">
          A production-ready design for web/mobile AI assistants using multi-agent orchestration, RAG,
          MCP tool execution, guardrails, human approval, observability, and evaluation.
        </p>

        <div className="drsk-section-fade-in-up drsk-section-delay-300 pointer-events-auto opacity-0">
          <SystemDesignCtaLink className="drsk-cta-shadow-glow group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-900 px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(0.75rem,2vw,1.25rem)] text-[clamp(1rem,2vw,1.125rem)] font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-slate-800" />
        </div>
      </div>
    </section>
  );
}
