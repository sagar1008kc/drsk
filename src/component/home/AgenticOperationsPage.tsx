'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Activity,
  Bell,
  CheckCircle2,
  DollarSign,
  GitMerge,
  PieChart,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import PortfolioBackLink from '@/component/portfolio/PortfolioBackLink';

type Pillar = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  why: string;
  practices: string[];
  signals: { label: string; value: string }[];
  icon: LucideIcon;
  accent: string;
  glow: string;
};

const PILLARS: Pillar[] = [
  {
    id: 'observability',
    title: 'Observability',
    eyebrow: 'See the full agent runtime',
    summary:
      'Unify logs, metrics, and traces so every agent run is inspectable — from intent classification to tool calls and final response.',
    why: 'Without observability, agent failures look random. With it, you can explain latency, cost, and quality regressions in minutes.',
    practices: [
      'Correlate request ID → agent route → model → tools → outcome',
      'Capture token usage, tool latency, and retry counts per step',
      'Export structured events to LangSmith, Datadog, Grafana, or CloudWatch',
    ],
    signals: [
      { label: 'Trace coverage', value: '100%' },
      { label: 'P95 latency', value: '2.1s' },
      { label: 'Error rate', value: '0.4%' },
    ],
    icon: Activity,
    accent: 'text-cyan-300 border-cyan-500/35',
    glow: 'from-cyan-500/15',
  },
  {
    id: 'tracing',
    title: 'Tracing',
    eyebrow: 'Follow one request end-to-end',
    summary:
      'Distributed traces show the exact path a query takes across supervisor agents, specialists, RAG retrieval, and tool execution.',
    why: 'Tracing turns “the bot was slow” into a precise bottleneck — retrieval, model TTFT, MCP tool, or human approval wait.',
    practices: [
      'Parent span for the workflow; child spans for each agent/tool',
      'Annotate spans with intent, model name, and grounding score',
      'Keep redacted payloads for audit without leaking PII',
    ],
    signals: [
      { label: 'Avg hops', value: '4.2' },
      { label: 'Tool share', value: '31%' },
      { label: 'RAG share', value: '27%' },
    ],
    icon: GitMerge,
    accent: 'text-emerald-300 border-emerald-500/35',
    glow: 'from-emerald-500/15',
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    eyebrow: 'Prove quality before and after ship',
    summary:
      'Offline and online evaluation suites measure faithfulness, task success, safety, and regression across prompt or model changes.',
    why: 'Agentic systems drift. Evaluation is the gate that protects users when you swap models, tools, or routing logic.',
    practices: [
      'Golden-set tests for critical workflows before deploy',
      'LLM-as-judge + human review for groundedness and tone',
      'Canary evals in production with automatic rollback thresholds',
    ],
    signals: [
      { label: 'Pass rate', value: '96%' },
      { label: 'Grounded', value: '94%' },
      { label: 'Safety', value: '99.2%' },
    ],
    icon: CheckCircle2,
    accent: 'text-blue-300 border-blue-500/35',
    glow: 'from-blue-500/15',
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    eyebrow: 'Live health of agent services',
    summary:
      'Operational dashboards track availability, queue depth, model provider status, and workflow SLOs in near real time.',
    why: 'Monitoring answers “is the system healthy right now?” so on-call can act before users report issues.',
    practices: [
      'SLO burn alerts on latency and success-rate budgets',
      'Provider health checks (OpenAI, Anthropic, Azure, tools)',
      'Per-workflow success and abandonment rates',
    ],
    signals: [
      { label: 'Uptime', value: '99.95%' },
      { label: 'Queue', value: '12' },
      { label: 'SLO burn', value: 'Healthy' },
    ],
    icon: PieChart,
    accent: 'text-sky-300 border-sky-500/35',
    glow: 'from-sky-500/15',
  },
  {
    id: 'alerts',
    title: 'Alerts',
    eyebrow: 'Signal what needs a human',
    summary:
      'Actionable alerts for policy violations, tool failures, cost spikes, and quality drops — routed to the right owner with context.',
    why: 'Noise kills response time. Good alerts include the failing span, recent deploy, and a recommended next step.',
    practices: [
      'Severity tiers: page / ticket / digest',
      'Deduplicate flapping tool errors with cool-downs',
      'Attach deep links into the failing trace and evaluation sample',
    ],
    signals: [
      { label: 'Open pages', value: '1' },
      { label: 'MTTA', value: '4m' },
      { label: 'Noise ratio', value: 'Low' },
    ],
    icon: Bell,
    accent: 'text-rose-300 border-rose-500/35',
    glow: 'from-rose-500/15',
  },
  {
    id: 'cost-management',
    title: 'Cost Management',
    eyebrow: 'Make every token earn its keep',
    summary:
      'Track cost per workflow, route simple intents to smaller models, cache embeddings, and set budgets with hard kill-switches.',
    why: 'Agentic products can scale spend faster than traffic. Cost controls keep experimentation safe in production.',
    practices: [
      'Unit economics: cost per successful task / per session',
      'Model routing + caching for repeated retrieval',
      'Budget alerts with automatic fallback to cheaper paths',
    ],
    signals: [
      { label: '$ / task', value: '$0.018' },
      { label: 'Cache hit', value: '41%' },
      { label: 'Budget', value: 'On track' },
    ],
    icon: DollarSign,
    accent: 'text-teal-300 border-teal-500/35',
    glow: 'from-teal-500/15',
  },
];

export default function AgenticOperationsPage() {
  return (
    <main className="min-h-screen bg-[#050810] text-slate-200">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_60%,rgba(13,148,136,0.12),transparent_50%)]" />

      <header className="sticky top-14 z-40 border-b border-slate-800/80 bg-[#050810]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <PortfolioBackLink />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Agentic operations
            </p>
            <h1 className="truncate text-sm font-bold text-white sm:text-base">
              Reliability, quality &amp; cost for production agents
            </h1>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
            Production control plane
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What keeps agentic workflows{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-300 bg-clip-text text-transparent">
              trustworthy at scale
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Architecture gets agents running. Operations keep them safe, measurable, and affordable.
            These six pillars are the minimum control plane for enterprise multi-agent systems.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/home/agentic-ai-system-design"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-blue-100 transition hover:bg-blue-500/25"
            >
              System architecture
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href="/home/multi-agent-workflow-map"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-teal-100 transition hover:bg-teal-500/20"
            >
              Visual workflow map
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </motion.div>

        <nav
          aria-label="Operations pillars"
          className="mt-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PILLARS.map((pillar) => (
            <a
              key={pillar.id}
              href={`#${pillar.id}`}
              className={`shrink-0 rounded-full border bg-slate-900/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition hover:bg-slate-800 ${pillar.accent}`}
            >
              {pillar.title}
            </a>
          ))}
        </nav>

        <div className="mt-12 space-y-8 sm:mt-14 sm:space-y-10">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className={`scroll-mt-28 overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/50 shadow-[0_0_40px_rgba(15,23,42,0.45)]`}
              >
                <div className={`bg-gradient-to-br ${pillar.glow} to-transparent p-5 sm:p-7 lg:p-8`}>
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-slate-950/60 ${pillar.accent}`}
                        >
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            {pillar.eyebrow}
                          </p>
                          <h3 className="text-xl font-bold text-white sm:text-2xl">{pillar.title}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                        {pillar.summary}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">{pillar.why}</p>
                      <ul className="mt-5 space-y-2">
                        {pillar.practices.map((practice) => (
                          <li
                            key={practice}
                            className="flex gap-2 text-sm leading-relaxed text-slate-300"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                              aria-hidden
                            />
                            <span>{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid w-full grid-cols-3 gap-2 sm:max-w-sm sm:gap-3 lg:w-64 lg:grid-cols-1">
                      {pillar.signals.map((signal) => (
                        <div
                          key={signal.label}
                          className="rounded-xl border border-slate-700/80 bg-slate-950/50 px-3 py-3 text-center sm:text-left"
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                            {signal.label}
                          </p>
                          <p className="mt-1 font-mono text-sm font-bold text-white sm:text-base">
                            {signal.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 via-slate-900/40 to-teal-500/10 p-6 text-center sm:p-8">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Next: see the full system design
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
            Operations sit on top of orchestration, RAG, tools, guardrails, and human approval —
            explore the end-to-end architecture next.
          </p>
          <Link
            href="/home/agentic-ai-system-design"
            className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] transition hover:from-blue-500 hover:to-cyan-400"
          >
            View system design
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
