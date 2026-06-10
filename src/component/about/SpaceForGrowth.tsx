'use client';

import ParticleWaveBackground from '@/component/shared/ParticleWaveBackground';

export default function SpaceForGrowth() {
  return (
    <section
      id="space-for-growth"
      aria-labelledby="space-for-growth-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0c] px-4 py-12 font-sans sm:px-8"
    >
      <ParticleWaveBackground variant="monochrome" />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0c_85%)] opacity-90" />

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center text-center">
        <p className="drsk-section-fade-in-up drsk-glow-subtitle mb-[clamp(1.5rem,4vh,3rem)] text-[clamp(0.6rem,1.5vw,1rem)] font-bold uppercase tracking-[0.2em] text-gray-300 opacity-0">
          Feeling stuck or not getting what you deserve?
        </p>

        <div className="drsk-section-fade-in-up drsk-section-delay-100 mb-[clamp(3rem,8vh,6rem)] flex flex-col gap-[clamp(0.5rem,1.5vh,1rem)] px-2 opacity-0">
          <h2
            id="space-for-growth-heading"
            className="text-[clamp(1.75rem,5vw,4.5rem)] font-medium leading-[1.1] tracking-tight text-white"
          >
            Your next opportunity should do <br className="hidden md:block" />
            <span className="text-gray-300">more than open a door—</span>
          </h2>
          <p className="text-[clamp(1.25rem,4vw,3.5rem)] font-medium text-gray-400">
            it should create space for
          </p>
        </div>

        <div className="drsk-section-fade-in-up drsk-section-delay-300 flex flex-wrap items-center justify-center gap-x-[clamp(1rem,3vw,2.5rem)] gap-y-[clamp(1rem,2vh,1.5rem)] text-[clamp(1rem,3vw,2.25rem)] font-bold tracking-widest opacity-0">
          <span className="drsk-glow-white cursor-default text-white transition-transform hover:scale-105">
            GROWTH
          </span>

          <span className="hidden text-gray-600 sm:inline-block">•</span>

          <span className="drsk-glow-gray-light cursor-default text-gray-200 transition-transform hover:scale-105">
            CONFIDENCE
          </span>

          <span className="hidden text-gray-600 lg:inline-block">•</span>

          <span className="drsk-glow-gray-med cursor-default text-gray-300 transition-transform hover:scale-105">
            PURPOSE
          </span>

          <span className="hidden text-gray-600 sm:inline-block lg:inline-block">•</span>

          <span className="drsk-glow-gray-dark cursor-default text-gray-400 transition-transform hover:scale-105">
            IMPACT
          </span>
        </div>
      </div>
    </section>
  );
}
