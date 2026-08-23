'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Database,
  ExternalLink,
  Layers,
  Network,
  Shield,
  Sparkles,
} from 'lucide-react';
import PortfolioBackLink from '@/component/portfolio/PortfolioBackLink';
import {
  AI_FRONT_DOOR_META,
  CAPABILITIES,
  DATA_PLANES,
  DECISIONS,
  DIAGRAMS,
  GET_AUCTION_LIST_HREF,
  GRAPH_NODES,
  LAYERS,
  RAG_CHUNK_STEPS,
  RAG_GUARDRAILS,
  RAG_OFFLINE_SOURCES,
  RAG_ONLINE_KNOBS,
  REQUEST_STEPS,
  SECURITY_POINTS,
  STACK,
} from '@/lib/ai-front-door';

type TabId = 'architecture' | 'rag';

function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon: typeof Layers;
}) {
  return (
    <div className="mb-6 flex items-start gap-3 sm:mb-8">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-300">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

function DiagramCard({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f14]">
      <div className="relative aspect-[16/10] w-full bg-black/40">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-center p-2 sm:p-3"
          sizes="(max-width: 1024px) 100vw, 960px"
        />
      </div>
      <figcaption className="border-t border-white/10 px-4 py-3 text-sm font-medium text-zinc-300">
        {caption}
      </figcaption>
    </figure>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-[#0b0f16]">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-700/80 bg-slate-900/80">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-800 last:border-b-0 hover:bg-white/[0.03]">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3.5 leading-relaxed ${
                    j === 0 ? 'font-semibold text-zinc-100' : 'text-zinc-400'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AiFrontDoorPage() {
  const [tab, setTab] = useState<TabId>('architecture');

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-emerald-500/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-emerald-900/15 blur-[120px]" />
        <div className="absolute bottom-[20%] right-0 h-[400px] w-[600px] rounded-full bg-teal-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <PortfolioBackLink href="/portfolio#live-projects" />
          <div className="flex flex-wrap gap-2">
            <Link
              href={GET_AUCTION_LIST_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition hover:border-emerald-400/60 hover:bg-emerald-500/25"
            >
              Visit getauctionlist.com
              <ExternalLink className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/portfolio#live-projects"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:bg-white/10"
            >
              Live projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <header className="mb-10 max-w-3xl sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live product · {AI_FRONT_DOOR_META.domain}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            {AI_FRONT_DOOR_META.title}
          </h1>
          <p className="mt-2 text-lg font-medium text-emerald-200/90 sm:text-xl">
            {AI_FRONT_DOOR_META.product} — enterprise assistant architecture
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {AI_FRONT_DOOR_META.summary}
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            {AI_FRONT_DOOR_META.status} · {AI_FRONT_DOOR_META.repos}
          </p>
        </header>

        <div
          role="tablist"
          aria-label="AI Front Door documentation"
          className="mb-10 flex gap-2 overflow-x-auto pb-1"
        >
          {(
            [
              { id: 'architecture' as const, label: 'Architecture', icon: Network },
              { id: 'rag' as const, label: 'RAG pipeline', icon: Database },
            ] as const
          ).map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(id)}
                className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-100'
                    : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </button>
            );
          })}
        </div>

        {tab === 'architecture' ? (
          <div className="space-y-14 sm:space-y-16">
            <section>
              <SectionHeading
                eyebrow="Business capability"
                title="Answers only from approved sources"
                description="Enterprise constraints: browser never calls LLMs or MCP; answers are citation-grounded; failures are typed (completed / partial / failed); no invented auction rows or county dates."
                icon={Sparkles}
              />
              <DataTable
                headers={['Capability', 'Intent', 'Runtime path']}
                rows={CAPABILITIES.map((c) => [c.label, <code key={c.intent} className="font-mono text-xs text-emerald-300">{c.intent}</code>, c.path])}
              />
            </section>

            <section>
              <SectionHeading
                eyebrow="Logical architecture"
                title="Frontend → backend layers"
                description="Hard boundary: the browser never holds service-role keys and never calls OpenAI, FastAPI, or /mcp for Front Door chat."
                icon={Layers}
              />
              <div className="mb-6 grid gap-4">
                {DIAGRAMS.overview.slice(0, 1).map((d) => (
                  <DiagramCard key={d.src} {...d} />
                ))}
              </div>
              <DataTable
                headers={['Layer', 'Components', 'Responsibility']}
                rows={LAYERS.map((l) => [l.name, l.components, l.responsibility])}
              />
            </section>

            <section>
              <SectionHeading
                eyebrow="Request path"
                title="Authenticated chat flow"
                icon={Network}
              />
              <div className="mb-6">
                <DiagramCard {...DIAGRAMS.overview[1]} />
              </div>
              <ol className="space-y-3">
                {REQUEST_STEPS.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-zinc-300"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <SectionHeading eyebrow="Stack" title="Technology (enterprise view)" icon={BookOpen} />
              <DataTable
                headers={['Layer', 'Technology', 'Role']}
                rows={STACK.map((s) => [s.layer, s.tech, s.role])}
              />
            </section>

            <section>
              <SectionHeading
                eyebrow="Control plane"
                title="ControlledAgentGraph nodes"
                description="One typed LangGraph orchestrator — bounded intents and budgets, not unconstrained ReAct."
                icon={Network}
              />
              <div className="mb-6">
                <DiagramCard {...DIAGRAMS.overview[2]} />
              </div>
              <DataTable
                headers={['Node', 'Responsibility']}
                rows={GRAPH_NODES.map((n) => [
                  <code key={n.node} className="font-mono text-xs text-emerald-300">
                    {n.node}
                  </code>,
                  n.responsibility,
                ])}
              />
            </section>

            <section>
              <SectionHeading
                eyebrow="Data planes"
                title="Three retrieval paths — RAG is only one"
                description="Dashboard Excel parse is a fourth UX path (browser-only) and is never the AI graph’s search source."
                icon={Database}
              />
              <DataTable
                headers={['Plane', 'Offline', 'Online', 'Vector?']}
                rows={DATA_PLANES.map((p) => [
                  p.plane,
                  p.offline,
                  p.online,
                  p.vector ? 'Yes' : 'No',
                ])}
              />
            </section>

            <section>
              <SectionHeading eyebrow="Security" title="Tenancy & trust boundary" icon={Shield} />
              <ul className="space-y-2">
                {SECURITY_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 rounded-xl border border-rose-500/15 bg-rose-500/[0.04] px-4 py-3 text-sm text-zinc-300"
                  >
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionHeading eyebrow="Decisions" title="Architecture choices" icon={BookOpen} />
              <ol className="space-y-2">
                {DECISIONS.map((d, i) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="font-mono text-xs text-emerald-400">{i + 1}.</span>
                    {d}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-16">
            <section>
              <SectionHeading
                eyebrow="Policy knowledge RAG"
                title="Offline index build + online hybrid retrieve"
                description="Scope: privacy / disclaimer and approved policy_html sources only. Auction spreadsheets and county/WCAD pages are not this pipeline — they use SQL ingest and live HTTPS tools."
                icon={Database}
              />
              <div className="grid gap-4">
                {DIAGRAMS.rag.map((d) => (
                  <DiagramCard key={d.src} {...d} />
                ))}
              </div>
            </section>

            <section>
              <SectionHeading eyebrow="Approved sources" title="Offline ingestion registry" icon={BookOpen} />
              <DataTable
                headers={['Key', 'URL', 'Kind', 'RAG?']}
                rows={RAG_OFFLINE_SOURCES.map((s) => [
                  <code key={s.key} className="font-mono text-xs text-emerald-300">
                    {s.key}
                  </code>,
                  s.url,
                  s.kind,
                  s.rag ? 'Yes' : 'No',
                ])}
              />
            </section>

            <section>
              <SectionHeading
                eyebrow="Parse → chunk → embed"
                title="Publish into document_chunks"
                description="Unchanged content SHA → skip rewrite unless force_new_version. Index of truth: Postgres document_chunks (pgvector + FTS)."
                icon={Layers}
              />
              <DataTable
                headers={['Step', 'Module', 'Behavior']}
                rows={RAG_CHUNK_STEPS.map((s) => [s.step, s.module, s.behavior])}
              />
            </section>

            <section>
              <SectionHeading
                eyebrow="Online path"
                title="Hybrid retrieve + grounded generate"
                description="Production reranking = RRF only. Live chat uses the Python hybrid path (FTS + vector + RRF k=60)."
                icon={Network}
              />
              <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {RAG_ONLINE_KNOBS.map((k) => (
                  <article
                    key={k.knob}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
                  >
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      {k.knob}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-white">{k.value}</p>
                  </article>
                ))}
              </div>
              <DataTable
                headers={['Guardrail layer', 'Rule']}
                rows={RAG_GUARDRAILS.map((g) => [g.layer, g.rule])}
              />
            </section>

            <section className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                LangGraph placement
              </p>
              <pre className="mt-3 overflow-x-auto font-mono text-[11px] leading-relaxed text-zinc-300 sm:text-xs">
{`START → validate → route → extract
  → Send(knowledge_rag) when policy capability is on
  → evidence_correlation → grounding_verification
  → compliance_disclaimer → synthesis → finalize → END`}
              </pre>
            </section>
          </div>
        )}

        <aside className="mt-16 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">
            Try it live
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Open Get Auction List</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
            Explore Texas foreclosure and trustee sales on the production site — then use the
            authenticated AI Front Door for policy Q&amp;A, auction filters, and county lookups.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={GET_AUCTION_LIST_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Visit getauctionlist.com
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/portfolio#live-projects"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35"
            >
              Back to live projects
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
