'use client';

import { motion } from 'framer-motion';

const DASHBOARD_URL = 'https://www.pilotmycareer.com/dashboard';

const capabilities = [
  'Modern AI resources',
  'System design insights',
  'Resume-to-job matching',
  'Interview preparation',
  'LinkedIn improvement',
  'Wellness support',
  'Career readiness check · Free',
];

export default function PortfolioAiCareerHubSection() {
  return (
    <section
      id="ai-career-hub"
      aria-labelledby="ai-career-hub-heading"
      className="relative scroll-mt-24 overflow-hidden border-b border-teal-500/20 bg-[#050810] py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(13,148,136,0.2),transparent_60%),radial-gradient(ellipse_50%_40%_at_100%_80%,rgba(37,99,235,0.1),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(13,148,136,1) 1px,transparent 1px),linear-gradient(90deg,rgba(13,148,136,1) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-teal-300 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" aria-hidden />
            For professionals
          </span>
          <h2
            id="ai-career-hub-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            You are the pilot.{' '}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI is your copilot.
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            A free AI career hub for professionals — resume matching, interview prep, LinkedIn
            guidance, and wellness support to grow with clarity and confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-2.5"
        >
          {capabilities.map((item) => (
            <span
              key={item}
              className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-[11px] font-medium text-teal-200 sm:text-xs"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-col items-center gap-3 sm:mt-12"
        >
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300/50 hover:bg-teal-500/25 hover:shadow-[0_0_32px_-8px_rgba(13,148,136,0.55)] sm:px-8 sm:text-base"
          >
            Open PilotMyCareer Dashboard
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </a>
          <p className="text-xs text-zinc-500 sm:text-sm">www.pilotmycareer.com/dashboard</p>
        </motion.div>
      </div>
    </section>
  );
}
