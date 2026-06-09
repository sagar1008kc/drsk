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
      className="relative -mt-[3.75rem] min-h-[100dvh] w-full bg-gradient-to-br from-[#F8F7FF] via-white to-indigo-50/90 pt-[3.75rem] text-zinc-900 font-sans overflow-hidden scroll-mt-[3.75rem]"
    >
      <h2 id="multi-agent-platform-heading" className="sr-only">SK Creation Multi-Agent Hub</h2>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(139,92,246,0.1),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_60%,rgba(99,102,241,0.07),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex h-[calc(100dvh-3.75rem)] max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:gap-6 md:py-6">
        {/* Routing flow — top to bottom */}
        <div className="hidden min-h-0 md:flex md:w-[40%] md:min-w-[300px] lg:w-[36%]">
          <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-violet-200/80 bg-white/92 shadow-[0_12px_40px_rgba(139,92,246,0.14)] backdrop-blur-xl">
            <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/10 ring-1 ring-violet-200">
                  <Network className="h-4 w-4 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Agentic Orchestration Layer</h3>
                  <p className="text-[11px] text-zinc-500">Chat → Identity → Safety → Supervisor → Specialist → Guardrails → Response</p>
                </div>
              </div>
            </div>

            <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
              <div className="shrink-0 overflow-y-auto p-4 pb-2 hub-scroll">
                <RagFlowStrip flowStep={flowStep} isLive={isLive} />
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

            <div className="border-t border-violet-100 px-4 py-2 text-[10px] text-zinc-400">
              Demo · routes to real pages on this site
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-violet-200/80 bg-white/92 shadow-[0_12px_40px_rgba(139,92,246,0.14)] backdrop-blur-xl">
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border-b border-violet-200/60 p-4 flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/25">
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

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-violet-600 animate-spin" />
                  </div>
                  <div className="bg-white border border-violet-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm min-w-[200px]">
                    <p className="text-[11px] font-semibold text-violet-700 mb-2">
                      {flowStep !== 'idle' && flowStep !== 'complete'
                        ? FLOW_STEP_MESSAGES[flowStep as keyof typeof FLOW_STEP_MESSAGES]
                        : 'One moment…'}
                    </p>
                    <div className="h-1.5 w-full rounded-full bg-violet-100 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
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

          <div className="p-4 border-t border-violet-200/60 bg-white/95">
            {showSuggestions && (
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => processMessage(s)}
                    className="text-xs px-3 py-2 rounded-full border border-violet-200 bg-violet-50 text-violet-800 hover:bg-violet-100 hover:border-violet-300 transition-colors"
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
                className="w-full bg-white border-2 border-violet-200 rounded-xl pl-4 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 placeholder:text-zinc-400"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg disabled:opacity-50 transition-colors shadow-md shadow-violet-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar, .hub-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb, .hub-scroll::-webkit-scrollbar-thumb { background: #c4b5fd; border-radius: 8px; }
      `}} />
    </section>
  );
}

const LAYER_STYLES: Record<string, string> = {
  'Chat Experience': 'bg-slate-100 text-slate-700 ring-slate-200',
  Identity: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  'Input Safety': 'bg-violet-50 text-violet-700 ring-violet-200',
  Supervisor: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
  'Specialized Agent': 'bg-amber-50 text-amber-700 ring-amber-200',
  Guardrails: 'bg-rose-50 text-rose-700 ring-rose-200',
  'User Response': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Observability: 'bg-zinc-100 text-zinc-600 ring-zinc-200',
  System: 'bg-zinc-50 text-zinc-500 ring-zinc-200',
};

function OrchestrationTracePanel({
  events,
  isLive,
  flowStep,
}: {
  events: FlowEvent[];
  isLive: boolean;
  flowStep: FlowStep;
}) {
  return (
    <div className="mx-4 mb-4 mt-1 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-violet-200/70 bg-[#0f1117]/[0.03]">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-violet-100/80 bg-gradient-to-r from-violet-50/90 to-indigo-50/60 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-violet-600" aria-hidden />
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
          <div className="flex h-full min-h-[120px] flex-col items-center justify-center gap-2 text-center px-4">
            <Terminal className="h-5 w-5 text-violet-300" aria-hidden />
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
                className="rounded-lg border border-violet-100/80 bg-white/90 px-2.5 py-2 shadow-sm"
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
                <p className="mt-1 font-mono text-[10px] font-semibold text-violet-700 leading-snug">
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
    <div className="rounded-xl border border-violet-200/60 bg-gradient-to-b from-violet-50/80 to-white px-3 py-3">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <p className="text-[11px] font-semibold text-zinc-700">Agentic pipeline</p>
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
              {i > 0 && <span className="text-[10px] text-violet-300">→</span>}
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-500/30'
                    : isDone
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70'
                      : 'bg-white text-zinc-400 ring-1 ring-violet-100'
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
    text: 'text-violet-600',
    border: 'border-violet-200/80',
    bg: 'bg-violet-50/70',
    iconBorder: 'border-violet-300',
    iconGlow: 'shadow-[0_0_16px_rgba(139,92,246,0.35)]',
    lineVia: 'via-violet-500',
  },
  identity: {
    text: 'text-indigo-600',
    border: 'border-indigo-200/80',
    bg: 'bg-indigo-50/70',
    iconBorder: 'border-indigo-300',
    iconGlow: 'shadow-[0_0_16px_rgba(99,102,241,0.35)]',
    lineVia: 'via-indigo-500',
  },
  safety_input: {
    text: 'text-fuchsia-600',
    border: 'border-fuchsia-200/80',
    bg: 'bg-fuchsia-50/70',
    iconBorder: 'border-fuchsia-300',
    iconGlow: 'shadow-[0_0_16px_rgba(217,70,239,0.3)]',
    lineVia: 'via-fuchsia-500',
  },
  supervisor: {
    text: 'text-cyan-600',
    border: 'border-cyan-200/80',
    bg: 'bg-cyan-50/70',
    iconBorder: 'border-cyan-300',
    iconGlow: 'shadow-[0_0_16px_rgba(6,182,212,0.35)]',
    lineVia: 'via-cyan-500',
  },
  specialized: {
    text: 'text-amber-600',
    border: 'border-amber-200/80',
    bg: 'bg-amber-50/70',
    iconBorder: 'border-amber-300',
    iconGlow: 'shadow-[0_0_16px_rgba(245,158,11,0.35)]',
    lineVia: 'via-amber-500',
  },
  safety_output: {
    text: 'text-rose-600',
    border: 'border-rose-200/80',
    bg: 'bg-rose-50/70',
    iconBorder: 'border-rose-300',
    iconGlow: 'shadow-[0_0_16px_rgba(244,63,94,0.3)]',
    lineVia: 'via-rose-500',
  },
  response: {
    text: 'text-emerald-600',
    border: 'border-emerald-200/80',
    bg: 'bg-emerald-50/70',
    iconBorder: 'border-emerald-300',
    iconGlow: 'shadow-[0_0_16px_rgba(16,185,129,0.35)]',
    lineVia: 'via-emerald-500',
  },
};

const FLOW_LINE_COLORS = [
  'via-violet-500',
  'via-indigo-500',
  'via-fuchsia-500',
  'via-cyan-400',
  'via-amber-400',
  'via-rose-400',
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
      <div className="absolute left-[22px] top-4 bottom-4 w-[2px] rounded-full bg-violet-100/90" />
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
                        activeSub === sub.id ? 'bg-violet-600 text-white' : 'bg-zinc-50 text-zinc-400'
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
        isUser ? 'bg-violet-600 border-violet-500 text-white'
          : parent ? `${parent.bgColor} ${parent.borderColor} ${parent.color}`
          : 'bg-violet-100 border-violet-200 text-violet-600'
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
          isUser ? 'bg-violet-600 text-white rounded-tr-sm' : 'bg-white border border-violet-200/80 text-zinc-800 rounded-tl-sm'
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
