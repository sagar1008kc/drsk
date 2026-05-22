'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import ProjectsHeroSection from '@/component/project/ProjectsHeroSection';
import FeaturedProjectCard from '@/component/project/FeaturedProjectCard';
import LiveProductShowcase from '@/component/project/LiveProductShowcase';
import ProjectScreensShowcase from '@/component/project/ProjectScreensShowcase';
import { sitePageMain } from '@/lib/site-theme';
import { FEATURED_PROJECTS, MORE_PROJECTS } from '@/lib/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sectionPad = 'px-5 sm:px-8 md:px-10 lg:px-12';

export default function ProjectsPageContent() {
  return (
    <main className={sitePageMain}>
      <ProjectsHeroSection />

      <section
        id="live-projects"
        className={`relative scroll-mt-20 overflow-hidden border-t border-violet-200/60 bg-white py-12 sm:py-16 lg:py-20 ${sectionPad}`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
          <AiHeroDiagram theme="light" />
        </div>
        <div className="dot-pattern pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.08),transparent_55%)]" />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-700">
              Live launches
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
              Product showcase
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
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
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800 sm:text-sm"
              >
                <span
                  className={`h-2 w-2 rounded-full ${p.accent === 'violet' ? 'bg-violet-500' : p.accent === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                />
                {p.domain}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`relative overflow-hidden border-t border-violet-200/60 bg-gradient-to-b from-violet-50/40 to-white py-12 sm:py-16 lg:py-20 ${sectionPad}`}
      >
        <div className="dot-pattern pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-800">
              More builds
            </span>
            <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl">
              Blueprints, apps &amp; interfaces
            </h2>
            <p className="mt-3 text-sm text-zinc-600 sm:text-base">
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

      <section className={`border-t border-violet-200/60 bg-white py-10 sm:py-12 ${sectionPad}`}>
        <div className="relative mx-auto max-w-6xl">
          <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-5 py-6 text-center shadow-sm sm:rounded-3xl sm:px-8 sm:py-8">
            <p className="text-sm font-medium text-zinc-800 sm:text-base">
              Want to go deeper on practical AI development workflows?
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Explore <span className="font-semibold text-zinc-900">AI Powered Software Engineer</span>{' '}
              for implementation strategies and hands-on guidance.
            </p>
            <a
              href="https://a.co/d/06z7LV25"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              View on Amazon
            </a>
          </div>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-violet-200 bg-white px-5 py-6 text-center shadow-sm">
            <p className="text-sm font-medium text-zinc-800">
              Want to level up AI skills or emotional balance?
            </p>
            <a
              href="https://www.amazon.com/author/drsk1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Read books on Amazon
            </a>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-600">
            Interested in something similar?{' '}
            <Link
              href="/services"
              className="font-semibold text-violet-700 hover:text-violet-600 hover:underline"
            >
              View services
            </Link>{' '}
            or{' '}
            <Link
              href="/#contact"
              className="font-semibold text-violet-700 hover:text-violet-600 hover:underline"
            >
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
