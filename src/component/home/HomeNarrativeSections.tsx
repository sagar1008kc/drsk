'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Bot,
  Compass,
  HeartHandshake,
  Layers,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { FEATURED_BOOKS, FDE_BOOK } from '@/lib/featured-books';
import { FEATURED_PROJECTS } from '@/lib/projects';
import { HOME_RESOURCE_TOPICS } from '@/lib/resources';
import { badgeTeal, container, ctaPrimary, ctaSecondary, sectionDesc, sectionPad, sectionTitle } from './styles';

const otherBooks = FEATURED_BOOKS.filter((book) => book.id !== 'fde');

function SectionHeader({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className={badgeTeal}>{eyebrow}</span>
      <h2 id={id} className={`${sectionTitle} mt-3`}>
        {title}
      </h2>
      {description ? <p className={`${sectionDesc} mx-auto max-w-2xl`}>{description}</p> : null}
    </div>
  );
}

function CtaRow({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
      {children}
    </div>
  );
}

const PILLARS: Array<{
  icon: LucideIcon;
  number: string;
  title: string;
  headline: string;
  body: string[];
  note?: string;
  href: string;
  cta: string;
}> = [
  {
    icon: BookOpen,
    number: '01',
    title: 'Resources',
    headline: 'Useful knowledge should be easy to find — and actually usable.',
    body: [
      'SK Creation publishes practical AI resources so people do not have to sort through endless noise to understand what is changing.',
      'That includes agentic system design, RAG and retrieval, LLM patterns, tools, operations, live builds, and books written from real production work — for engineers, professionals, students, and anyone preparing for an AI-driven future.',
      'The goal is practical understanding: what to build, how it works, and why it matters in the real world.',
    ],
    href: '/resources',
    cta: 'Explore Resources',
  },
  {
    icon: Bot,
    number: '02',
    title: 'AI Agent Integration',
    headline: 'AI that connects to real work — not another unused chatbot.',
    body: [
      'SK Creation designs and integrates AI agents into the systems people already use: websites, knowledge bases, APIs, documents, booking flows, CRMs, and day-to-day operations.',
      'We start with the problem. Then we build the simplest reliable agent, RAG pipeline, or tool-connected workflow that can retrieve the right information, take the next step, and stay inside clear guardrails.',
      'This is how SK Creation helps businesses and teams use AI with measurable value — automation, better decisions, and work that actually gets finished.',
    ],
    href: '/services#ai-integration',
    cta: 'Discuss an AI integration',
  },
  {
    icon: HeartHandshake,
    number: '03',
    title: 'Mental Health Awareness',
    headline: 'Technology should strengthen people, not overwhelm them.',
    body: [
      'AI is changing how we work, learn, and live. That shift can bring opportunity — and also pressure, uncertainty, and information overload.',
      'SK Creation treats mental-health awareness as part of the same mission: educational resources, wellness books, and MHFA-informed sessions on stress, resilience, emotional balance, and healthy technology use.',
      'We help people stay clear and human while the tools around them move faster.',
    ],
    note: 'This work is education and awareness. It is not therapy, diagnosis, or emergency care.',
    href: '/services#wellness-education',
    cta: 'Explore wellness awareness',
  },
];

export function HomePillarsSection() {
  return (
    <section
      id="what-sk-creation-is"
      aria-labelledby="pillars-heading"
      className={`relative scroll-mt-20 overflow-hidden border-b border-teal-200/50 bg-white ${sectionPad}`}
    >
      <div className={container}>
        <SectionHeader
          id="pillars-heading"
          eyebrow="What SK Creation is"
          title="Three ways we create value"
          description="SK Creation exists to help people understand AI, put it to work, and stay well through the change — not as three separate brands, but as one mission."
        />

        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex h-full flex-col rounded-2xl border border-teal-200/70 bg-[#f8fffd] p-6 shadow-[0_8px_28px_rgba(13,148,136,0.06)] sm:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-500/10 text-teal-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-[0.18em] text-teal-700/80">
                    {pillar.number}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-zinc-900 sm:text-2xl">{pillar.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-teal-800">
                  {pillar.headline}
                </p>
                <div className="mt-4 flex-1 space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-[0.95rem] sm:leading-7">
                  {pillar.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {pillar.note ? (
                  <p className="mt-4 text-xs leading-relaxed text-zinc-500">{pillar.note}</p>
                ) : null}
                <Link href={pillar.href} className={`mt-6 ${ctaPrimary}`}>
                  {pillar.cta}
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomeNarrativeSections() {
  return (
    <>

      <section
        id="knowledge"
        aria-labelledby="knowledge-heading"
        className={`relative scroll-mt-20 overflow-hidden border-b border-teal-200/50 bg-white ${sectionPad}`}
      >
        <div className={container}>
          <SectionHeader
            id="knowledge-heading"
            eyebrow="Resources"
            title="Knowledge for the AI Era"
            description="Technology is changing quickly. Understanding it should not require navigating endless noise."
          />

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-zinc-600 sm:text-base">
            SK Creation develops practical resources covering AI engineering, agentic systems, RAG,
            system design, digital transformation, career readiness, responsible AI adoption, and the
            human side of technological change. We also publish books and awareness resources focused
            on maintaining clarity, resilience, and healthy balance in an increasingly digital world.
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_RESOURCE_TOPICS.map((topic, index) => (
              <motion.div
                key={topic.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <Link
                  href={topic.href}
                  className="flex min-h-[52px] items-center justify-between rounded-xl border border-teal-200/70 bg-[#f8fffd] px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:border-teal-400 hover:bg-teal-50"
                >
                  {topic.title}
                  <span className="text-teal-700" aria-hidden>
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="mt-10 grid items-center gap-6 rounded-2xl border border-teal-200/70 bg-[#f8fffd] p-5 sm:p-7 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]"
          >
            <a
              href={FDE_BOOK.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto w-full max-w-[14rem]"
            >
              <Image
                src={FDE_BOOK.image}
                alt={FDE_BOOK.alt}
                width={560}
                height={700}
                className="h-auto w-full rounded-xl object-contain shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
              />
            </a>
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  Hot
                </span>
                <span className="inline-flex items-center rounded-full border border-teal-300 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  Featured book
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-zinc-900 sm:text-2xl">{FDE_BOOK.title}</h3>
              <p className="mt-2 text-sm font-medium text-teal-800">{FDE_BOOK.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{FDE_BOOK.body}</p>
              <a
                href={FDE_BOOK.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 ${ctaPrimary}`}
              >
                {FDE_BOOK.cta}
              </a>
            </div>
          </motion.article>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {otherBooks.map((book) => (
              <article
                key={book.id}
                className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[5rem] shrink-0 sm:w-[6.5rem]"
                >
                  <Image
                    src={book.image}
                    alt={book.alt}
                    width={260}
                    height={340}
                    className="h-auto w-full object-contain"
                  />
                </a>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-700">
                    {book.shortTitle}
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-zinc-900">{book.title}</p>
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm font-semibold text-teal-700 hover:underline"
                  >
                    {book.cta} →
                  </a>
                </div>
              </article>
            ))}
          </div>

          <CtaRow>
            <Link href="/resources" className={ctaPrimary}>
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4" aria-hidden />
                Explore Resources
              </span>
            </Link>
            <Link href="/books" className={ctaSecondary}>
              Explore Books
            </Link>
          </CtaRow>
        </div>
      </section>

      <section
        id="real-world"
        aria-labelledby="real-world-heading"
        className={`relative scroll-mt-20 overflow-hidden border-b border-teal-200/50 bg-[#F8F7FF] ${sectionPad}`}
      >
        <div className={container}>
          <SectionHeader
            id="real-world-heading"
            eyebrow="Work"
            title="Built in the Real World"
            description="Ideas matter. Working systems matter more."
          />

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-zinc-600 sm:text-base">
            Explore SK Creation&apos;s AI products, digital platforms, system architectures,
            prototypes, and engineering projects, including agentic AI systems, career technology,
            data platforms, automation solutions, and full-stack applications.
          </p>

          <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
            {FEATURED_PROJECTS.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-teal-200/70 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                  <Layers className="h-3.5 w-3.5" aria-hidden />
                  {project.tag}
                </div>
                <h3 className="mt-3 text-lg font-bold text-zinc-900">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                  {project.description}
                </p>
                <a
                  href={project.href}
                  target={project.external ? '_blank' : undefined}
                  rel={project.external ? 'noopener noreferrer' : undefined}
                  className="mt-4 inline-flex text-sm font-semibold text-teal-800 hover:underline"
                >
                  Visit {project.domain} →
                </a>
              </motion.article>
            ))}
          </div>

          <CtaRow>
            <Link href="/portfolio" className={ctaPrimary}>
              View Portfolio
            </Link>
          </CtaRow>
        </div>
      </section>

      <section
        id="human-purpose"
        aria-labelledby="human-purpose-heading"
        className={`relative scroll-mt-20 overflow-hidden border-b border-teal-200/50 bg-white ${sectionPad}`}
      >
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center">
            <span className={badgeTeal}>Purpose</span>
            <h2 id="human-purpose-heading" className={`${sectionTitle} mt-3`}>
              Technology With a Human Purpose
            </h2>
            <div className="mx-auto mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <Compass className="h-5 w-5" aria-hidden />
            </div>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-8">
              <p>
                SK Creation was founded on a belief that progress should be measured by more than
                technology alone.
              </p>
              <p>
                The future needs people who can build powerful systems, explain them clearly, use
                them responsibly, and help others adapt to change.
              </p>
              <p>
                That is why SK Creation brings together engineering, education, publishing, community
                contribution, and mental-health awareness under one mission.
              </p>
              <p className="font-semibold text-zinc-900">
                Build useful technology. Share practical knowledge. Support people through change.
              </p>
            </div>
            <CtaRow>
              <Link href="/about" className={ctaSecondary}>
                About SK Creation
              </Link>
            </CtaRow>
          </div>
        </div>
      </section>

      <section
        id="community"
        aria-labelledby="community-heading"
        className={`relative scroll-mt-20 overflow-hidden border-b border-teal-200/50 bg-[#F8F7FF] ${sectionPad}`}
      >
        <div className={container}>
          <SectionHeader
            id="community-heading"
            eyebrow="Impact"
            title="Community & Volunteer Impact"
            description="Not every meaningful problem is a commercial project."
          />

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-teal-200/70 bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <Users className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-8">
              SK Creation supports selected community, nonprofit, educational, and knowledge-sharing
              initiatives through volunteer sessions, AI awareness, technical guidance, educational
              resources, and responsible technology discussions.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
              Organizations interested in collaboration or community programs are welcome to reach
              out.
            </p>
            <Link href="/contact" className={`mt-6 ${ctaPrimary}`}>
              Discuss a Community Initiative
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
