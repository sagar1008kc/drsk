'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { badgeTeal, container, ctaSecondary, sectionDesc, sectionPad, sectionTitle } from '@/component/home/styles';

const FOUNDER = {
  name: 'Dr. SK',
  role: 'Founding Engineer',
  contribution:
    'Designs and ships production AI systems, digital products, and the architecture behind SK Creation — from idea through reliable delivery.',
  photo: '/drsk.png',
};

const AGENTS = [
  {
    name: 'Atlas',
    role: 'Systems Architect',
    contribution:
      'Turns real problems into production multi-agent designs — clear boundaries, orchestration, and systems that can actually ship.',
    photo: '/team/team-atlas.png',
  },
  {
    name: 'Nova',
    role: 'Knowledge & RAG',
    contribution:
      'Grounds answers in approved sources through retrieval, citations, and knowledge flows people can trust.',
    photo: '/team/team-nova.png',
  },
  {
    name: 'Forge',
    role: 'Tools & Integration',
    contribution:
      'Connects agents to APIs, workflows, and allowlisted tools so work moves from conversation into action.',
    photo: '/team/team-forge.png',
  },
  {
    name: 'Sentinel',
    role: 'Safety & HITL',
    contribution:
      'Keeps high-risk actions behind guardrails, human approval, and operating limits that protect users.',
    photo: '/team/team-sentinel.png',
  },
  {
    name: 'Pulse',
    role: 'Operations',
    contribution:
      'Watches quality, cost, traces, and evaluations so systems stay measurable after they launch.',
    photo: '/team/team-pulse.png',
  },
  {
    name: 'Prism',
    role: 'Market Analysis',
    contribution:
      'Reads markets, competitors, and demand signals so SK Creation builds where the opportunity is real — not assumed.',
    photo: '/team/team-prism.png',
  },
  {
    name: 'Scout',
    role: 'Customer Discovery',
    contribution:
      'Listens to real user problems, jobs-to-be-done, and interviews so products start from people — not from a feature list.',
    photo: '/team/team-scout.png',
  },
  {
    name: 'Lyra',
    role: 'Learning',
    contribution:
      'Turns shipped work into clear teaching — guides, walkthroughs, and learning paths people can actually follow.',
    photo: '/team/team-lyra.png',
  },
  {
    name: 'Quill',
    role: 'Publishing',
    contribution:
      'Shapes books, articles, and public resources so knowledge leaves the workshop and reaches readers with care.',
    photo: '/team/team-quill.png',
  },
] as const;

function Avatar({
  src,
  alt,
  size,
  ring,
}: {
  src: string;
  alt: string;
  size: 'lg' | 'md';
  ring?: string;
}) {
  const dim = size === 'lg' ? 'h-28 w-28 sm:h-32 sm:w-32' : 'h-20 w-20';
  const px = size === 'lg' ? 128 : 80;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-teal-50 ring-2 ${dim} ${
        ring ?? 'ring-teal-200/80'
      }`}
    >
      <Image src={src} alt={alt} width={px} height={px} className="h-full w-full object-cover object-top" />
    </div>
  );
}

export default function AboutTeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className={`relative scroll-mt-20 overflow-hidden border-b border-teal-200/50 bg-white ${sectionPad}`}
    >
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <span className={badgeTeal}>People & agents</span>
          <h2 id="team-heading" className={`${sectionTitle} mt-3`}>
            Our Team
          </h2>
          <p className={sectionDesc}>
            One founding engineer, supported by specialized AI agents for building systems,
            discovering what people need, and sharing knowledge.
          </p>
        </div>

        <motion.article
          id="founder"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-teal-200/70 bg-[#f8fffd] p-6 text-center sm:mt-12 sm:flex-row sm:items-center sm:gap-7 sm:p-7 sm:text-left"
        >
          <Avatar src={FOUNDER.photo} alt={FOUNDER.name} size="lg" ring="ring-teal-400/70" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
              Founding Engineer
            </p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">{FOUNDER.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[0.95rem]">
              {FOUNDER.contribution}
            </p>
            <Link href="/portfolio" className={`mt-5 ${ctaSecondary} sm:w-auto`}>
              Explore Portfolio
            </Link>
          </div>
        </motion.article>

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent, index) => (
            <motion.li
              key={agent.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="flex h-full flex-col rounded-2xl border border-teal-200/70 bg-white p-5 shadow-[0_6px_20px_rgba(13,148,136,0.04)] sm:p-6"
            >
              <div className="flex items-center gap-4">
                <Avatar src={agent.photo} alt={`${agent.name}, AI agent`} size="md" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-700">
                    AI Agent
                  </p>
                  <h3 className="mt-0.5 truncate text-lg font-bold text-zinc-900">{agent.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-zinc-500">{agent.role}</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600">{agent.contribution}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
