'use client';

import { useMemo, useState } from 'react';

type LayerId = 'user' | 'gateway' | 'chat' | 'orchestration' | 'payment' | 'settlement' | 'observability';

type LayerContent = {
  label: string;
  title: string;
  description: string;
  intro: string;
  elements: string[];
  terminal: string;
  metrics: number[];
};

const LAYERS: Record<LayerId, LayerContent> = {
  user: {
    label: '1. User Intent',
    title: 'User Intent Layer',
    description: 'Natural language request + authenticated session.',
    intro:
      'The flow starts when an authenticated user expresses a business goal in natural language. The request is captured with session context before entering the trusted backend boundary.',
    elements: [
      "Natural language request: 'Use my rewards, upgrade plan'",
      'Authenticated session attached to the request',
      'User/account context carried forward as graph state',
    ],
    terminal: 'GET /auth/session ... 200 OK\nWS connect: wss://api.commerce.ai/chat ...',
    metrics: [50, 450, 1200, 300, 80],
  },
  gateway: {
    label: '2. Trust Boundary',
    title: 'API Gateway & Trust Boundary',
    description: 'JWT validation, WAF, rate limiting, and request sanitization.',
    intro:
      'The gateway is the first enforcement layer. It validates identity, applies perimeter protection, throttles abusive traffic, and sanitizes the request before AI processing.',
    elements: [
      'JWT validation and authorization scope checks',
      'WAF inspection and request sanitization',
      'Rate limiting by identity/session',
      'Safe routing into the AI chat service',
    ],
    terminal: 'INSPECTING JWT CLAIMS: scope:[commerce.read, commerce.write]\nWAF PASS: clean payload\nROUTE: /ai/chat',
    metrics: [900, 50, 50, 50, 50],
  },
  chat: {
    label: '3. AI Service',
    title: 'AI Chat Service',
    description: 'WebSocket streaming, session state, and graph invocation.',
    intro:
      'The chat service bridges the user interface and the agentic graph. It maintains session continuity, invokes the workflow graph, and streams progress/results back to the client.',
    elements: [
      'WebSocket streaming for low perceived latency',
      'Session state and thread continuity',
      'Graph invocation with user and request context',
    ],
    terminal: "THREAD_ID: clm_9921_abc\nINVOKING GRAPH: state={user_id:882,intent:'upgrade'}",
    metrics: [80, 650, 320, 120, 90],
  },
  orchestration: {
    label: '4. Orchestration',
    title: 'Multi-Agent Orchestration',
    description: 'Supervisor → Identity → Rewards → Policy RAG → Payment → Guardrail → HITL when needed.',
    intro:
      'The orchestration graph coordinates specialized agents through explicit state transitions. Each node reads and updates workflow state before the graph decides the next step.',
    elements: [
      'Supervisor Agent classifies and routes intent',
      'Identity Agent verifies account and scope',
      'Rewards Agent checks and applies points safely',
      'Policy RAG Agent retrieves business rules',
      'Payment Agent prepares checkout action',
      'Guardrail Agent validates final response',
      'Human-in-the-loop when confidence or risk requires review',
    ],
    terminal: 'AGENT[Identity]: verified\nAGENT[Policy]: rule check pass\nHITL: approved\nSTATE: transition -> PaymentAgent',
    metrics: [100, 1800, 1500, 200, 100],
  },
  payment: {
    label: '5. Payment',
    title: 'Secure Payment Orchestration Layer',
    description: 'Checkout session, payment provider, and webhook confirmation.',
    intro:
      'After approval, the payment agent creates a secure checkout session and waits for provider confirmation. The provider can be Stripe, Adyen, EPG, or an enterprise payment gateway.',
    elements: [
      'Checkout session generation',
      'Payment provider: Stripe, Adyen, EPG, or enterprise gateway',
      'Webhook confirmation and retry handling',
      'Payment status written back to workflow state',
    ],
    terminal: 'STRIPE_SESSION_CREATE: amount=49.99 currency=USD\nWEBHOOK: checkout.session.completed\nSTATUS: payment_confirmed',
    metrics: [100, 100, 100, 1400, 50],
  },
  settlement: {
    label: '6. Settlement',
    title: 'Event-Driven Settlement',
    description: 'Kafka event, subscription update, rewards ledger, notification, and audit log.',
    intro:
      'Payment confirmation publishes events for asynchronous fulfillment. Backend services update subscription state, adjust rewards, notify the user, and preserve an audit trail.',
    elements: [
      'Kafka event: payment.confirmed',
      'Subscription update with saga compensation',
      'Rewards ledger point deduction',
      'Notification through email/SMS/app channels',
      'Audit log for lifecycle evidence',
    ],
    terminal: "KAFKA_PUBLISH: commerce.transactions\nSUB_SERVICE: plan='Pro'\nREWARDS: -500 points\nNOTIFICATION: email dispatched",
    metrics: [50, 50, 100, 800, 600],
  },
  observability: {
    label: '7. Evaluation',
    title: 'Observability & Evaluation',
    description: 'Traces, latency, tool success, groundedness, human escalation, and cost.',
    intro:
      'Production agentic systems need application metrics and AI quality metrics. This layer records traces, evaluates tool/RAG behavior, tracks human escalation, and monitors cost.',
    elements: [
      'Distributed traces across chat, graph nodes, tools, and events',
      'Latency and cost by stage',
      'Tool-call success and retry rates',
      'RAG groundedness and retrieval hit rate',
      'Human escalation and unsupported-claim tracking',
    ],
    terminal: 'TRACE_ID: trc_8492\nTOOL_SUCCESS_RATE: 98.4%\nRAG_GROUNDEDNESS: 0.91\nHITL_ESCALATION: low\nCOST: within threshold',
    metrics: [120, 260, 180, 160, 90],
  },
};

const METRIC_LABELS = ['Auth/Security', 'AI Reasoning', 'RAG Lookup', 'Fulfillment', 'Notification'];

const AGENTS = [
  {
    name: 'Supervisor Agent',
    role: 'Classifies user intent and routes tasks to specialist agents',
  },
  {
    name: 'Identity Agent',
    role: 'Verifies user, vehicle/account, eligibility, and authorization scope',
  },
  {
    name: 'Rewards Agent',
    role: 'Checks available rewards balance and applies points safely',
  },
  {
    name: 'Policy RAG Agent',
    role: 'Retrieves business rules before upgrade or payment action',
  },
  {
    name: 'Payment Agent',
    role: 'Creates secure checkout session and waits for webhook confirmation',
  },
  {
    name: 'Notification Agent',
    role: 'Sends final confirmation through email/SMS/app notification',
  },
];

const FAILURE_MODES: Partial<Record<LayerId, string[]>> = {
  gateway: [
    'JWT validation fails -> reject request and require re-authentication',
    'WAF or sanitizer flags unsafe input -> block or return safe clarification',
    'Rate limit exceeded -> throttle request before it reaches the AI service',
  ],
  orchestration: [
    'Identity verification fails -> stop workflow and request re-authentication',
    'Policy RAG returns low confidence -> route to human review',
    'Tool call returns inconsistent data -> retry or ask supervisor to choose a fallback path',
  ],
  payment: [
    'Payment provider rejects checkout creation -> keep workflow state unpaid and show safe retry',
    'Payment webhook timeout -> retry and mark payment state as pending',
  ],
  settlement: [
    'Rewards ledger update fails -> compensate subscription update using saga pattern',
    'Notification failure -> queue retry without blocking fulfillment',
    'Audit log write fails -> store event in durable retry queue',
  ],
};

const AI_QUALITY_METRICS: Partial<Record<LayerId, string[]>> = {
  user: ['Intent clarity score', 'Request completeness rate'],
  gateway: ['Unsafe input block rate', 'Sanitization false-positive rate'],
  chat: ['Session continuity accuracy', 'Streaming completion rate'],
  orchestration: [
    'Intent classification accuracy',
    'Tool-call success rate',
    'RAG groundedness score',
    'Policy retrieval hit rate',
    'Human escalation rate',
    'Unsupported-claim rate',
  ],
  payment: ['Payment tool-call success rate', 'Webhook confirmation rate'],
  settlement: ['End-to-end task completion rate', 'Saga compensation rate', 'Notification delivery rate'],
  observability: [
    'Trace coverage',
    'Latency by graph node',
    'Cost per completed workflow',
    'Human escalation trend',
  ],
};

const STATE_SNAPSHOTS: Record<LayerId, string> = {
  user: `state = {
  userId: '882',
  intent: 'upgrade_plan_with_rewards',
  sessionStatus: 'authenticated',
  channel: 'websocket',
  requestText: 'Use my rewards, upgrade plan'
}`,
  gateway: `state = {
  userId: '882',
  jwtStatus: 'valid',
  authScope: ['commerce.read', 'commerce.write'],
  wafDecision: 'pass',
  rateLimitStatus: 'allowed',
  sanitized: true
}`,
  chat: `state = {
  userId: '882',
  threadId: 'clm_9921_abc',
  intent: 'upgrade_plan_with_rewards',
  streamStatus: 'active',
  graphInvocation: 'started'
}`,
  orchestration: `state = {
  userId: '882',
  intent: 'upgrade_plan_with_rewards',
  authStatus: 'verified',
  rewardsBalance: 1200,
  selectedPlan: 'Pro',
  policyDecision: 'eligible',
  hitlStatus: 'approved',
  nextNode: 'PaymentAgent'
}`,
  payment: `state = {
  userId: '882',
  selectedPlan: 'Pro',
  checkoutSessionId: 'cs_live_...',
  paymentProvider: 'Stripe',
  paymentStatus: 'confirmed',
  webhookStatus: 'received'
}`,
  settlement: `state = {
  paymentStatus: 'confirmed',
  kafkaEvent: 'payment.confirmed',
  subscriptionStatus: 'updated',
  rewardsLedgerStatus: 'deducted',
  notificationStatus: 'queued',
  auditStatus: 'written'
}`,
  observability: `state = {
  traceId: 'trc_8492',
  latencyMs: 1280,
  toolCallSuccessRate: 0.984,
  ragGroundedness: 0.91,
  humanEscalation: 'low',
  costStatus: 'within_threshold'
}`,
};

export default function AiCommerceOrchestrationPage() {
  const [active, setActive] = useState<LayerId>('user');
  const layer = LAYERS[active];
  const maxMetric = useMemo(() => Math.max(...layer.metrics, 1), [layer.metrics]);

  return (
    <main className="min-h-[calc(100dvh-3.75rem)] bg-slate-50 px-4 py-5 text-slate-900 sm:px-6 lg:px-8 lg:py-6">
      <header className="mx-auto mb-5 max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            Multi-Agent Workflow Map
            </h1>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500 sm:text-sm">
              Visualizing the full journey from natural language intent to agentic reasoning,
              payment orchestration, settlement, telemetry, and notifications.
            </p>
          </div>
        </div>
      </header>

      <nav className="mx-auto mb-5 grid max-w-7xl grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7" aria-label="Architecture layers">
        {(Object.keys(LAYERS) as LayerId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={`rounded-lg border px-3 py-2 text-center text-[10px] font-bold uppercase shadow-sm transition ${
              active === id
                ? 'border-teal-600 bg-teal-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50'
            }`}
          >
            {LAYERS[id].label}
          </button>
        ))}
      </nav>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600">Layer Detail</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">{layer.title}</h2>
            <p className="mt-1 text-sm font-medium italic text-slate-500">{layer.description}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{layer.intro}</p>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Core Components
                </h3>
                <ul className="space-y-2">
                  {layer.elements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-teal-50">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                      </span>
                      <span className="font-medium text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Execution Log Trace
                </h3>
                <pre className="whitespace-pre-wrap rounded-lg bg-slate-900 p-4 font-mono text-xs leading-relaxed text-emerald-400 shadow-inner">
                  {layer.terminal}
                </pre>
              </div>
            </div>
          </article>

          {active === 'orchestration' ? (
            <article className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                 
                  <h3 className="mt-1 text-xl font-bold text-slate-950">Agents and Responsibilities</h3>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-700 ring-1 ring-teal-200">
                  Graph Nodes
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {AGENTS.map((agent) => (
                  <div key={agent.name} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-sm font-bold text-slate-900">{agent.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{agent.role}</p>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          <article className="rounded-2xl bg-slate-900 p-5 text-slate-100 shadow-xl sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Observability & Telemetry
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <p className="text-xs leading-relaxed text-slate-400">
                  Continuous monitoring of traces and metrics across the distributed stack.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs sm:text-sm">
                  <li><span className="text-teal-400">●</span> LangSmith: agent chain traces</li>
                  <li><span className="text-emerald-400">●</span> OpenTelemetry: cross-service spans</li>
                  <li><span className="text-amber-400">●</span> Datadog: throughput and error rates</li>
                  <li><span className="text-slate-400">●</span> CloudWatch: system logs</li>
                </ul>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                <p className="mb-2 text-[10px] font-bold uppercase text-slate-500">
                  Simulation: Resource Cost / Layer
                </p>
                <div className="flex h-20 items-end gap-1 rounded bg-slate-900 px-2 pb-2">
                  {layer.metrics.map((value, i) => (
                    <div
                      key={`${value}-${METRIC_LABELS[i]}`}
                      className="flex-1 rounded-t bg-teal-500/70"
                      style={{ height: `${Math.max(14, (value / maxMetric) * 100)}%` }}
                      title={METRIC_LABELS[i]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        <aside className="space-y-5 lg:col-span-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Layer State Snapshot
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Each layer reads from and writes to workflow state. The graph uses that state to
              decide the next transition instead of randomly calling agents.
            </p>
            <pre className="mt-4 max-h-64 overflow-auto rounded-xl bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-emerald-300">
              {STATE_SNAPSHOTS[active]}
            </pre>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-slate-500">
              System Performance Metrics
            </h3>
            <div className="space-y-3">
              {METRIC_LABELS.map((label, i) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs font-semibold text-slate-500">
                    <span>{label}</span>
                    <span>{layer.metrics[i]} ms</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
                      style={{ width: `${Math.max(8, (layer.metrics[i] / maxMetric) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-4">
              <h4 className="mb-2 text-xs font-bold uppercase text-slate-400">Layer Latency Insights</h4>
              <p className="text-xs italic leading-relaxed text-slate-600">
                The active layer highlights where architecture pressure appears across security,
                reasoning, retrieval, fulfillment, and notifications.
              </p>
            </div>
          </article>

          {FAILURE_MODES[active]?.length ? (
            <article className="rounded-2xl border border-rose-100 bg-rose-50 p-5 sm:p-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-rose-700">
                Failure & Fallback Paths
              </h3>
              <ul className="space-y-2">
                {FAILURE_MODES[active]?.map((mode) => (
                  <li key={mode} className="flex gap-2 text-xs leading-relaxed text-rose-900">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                    <span>{mode}</span>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {AI_QUALITY_METRICS[active]?.length ? (
            <article className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5 sm:p-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-800">
                AI Quality Metrics
              </h3>
              <div className="flex flex-wrap gap-2">
                {AI_QUALITY_METRICS[active]?.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-cyan-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-cyan-800"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </article>
          ) : null}

          <article className="rounded-2xl border border-teal-100 bg-teal-50 p-5 sm:p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-teal-900">
              <span aria-hidden>💡</span> Architect&apos;s Insight
            </h3>
            <p className="text-sm leading-relaxed text-teal-800">
              By using a saga pattern in the settlement layer, the subscription update can be
              compensated if the rewards ledger fails, preserving consistency across Kafka-driven services.
            </p>
          </article>
        </aside>
      </section>
    </main>
  );
}
