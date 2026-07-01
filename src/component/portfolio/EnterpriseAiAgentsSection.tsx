'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cpu,
  GitMerge,
  Layers,
  Network,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

type GuideTab = 'architecture' | 'loop' | 'usecases' | 'practices';

type ArchitectureLayer = {
  id: string;
  title: string;
  detail: string;
  responsibilities: string[];
  icon: LucideIcon;
};

type LoopStep = {
  id: string;
  label: string;
  detail: string;
};

const GUIDE_TABS: { id: GuideTab; label: string }[] = [
  { id: 'architecture', label: 'Architecture' },
  { id: 'loop', label: 'Agent loop' },
  { id: 'usecases', label: 'Use cases' },
  { id: 'practices', label: 'Best practices' },
];

const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'experience',
    title: 'Experience layer',
    detail: 'Channels where users and systems invoke the agent — chat, copilot panels, APIs, and event triggers.',
    responsibilities: [
      'Natural-language and structured request intake',
      'Streaming UX with progress and citations',
      'Session continuity across turns',
    ],
    icon: Bot,
  },
  {
    id: 'gateway',
    title: 'Gateway & identity',
    detail: 'Trust boundary before any model or tool call. Validates who is asking and what they are allowed to do.',
    responsibilities: [
      'JWT / Entra ID / SSO authentication',
      'Tenant isolation and RBAC scope checks',
      'Rate limiting, WAF, and request sanitization',
    ],
    icon: ShieldCheck,
  },
  {
    id: 'core',
    title: 'Agent core',
    detail: 'Reasoning engine that plans, selects tools, and produces structured next actions — not uncontrolled free text.',
    responsibilities: [
      'System prompt, policies, and tool schemas',
      'Planner / ReAct / graph-based orchestration',
      'Confidence scoring and escalation logic',
    ],
    icon: Cpu,
  },
  {
    id: 'tools',
    title: 'Tools & integrations',
    detail: 'Curated, schema-defined capabilities the agent can request. Execution always happens server-side.',
    responsibilities: [
      'CRM, ERP, ticketing, payment, and search APIs',
      'MCP servers and internal microservices',
      'Auth per tool, timeouts, retries, idempotency keys',
    ],
    icon: Wrench,
  },
  {
    id: 'knowledge',
    title: 'Knowledge & memory',
    detail: 'Grounding sources and durable context — RAG corpora, policy stores, and workflow state.',
    responsibilities: [
      'Hybrid retrieval with ACL-aware chunk filtering',
      'Thread memory vs. long-term user/org memory',
      'Checkpointed workflow state for multi-step tasks',
    ],
    icon: Layers,
  },
  {
    id: 'observability',
    title: 'Observability & evaluation',
    detail: 'Production signals for reliability, quality, cost, and safety — tied to every agent decision.',
    responsibilities: [
      'Distributed traces across plan → tool → response',
      'Groundedness, tool success, and escalation metrics',
      'Token cost, latency, and completion rate dashboards',
    ],
    icon: Network,
  },
];

const AGENT_LOOP: LoopStep[] = [
  {
    id: 'perceive',
    label: 'Perceive',
    detail: 'Ingest user intent, session context, retrieved documents, and prior workflow state.',
  },
  {
    id: 'plan',
    label: 'Plan',
    detail: 'Decompose the goal into steps, select tools, and emit a structured plan with confidence.',
  },
  {
    id: 'act',
    label: 'Act',
    detail: 'Execute approved tool calls through the application layer — never direct model-to-production access.',
  },
  {
    id: 'observe',
    label: 'Observe',
    detail: 'Capture tool results, errors, latency, and policy outcomes; update workflow state.',
  },
  {
    id: 'reflect',
    label: 'Reflect',
    detail: 'Decide whether to continue, retry, escalate to HITL, or return a final grounded answer.',
  },
];

const USE_CASES = [
  {
    title: 'Customer operations copilot',
    scenario: 'Resolve billing, plan changes, and account updates with policy-grounded answers and safe write tools.',
    outcomes: ['Reduced handle time', 'Consistent policy adherence', 'Auditable actions'],
  },
  {
    title: 'IT service management triage',
    scenario: 'Classify incidents, search runbooks, propose remediation steps, and open tickets with structured payloads.',
    outcomes: ['Faster L1 resolution', 'Better routing to specialists', 'Documented evidence trail'],
  },
  {
    title: 'Procurement & vendor intake',
    scenario: 'Extract requirements from RFPs, compare vendors against criteria, and draft approval summaries.',
    outcomes: ['Structured comparison outputs', 'Human review on spend thresholds', 'Searchable decision history'],
  },
  {
    title: 'Compliance & document review',
    scenario: 'Retrieve regulatory clauses, flag gaps in contracts, and produce citation-backed review memos.',
    outcomes: ['Grounded citations', 'Lower hallucination risk', 'Reviewer sign-off workflow'],
  },
  {
    title: 'Sales enablement assistant',
    scenario: 'Answer product questions from enablement docs, draft proposals, and prep meeting briefs with live CRM context.',
    outcomes: ['Faster rep onboarding', 'CRM-grounded responses', 'Controlled access to deal data'],
  },
];

const BEST_PRACTICES = [
  {
    title: 'Bounded tool catalogs',
    detail: 'Expose only the tools an agent needs for its role. Every tool has an explicit JSON schema and permission scope.',
  },
  {
    title: 'Structured outputs first',
    detail: 'Prefer schema-validated JSON for routing, tool selection, and downstream automation — not fragile text parsing.',
  },
  {
    title: 'Separate read vs. write',
    detail: 'Read tools can run at higher autonomy. Write tools require stricter validation, idempotency, and often HITL.',
  },
  {
    title: 'Deterministic fallbacks',
    detail: 'When confidence is low or tools fail, fall back to safe templates, queued human review, or explicit error states.',
  },
  {
    title: 'State as a first-class artifact',
    detail: 'Persist plans, decisions, and tool results so multi-step workflows can resume, replay, and audit.',
  },
  {
    title: 'Continuous evaluation',
    detail: 'Monitor groundedness, tool success, escalation rate, and cost in production — not only in offline benchmarks.',
  },
];

const RELATED_LINKS = [
  { href: '/portfolio/multi-agent-workflow-map', label: 'Multi-agent workflow map' },
  { href: '/portfolio/agentic-tools-hub', label: 'Agent tools hub' },
  { href: '/portfolio/rag-systems', label: 'Enterprise RAG pipeline' },
  { href: '/portfolio/enterprise-llm-guide', label: 'Enterprise LLM guide' },
];

export default function EnterpriseAiAgentsSection() {
  const [activeTab, setActiveTab] = useState<GuideTab>('architecture');
  const [activeLayerId, setActiveLayerId] = useState(ARCHITECTURE_LAYERS[0].id);

  const activeLayer =
    ARCHITECTURE_LAYERS.find((layer) => layer.id === activeLayerId) ?? ARCHITECTURE_LAYERS[0];

  return (
    <section
      id="enterprise-ai-agents"
      className="scroll-mt-36 border-t border-slate-800 bg-slate-50 text-slate-900"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
            Enterprise AI Agents
          </p>
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            How enterprise AI agents work
          </h2>
          <p className="text-slate-600">
            The demo above shows what an agent feels like in the UI. Production agents are systems —
            architecture layers, a repeatable reasoning loop, governed tools, and measurable outcomes
            behind a secure API boundary.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {GUIDE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:text-teal-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'architecture' ? (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-2 lg:col-span-4">
              {ARCHITECTURE_LAYERS.map((layer) => {
                const Icon = layer.icon;
                const isActive = layer.id === activeLayerId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                      isActive
                        ? 'border-teal-500 bg-teal-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-teal-200'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{layer.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                        {layer.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <activeLayer.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{activeLayer.title}</h3>
                  <p className="text-sm text-slate-500">Design layer</p>
                </div>
              </div>
              <p className="leading-relaxed text-slate-600">{activeLayer.detail}</p>
              <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Responsibilities
              </h4>
              <ul className="mt-3 space-y-2">
                {activeLayer.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-teal-100 bg-teal-50/80 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Architect note
                </p>
                <p className="mt-2 text-sm leading-relaxed text-teal-900">
                  Agents fail when layers blur together. Keep identity enforcement, reasoning, tool
                  execution, and observability in separate components with explicit contracts between
                  them.
                </p>
              </div>
            </article>
          </div>
        ) : null}

        {activeTab === 'loop' ? (
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-center gap-2 text-teal-700">
              <GitMerge className="h-5 w-5" />
              <p className="text-sm font-semibold">Enterprise agent reasoning loop</p>
            </div>
            <ol className="relative space-y-0">
              {AGENT_LOOP.map((step, index) => (
                <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                  {index < AGENT_LOOP.length - 1 ? (
                    <span className="absolute left-[1.125rem] top-10 h-[calc(100%-1.5rem)] w-px bg-teal-200" />
                  ) : null}
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-bold text-slate-900">{step.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center text-sm text-slate-500">
              Multi-agent platforms extend this loop — a supervisor coordinates specialized agents, each
              running their own perceive → reflect cycle within shared workflow state.
            </p>
          </div>
        ) : null}

        {activeTab === 'usecases' ? (
          <div className="grid gap-5 md:grid-cols-2">
            {USE_CASES.map((useCase) => (
              <article
                key={useCase.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">{useCase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{useCase.scenario}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {useCase.outcomes.map((outcome) => (
                    <span
                      key={outcome}
                      className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {activeTab === 'practices' ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BEST_PRACTICES.map((practice) => (
              <article
                key={practice.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">{practice.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{practice.detail}</p>
              </article>
            ))}
            <article className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white md:col-span-2 lg:col-span-3">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <ShieldCheck className="h-5 w-5 text-teal-300" />
                Production rule
              </h3>
              <p className="mt-3 leading-relaxed text-slate-300">
                Do not let the LLM directly control production systems. Put agents behind an API layer,
                validate structured outputs, execute tools server-side, log every decision, and require
                human approval for high-risk writes.
              </p>
            </article>
          </div>
        ) : null}

        <footer className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Related deep dives
          </p>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Continue with the multi-agent platform map, tool integration patterns, RAG pipeline, and
            LLM implementation guide.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {RELATED_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-300 hover:bg-teal-100"
              >
                {item.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
