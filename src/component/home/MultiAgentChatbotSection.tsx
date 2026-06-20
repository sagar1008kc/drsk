'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  GitMerge,
  CheckCircle2,
  Sparkles,
  Loader2,
  ExternalLink,
  MessageSquare,
  Layers,
  Network,
  Activity,
  Terminal,
  Shield,
  ShieldCheck,
  UserCircle,
  type LucideIcon,
} from 'lucide-react';
import {
  PARENT_AGENTS,
  FALLBACK_REPLY,
  FLOW_DELAYS,
  FLOW_STEP_MESSAGES,
  ROUTING_STAGES,
  SUGGESTIONS,
  SUB_AGENT_ICONS,
  WELCOME_MESSAGE,
  buildAgentReply,
  buildTechnicalFlowEvent,
  getParentAgent,
  getRoutingStageStatus,
  resolveAgent,
  type FlowStep,
  type ParentAgentId,
  type RouteResult,
  type RoutingStageId,
  type SubAgentId,
} from '@/lib/multi-agent-hub';
import { AI_CHAT_DISCLAIMER_SHORT } from '@/lib/ai-disclaimer';

type AgentCta = { text: string; url: string };

type Message = {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  parentAgent?: ParentAgentId;
  subAgent?: SubAgentId;
  subAgentName?: string;
  ctas?: AgentCta[];
  isFallback?: boolean;
};

type FlowEvent = {
  id: string;
  step: FlowStep;
  time: string;
  layer: string;
  action: string;
  detail: string;
};

const ACTIVE_STEPS = new Set<FlowStep>([
  'ingesting', 'classifying', 'routing', 'delegating', 'retrieving', 'synthesizing', 'delivering',
]);

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function MultiAgentChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: WELCOME_MESSAGE,
      parentAgent: undefined,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [flowStep, setFlowStep] = useState<FlowStep>('idle');
  const [activeParent, setActiveParent] = useState<ParentAgentId | 'router' | null>(null);
  const [activeSub, setActiveSub] = useState<SubAgentId | null>(null);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [flowEvents, setFlowEvents] = useState<FlowEvent[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLive = ACTIVE_STEPS.has(flowStep) || flowStep === 'complete';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  const pushEvent = (step: FlowStep, ctx: Parameters<typeof buildTechnicalFlowEvent>[1] = {}) => {
    const trace = buildTechnicalFlowEvent(step, ctx);
    setFlowEvents((prev) =>
      [
        {
          id: `${Date.now()}-${step}-${Math.random().toString(36).slice(2, 6)}`,
          step,
          time: formatTime(),
          ...trace,
        },
        ...prev,
      ].slice(0, 12)
    );
  };

  const runStep = async (
    step: FlowStep,
    ctx: Parameters<typeof buildTechnicalFlowEvent>[1] = {}
  ) => {
    setFlowStep(step);
    pushEvent(step, ctx);
    await new Promise((r) => setTimeout(r, FLOW_DELAYS[step as keyof typeof FLOW_DELAYS] ?? 300));
  };

  const processMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);
    setActiveParent('router');
    setActiveSub(null);
    setRouteResult(null);
    setFlowEvents([]);

    const traceCtx = { query: text };

    await runStep('ingesting', traceCtx);
    await runStep('classifying', traceCtx);

    const route = resolveAgent(text);
    if (!route) {
      await runStep('routing', { ...traceCtx, fallback: true });
      await runStep('synthesizing', { ...traceCtx, fallback: true });
      await runStep('delivering', { ...traceCtx, fallback: true });
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'agent', content: FALLBACK_REPLY, isFallback: true },
      ]);
      setFlowStep('complete');
      pushEvent('complete', { ...traceCtx, fallback: true });
      setIsTyping(false);
      await new Promise((r) => setTimeout(r, 1400));
      setFlowStep('idle');
      setActiveParent(null);
      return;
    }

    setRouteResult(route);
    const routedCtx = { ...traceCtx, route };
    await runStep('routing', routedCtx);
    await runStep('delegating', routedCtx);
    setActiveParent(route.parent);
    setActiveSub(route.subAgent);

    await runStep('retrieving', routedCtx);

    const reply = buildAgentReply(route);
    const hubMode = reply.content === PARENT_AGENTS[route.parent].hubResponse;

    await runStep('synthesizing', {
      ...routedCtx,
      hubMode,
      ctaCount: reply.ctas.length,
    });
    await runStep('delivering', { ...routedCtx, ctaCount: reply.ctas.length });
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: reply.content,
        parentAgent: route.parent,
        subAgent: route.subAgent,
        subAgentName: route.subAgentName,
        ctas: reply.ctas,
      },
    ]);

    setFlowStep('complete');
    pushEvent('complete', routedCtx);
    setIsTyping(false);
    await new Promise((r) => setTimeout(r, 1600));
    setFlowStep('idle');
    setActiveParent(null);
    setActiveSub(null);
  };

  const showSuggestions = !isTyping && (messages.length < 3 || messages.some((m) => m.isFallback));

  return (
    <section
      id="multi-agent-platform"
      aria-labelledby="multi-agent-platform-heading"
      className="relative -mt-[3.75rem] min-h-[100dvh] w-full bg-white pt-[3.75rem] text-zinc-900 font-sans overflow-hidden scroll-mt-[3.75rem]"
    >
      <h2 id="multi-agent-platform-heading" className="sr-only">SK Creation Multi-Agent Hub</h2>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_40%,rgba(13,148,136,0.04),transparent_55%),radial-gradient(ellipse_60%_45%_at_85%_60%,rgba(16,185,129,0.035),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex h-[calc(100dvh-3.75rem)] max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:gap-6 md:py-6">
        {/* Routing flow — top to bottom */}
        <div className="hidden min-h-0 md:flex md:w-[40%] md:min-w-[300px] lg:w-[36%]">
          <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border-2 border-teal-500/70 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="border-b border-zinc-200/80 bg-gradient-to-r from-zinc-50 to-teal-50/70 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600/10 ring-1 ring-teal-200">
                  <Network className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Agentic Orchestration Layer</h3>
                  <p className="text-[11px] text-zinc-500">Chat → Identity → Safety → Supervisor → Specialist → Guardrails → Response</p>
                </div>
              </div>
            </div>

            <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
              <div className="min-h-0 flex-[0_0_58%] overflow-y-auto p-4 pb-2 hub-scroll">
                <RagFlowStrip flowStep={flowStep} isLive={isLive} />
                <AgentRunMetrics
                  routeResult={routeResult}
                  events={flowEvents}
                  isLive={isLive}
                  flowStep={flowStep}
                />
                <OrchestrationDiagram
                  flowStep={flowStep}
                  isLive={isLive}
                  activeParent={activeParent}
                  activeSub={activeSub}
                  routeResult={routeResult}
                />
              </div>

              <OrchestrationTracePanel events={flowEvents} isLive={isLive} flowStep={flowStep} />
            </div>

            <div className="border-t border-teal-100 px-4 py-2 text-[10px] text-zinc-400">
              Demo · routes to real pages on this site
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border-2 border-teal-500/70 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="bg-gradient-to-r from-zinc-50 to-teal-50/70 border-b border-zinc-200/80 p-4 flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 bg-[#0d9488] rounded-full flex items-center justify-center shadow-lg shadow-teal-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <motion.span
                className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"
                animate={{ scale: isLive ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 1.5, repeat: isLive ? Infinity : 0 }}
              />
            </div>
            <div className="min-w-0 flex-1">
                <p className="font-semibold text-lg text-zinc-900">Site guide</p>
                <p className="text-xs text-zinc-500 truncate">
                  {flowStep !== 'idle' && flowStep !== 'complete'
                    ? FLOW_STEP_MESSAGES[flowStep as keyof typeof FLOW_STEP_MESSAGES] ?? 'Working on it…'
                    : 'Ask me where to go on this site'}
                </p>
            </div>
          </div>

          <div className="border-b border-zinc-200/70 px-3 py-3 md:hidden">
            <AgentRunMetrics
              routeResult={routeResult}
              events={flowEvents}
              isLive={isLive}
              flowStep={flowStep}
            />
            <div className="mt-3 max-h-48 overflow-hidden">
              <OrchestrationTracePanel events={flowEvents} isLive={isLive} flowStep={flowStep} compact />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                  </div>
                  <div className="bg-white border border-teal-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm min-w-[200px]">
                    <p className="text-[11px] font-semibold text-black mb-2">
                      {flowStep !== 'idle' && flowStep !== 'complete'
                        ? FLOW_STEP_MESSAGES[flowStep as keyof typeof FLOW_STEP_MESSAGES]
                        : 'One moment…'}
                    </p>
                    <div className="h-1.5 w-full rounded-full bg-teal-100 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                        animate={{ width: ['10%', '85%', '100%'] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-teal-200/60 bg-white/95">
            {showSuggestions && (
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => processMessage(s)}
                    className="text-xs px-3 py-2 rounded-full border border-teal-200 bg-teal-50 text-black hover:bg-teal-100 hover:border-teal-300 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); processMessage(input); }} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, Dr. SK, books, or articles…"
                className="w-full bg-white border-2 border-teal-200 rounded-xl pl-4 pr-12 py-4 text-sm text-black focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 placeholder:text-zinc-400"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 transition-colors shadow-md shadow-blue-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] leading-snug text-zinc-400">
              {AI_CHAT_DISCLAIMER_SHORT}
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar, .hub-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb, .hub-scroll::-webkit-scrollbar-thumb { background: #5eead4; border-radius: 8px; }
      `}} />
    </section>
  );
}

const LAYER_STYLES: Record<string, string> = {
  'Chat Experience': 'bg-zinc-100 text-black ring-zinc-200',
  Identity: 'bg-blue-50 text-blue-700 ring-blue-200',
  'Input Safety': 'bg-teal-50 text-teal-700 ring-teal-200',
  Supervisor: 'bg-green-50 text-green-700 ring-green-200',
  'Specialized Agent': 'bg-blue-50 text-blue-700 ring-blue-200',
  Guardrails: 'bg-teal-50 text-teal-700 ring-teal-200',
  'User Response': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Observability: 'bg-zinc-100 text-zinc-700 ring-zinc-200',
  System: 'bg-zinc-50 text-zinc-600 ring-zinc-200',
};

function OrchestrationTracePanel({
  events,
  isLive,
  flowStep,
  compact = false,
}: {
  events: FlowEvent[];
  isLive: boolean;
  flowStep: FlowStep;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-[#0f1117]/[0.03] ${
        compact ? 'h-48' : 'mx-4 mb-4 mt-1'
      }`}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-teal-100/80 bg-gradient-to-r from-teal-50/90 to-emerald-50/60 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-teal-600" aria-hidden />
          <p className="text-[11px] font-bold tracking-wide text-zinc-800">Orchestration trace</p>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
            isLive ? 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-200' : 'bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200'
          }`}
        >
          <Activity className={`h-2.5 w-2.5 ${isLive ? 'animate-pulse' : ''}`} aria-hidden />
          {isLive ? flowStep : 'idle'}
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto hub-scroll px-3 py-2.5">
        {events.length === 0 ? (
          <div className={`flex h-full flex-col items-center justify-center gap-2 text-center px-4 ${compact ? 'min-h-[92px]' : 'min-h-[120px]'}`}>
            <Terminal className="h-5 w-5 text-teal-400" aria-hidden />
            <p className="text-[11px] font-medium text-zinc-500">No trace events yet</p>
            <p className="text-[10px] leading-relaxed text-zinc-400 max-w-[220px]">
              Send a query to trace chat → identity → PII safety → supervisor → specialist → guardrails → response.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {events.map((ev) => (
              <li
                key={ev.id}
                className="rounded-lg border border-teal-100/80 bg-white/90 px-2.5 py-2 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                    <span className="font-mono text-[9px] text-zinc-400 shrink-0">{ev.time}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ring-1 ${
                        LAYER_STYLES[ev.layer] ?? LAYER_STYLES.System
                      }`}
                    >
                      {ev.layer}
                    </span>
                  </div>
                </div>
                <p className="mt-1 font-mono text-[10px] font-semibold text-black leading-snug">
                  {ev.action}
                </p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-zinc-600">{ev.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function AgentRunMetrics({
  routeResult,
  events,
  isLive,
  flowStep,
}: {
  routeResult: RouteResult | null;
  events: FlowEvent[];
  isLive: boolean;
  flowStep: FlowStep;
}) {
  const confidence = routeResult ? `${routeResult.confidence}%` : isLive ? 'scoring' : 'idle';
  const specialist = routeResult?.subAgentName ?? (isLive ? 'selecting' : 'standby');
  const matchedTerms = routeResult?.matchedTerms.slice(0, 3).join(', ') || 'awaiting query';

  const metrics = [
    {
      label: 'Confidence',
      value: confidence,
      tone: routeResult ? 'text-emerald-700 bg-emerald-50 ring-emerald-200' : 'text-zinc-600 bg-zinc-50 ring-zinc-200',
    },
    {
      label: 'Specialist',
      value: specialist,
      tone: routeResult ? 'text-teal-700 bg-teal-50 ring-teal-200' : 'text-zinc-600 bg-zinc-50 ring-zinc-200',
    },
    {
      label: 'Trace events',
      value: String(events.length),
      tone: events.length ? 'text-cyan-700 bg-cyan-50 ring-cyan-200' : 'text-zinc-600 bg-zinc-50 ring-zinc-200',
    },
    {
      label: 'State',
      value: isLive ? flowStep : 'ready',
      tone: isLive ? 'text-emerald-700 bg-emerald-50 ring-emerald-200' : 'text-zinc-600 bg-zinc-50 ring-zinc-200',
    },
  ];

  return (
    <div className="mt-3 rounded-xl border border-zinc-200/80 bg-white/90 p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[11px] font-bold text-zinc-900">Agent run metrics</p>
        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-teal-700 ring-1 ring-teal-200">
          agentic
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className={`rounded-lg px-2.5 py-2 ring-1 ${metric.tone}`}>
            <p className="text-[9px] font-semibold uppercase tracking-wide opacity-70">{metric.label}</p>
            <p className="mt-0.5 truncate text-[11px] font-bold">{metric.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 truncate text-[10px] text-zinc-500">
        Matched terms: <span className="font-medium text-zinc-700">{matchedTerms}</span>
      </p>
    </div>
  );
}

const RAG_PIPELINE = [
  'Chat',
  'Identity',
  'PII Safety',
  'Supervisor',
  'Specialist',
  'Guardrails',
  'Response',
] as const;

function getRagStepIndex(flowStep: FlowStep): number {
  if (flowStep === 'idle') return -1;
  if (flowStep === 'ingesting') return 0;
  if (flowStep === 'classifying') return 1;
  if (flowStep === 'routing') return 2;
  if (flowStep === 'delegating') return 3;
  if (flowStep === 'retrieving') return 4;
  if (flowStep === 'synthesizing') return 5;
  return 6;
}

function RagFlowStrip({ flowStep, isLive }: { flowStep: FlowStep; isLive: boolean }) {
  const activeIdx = getRagStepIndex(flowStep);

  return (
    <div className="rounded-xl border border-teal-200/60 bg-gradient-to-b from-teal-50/80 to-white px-3 py-3">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <p className="text-[11px] font-semibold text-black">Agentic pipeline</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200/80">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            animate={{ opacity: isLive ? [1, 0.35, 1] : 0.5 }}
            transition={{ duration: 1.4, repeat: isLive ? Infinity : 0 }}
          />
          live
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
        {RAG_PIPELINE.map((step, i) => {
          const isActive = activeIdx === i;
          const isDone = activeIdx > i;
          return (
            <React.Fragment key={step}>
              {i > 0 && <span className="text-[10px] text-teal-400">→</span>}
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/30'
                    : isDone
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70'
                      : 'bg-white text-zinc-500 ring-1 ring-teal-100'
                }`}
              >
                {step}
              </span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const STAGE_ICONS: Record<RoutingStageId, LucideIcon> = {
  chat: MessageSquare,
  identity: UserCircle,
  safety_input: Shield,
  supervisor: GitMerge,
  specialized: Layers,
  safety_output: ShieldCheck,
  response: CheckCircle2,
};

const STAGE_THEMES: Record<
  RoutingStageId,
  { text: string; border: string; bg: string; iconBorder: string; iconGlow: string; lineVia: string }
> = {
  chat: {
    text: 'text-black',
    border: 'border-zinc-300/80',
    bg: 'bg-zinc-50/70',
    iconBorder: 'border-zinc-400',
    iconGlow: 'shadow-[0_0_16px_rgba(0,0,0,0.12)]',
    lineVia: 'via-zinc-700',
  },
  identity: {
    text: 'text-blue-600',
    border: 'border-blue-200/80',
    bg: 'bg-blue-50/70',
    iconBorder: 'border-blue-400',
    iconGlow: 'shadow-[0_0_16px_rgba(37,99,235,0.35)]',
    lineVia: 'via-blue-500',
  },
  safety_input: {
    text: 'text-teal-600',
    border: 'border-teal-200/80',
    bg: 'bg-teal-50/70',
    iconBorder: 'border-teal-400',
    iconGlow: 'shadow-[0_0_16px_rgba(13,148,136,0.35)]',
    lineVia: 'via-teal-500',
  },
  supervisor: {
    text: 'text-green-600',
    border: 'border-green-200/80',
    bg: 'bg-green-50/70',
    iconBorder: 'border-green-400',
    iconGlow: 'shadow-[0_0_16px_rgba(22,163,74,0.35)]',
    lineVia: 'via-green-500',
  },
  specialized: {
    text: 'text-blue-600',
    border: 'border-blue-200/80',
    bg: 'bg-blue-50/70',
    iconBorder: 'border-blue-400',
    iconGlow: 'shadow-[0_0_16px_rgba(37,99,235,0.35)]',
    lineVia: 'via-blue-500',
  },
  safety_output: {
    text: 'text-teal-600',
    border: 'border-teal-200/80',
    bg: 'bg-teal-50/70',
    iconBorder: 'border-teal-400',
    iconGlow: 'shadow-[0_0_16px_rgba(13,148,136,0.35)]',
    lineVia: 'via-teal-500',
  },
  response: {
    text: 'text-emerald-600',
    border: 'border-emerald-200/80',
    bg: 'bg-emerald-50/70',
    iconBorder: 'border-emerald-400',
    iconGlow: 'shadow-[0_0_16px_rgba(16,185,129,0.35)]',
    lineVia: 'via-emerald-500',
  },
};

const FLOW_LINE_COLORS = [
  'via-zinc-700',
  'via-blue-500',
  'via-teal-500',
  'via-green-500',
  'via-blue-400',
  'via-teal-400',
  'via-emerald-500',
] as const;

function OrchestrationDiagram({
  flowStep,
  isLive,
  activeParent,
  activeSub,
  routeResult,
}: {
  flowStep: FlowStep;
  isLive: boolean;
  activeParent: ParentAgentId | 'router' | null;
  activeSub: SubAgentId | null;
  routeResult: RouteResult | null;
}) {
  return (
    <div className="relative mt-4">
      <div className="absolute left-[22px] top-4 bottom-4 w-[2px] rounded-full bg-teal-100/90" />
      <div className="pointer-events-none absolute left-[22px] top-4 bottom-4 w-[2px] overflow-hidden rounded-full">
        {FLOW_LINE_COLORS.map((via, i) => (
          <div
            key={via}
            className={`animate-agentic-flow-line absolute h-[26%] w-full bg-gradient-to-b from-transparent ${via} to-transparent ${
              isLive ? 'opacity-90' : 'opacity-35'
            }`}
            style={{
              animationDelay: `${i * 0.85}s`,
              animationDuration: isLive ? '3.2s' : '5.5s',
            }}
          />
        ))}
      </div>

      <div className="space-y-0">
        {ROUTING_STAGES.map((stage) => (
          <OrchestrationStageCard
            key={stage.id}
            stageId={stage.id}
            label={stage.label}
            desc={stage.desc}
            flowStep={flowStep}
            activeParent={activeParent}
            activeSub={activeSub}
            routeResult={routeResult}
          />
        ))}
      </div>
    </div>
  );
}

function OrchestrationStageCard({
  stageId,
  label,
  desc,
  flowStep,
  activeParent,
  activeSub,
  routeResult,
}: {
  stageId: RoutingStageId;
  label: string;
  desc: string;
  flowStep: FlowStep;
  activeParent: ParentAgentId | 'router' | null;
  activeSub: SubAgentId | null;
  routeResult: RouteResult | null;
}) {
  const status = getRoutingStageStatus(stageId, flowStep);
  const theme = STAGE_THEMES[stageId];
  const Icon = STAGE_ICONS[stageId];

  let detail: string | null = null;
  if (status === 'done' || status === 'active') {
    if (stageId === 'supervisor' && routeResult) {
      detail = getParentAgent(routeResult.parent).name;
    }
    if (stageId === 'specialized' && routeResult) {
      detail = `${getParentAgent(routeResult.parent).shortName} → ${routeResult.subAgentName}`;
    }
    if (stageId === 'safety_output' && status === 'active') {
      detail = 'Policy check running';
    }
    if (stageId === 'response' && status === 'done') {
      detail = 'Reply sent';
    }
  }

  return (
    <div
      className={`group relative flex gap-3 pb-4 last:pb-0 transition-opacity duration-300 ${
        status === 'waiting' ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="relative z-10 mt-1.5 shrink-0">
        <div
          className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white transition-all duration-500 ${theme.iconBorder} ${theme.text} ${
            status === 'active' ? theme.iconGlow : ''
          } ${status === 'done' ? 'border-emerald-400 bg-emerald-50/80' : ''}`}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden />
          {status === 'active' && (
            <span className={`absolute inset-0 rounded-full border-2 ${theme.iconBorder} animate-ping opacity-40`} />
          )}
          {status === 'done' && (
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
              <CheckCircle2 className="h-2.5 w-2.5" aria-hidden />
            </span>
          )}
        </div>
      </div>

      <div
        className={`min-w-0 flex-1 rounded-xl border backdrop-blur-sm transition-all duration-500 ${theme.border} ${
          status === 'active' ? `${theme.bg} shadow-sm ${theme.iconGlow}` : 'bg-white/80'
        } ${status === 'done' ? 'border-emerald-200/80 bg-emerald-50/40' : ''}`}
      >
        <div className="px-3 py-2.5">
          <p className={`text-[11px] font-bold tracking-wide uppercase ${theme.text}`}>{label}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{desc}</p>
          {detail && (
            <p
              className={`mt-1.5 text-[11px] font-semibold ${
                status === 'active' ? theme.text : 'text-emerald-700'
              }`}
            >
              {detail}
            </p>
          )}
          {stageId === 'specialized' && status !== 'waiting' && (
            <>
              <div className="mt-2 flex flex-wrap gap-1">
                {(Object.keys(PARENT_AGENTS) as ParentAgentId[]).map((id) => {
                  const a = PARENT_AGENTS[id];
                  const hit = activeParent === id || routeResult?.parent === id;
                  return (
                    <span
                      key={id}
                      className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold transition-colors ${
                        hit ? `${a.bgColor} ${a.color} ring-1 ${a.borderColor}` : 'bg-zinc-50 text-zinc-400'
                      }`}
                    >
                      {a.shortName}
                    </span>
                  );
                })}
              </div>
              {activeParent && activeParent !== 'router' && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {getParentAgent(activeParent).subAgents.map((sub) => (
                    <span
                      key={sub.id}
                      className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold transition-colors ${
                        activeSub === sub.id ? 'bg-teal-600 text-white' : 'bg-zinc-50 text-zinc-500'
                      }`}
                    >
                      {sub.name}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const parent = message.parentAgent ? getParentAgent(message.parentAgent) : null;
  const SubIcon = message.subAgent ? SUB_AGENT_ICONS[message.subAgent] : null;
  const ParentIcon = parent?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
        isUser ? 'bg-black border-black text-white'
          : parent ? `${parent.bgColor} ${parent.borderColor} ${parent.color}`
          : 'bg-teal-100 border-teal-200 text-teal-600'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : SubIcon ? <SubIcon className="w-4 h-4" /> : ParentIcon ? <ParentIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={`flex flex-col max-w-[88%] ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && parent && (
          <span className={`text-[10px] mb-1 font-medium ${parent.color}`}>
            {parent.name}
            {message.subAgentName && <span className="text-zinc-400"> · {message.subAgentName}</span>}
          </span>
        )}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
          isUser ? 'bg-black text-white rounded-tr-sm' : 'bg-white border border-teal-200/80 text-black rounded-tl-sm'
        }`}>
          {message.content}
          {!isUser && message.ctas && message.ctas.length > 0 && parent && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.ctas.map((cta) => (
                <a
                  key={cta.url + cta.text}
                  href={cta.url}
                  target={cta.url.startsWith('/') ? undefined : '_blank'}
                  rel={cta.url.startsWith('/') ? undefined : 'noopener noreferrer'}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition hover:-translate-y-0.5 ${parent.bgColor} ${parent.borderColor} ${parent.color}`}
                >
                  {cta.text}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
