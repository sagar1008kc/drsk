'use client';

import type { ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck,
  Lock,
  Shield,
  Stethoscope,
  UserCheck,
} from 'lucide-react';

function DiagramShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
        <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#0c1220] to-[#08080f] p-4 sm:p-6">
        {children}
      </div>
    </section>
  );
}

function Node({
  label,
  sub,
  tone = 'default',
  wide,
}: {
  label: string;
  sub?: string;
  tone?: 'default' | 'user' | 'agent' | 'data' | 'security' | 'hitl' | 'obs';
  wide?: boolean;
}) {
  const tones = {
    default: 'border-white/15 bg-white/[0.04] text-zinc-200',
    user: 'border-sky-500/40 bg-sky-500/10 text-sky-100',
    agent: 'border-blue-500/45 bg-blue-500/15 text-blue-100',
    data: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100',
    security: 'border-rose-500/40 bg-rose-500/10 text-rose-100',
    hitl: 'border-amber-500/45 bg-amber-500/12 text-amber-100',
    obs: 'border-violet-500/40 bg-violet-500/10 text-violet-100',
  } as const;

  return (
    <div
      className={`rounded-xl border px-3 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${tones[tone]} ${
        wide ? 'w-full' : 'min-w-[9.5rem] flex-1'
      }`}
    >
      <p className="text-[11px] font-bold leading-snug sm:text-xs">{label}</p>
      {sub ? <p className="mt-0.5 text-[10px] leading-snug opacity-70">{sub}</p> : null}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-1.5 text-zinc-600" aria-hidden>
      <ArrowDown className="h-4 w-4" />
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-stretch justify-center gap-2">{children}</div>;
}

export function HealthNetArchitectureDiagram() {
  return (
    <DiagramShell
      title="Whiteboard the architecture"
      subtitle="What you draw after discovery — multi-agent HealthNet on GCP / ADK."
    >
      <div className="mx-auto max-w-3xl">
        <Node wide label="Care Coordinator Portal" sub="Patient ID · draft review · Approve" tone="user" />
        <FlowArrow />
        <Row>
          <Node label="Apigee / Identity" sub="AuthN · rate limits" tone="security" />
          <Node label="Model Armor + DLP" sub="Injection · PHI redact" tone="security" />
        </Row>
        <FlowArrow />
        <Node wide label="Coordinator Agent · ADK on Cloud Run" sub="Gemini plan · route · assemble" tone="agent" />
        <FlowArrow />
        <Row>
          <Node label="Data Extraction" sub="Epic interconnect · Cloud SQL" tone="data" />
          <Node label="Logistics" sub="Formulary API · Scheduling" tone="data" />
          <Node label="Synthesis" sub="Vertex Vector Search protocols" tone="data" />
        </Row>
        <FlowArrow />
        <Row>
          <Node label="Session · Memorystore" sub="Turn / plan state" />
          <Node label="RAG Index · Vertex" sub="DLP-clean protocols" tone="data" />
          <Node label="HITL Gate" sub="High-risk writes paused" tone="hitl" />
        </Row>
        <FlowArrow />
        <Row>
          <Node label="Cloud Trace / Logging" sub="Full trajectory" tone="obs" />
          <Node label="Circuit Breakers" sub="Graceful degrade" tone="obs" />
        </Row>
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-[11px] leading-relaxed text-zinc-500">
        Say aloud: “Single agent until domain complexity forces the split — then Coordinator + three specialists,
        writes only after human Approve.”
      </p>
    </DiagramShell>
  );
}

export function FinanceArchitectureDiagram() {
  return (
    <DiagramShell
      title="Whiteboard the architecture"
      subtitle="120k DAU finance copilot — orchestrator, tool gateway, semantic layer, HITL."
    >
      <div className="mx-auto max-w-3xl">
        <Row>
          <Node label="Retail Banking App" sub="Customer chat" tone="user" />
          <Node label="Support Console" sub="Internal rep" tone="user" />
        </Row>
        <FlowArrow />
        <Row>
          <Node label="Apigee + OAuth" sub="User-scoped tokens" tone="security" />
          <Node label="Model Armor + DLP" sub="PCI redaction" tone="security" />
        </Row>
        <FlowArrow />
        <Node
          wide
          label="Orchestrator · ADK / Gemini on Vertex"
          sub="ReAct · structured plans · no direct DB writes"
          tone="agent"
        />
        <FlowArrow />
        <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
          Tool Gateway (OpenAPI)
        </p>
        <Row>
          <Node label="RAG Tool" sub="Vertex AI Search policies" tone="data" />
          <Node label="Metrics Tool" sub="Looker → BigQuery views" tone="data" />
          <Node label="Actions Tool" sub="Freeze · transfer APIs" tone="data" />
        </Row>
        <FlowArrow />
        <Row>
          <Node label="Session Redis/Firestore" sub="Short-term state" />
          <Node label="Ops SoR Spanner/SQL" sub="Accounts · cards" tone="data" />
          <Node label="HITL Approval" sub="High-risk signed confirm" tone="hitl" />
        </Row>
        <FlowArrow />
        <Row>
          <Node label="Semantic Cache" sub="Static FAQ bypass" tone="obs" />
          <Node label="Trace + Eval" sub="Shadow · golden set" tone="obs" />
        </Row>
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-[11px] leading-relaxed text-zinc-500">
        Say aloud: “Agent proposes; gateway executes with the user’s token; high-risk actions wait for
        cryptographically signed approval.”
      </p>
    </DiagramShell>
  );
}

export function HealthNetSampleArtifacts() {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white sm:text-xl">Live sample — coordinator UI</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Not a Google Doc. This is the artifact you describe: draft plan + HITL approve surface.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-teal-500/25 bg-[#0a1214] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] bg-teal-500/[0.08] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-teal-300" />
            <div>
              <p className="text-sm font-bold text-white">Discharge Copilot · HealthNet</p>
              <p className="text-[10px] text-teal-200/70">MRN ••••4821 · Encounter ENC-99201 · PHI redacted in logs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 ring-1 ring-amber-400/30">
              Awaiting approval
            </span>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
              18.4s · grounded
            </span>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-5">
          <div className="space-y-4 border-b border-white/[0.06] p-4 sm:p-5 lg:col-span-3 lg:border-b-0 lg:border-r">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">Clinical profile</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {['CHF exacerbation', 'eGFR 48', 'On metformin', 'PCP: Dr. Reyes'].map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-zinc-500">Sources: Epic FHIR + Cloud SQL reporting · as-of 14:02 CT</p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                Draft discharge summary
              </p>
              <div className="mt-2 rounded-xl border border-white/[0.08] bg-black/30 p-3.5 text-sm leading-relaxed text-zinc-200">
                Patient admitted for acute CHF exacerbation. Diuresis complete; weight −4.2 kg; O₂ sat 96% RA.
                Continue carvedilol / losartan; hold metformin pending nephrology follow-up. Low-sodium diet;
                daily weights; call if SOB or gain &gt;2 lb/day.
                <span className="mt-2 block text-[11px] text-teal-300/90">
                  Citations: Protocol CHF-DC-07 §3 · Protocol MED-RENAL-12 §1
                </span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                Proposed schedule (not executed)
              </p>
              <ul className="mt-2 space-y-2">
                {[
                  { when: 'Thu 10:30', where: 'Cardiology · Clinic B', risk: 'High-risk write' },
                  { when: 'Fri 09:00', where: 'Nephrology telehealth', risk: 'High-risk write' },
                ].map((row) => (
                  <li
                    key={row.when}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-500/25 bg-amber-500/[0.06] px-3 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {row.when} · {row.where}
                      </p>
                      <p className="text-[10px] text-amber-200/80">{row.risk} · idempotency key ready</p>
                    </div>
                    <Clock className="h-4 w-4 text-amber-300/70" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5 lg:col-span-2">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                <FileCheck className="h-3.5 w-3.5 text-teal-400" /> Agent trajectory
              </p>
              <ol className="mt-3 space-y-2 font-mono text-[10px] text-zinc-400">
                <li>1. extract_ehr(patient) → ok</li>
                <li>2. query_cloudsql(labs) → ok</li>
                <li>3. formulary_check → circuit open → gap noted</li>
                <li>4. rag_protocol(“CHF discharge”) → 2 chunks</li>
                <li>5. propose_appointments → pending HITL</li>
              </ol>
              <p className="mt-3 text-[10px] text-amber-200/90">
                Gap: Formulary API unavailable — verify med coverage manually.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                Human-in-the-loop
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                Booking APIs stay blocked until you approve. Agent prepared payloads only.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3 text-xs font-bold text-white"
                >
                  <UserCheck className="h-3.5 w-3.5" /> Approve schedule
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-300"
                >
                  Edit draft
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] leading-relaxed text-zinc-500">
              <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
              Guardrails: Model Armor in/out · DLP on RAG ingest · max 5 tool calls/turn · audit to BigQuery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinanceSampleArtifacts() {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white sm:text-xl">Live sample — banking copilot</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Product surface you pitch: grounded answer, semantic metrics, high-risk action paused.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-blue-500/25 bg-[#0a0e18] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] bg-blue-500/[0.08] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-blue-300" />
            <div>
              <p className="text-sm font-bold text-white">Apex Bank · Agentic Assist</p>
              <p className="text-[10px] text-blue-200/70">User-scoped OAuth · PCI redacted · 120k DAU tier</p>
            </div>
          </div>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-zinc-400 ring-1 ring-white/10">
            Session s_8f2a · turn 3
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-5">
          <div className="space-y-4 border-b border-white/[0.06] p-4 sm:p-5 lg:col-span-3 lg:border-b-0 lg:border-r">
            <div className="space-y-3">
              <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-blue-600/90 px-3.5 py-2.5 text-sm text-white">
                Analyze my last 30 days of spend and freeze my travel card — I think it was skimmed.
              </div>
              <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] px-3.5 py-3 text-sm leading-relaxed text-zinc-200">
                <p>
                  Using the Looker metric view <span className="text-blue-300">monthly_spend_by_mcc</span> (not
                  raw SQL): dining 38%, travel 22%, retail 19%. Unusual spike: 4 charges at{' '}
                  <span className="text-white">POS-UNKNOWN-TX</span> totaling $412 — flagged by fraud rules.
                </p>
                <p className="mt-2 text-[11px] text-blue-300/90">
                  Policy cite: Card Freeze Policy §2.1 · Fraud Hold SLA §4
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                Spend snapshot (semantic layer)
              </p>
              <div className="mt-2 space-y-2">
                {[
                  { label: 'Dining', pct: 38, amt: '$1,240' },
                  { label: 'Travel', pct: 22, amt: '$718' },
                  { label: 'Retail', pct: 19, amt: '$620' },
                  { label: 'Other', pct: 21, amt: '$686' },
                ].map((bar) => (
                  <div key={bar.label} className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-[11px] text-zinc-400">{bar.label}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                    <span className="w-14 shrink-0 text-right text-[11px] font-medium text-zinc-300">{bar.amt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5 lg:col-span-2">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.08] p-3.5">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300">
                <Lock className="h-3.5 w-3.5" /> High-risk write · paused
              </p>
              <p className="mt-2 text-xs text-zinc-300">
                Action: <span className="font-semibold text-white">freeze_card</span> · card ••••4412
              </p>
              <p className="mt-1 text-[10px] text-zinc-500">
                Payload prepared · waiting for signed device approval · agent has no admin token
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-bold text-white"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Confirm freeze
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-300"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">Tool plan</p>
              <ol className="mt-3 space-y-2 font-mono text-[10px] text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" /> get_rewards / spend metrics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" /> search_policy(“card freeze”)
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-amber-400" /> freeze_card → HITL
                </li>
              </ol>
            </div>

            <div className="flex items-start gap-2 text-[11px] leading-relaxed text-zinc-500">
              <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
              DLP strips PAN before Gemini · Apigee enforces per-tenant LLM quota · idempotent freeze key
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MockInterviewTip({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
      <p>{children}</p>
    </div>
  );
}

type NoteBlock = {
  heading: string;
  lines: string[];
};

function InterviewNotepad({
  title,
  eyebrow,
  accent,
  blocks,
}: {
  title: string;
  eyebrow: string;
  accent: 'teal' | 'blue';
  blocks: NoteBlock[];
}) {
  const accentClass =
    accent === 'teal'
      ? 'border-teal-500/30 from-teal-500/[0.07]'
      : 'border-blue-500/30 from-blue-500/[0.07]';
  const headingClass = accent === 'teal' ? 'text-teal-300' : 'text-blue-300';

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
        <p className="mt-1 text-sm text-zinc-400">
          What you jot in real time while asking — then you sketch the diagram from these bullets.
        </p>
      </div>

      <div
        className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent ${accentClass}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 27px, rgba(255,255,255,0.04) 28px)',
            backgroundPosition: '0 12px',
          }}
          aria-hidden
        />
        <div className="relative border-b border-white/[0.08] px-4 py-3 sm:px-5">
          <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${headingClass}`}>{eyebrow}</p>
          <p className="mt-1 font-mono text-xs text-zinc-500">Live interview notes · filled from Q&amp;A answers</p>
        </div>

        <div className="relative grid gap-0 md:grid-cols-2 md:divide-x md:divide-white/[0.06]">
          {blocks.map((block) => (
            <div key={block.heading} className="border-b border-white/[0.06] p-4 sm:p-5">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                ▸ {block.heading}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {block.lines.map((line) => (
                  <li key={line} className="flex gap-2 font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-[13px]">
                    <span className="shrink-0 text-zinc-600">–</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Filled from HealthNet mock answers while you ask discovery questions. */
export function HealthNetInterviewNotes() {
  return (
    <InterviewNotepad
      title="Scope & Discovery notes (sample)"
      eyebrow="HealthNet · captured during Q&A"
      accent="teal"
      blocks={[
        {
          heading: 'Problem / Users',
          lines: [
            'Automate discharge + post-care coordination (today manual, slow, error-prone)',
            'Primary user = internal care coordinators (NOT patient-facing)',
            'Autonomy = Decision-supporting → agent drafts; human always reviews',
          ],
        },
        {
          heading: 'Functional requirements (MVP)',
          lines: [
            'Ingest patient ID → pull chart / clinical profile',
            'Check insurance formulary suggestions',
            'Propose follow-up appointments across clinics',
            'Draft discharge summary grounded in protocols',
            'HITL Approve before any booking / write',
          ],
        },
        {
          heading: 'Non-functional',
          lines: [
            'Latency: draft + appt suggestions < 30s E2E (manual today ~45 min)',
            'Accuracy critical — no increase in error rates',
            'HIPAA / PHI mandatory; auditability required',
            'Graceful degrade if Epic or formulary APIs fail',
          ],
        },
        {
          heading: 'Data foundation',
          lines: [
            'SoR: Epic on-prem EHR (secure interconnect)',
            'Reporting replica: Cloud SQL',
            'External: 3rd-party insurance formulary APIs',
            'Knowledge: internal discharge-protocol PDFs → Enterprise RAG (DLP before index)',
            'Separate: Session / Memory / RAG / Ops — never one “DB”',
          ],
        },
        {
          heading: 'Success metrics (MVP)',
          lines: [
            '↓ Average Handling Time for discharge docs by 50%',
            'Error rate ≤ baseline (no regression)',
            'Later: readmission rates (out of MVP scope)',
            'AI quality: groundedness, citation accuracy, tool precision',
          ],
        },
        {
          heading: 'Assumptions / open risks',
          lines: [
            'Multi-agent if tool/domain complexity crosses boundary',
            'Booking = HIGH-RISK WRITE → prepare only until Approve',
            'Formulary may be down → note gap in draft, don’t invent coverage',
            'Golden set + shadow before CMO go-live',
          ],
        },
      ]}
    />
  );
}

/** Filled from Finance mock answers while you ask discovery questions. */
export function FinanceInterviewNotes() {
  return (
    <InterviewNotepad
      title="Scope & Discovery notes (sample)"
      eyebrow="Regulated finance · captured during Q&A"
      accent="blue"
      blocks={[
        {
          heading: 'Problem / Users',
          lines: [
            'Agentic system: inquiries + basic account actions + data-backed summaries',
            'Users: retail banking customers + internal support reps',
            'Primary constraints: regulation, PCI/privacy, data security',
          ],
        },
        {
          heading: 'Functional requirements (MVP)',
          lines: [
            'Answer policy questions (RAG-grounded)',
            'Query account balances / spend summaries',
            'Simple actions e.g. freeze card (via tool gateway)',
            'Orchestrator plans; tools execute — no raw SQL from LLM',
            'HITL / signed approval on high-risk writes (transfer, email change, etc.)',
          ],
        },
        {
          heading: 'Non-functional',
          lines: [
            'Scale: ~120k DAU (throughput OK; watch latency + $/query)',
            'Strict behavioral guardrails + graceful degradation',
            'PCI: no PAN in model logs (DLP before Gemini)',
            'Per-tenant rate limits / LLM quotas (Apigee)',
          ],
        },
        {
          heading: 'Data foundation',
          lines: [
            'GCS: raw logs + unstructured policy PDFs',
            'BigQuery: warehouse for structured account/analytics facts',
            'Ops SoR: Spanner / AlloyDB / Cloud SQL (authoritative)',
            'Semantic layer: Looker metric views (e.g. monthly_spend) — no hallucinated SQL',
            'Gold dataset: verified metrics, Q&A, regulatory constraints',
          ],
        },
        {
          heading: 'Success metrics',
          lines: [
            'Task completion / steps-to-resolution (catch loops)',
            'Tool-use success rate; hallucination rate',
            'RAG: retrieval + generation + citation quality',
            'Cost per completed task; TTFT / p95 latency caps',
          ],
        },
        {
          heading: 'Assumptions / open risks',
          lines: [
            'Day-1: not full autonomy on writes',
            'Tool gateway uses user OAuth — agent has no global admin',
            'Start single-agent; split on permission / complexity / parallelism',
            'Offline golden → shadow → promote; sample ~5% for human review',
          ],
        },
      ]}
    />
  );
}
