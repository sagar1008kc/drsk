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
  'Full-Stack Platforms',
  'Secure Architecture',
  'Human-Centered AI',
];

const toolGroups = [
  {
    label: 'AI Models & APIs',
    color: 'violet',
    tools: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Meta Llama', 'Mistral AI', 'Multi-Model Routing'],
  },
  {
    label: 'Agentic Frameworks',
    color: 'indigo',
    tools: ['LangChain', 'LangGraph', 'LlamaIndex', 'Semantic Kernel', 'CrewAI', 'AutoGen'],
  },
  {
    label: 'Retrieval & RAG',
    color: 'fuchsia',
    tools: ['Pinecone', 'Weaviate', 'Qdrant', 'ChromaDB', 'Azure AI Search', 'Elasticsearch', 'pgvector'],
  },
  {
    label: 'Dev Tools & MCP',
    color: 'sky',
    tools: ['Cursor', 'GitHub Copilot', 'Model Context Protocol', 'LangSmith', 'Prompt Engineering', 'Tool Calling', 'Function Calling'],
  },
  {
    label: 'Cloud, MLOps & Deployment',
    color: 'emerald',
    tools: ['Azure OpenAI', 'Google Vertex AI', 'Google Cloud', 'Docker', 'Kubernetes', 'Vercel', 'Terraform', 'Weights & Biases'],
  },
] as const;

type ToolColor = (typeof toolGroups)[number]['color'];

const toolChipClass: Record<ToolColor, string> = {
  violet:  'border-violet-500/35 bg-violet-500/10 text-violet-300 hover:border-violet-400/60 hover:bg-violet-500/20',
  indigo:  'border-indigo-500/35 bg-indigo-500/10 text-indigo-300 hover:border-indigo-400/60 hover:bg-indigo-500/20',
  fuchsia: 'border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-300 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/20',
  sky:     'border-sky-500/35 bg-sky-500/10 text-sky-300 hover:border-sky-400/60 hover:bg-sky-500/20',
  emerald: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400/60 hover:bg-emerald-500/20',
};

const toolLabelClass: Record<ToolColor, string> = {
  violet:  'text-violet-500',
  indigo:  'text-indigo-400',
  fuchsia: 'text-fuchsia-400',
  sky:     'text-sky-400',
  emerald: 'text-emerald-400',
};

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
    title: 'Secure Full-Stack Platforms',
    desc: 'Modern, scalable digital platforms built on Next.js, TypeScript, and cloud infrastructure with security-first architecture.',
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-5%,rgba(139,92,246,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_85%_75%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_10%_85%,rgba(167,139,250,0.1),transparent_55%)]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Floating neural nodes */}
      {nodePositions.map((node, i) => (
        <span
          key={i}
          className="drsk-hero-star pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-violet-400/60 shadow-[0_0_10px_rgba(139,92,246,0.7)]"
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
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-violet-300 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" aria-hidden />
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
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent">
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
          {focusTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-violet-500/30 bg-violet-500/[0.12] px-3 py-1.5 font-mono text-xs font-medium text-violet-300 shadow-[0_0_14px_rgba(139,92,246,0.15)] backdrop-blur-sm transition hover:border-violet-400/60 hover:bg-violet-500/20 hover:text-violet-200 sm:text-[0.8125rem]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Pillar cards */}
        <div className="mt-14 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:gap-6">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-violet-500/50 hover:bg-violet-500/[0.08] sm:p-7"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.1),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <span className="font-mono text-xs font-bold tracking-widest text-violet-500">
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
          ))}
        </div>

        {/* 05 — AI Toolchain card (full width) */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="group relative mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-violet-500/50 hover:bg-violet-500/[0.06] sm:mt-5 sm:p-7 lg:mt-6"
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.1),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-violet-500">05</span>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-violet-400 sm:text-xs">
                AI Engineering Stack              </span>
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
          <span className="text-violet-400">agentic AI</span>,{' '}
          <span className="text-violet-400">RAG</span>,{' '}
          <span className="text-violet-400">LLM-powered applications</span>,{' '}
          <span className="text-violet-400">automation</span>,{' '}
          <span className="text-violet-400">tool integration</span>,{' '}
          <span className="text-violet-400">secure frontend architecture</span>, and{' '}
          <span className="text-violet-400">human-centered digital solutions</span>.
        </motion.p>
      </div>
    </section>
  );
}
