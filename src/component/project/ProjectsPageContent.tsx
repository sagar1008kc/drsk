'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import ProjectsHeroSection from '@/component/project/ProjectsHeroSection';
import FeaturedProjectCard from '@/component/project/FeaturedProjectCard';
import LiveProductShowcase from '@/component/project/LiveProductShowcase';
import ProjectScreensShowcase from '@/component/project/ProjectScreensShowcase';
import {
  FEATURED_PROJECTS,
  MORE_PROJECTS,
} from '@/lib/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsPageContent() {
  return (
    <main className="min-h-screen bg-[#020205] text-zinc-100">
      <ProjectsHeroSection />

      <section
        id="live-projects"
        className="relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-[#0a0a0f] py-12 sm:py-16 lg:py-20"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
          <AiHeroDiagram theme="dark" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.12),transparent_55%)]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-200">
              Live launches
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Product showcase
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Production experiences across AI career navigation, investor data, and family
              learning — each with a direct link to explore.
            </p>
          </motion.div>

          <LiveProductShowcase />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
            {FEATURED_PROJECTS.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white sm:text-sm"
              >
                <span className={`h-2 w-2 rounded-full ${p.accent === 'violet' ? 'bg-violet-400' : p.accent === 'emerald' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                {p.domain}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-zinc-950/80 py-12 sm:py-16 lg:py-20">
        <div className="dot-pattern-dark pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-200">
              More builds
            </span>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Blueprints, apps &amp; interfaces
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              AI strategy POCs, Streamlit tools, and UI concepts from client and internal work.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2"
          >
            {MORE_PROJECTS.map((project, i) => (
              <FeaturedProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>

          <ProjectScreensShowcase />
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#020205] py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/50 via-zinc-900/80 to-zinc-950 px-5 py-6 text-center sm:rounded-3xl sm:px-8 sm:py-8">
            <p className="text-sm font-medium text-zinc-200 sm:text-base">
              Want to go deeper on practical AI development workflows?
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Explore <span className="font-semibold text-white">AI Powered Software Engineer</span>{' '}
              for implementation strategies and hands-on guidance.
            </p>
            <a
              href="https://a.co/d/06z7LV25"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full border border-violet-400/50 bg-gradient-to-b from-violet-400 to-violet-600 px-6 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              View on Amazon
            </a>
          </div>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-zinc-900/50 px-5 py-6 text-center">
            <p className="text-sm font-medium text-zinc-200">Want to level up AI skills or emotional balance?</p>
            <a
              href="https://www.amazon.com/author/drsk1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Read books on Amazon
            </a>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Interested in something similar?{' '}
            <Link href="/services" className="font-semibold text-violet-300 hover:text-violet-200 hover:underline">
              View services
            </Link>{' '}
            or{' '}
            <Link href="/#contact" className="font-semibold text-violet-300 hover:text-violet-200 hover:underline">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
