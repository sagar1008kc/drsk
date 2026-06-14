'use client';

import { motion } from 'framer-motion';

const focusTags = [
  'Agentic AI',
  'RAG',
  "MCP",
  'LLM-Powered Apps',
  'Automation',
  'Tool Integration',
  'Enterprise Agents',
  'Intelligent Workflows',
  'Retrieval Systems',
  'Multi-Agentic Systems',
  'Secure Architecture',
  'Human-Centered AI',
];

const toolGroups = [
  {
    label: 'AI Models & APIs',
    color: 'teal',
    tools: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Meta Llama', 'Mistral AI', 'Multi-Model Routing'],
  },
  {
    label: 'Agentic Frameworks',
    color: 'blue',
    tools: ['LangChain', 'LangGraph', 'ADK', 'CrewAI', 'AutoGen'],
  },
  {
    label: 'Retrieval & RAG',
    color: 'green',
    tools: ['Pinecone', 'Weaviate', 'ChromaDB', 'Azure AI Search', 'Qdrant', 'pgvector'],
  },
  {
    label: 'Dev Tools & MCP',
    color: 'blue',
    tools: ['Cursor', 'GitHub Copilot','Claude Desktop','LangGraph Studio', 'LangChain MCP Adapter', 'LangSmith', 'Google ADK', 'ANY Learn & Adopt'],
  },
  {
    label: 'Cloud, MLOps & Deployment',
    color: 'teal',
    tools: ['Azure OpenAI', 'Google Vertex AI', 'Google Cloud', 'Docker', 'Kubernetes', 'Vercel', 'Terraform', 'Weights & Biases'],
  },
] as const;

type ToolColor = (typeof toolGroups)[number]['color'];

const toolChipClass: Record<ToolColor, string> = {
  teal:  'border-teal-500/35 bg-teal-500/10 text-teal-300 hover:border-teal-400/60 hover:bg-teal-500/20',
  blue:  'border-blue-500/35 bg-blue-500/10 text-blue-300 hover:border-blue-400/60 hover:bg-blue-500/20',
  green: 'border-green-500/35 bg-green-500/10 text-green-300 hover:border-green-400/60 hover:bg-green-500/20',
};

const toolLabelClass: Record<ToolColor, string> = {
  teal:  'text-teal-400',
  blue:  'text-blue-400',
  green: 'text-green-400',
};

const focusChipClasses = [
  'rounded-md border border-teal-500/30 bg-teal-500/[0.12] px-3 py-1.5 font-mono text-xs font-medium text-teal-300 shadow-[0_0_14px_rgba(13,148,136,0.15)] backdrop-blur-sm transition hover:border-teal-400/60 hover:bg-teal-500/20 hover:text-teal-200 sm:text-[0.8125rem]',
  'rounded-md border border-blue-500/30 bg-blue-500/[0.12] px-3 py-1.5 font-mono text-xs font-medium text-blue-300 shadow-[0_0_14px_rgba(37,99,235,0.15)] backdrop-blur-sm transition hover:border-blue-400/60 hover:bg-blue-500/20 hover:text-blue-200 sm:text-[0.8125rem]',
  'rounded-md border border-green-500/30 bg-green-500/[0.12] px-3 py-1.5 font-mono text-xs font-medium text-green-300 shadow-[0_0_14px_rgba(22,163,74,0.15)] backdrop-blur-sm transition hover:border-green-400/60 hover:bg-green-500/20 hover:text-green-200 sm:text-[0.8125rem]',
  'rounded-md border border-emerald-500/30 bg-emerald-500/[0.12] px-3 py-1.5 font-mono text-xs font-medium text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.15)] backdrop-blur-sm transition hover:border-emerald-400/60 hover:bg-emerald-500/20 hover:text-emerald-200 sm:text-[0.8125rem]',
];

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
  },
  {
    label: '02',
    title: 'RAG & Retrieval Systems',
    desc: 'Production retrieval-augmented pipelines connecting LLMs to proprietary knowledge, delivering accurate, context-aware responses.',
  },
  {
    label: '03',
    title: 'LLM-Powered Applications',
    desc: 'End-to-end AI apps with structured outputs, function calling, streaming, and human-in-the-loop patterns for real business impact.',
  },
  {
    label: '04',
    title: 'Multi-Agent AI Platform',
    desc: 'Designed a multi-agent AI platform using LangChain and LangGraph to coordinate specialized agents, integrate enterprise tools, retrieve contextual knowledge, manage workflow state, and support human-in-the-loop decision-making for reliable automation.',
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

        {/* Focus tech chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5"
          aria-label="Technical focus areas"
        >
          {focusTags.map((tag, i) => (
            <span
              key={tag}
              className={focusChipClasses[i % focusChipClasses.length]}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Pillar cards */}
        <div className="mt-14 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:gap-6">
          {pillars.map((pillar, i) => {
            const accent = pillarAccents[i % pillarAccents.length];
            return (
            <motion.article
              key={pillar.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition sm:p-7 ${accent.hover}`}
            >
              <div className={`pointer-events-none absolute inset-0 rounded-2xl ${accent.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative">
                <span className={`font-mono text-xs font-bold tracking-widest ${accent.label}`}>
                  {pillar.label}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">{pillar.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {pillar.desc}
                </p>
              </div>
              <div
                className="pointer-events-none absolute bottom-3 right-5 select-none font-mono text-5xl font-bold text-white/[0.04]"
                aria-hidden
              >
                {pillar.label}
              </div>
            </motion.article>
            );
          })}
        </div>

        {/* 05 — AI Toolchain card (full width) */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="group relative mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-blue-500/50 hover:bg-blue-500/[0.06] sm:mt-5 sm:p-7 lg:mt-6"
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.1),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-blue-400">05</span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-blue-300 sm:text-xs">
                AI Engineering Stack
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">AI Engineering Stack</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Tools, frameworks, and platforms used across the AI-native software engineering lifecycle — from LLM integration and agentic workflows to retrieval, automation, observability, and cloud deployment.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {toolGroups.map((group) => (
                <div key={group.label}>
                  <p className={`mb-2.5 font-mono text-[10px] font-bold uppercase leading-tight tracking-widest ${toolLabelClass[group.color]}`}>
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`rounded border px-2 py-1 font-mono text-[11px] font-medium transition sm:text-xs ${toolChipClass[group.color]}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="pointer-events-none absolute bottom-3 right-5 select-none font-mono text-5xl font-bold text-white/[0.04]"
            aria-hidden
          >
            05
          </div>
        </motion.article>

        {/* Bottom focused areas tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 text-center text-sm leading-relaxed text-zinc-500 sm:text-base"
        >
          Focused on{' '}
          <span className="text-teal-400">design, build, and deploy production-ready AI solutions that transform business challenges into scalable, secure, and human-centered outcomes—specializing in agentic AI, multi-agent systems, RAG, LLM-powered applications, automation, and tool integration.</span>,{' '}
        </motion.p>
      </div>
    </section>
  );
}
