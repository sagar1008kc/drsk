'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import PortfolioBackLink from '@/component/portfolio/PortfolioBackLink';
import {
  FinanceArchitectureDiagram,
  FinanceInterviewNotes,
  FinanceSampleArtifacts,
  HealthNetArchitectureDiagram,
  HealthNetInterviewNotes,
  HealthNetSampleArtifacts,
  MockInterviewTip,
} from '@/component/portfolio/AdkMockArtifacts';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  CircuitBoard,
  Clock,
  Database,
  Eye,
  Gauge,
  Layers,
  MessageSquare,
  Network,
  Scale,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';

type TabId = 'playbook' | 'healthnet' | 'finance' | 'edges';

const TABS: { id: TabId; label: string; hint: string }[] = [
  { id: 'playbook', label: 'Playbook', hint: '0–60 min structure' },
  { id: 'healthnet', label: 'Mock: HealthNet', hint: 'HIPAA · HITL' },
  { id: 'finance', label: 'Mock: Finance', hint: '120k DAU · PCI' },
  { id: 'edges', label: 'Edge Cases', hint: 'Pressure questions' },
];

const OPENING_SCRIPT = `I’ll structure this system design into three explicit phases:
Scope & Discovery: I will define the business problem, user personas, scale math, and data security boundaries.
MVP Architecture: I will map out the leanest core loop using a single-agent pattern with human-in-the-loop controls to establish immediate value.
Production & Scale: I will scale the design into an enterprise system—detailing multi-agent decomposition, isolated data layers, security guardrails, resilience, observability, and evaluation metrics.`;

const CLOSING_SCRIPT = `To summarize: We designed an enterprise agentic system that balances speed to market with enterprise compliance. We started with a clean, single-agent MVP on Cloud Run to validate core business metrics.
To scale to production, we split responsibilities across specialized sub-agents, isolated our storage into explicit Session, Memory, RAG, and Operational layers, and placed a 5-point security guardrail using Model Armor and Sensitive Data Protection.
Finally, we protected system reliability using asynchronous queues and circuit breakers, while maintaining full visibility into the agent's trajectory using Cloud Trace and dual-track evaluation datasets.`;

const DISCOVERY_DIMENSIONS = [
  {
    title: '1. Business & Users',
    icon: Users,
    items: [
      'What exact business outcome are we driving?',
      'Who is the user? (Internal employee, developer, external customer)',
      'Autonomy: Advisory (recommends), Decision-Supporting (prepares), or Autonomous (executes writes)?',
    ],
  },
  {
    title: '2. Data Landscape',
    icon: Database,
    items: [
      'Where is the source of truth? (On-prem EHR/ERP, Cloud DBs, SaaS APIs)',
      'Data types: structured, unstructured (PDFs/docs), or streaming?',
      'Sensitivity: PII, PHI, PCI, or internal IP?',
      'Residency: GDPR, HIPAA, sovereign cloud boundaries?',
    ],
  },
  {
    title: '3. Scale Math',
    icon: Gauge,
    items: [
      'Registered users vs Daily Active Users (DAU)',
      'Average RPS = (DAU × Requests/Day) / 86,400; Peak ≈ 10× average',
      'LLM bottlenecks: average turns/session and token footprint (in/out)',
    ],
  },
  {
    title: '4. Non-Functionals',
    icon: Clock,
    items: [
      'Latency: end-to-end (e.g. p95 < 30s) vs first-token TTFT (< 1.5s)',
      'Availability: SLO target (e.g. 99.9% uptime)',
    ],
  },
  {
    title: '5. Success Metrics',
    icon: Target,
    items: [
      'Business: task completion rate, AHT reduction, cost per completed task',
      'AI quality: groundedness, citation accuracy, tool-selection precision',
    ],
  },
];

const MULTI_AGENT_TRIGGERS = [
  {
    title: 'Security / Permission Boundary',
    detail: 'Sub-tasks need different IAM levels, tenant isolation, or data residency domains.',
  },
  {
    title: 'Domain Complexity Boundary',
    detail: 'System-prompt bloat and tool count (>10 tools) degrade reasoning accuracy.',
  },
  {
    title: 'Latency / Execution Boundary',
    detail: 'Independent sub-tasks can run in parallel on specialized smaller models.',
  },
];

const DATA_LAYERS = [
  {
    layer: 'Session State',
    purpose: 'Active interaction state, step logs, short-term turn history',
    stack: 'Memorystore (Redis) / Firestore',
  },
  {
    layer: 'Long-Term Memory',
    purpose: 'Identity-scoped preferences and cross-session facts',
    stack: 'Memory Bank / Firestore',
  },
  {
    layer: 'Enterprise RAG',
    purpose: 'Unstructured knowledge — policies, runbooks, protocols',
    stack: 'Vertex AI Search / Vertex Vector Search',
  },
  {
    layer: 'Operational DB',
    purpose: 'Authoritative transactional SoR — billing, accounts, inventory',
    stack: 'Spanner / AlloyDB / Cloud SQL',
  },
];

const GUARDRAIL_CHECKPOINTS = [
  {
    id: '1',
    title: 'User Input',
    items: [
      'Authentication & token validation (Apigee / Firebase Auth / Identity Platform)',
      'Prompt-injection detection (Model Armor)',
      'Input PII/PHI/PCI redaction (Sensitive Data Protection / DLP)',
    ],
  },
  {
    id: '2',
    title: 'Retrieval',
    items: [
      'User-level ACL filtering at query time',
      'Multi-tenant isolation via tenant-ID metadata checks',
    ],
  },
  {
    id: '3',
    title: 'Tool Execution',
    items: [
      'Least-privilege service accounts with identity delegation',
      'Tool schema validation & input sanitization',
      'Action tiering: READ → auto; LOW-RISK WRITE → policy + confirm; HIGH-RISK WRITE → human approval + immutable audit',
    ],
  },
  {
    id: '4',
    title: 'Model Output',
    items: [
      'Groundedness verification against RAG / tool context',
      'Citation validation (sources must exist in retrieved context)',
      'Output leakage prevention (Model Armor for PII/secrets)',
    ],
  },
  {
    id: '5',
    title: 'Post-Action',
    items: [
      'Idempotency keys to block duplicate tool calls',
      'Immutable audit logging (Cloud Logging → BigQuery)',
    ],
  },
];

const RESILIENCE = [
  {
    title: 'Stateless compute',
    detail: 'Agent runtime on Cloud Run or GKE Autopilot — horizontal scale on concurrency/CPU.',
  },
  {
    title: 'Async tool queueing',
    detail: 'Cloud Tasks / Pub/Sub for tools >5s so HTTP stays non-blocking.',
  },
  {
    title: 'Circuit breakers',
    detail: 'Trip on downstream error/latency; degrade to cached or RAG-only responses with explicit gaps.',
  },
  {
    title: 'Backoff + jitter',
    detail: 'All LLM and tool calls retry with exponential backoff to absorb 429s.',
  },
  {
    title: 'Rate limits & quotas',
    detail: 'Per-tenant limits via Apigee to protect shared LLM quota.',
  },
  {
    title: 'Semantic cache',
    detail: 'Exact/similar query matching via Vector Search to skip LLM for frequent static asks.',
  },
];

type DialogueTurn = {
  role: 'interviewer' | 'you';
  text: string;
};

type MockPhase = {
  title: string;
  turns: DialogueTurn[];
};

const HEALTHNET_PHASES: MockPhase[] = [
  {
    title: 'Phase 1 — Scope & Discovery',
    turns: [
      {
        role: 'interviewer',
        text: 'Welcome. Design a system for HealthNet Solutions to automate parts of patient discharge and post-care coordination. Care coordinators currently review charts, check formularies, schedule follow-ups, and write discharge summaries — slow and error-prone. Data is highly sensitive; accuracy is critical. Where would you start?',
      },
      {
        role: 'you',
        text: 'Before agents or GCP services, I lock boundaries: business outcome, users, and data environment. Primary question: is this patient-facing, or an assistive tool for care coordinators?',
      },
      {
        role: 'interviewer',
        text: 'Internal only. The agent drafts plans and suggests actions; a human always reviews.',
      },
      {
        role: 'you',
        text: 'That sets autonomy to Decision-Supporting with mandatory HITL — lower blast radius. Next: where does data live — on-prem EHR or cloud-native?',
      },
      {
        role: 'interviewer',
        text: 'Epic on-premise; some reporting data replicates to Cloud SQL. Insurance formularies are third-party APIs.',
      },
      {
        role: 'you',
        text: 'PHI + HIPAA is non-negotiable. Latency: coordinators are busy — what end-to-end time for a discharge plan draft?',
      },
      {
        role: 'interviewer',
        text: 'Manual today is ~45 minutes. A comprehensive draft + appointment suggestions in under 30 seconds would thrill them.',
      },
      {
        role: 'you',
        text: 'Final discovery: MVP success — cut the 45-minute window, or cut readmissions?',
      },
      {
        role: 'interviewer',
        text: 'MVP: reduce average handling time for discharge documentation by 50% without increasing error rates. Readmissions are longer-term.',
      },
    ],
  },
  {
    title: 'Phase 2 — MVP → Multi-Agent Pivot',
    turns: [
      {
        role: 'you',
        text: 'MVP stays a single Coordinator Agent on Cloud Run (stateless, fast autoscale). Core loop: coordinator enters patient ID → API Gateway → Agent Runtime → Gemini plans data gathering (history, formulary, clinic availability) via tools. I defend single-agent until a hard boundary is crossed.',
      },
      {
        role: 'interviewer',
        text: 'You have three domains — Epic on-prem, Cloud SQL, third-party insurance. Won’t one agent with a massive context hallucinate or drop instructions?',
      },
      {
        role: 'you',
        text: 'Valid. Tool count + domain complexity cross the Domain Complexity Boundary. I pivot to a Coordinator that routes to: (1) Data Extraction Agent — EHR via secure interconnect + Cloud SQL clinical profile; (2) Logistics Agent — scheduling + formulary; (3) Synthesis Agent — drafts the discharge summary. Tight prompts, less token bloat, easier debugging.',
      },
    ],
  },
  {
    title: 'Phase 3 — RAG & Clean Ingestion',
    turns: [
      {
        role: 'interviewer',
        text: 'Thousands of pages of internal discharge-protocol PDFs. How does the agent access those?',
      },
      {
        role: 'you',
        text: 'Enterprise RAG — not agent memory. Dual-path: batch ingest (repository → Document AI → section-aware chunking → Vertex embeddings → Vertex Vector Search / Vertex AI Search); online retrieve by patient condition into the Synthesis Agent for grounded drafting.',
      },
      {
        role: 'interviewer',
        text: 'What if a PDF mixes protocols with sensitive doctor notes?',
      },
      {
        role: 'you',
        text: 'Ingestion safety gate: Sensitive Data Protection (DLP) redacts leaked PHI/names before chunking so the vector index stays clean.',
      },
    ],
  },
  {
    title: 'Phase 4 — Guardrails on Writes',
    turns: [
      {
        role: 'interviewer',
        text: 'Logistics can hit the scheduling API. How do you stop it booking 50 appointments if it loops?',
      },
      {
        role: 'you',
        text: 'Three layers: (1) API — rate limits + idempotency keys; (2) Runtime — hard max tool calls per turn (e.g. 5); (3) Policy — booking is High-Risk Write: agent prepares the payload, UI shows proposed schedule, coordinator Approves, then the signed call executes with an immutable audit log.',
      },
    ],
  },
  {
    title: 'Phase 5 — Scale & Observability',
    turns: [
      {
        role: 'interviewer',
        text: 'Rollout to all 50 hospitals — how do you keep it reliable?',
      },
      {
        role: 'you',
        text: 'Cloud Run scales; bottlenecks are Epic and insurance APIs. Circuit breakers: if formulary is down, still emit the draft with an explicit gap — “Formulary unavailable; verify coverage manually.” Observability logs the full trajectory via Cloud Trace — prompt, tool choice, EHR JSON, RAG chunks — so a bad plan can be pinned to a sub-agent or source.',
      },
    ],
  },
  {
    title: 'Phase 6 — Evaluation & Go-Live',
    turns: [
      {
        role: 'interviewer',
        text: 'How do you prove to the CMO this is safe to turn on?',
      },
      {
        role: 'you',
        text: 'No production without offline eval. Build a Golden Dataset of ~100 anonymized historical profiles with gold discharge plans. Score groundedness, task completion, and Model Armor leakage. Pass thresholds → shadow mode on live cases → then coordinator-facing rollout.',
      },
    ],
  },
];

const FINANCE_PHASES: MockPhase[] = [
  {
    title: '1 — Scope & Discovery',
    turns: [
      {
        role: 'interviewer',
        text: 'Design an agentic AI system for a regulated financial enterprise: customer inquiries, basic account actions, and data-backed financial summaries. ~120,000 DAU. Walk me through from the ground up.',
      },
      {
        role: 'you',
        text: 'Primary constraints: regulatory compliance, PCI/privacy, and data security. Users: retail customers + internal support reps. Capabilities: policy Q&A, balance queries, simple actions (e.g. freeze card). 120k DAU is manageable on throughput; latency and cost-per-query need hard caps. Agentic systems are probabilistic — we design for graceful degradation and strict behavioral guardrails, not only classic failure modes.',
      },
    ],
  },
  {
    title: '2 — Data Foundations',
    turns: [
      {
        role: 'interviewer',
        text: 'How do you handle the data layer?',
      },
      {
        role: 'you',
        text: 'Separate by lifecycle (from the playbook). GCS for raw logs/policy PDFs; BigQuery as warehouse for structured account facts; Operational SoR stays Spanner/AlloyDB/Cloud SQL — agents never invent columns. Curated Gold metrics/Q&A/regulatory constraints. Looker (or equivalent semantic layer) so “monthly spend” hits a defined metric view — never raw hallucinated SQL.',
      },
    ],
  },
  {
    title: '3 — Core Agent Architecture',
    turns: [
      {
        role: 'interviewer',
        text: 'How does the agent think and act?',
      },
      {
        role: 'you',
        text: 'Orchestrator (Gemini via Vertex) separate from tools. Simple turns: ReAct. Complex analysis (“analyze spending, suggest a budget”): structured multi-step planning. Tools only via a Tool Gateway with OpenAPI schemas — RAG (Vertex AI Search), metrics (BigQuery/Looker), transactional APIs. Start single-agent; split when permission, complexity, or parallelism boundaries trip.',
      },
    ],
  },
  {
    title: '4 — HITL & Safety',
    turns: [
      {
        role: 'interviewer',
        text: 'Actions like “freeze my card” — how do you prevent disasters?',
      },
      {
        role: 'you',
        text: 'No day-one full autonomy. Tool Gateway uses the user’s OAuth token — agent has no global admin. High-risk writes (transfers, email changes): prepare payload → pause → user/agent approval with cryptographically signed ground-truth → then execute. DLP/Sensitive Data Protection before Gemini so PCI never lands in model logs. Model Armor on input and output.',
      },
    ],
  },
  {
    title: '5 — Eval & Observability',
    turns: [
      {
        role: 'interviewer',
        text: 'System is built. How do you prove it works safely?',
      },
      {
        role: 'you',
        text: 'Classic latency/error rates are not enough. RAG: retrieval, generation, citation quality. Agentic KPIs: tool-use success, hallucination rate, steps-to-resolution (catch planning loops). Cloud Trace for full trajectories. Continuous improvement: sample ~5% of logs → human review (Vertex AI Data Labeling) → refine prompts/routers. Shadow traffic before full customer cutover.',
      },
    ],
  },
];

const EDGE_CASES = [
  {
    q: 'Agent loops / runaway tool calls',
    a: 'Hard max tool calls per turn; idempotency keys on writes; circuit breaker on repeated identical failures; escalate to HITL after N retries.',
  },
  {
    q: 'Partial tool failure mid-plan',
    a: 'Persist plan state in session store; mark failed step; continue with available facts; surface explicit gaps in the user-facing draft — never invent missing data.',
  },
  {
    q: 'Prompt injection via uploaded docs or chat',
    a: 'Model Armor on input; treat retrieved text as untrusted data (not instructions); tool allowlists; never execute tools based solely on document-embedded directives.',
  },
  {
    q: 'Cross-tenant data bleed in RAG',
    a: 'Tenant ID as mandatory vector metadata filter at query time; deny-by-default ACL; separate indexes when residency requires it.',
  },
  {
    q: 'Stale EHR / warehouse lag',
    a: 'Expose data freshness timestamps in tool responses; Synthesis Agent must cite “as-of” times; block high-risk writes if freshness SLA is breached.',
  },
  {
    q: 'LLM quota exhaustion / 429 storms',
    a: 'Per-tenant Apigee quotas; semantic cache; backoff+jitter; degrade to FAQ/RAG-only templates with clear messaging.',
  },
  {
    q: 'Ambiguous user intent',
    a: 'Ask one clarifying question or present ranked options; do not guess on high-risk writes; log low-confidence for offline review.',
  },
  {
    q: 'Human never approves (HITL timeout)',
    a: 'TTL on pending actions; auto-expire with audit event; notify coordinator; never auto-execute after timeout.',
  },
  {
    q: 'On-prem interconnect down (Epic)',
    a: 'Circuit open → serve from last-known Cloud SQL reporting snapshot only if policy allows, else hard stop with “EHR unavailable” — no hallucinated clinical facts.',
  },
  {
    q: 'Cost explosion (long sessions)',
    a: 'Token budgets per session; summarize older turns into compact memory; route simple intents to smaller models; cache static policy answers.',
  },
  {
    q: 'Citation looks real but unsupported',
    a: 'Citation validator: every claim maps to retrieved chunk IDs; strip uncited claims or flag for human review before display.',
  },
  {
    q: 'Shadow mode vs A/B',
    a: 'Shadow: agent runs silently, compare to human gold. A/B: only after Golden Dataset + shadow thresholds pass; kill switch via feature flag.',
  },
];

function RoleBadge({ role }: { role: DialogueTurn['role'] }) {
  const isYou = role === 'you';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
        isYou
          ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-400/30'
          : 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30'
      }`}
    >
      {isYou ? 'You' : 'Interviewer'}
    </span>
  );
}

function DialogueBlock({ phases }: { phases: MockPhase[] }) {
  return (
    <div className="space-y-8">
      {phases.map((phase) => (
        <section key={phase.title}>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-400">
            <MessageSquare className="h-4 w-4" aria-hidden />
            {phase.title}
          </h3>
          <ol className="space-y-3">
            {phase.turns.map((turn, i) => (
              <li
                key={`${phase.title}-${i}`}
                className={`rounded-xl border p-4 sm:p-5 ${
                  turn.role === 'you'
                    ? 'border-blue-500/25 bg-blue-500/[0.07]'
                    : 'border-white/[0.08] bg-white/[0.03]'
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <RoleBadge role={turn.role} />
                </div>
                <p className="text-sm leading-relaxed text-zinc-200 sm:text-[15px]">{turn.text}</p>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function ScriptBox({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-teal-500/30 bg-teal-500/[0.08] p-5 sm:p-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">{title}</p>
      <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-100 sm:text-[15px]">{body}</p>
    </div>
  );
}

function PlaybookPanel() {
  return (
    <div className="space-y-12">
      <ScriptBox title="Opening script (0–2 min)" body={OPENING_SCRIPT} />

      <section>
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Phase 1 — Scope & Discovery</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Drive the interview. Cover all five dimensions before drawing boxes.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {DISCOVERY_DIMENSIONS.map((dim) => {
            const Icon = dim.icon;
            return (
              <article
                key={dim.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
              >
                <div className="mb-3 flex items-center gap-2 text-teal-300">
                  <Icon className="h-4 w-4" />
                  <h3 className="text-sm font-bold text-white">{dim.title}</h3>
                </div>
                <ul className="space-y-2">
                  {dim.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-500/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Phase 2 — MVP Core Loop</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Defend single-agent first. Split only when a hard boundary is crossed.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-zinc-300">
            Lean MVP: <span className="text-white">API Gateway → Agent Runtime (Cloud Run) → Gemini plan → tools → grounded response</span>,
            with HITL on any write that changes real-world state. Session state stays outside the compute layer.
          </p>
          <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
            Multi-agent decision framework
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {MULTI_AGENT_TRIGGERS.map((t) => (
              <div key={t.title} className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
                <p className="text-sm font-semibold text-emerald-200">{t.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Phase 3A — Isolated Data & RAG</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Never lump everything into “the database.” Separate by lifecycle and access pattern.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Layer</th>
                <th className="px-4 py-3 font-semibold">Purpose</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">GCP stack</th>
              </tr>
            </thead>
            <tbody>
              {DATA_LAYERS.map((row) => (
                <tr key={row.layer} className="border-t border-white/[0.06]">
                  <td className="px-4 py-3 font-medium text-white">{row.layer}</td>
                  <td className="px-4 py-3 text-zinc-400">{row.purpose}</td>
                  <td className="hidden px-4 py-3 text-teal-300/90 sm:table-cell">{row.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <h3 className="text-sm font-bold text-white">Dual-path RAG — batch ingest</h3>
            <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-sm text-zinc-400">
              <li>Pull docs from source repositories</li>
              <li>Document AI parse → DLP redact</li>
              <li>Section-aware chunking (not blind token cuts)</li>
              <li>Vertex embeddings → Vector Search / Vertex AI Search</li>
            </ol>
          </article>
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <h3 className="text-sm font-bold text-white">Dual-path RAG — online retrieve</h3>
            <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-sm text-zinc-400">
              <li>Query with tenant + ACL filters</li>
              <li>Hybrid / semantic retrieval + rerank</li>
              <li>Pass chunks as grounded context only</li>
              <li>Validate citations against retrieved IDs</li>
            </ol>
          </article>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Phase 3B — Five Guardrail Checkpoints</h2>
            <p className="mt-1 text-sm text-zinc-400">Security is a vertical cross-cut — not a bolt-on.</p>
          </div>
        </div>
        <div className="space-y-3">
          {GUARDRAIL_CHECKPOINTS.map((cp) => (
            <article
              key={cp.id}
              className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-4 sm:p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-rose-300">
                Checkpoint {cp.id} · {cp.title}
              </p>
              <ul className="mt-3 space-y-1.5">
                {cp.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-zinc-300">
                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Phase 3C — Scale & Resilience</h2>
            <p className="mt-1 text-sm text-zinc-400">Enterprise failure modes, not just happy-path boxes.</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESILIENCE.map((r) => (
            <article key={r.title} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">{r.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{r.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
            <Eye className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Phase 3D — Observability & Dual-Track Eval</h2>
            <p className="mt-1 text-sm text-zinc-400">Log trajectories, not just inputs and outputs.</p>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <Activity className="h-4 w-4 text-cyan-400" /> Trajectory stack
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <span className="text-zinc-200">Cloud Trace</span> — runtime, LLM steps, vector search, tool calls
              </li>
              <li>
                <span className="text-zinc-200">Cloud Logging</span> — session_id, turn_id, tokens, tools_called,
                policy_decision, guardrail_flags
              </li>
              <li>
                <span className="text-zinc-200">Cloud Monitoring</span> — token throughput, cost/session, tool
                failure rate, TTFT
              </li>
            </ul>
          </article>
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <Scale className="h-4 w-4 text-cyan-400" /> Dual-track evaluation
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <span className="text-zinc-200">Offline</span> — Golden Dataset; groundedness, task completion,
                safety flags
              </li>
              <li>
                <span className="text-zinc-200">Online</span> — shadow mode → sampled human review → prompt/router
                updates
              </li>
              <li>
                <span className="text-zinc-200">Gate</span> — only promote when both tracks meet thresholds
              </li>
            </ul>
          </article>
        </div>
      </section>

      <ScriptBox title="Closing summary (min 58–60)" body={CLOSING_SCRIPT} />
    </div>
  );
}

function EdgePanel() {
  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-zinc-400">
        Pressure questions interviewers use after the happy path. Answer in one breath: failure mode → control →
        user-visible behavior.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {EDGE_CASES.map((edge) => (
          <article key={edge.q} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <h3 className="text-sm font-bold text-amber-200">{edge.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{edge.a}</p>
          </article>
        ))}
      </div>
      <div className="rounded-2xl border border-blue-500/25 bg-blue-500/[0.07] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">ADK on Google platform</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-200">
          Frame ADK as the agent runtime/orchestration layer on Vertex AI: Gemini for reasoning, tools via OpenAPI,
          Cloud Run for stateless execution, Vertex Search/Vector Search for RAG, Model Armor + Sensitive Data
          Protection for guardrails, and Cloud Trace/Logging/Monitoring for trajectories. You are designing a{' '}
          <span className="text-white">system</span>, not a demo notebook.
        </p>
      </div>
    </div>
  );
}

export default function AdkSystemDesignInterview() {
  const [tab, setTab] = useState<TabId>('playbook');

  const tabMeta = useMemo(() => TABS.find((t) => t.id === tab) ?? TABS[0], [tab]);

  return (
    <main className="min-h-[calc(100dvh-3.75rem)] bg-[#06060f] font-sans text-zinc-100 selection:bg-blue-500/30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(66,133,244,0.22),transparent_60%)]" />

      <header className="relative border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl items-start gap-3 px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
          <PortfolioBackLink />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-300">
                <CircuitBoard className="h-3 w-3" aria-hidden />
                Google ADK
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                System design interview mock
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Agent System Design — Google Platform
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Interview-ready playbook for GCP agentic systems: one shared structure, two live mocks
              (healthcare + finance), and edge-case answers — no duplicated theory across tabs.
            </p>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-6xl px-5 py-6 sm:px-8 lg:px-12">
        <nav
          className="sticky top-[3.75rem] z-20 -mx-1 mb-8 flex gap-1.5 overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0a0a14]/95 p-1.5 backdrop-blur-md"
          aria-label="Interview sections"
        >
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`min-h-[44px] shrink-0 rounded-xl px-3.5 py-2 text-left transition sm:px-4 ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200'
                }`}
              >
                <span className="block text-sm font-semibold">{t.label}</span>
                <span className={`block text-[10px] ${active ? 'text-blue-100/80' : 'text-zinc-600'}`}>
                  {t.hint}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mb-6 flex items-center gap-2 text-xs text-zinc-500">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" aria-hidden />
          <span>
            Viewing <span className="text-zinc-300">{tabMeta.label}</span> — {tabMeta.hint}
          </span>
        </div>

        {tab === 'playbook' ? <PlaybookPanel /> : null}

        {tab === 'healthnet' ? (
          <div className="space-y-10">
            <div className="rounded-2xl border border-teal-500/25 bg-teal-500/[0.06] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-300">
                Scenario · HealthNet Solutions
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                Patient discharge & care coordination. Internal care coordinators, Epic on-prem + Cloud SQL +
                formulary APIs, HIPAA, HITL-required, MVP = 50% AHT cut without raising error rates. Apply the
                Playbook — do not restate every GCP box.
              </p>
            </div>
            <DialogueBlock phases={HEALTHNET_PHASES} />
            <MockInterviewTip>
              While you ask, fill the note pad from their answers (scope, FR/NFR, data, metrics). Only after the
              notes are locked do you sketch the architecture — then walk a sample UI if time remains.
            </MockInterviewTip>
            <HealthNetInterviewNotes />
            <HealthNetArchitectureDiagram />
            <HealthNetSampleArtifacts />
          </div>
        ) : null}

        {tab === 'finance' ? (
          <div className="space-y-10">
            <div className="rounded-2xl border border-blue-500/25 bg-blue-500/[0.06] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                Scenario · Regulated finance
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                120k DAU customer + support copilot: policy Q&A, balances, basic account actions, PCI constraints.
                Same Playbook phases — different risk surface and semantic-layer emphasis.
              </p>
            </div>
            <DialogueBlock phases={FINANCE_PHASES} />
            <MockInterviewTip>
              Same cadence: capture Scope &amp; Discovery notes from answers first, then draw orchestrator + tool
              gateway from those bullets.
            </MockInterviewTip>
            <FinanceInterviewNotes />
            <FinanceArchitectureDiagram />
            <FinanceSampleArtifacts />
          </div>
        ) : null}

        {tab === 'edges' ? <EdgePanel /> : null}

        <footer className="mt-14 border-t border-white/[0.06] pt-8 pb-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Related</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { href: '/portfolio/agentic-ai-system-design', label: 'Enterprise multi-agent design' },
              { href: '/portfolio/rag-systems', label: 'RAG pipeline' },
              { href: '/portfolio/agentic-tools-hub', label: 'Tools hub' },
              { href: '/portfolio/enterprise-llm-guide', label: 'LLM guide' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-zinc-300 transition hover:border-blue-500/40 hover:text-white"
              >
                {link.label}
                <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-xs text-zinc-600">
            <Network className="h-3.5 w-3.5" aria-hidden />
            Built for Google-platform agent interviews (ADK · Vertex · Cloud Run · Model Armor)
          </p>
        </footer>
      </div>
    </main>
  );
}
