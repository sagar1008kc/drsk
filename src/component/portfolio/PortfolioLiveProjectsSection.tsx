'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '@/lib/projects';
import LiveProjectsGrid from '@/component/shared/LiveProjectsGrid';

export default function PortfolioLiveProjectsSection() {
  return (
    <section
      id="live-projects"
      aria-labelledby="live-projects-heading"
      className="relative scroll-mt-24 overflow-hidden border-b border-teal-500/20 bg-[#050810] py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(13,148,136,0.18),transparent_60%),radial-gradient(ellipse_50%_40%_at_100%_80%,rgba(20,184,166,0.08),transparent_55%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-teal-300 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" aria-hidden />
            Production builds
          </span>
          <h2
            id="live-projects-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            Live{' '}
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Production experiences across AI career navigation, investor data, and family
            learning — each with a direct link to explore.
          </p>
        </motion.div>

        <LiveProjectsGrid
          projects={FEATURED_PROJECTS}
          variant="dark"
          highlightLimit={4}
          className="mt-10 sm:mt-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-10 flex flex-col items-center gap-4 sm:mt-12"
        >
          <p className="max-w-lg text-center text-sm text-zinc-500">
            Blueprints, Streamlit apps, and interface concepts live on the full projects page.
          </p>
          <Link
            href="/project"
            className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-6 py-3 text-sm font-semibold text-teal-200 transition hover:border-teal-400/60 hover:bg-teal-500/20 hover:text-white"
          >
            Explore all builds
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
