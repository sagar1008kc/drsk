'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HomeLandingHero from '@/component/home/HomeLandingHero';
import FeaturedProjectCard from '@/component/project/FeaturedProjectCard';
import LiveProductShowcase from '@/component/project/LiveProductShowcase';
import ProjectScreensShowcase from '@/component/project/ProjectScreensShowcase';
import { sitePageMain } from '@/lib/site-theme';
import { MORE_PROJECTS } from '@/lib/projects';
import { GITHUB_REPO_LINKS } from '@/lib/github-repos';
import {
  badgeClass,
  container,
  glowBgLight,
  sectionBorder,
  sectionDesc,
  sectionPad,
  sectionTitle,
} from '@/component/home/styles';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function safeExternalHref(href: string) {
  try {
    const url = new URL(href);
    if (url.protocol === 'https:' || url.protocol === 'http:') return href;
  } catch {
    /* ignore */
  }
  return '#';
}

function ProjectSection({
  children,
  altBg = false,
  id,
  className = '',
}: {
  children: ReactNode;
  altBg?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden scroll-mt-24 ${sectionBorder} ${sectionPad} ${
        altBg ? 'bg-white/70' : ''
      } ${className}`}
    >
      <div className={glowBgLight} aria-hidden />
      <div className={`${container} relative`}>{children}</div>
    </section>
  );
}

export default function ProjectsPageContent() {
  return (
    <main className={sitePageMain}>
      <HomeLandingHero />

      <ProjectSection id="live-projects">
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Live launches</span>
          <h2 className={`${sectionTitle} mt-3`}>Product showcase</h2>
          <p className={sectionDesc}>
            Production experiences across AI career navigation, investor data, and family learning —
            each with a direct link to explore.
          </p>
        </div>
        <LiveProductShowcase />
      </ProjectSection>

      <ProjectSection altBg>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <span className={badgeClass}>More builds</span>
          <h2 className={`${sectionTitle} mt-3`}>Blueprints, apps &amp; interfaces</h2>
          <p className={sectionDesc}>
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
      </ProjectSection>

      <ProjectSection id="github-repos">
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Source code</span>
          <h2 className={`${sectionTitle} mt-3`}>GitHub</h2>
          <p className={sectionDesc}>
            Open repositories for production AI systems, backends, and learning platforms.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {GITHUB_REPO_LINKS.map((item, i) => (
            <motion.a
              key={item.href}
              href={safeExternalHref(item.href)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-[0_12px_36px_rgba(13,148,136,0.12)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 text-lg text-white shadow-sm">
                  {'</>'}
                </div>
                <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  GitHub
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  <h3 className="truncate font-mono text-sm font-semibold text-zinc-900">
                    {item.label}
                  </h3>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.note}</p>
              </div>
              <span className="absolute bottom-4 right-4 text-lg opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection altBg id="platforms-commerce-ui">
        <ProjectScreensShowcase />
      </ProjectSection>

      <ProjectSection altBg className="!py-10 sm:!py-12">
        <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-5 py-6 text-center shadow-sm sm:rounded-3xl sm:px-8 sm:py-8">
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
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0d9488] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            View on Amazon
          </a>
        </div>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-teal-200/80 bg-white px-5 py-6 text-center shadow-sm">
          <p className="text-sm font-medium text-zinc-800">
            Want to level up AI skills or emotional balance?
          </p>
          <a
            href="https://www.amazon.com/author/drsk1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0d9488] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Read books on Amazon
          </a>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600">
          Interested in something similar?{' '}
          <Link
            href="/services"
            className="font-semibold text-teal-700 hover:text-teal-600 hover:underline"
          >
            View services
          </Link>{' '}
          or{' '}
          <Link
            href="/contact"
            className="font-semibold text-teal-700 hover:text-teal-600 hover:underline"
          >
            get in touch
          </Link>
          .
        </p>
      </ProjectSection>
    </main>
  );
}
