'use client';

import ParticleWaveBackground from '@/component/shared/ParticleWaveBackground';
import SystemDesignCtaLink from '@/component/shared/SystemDesignCtaLink';

export default function PortfolioFeaturedSystemDesignHero() {
  return (
    <section
      id="featured-ai-system-design"
      aria-labelledby="featured-ai-system-design-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050508] px-4 py-16 font-sans sm:px-8"
    >
      <ParticleWaveBackground variant="colorful" />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050508_90%)] opacity-95" />

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center text-center">
        <div className="drsk-section-fade-in-up mb-[clamp(1.5rem,4vh,3rem)] inline-block opacity-0">
          <p className="drsk-glow-cyan rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-[clamp(0.7rem,1.5vw,1rem)] font-bold uppercase tracking-[0.25em] text-cyan-400 backdrop-blur-sm">
            Featured AI System Design
          </p>
        </div>

        <h2
          id="featured-ai-system-design-heading"
          className="drsk-section-fade-in-up drsk-section-delay-100 mb-[clamp(1.5rem,4vh,2.5rem)] max-w-[1000px] bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text px-2 text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.1] tracking-tight text-transparent opacity-0"
        >
          Enterprise Multi-Agent <br className="hidden md:block" /> AI System Design
        </h2>

        <p className="drsk-section-fade-in-up drsk-section-delay-200 mb-[clamp(2.5rem,6vh,4rem)] max-w-3xl px-4 text-[clamp(1rem,2.5vw,1.5rem)] font-medium leading-[1.6] text-gray-300 opacity-0">
          A production-ready design for web/mobile AI assistants using multi-agent orchestration, RAG,
          MCP tool execution, guardrails, human approval, observability, and evaluation.
        </p>

        <div className="drsk-section-fade-in-up drsk-section-delay-300 opacity-0">
          <SystemDesignCtaLink
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(0.75rem,2vw,1.25rem)] text-[clamp(1rem,2vw,1.125rem)] font-semibold text-white backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]"
            shimmerClassName="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-cyan-500/0 via-purple-500/10 to-blue-500/0 transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]"
          />
        </div>
      </div>
    </section>
  );
}
