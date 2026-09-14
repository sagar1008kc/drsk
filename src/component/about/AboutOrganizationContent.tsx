'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Cpu, HeartHandshake, type LucideIcon } from 'lucide-react';
import AboutTeamSection from '@/component/about/AboutTeamSection';
import HashScrollOnLoad from '@/component/home/HashScrollOnLoad';
import {
  badgeTeal,
  container,
  ctaPrimary,
  ctaSecondary,
  sectionDesc,
  sectionPad,
  sectionTitle,
} from '@/component/home/styles';

const WHY_POINTS = [
  'Businesses are asking how to use AI effectively.',
  'Professionals are trying to understand how their careers will change.',
  'Developers are learning an entirely new generation of systems.',
  'Families and communities are adapting to an increasingly digital world.',
  'And many people are experiencing information overload, uncertainty, stress, and pressure while trying to keep up.',
];

const BUILD_AREAS = [
  'AI agents',
  'Multi-agent workflows',
  'RAG',
  'Knowledge assistants',
  'Automation',
  'API integrations',
  'Web applications',
  'Digital platforms',
  'Production AI architecture',
] as const;

const MISSION_PILLARS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Cpu,
    title: 'Build',
    body: 'Create practical AI systems, intelligent workflows, digital products, applications, and technology solutions that solve real problems.',
  },
  {
    icon: BookOpen,
    title: 'Share',
    body: 'Publish AI resources, engineering knowledge, system-design guidance, books, educational material, and lessons learned from real-world development.',
  },
  {
    icon: HeartHandshake,
    title: 'Support',
    body: 'Promote responsible technology adoption, mental-health awareness, digital well-being, community education, and volunteer knowledge-sharing.',
  },
];

function SectionFrame({
  id,
  labelledBy,
  tone = 'white',
  children,
}: {
  id: string;
  labelledBy: string;
  tone?: 'white' | 'tint';
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-20 overflow-hidden border-b border-teal-200/50 ${
        tone === 'tint' ? 'bg-[#F8F7FF]' : 'bg-white'
      } ${sectionPad}`}
    >
      <div className={container}>{children}</div>
    </section>
  );
}

export default function AboutOrganizationContent() {
  return (
    <main className="min-h-screen bg-[#F8F7FF] text-zinc-900">
      <HashScrollOnLoad />
      <section
        aria-labelledby="about-heading"
        className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden border-b border-teal-200/60 bg-[#f7fffd] pt-[3.75rem]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-8%,rgba(13,148,136,0.16),transparent_58%),radial-gradient(circle_at_88%_82%,rgba(6,182,212,0.1),transparent_42%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(13,148,136,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.07) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-teal-700 sm:text-xs"
          >
            SK Creation
          </motion.p>
          <motion.h1
            id="about-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mt-5 font-display text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[1.08] tracking-tight text-zinc-900"
          >
            Technology With{' '}
            <span className="bg-gradient-to-r from-teal-700 via-cyan-700 to-emerald-700 bg-clip-text text-transparent">
              Purpose
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-zinc-600 sm:mt-8 sm:text-lg sm:leading-8"
          >
            <p>
              SK Creation is a mission-driven AI and digital innovation organization focused on
              building practical technology, sharing useful knowledge, and helping people navigate
              an increasingly AI-powered world.
            </p>
            <p>
              Our work sits at the intersection of{' '}
              <strong className="font-semibold text-zinc-900">
                technology, education, creativity, and human well-being
              </strong>
              .
            </p>
            <p>
              We believe technological progress becomes meaningful when people can understand it,
              use it responsibly, and benefit from it.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionFrame id="why" labelledBy="why-heading" tone="white">
        <div className="mx-auto max-w-3xl">
          <span className={badgeTeal}>Purpose</span>
          <h2 id="why-heading" className={`${sectionTitle} mt-3`}>
            Why SK Creation Exists
          </h2>
          <p className={sectionDesc}>
            Artificial intelligence is creating extraordinary opportunities, but it is also creating
            uncertainty.
          </p>
          <ul className="mt-8 space-y-3">
            {WHY_POINTS.map((point) => (
              <li
                key={point}
                className="rounded-xl border border-teal-200/70 bg-[#f8fffd] px-4 py-3 text-sm leading-relaxed text-zinc-700 sm:text-base"
              >
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-8">
            SK Creation was created to contribute to both sides of that transformation:{' '}
            <strong className="font-semibold text-zinc-900">
              building the technology and helping people understand the world developing around it.
            </strong>
          </p>
        </div>
      </SectionFrame>

      <SectionFrame id="mission" labelledBy="mission-heading" tone="tint">
        <div className="mx-auto max-w-3xl text-center">
          <span className={badgeTeal}>Mission</span>
          <h2 id="mission-heading" className={`${sectionTitle} mt-3`}>
            Our Mission
          </h2>
          <p className={sectionDesc}>
            Our mission is to make useful technology and practical knowledge more accessible. We
            work toward that mission through three commitments:
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3">
          {MISSION_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-teal-200/70 bg-white p-6 shadow-[0_8px_28px_rgba(13,148,136,0.06)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-500/10 text-teal-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-bold text-zinc-900">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{pillar.body}</p>
              </motion.article>
            );
          })}
        </div>
      </SectionFrame>

      <SectionFrame id="what-we-build" labelledBy="build-heading" tone="white">
        <div className="mx-auto max-w-3xl">
          <span className={badgeTeal}>Build</span>
          <h2 id="build-heading" className={`${sectionTitle} mt-3`}>
            What We Build
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-8">
            <p>
              SK Creation works across modern AI and software engineering, including AI agents,
              multi-agent workflows, retrieval-augmented generation, knowledge assistants,
              automation, API integrations, web applications, digital platforms, and production AI
              architecture.
            </p>
            <p>Our approach starts with the problem rather than the technology.</p>
            <p>
              The objective is always to identify where technology can create measurable value and
              then build the simplest reliable system capable of delivering it.
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {BUILD_AREAS.map((area) => (
              <li
                key={area}
                className="rounded-full border border-teal-200/80 bg-[#f8fffd] px-3 py-1.5 text-xs font-semibold text-teal-800"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </SectionFrame>

      <SectionFrame id="knowledge" labelledBy="knowledge-heading" tone="tint">
        <div className="mx-auto max-w-3xl">
          <span className={badgeTeal}>Share</span>
          <h2 id="knowledge-heading" className={`${sectionTitle} mt-3`}>
            Knowledge Should Be Shared
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-8">
            <p>SK Creation is also a learning and publishing platform.</p>
            <p>
              Through technical resources, articles, architecture examples, books, demonstrations,
              and open educational content, we aim to help people better understand artificial
              intelligence and digital technology.
            </p>
            <p>
              Some resources are designed for engineers building production AI systems. Others are
              designed for professionals, entrepreneurs, students, or people simply trying to
              understand how AI will affect their lives.
            </p>
            <p className="font-semibold text-zinc-900">The common goal is practical understanding.</p>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame id="mental-health" labelledBy="mental-health-heading" tone="white">
        <div className="mx-auto max-w-3xl">
          <span className={badgeTeal}>Support</span>
          <h2 id="mental-health-heading" className={`${sectionTitle} mt-3`}>
            Mental Health Awareness
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-8">
            <p>Technology changes how we work, communicate, learn, and live.</p>
            <p>
              For that reason, conversations about technological progress should also include
              conversations about human well-being.
            </p>
            <p>
              SK Creation shares educational resources related to stress awareness, resilience,
              emotional well-being, healthy technology use, and maintaining balance during periods
              of rapid change.
            </p>
          </div>
          <p className="mt-6 rounded-xl border border-teal-200/70 bg-[#f8fffd] px-4 py-3 text-sm leading-relaxed text-zinc-600">
            This work is focused on education and awareness. It is not a substitute for licensed
            mental-health treatment, diagnosis, therapy, or emergency care.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame id="community" labelledBy="community-heading" tone="tint">
        <div className="mx-auto max-w-3xl">
          <span className={badgeTeal}>Community</span>
          <h2 id="community-heading" className={`${sectionTitle} mt-3`}>
            Community &amp; Volunteer Work
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-8">
            <p>Knowledge creates more value when it is shared.</p>
            <p>
              As SK Creation grows, part of our mission is to contribute through selected volunteer
              and community initiatives.
            </p>
            <p>
              This may include AI awareness sessions, technology education, mentoring,
              responsible-AI discussions, technical guidance for community organizations,
              educational resources, and other knowledge-sharing activities.
            </p>
            <p>Commercial services allow us to build.</p>
            <p>Community contribution helps us share what we learn.</p>
            <p className="font-semibold text-zinc-900">Both are part of the same mission.</p>
          </div>
        </div>
      </SectionFrame>

      <AboutTeamSection />

      <section
        id="direction"
        aria-labelledby="direction-heading"
        className={`relative scroll-mt-20 overflow-hidden bg-white ${sectionPad}`}
      >
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center">
            <span className={badgeTeal}>Future</span>
            <h2 id="direction-heading" className={`${sectionTitle} mt-3`}>
              Our Direction
            </h2>
            <p className={`${sectionDesc} mt-5`}>
              SK Creation is being developed for the long term.
            </p>
            <p className={`${sectionDesc} mt-4`}>
              The vision is to grow it into a trusted organization where businesses can find
              practical AI expertise, professionals and developers can access useful technical
              knowledge, readers can discover meaningful books and resources, and communities can
              benefit from responsible technology education.
            </p>
            <p className="mt-6 text-lg font-semibold text-zinc-900 sm:text-xl">
              Practical AI. Useful knowledge. Human impact.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/services" className={ctaPrimary}>
                Explore Services
              </Link>
              <Link href="/resources" className={ctaSecondary}>
                Explore Resources
              </Link>
              <Link href="/contact" className={ctaSecondary}>
                Contact SK Creation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
