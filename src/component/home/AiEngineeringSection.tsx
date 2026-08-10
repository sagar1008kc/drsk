'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const pillarAccents = [
  {
    hover: 'hover:border-teal-500/50 hover:bg-teal-500/[0.08]',
    glow: 'bg-[radial-gradient(ellipse_at_top_left,rgba(13,148,136,0.1),transparent_55%)]',
    label: 'text-teal-400',
  },
  {
    hover: 'hover:border-blue-500/50 hover:bg-blue-500/[0.08]',
    glow: 'bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.1),transparent_55%)]',
    label: 'text-blue-400',
  },
  {
    hover: 'hover:border-green-500/50 hover:bg-green-500/[0.08]',
    glow: 'bg-[radial-gradient(ellipse_at_top_left,rgba(22,163,74,0.1),transparent_55%)]',
    label: 'text-green-400',
  },
  {
    hover: 'hover:border-emerald-500/50 hover:bg-emerald-500/[0.08]',
    glow: 'bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.1),transparent_55%)]',
    label: 'text-emerald-400',
  },
] as const;

const nodeColors = [
  'bg-teal-400/60 shadow-[0_0_10px_rgba(13,148,136,0.7)]',
  'bg-blue-400/60 shadow-[0_0_10px_rgba(37,99,235,0.7)]',
  'bg-green-400/60 shadow-[0_0_10px_rgba(22,163,74,0.7)]',
  'bg-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.7)]',
];

const pillars = [
  {
    label: '01',
    title: 'Enterprise AI Agents',
    desc: 'Autonomous agents that execute complex workflows, reason over structured data, and integrate with enterprise tooling at scale.',
    href: '/home/smart-agent',
  },
  {
    label: '02',
    title: 'RAG & Retrieval Systems',
    desc: 'Production retrieval-augmented pipelines connecting LLMs to proprietary knowledge, delivering accurate, context-aware responses.',
    href: '/home/rag-systems',
  },
  {
    label: '03',
    title: 'LLM-Powered Applications',
    desc: 'End-to-end AI apps with structured outputs, function calling, streaming, and human-in-the-loop patterns for real business impact.',
    href: '/home/enterprise-llm-guide',
  },
  {
    label: '04',
    title: 'Multi-Agent AI Platform',
    desc: 'Designed a multi-agent AI platform using LangChain and LangGraph to coordinate specialized agents, integrate enterprise tools, retrieve contextual knowledge, manage workflow state, and support human-in-the-loop decision-making for reliable automation.',
    href: '/home/multi-agent-workflow-map',
  },
];

const nodePositions = [
  { top: '12%', left: '8%', delay: 0 },
  { top: '22%', left: '82%', delay: 0.5 },
  { top: '55%', left: '4%', delay: 0.9 },
  { top: '70%', left: '90%', delay: 0.3 },
  { top: '88%', left: '35%', delay: 0.7 },
  { top: '40%', left: '95%', delay: 0.2 },
  { top: '8%', left: '55%', delay: 1.1 },
  { top: '78%', left: '15%', delay: 0.6 },
];

export default function AiEngineeringSection({ firstSection = false }: { firstSection?: boolean }) {
  return (
    <section
      className={`relative overflow-hidden bg-[#06060f] py-20 sm:py-24 lg:py-32${
        firstSection ? ' -mt-[3.75rem] pt-[calc(3.75rem+5rem)] sm:pt-[calc(3.75rem+6rem)] lg:pt-[calc(3.75rem+8rem)]' : ''
      }`}
    >
      {/* Background: radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-5%,rgba(13,148,136,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_85%_75%,rgba(37,99,235,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_10%_85%,rgba(22,163,74,0.1),transparent_55%)]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(13,148,136,1) 1px,transparent 1px),linear-gradient(90deg,rgba(13,148,136,1) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Floating neural nodes */}
      {nodePositions.map((node, i) => (
        <span
          key={i}
          className={`drsk-hero-star pointer-events-none absolute h-1.5 w-1.5 rounded-full ${nodeColors[i % nodeColors.length]}`}
          style={{ top: node.top, left: node.left, animationDelay: `${node.delay}s` }}
          aria-hidden
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-teal-300 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" aria-hidden />
            Engineering Focus
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-5 text-center text-3xl font-bold leading-[1.18] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
        >
          AI-Native &amp;{' '}
          <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Agentic Engineering
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-zinc-300 sm:text-lg sm:leading-8"
        >
          Building enterprise AI agents, intelligent workflows, retrieval systems, and full-stack
          digital platforms that turn AI into{' '}
          <span className="font-semibold text-white">practical business value</span>.
        </motion.p>

        {/* Pillar cards */}
        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:mt-14 lg:gap-6">
          {pillars.map((pillar, i) => {
            const accent = pillarAccents[i % pillarAccents.length];
            const cardClassName = `group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition sm:p-7 ${accent.hover}${
              pillar.href ? ' cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(13,148,136,0.12)]' : ''
            }`;
            const inner = (
              <>
                <div className={`pointer-events-none absolute inset-0 rounded-2xl ${accent.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                <div className="relative">
                  <span className={`font-mono text-xs font-bold tracking-widest ${accent.label}`}>
                    {pillar.label}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">{pillar.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {pillar.desc}
                  </p>
                  {pillar.href ? (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-teal-400/90 transition group-hover:text-teal-300">
                      Explore pipeline →
                    </p>
                  ) : null}
                </div>
                <div
                  className="pointer-events-none absolute bottom-3 right-5 select-none font-mono text-5xl font-bold text-white/[0.04]"
                  aria-hidden
                >
                  {pillar.label}
                </div>
              </>
            );

            return (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.08 }}
            >
              {pillar.href ? (
                <Link href={pillar.href} className={`block ${cardClassName}`}>
                  {inner}
                </Link>
              ) : (
                <article className={cardClassName}>{inner}</article>
              )}
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
