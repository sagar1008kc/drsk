"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Database,
  LineChart,
  Network,
  ShieldCheck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

type WorkflowTheme = {
  text: string;
  border: string;
  bg: string;
  shadow: string;
  iconBorder: string;
  iconGlow: string;
  whyBg: string;
};

type WorkflowItem = {
  layer: string;
  component: string;
  why: string;
  icon: LucideIcon;
  theme: WorkflowTheme;
};

const workflowData: WorkflowItem[] = [
  {
    layer: "Trigger",
    component: "API Gateway parses a WebSocket payload from the web app.",
    why: "Ensures fast connection handling.",
    icon: Zap,
    theme: {
      text: "text-amber-400",
      border: "hover:border-amber-500/50 border-white/5",
      bg: "hover:bg-amber-500/5 bg-white/[0.02]",
      shadow: "hover:shadow-[0_8px_30px_-5px_rgba(245,158,11,0.2)]",
      iconBorder: "border-slate-800 group-hover:border-amber-500/50",
      iconGlow:
        "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:bg-amber-500/10",
      whyBg: "from-amber-500/10 to-transparent",
    },
  },
  {
    layer: "Orchestration",
    component: "State Machine router selects the Account_Manager sub-agent.",
    why: "Prevents model hallucinations from skipping steps.",
    icon: Network,
    theme: {
      text: "text-purple-400",
      border: "hover:border-purple-500/50 border-white/5",
      bg: "hover:bg-purple-500/5 bg-white/[0.02]",
      shadow: "hover:shadow-[0_8px_30px_-5px_rgba(168,85,247,0.2)]",
      iconBorder: "border-slate-800 group-hover:border-purple-500/50",
      iconGlow:
        "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:bg-purple-500/10",
      whyBg: "from-purple-500/10 to-transparent",
    },
  },
  {
    layer: "Retrieval",
    component: "Vector DB pulls the customer's specific account tier rules.",
    why: "Feeds active account rules directly into prompt memory.",
    icon: Database,
    theme: {
      text: "text-blue-400",
      border: "hover:border-blue-500/50 border-white/5",
      bg: "hover:bg-blue-500/5 bg-white/[0.02]",
      shadow: "hover:shadow-[0_8px_30px_-5px_rgba(59,130,246,0.2)]",
      iconBorder: "border-slate-800 group-hover:border-blue-500/50",
      iconGlow:
        "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:bg-blue-500/10",
      whyBg: "from-blue-500/10 to-transparent",
    },
  },
  {
    layer: "Tools",
    component: "The agent calls a secure MCP Server via gRPC to pull account balances.",
    why: "Keeps data access separate from the core prompt engine.",
    icon: Wrench,
    theme: {
      text: "text-orange-400",
      border: "hover:border-orange-500/50 border-white/5",
      bg: "hover:bg-orange-500/5 bg-white/[0.02]",
      shadow: "hover:shadow-[0_8px_30px_-5px_rgba(249,115,22,0.2)]",
      iconBorder: "border-slate-800 group-hover:border-orange-500/50",
      iconGlow:
        "group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:bg-orange-500/10",
      whyBg: "from-orange-500/10 to-transparent",
    },
  },
  {
    layer: "Security",
    component:
      "A guardrail catches the transfer request, flags it as over the $1k threshold, and routes it to a Human Approval Gate.",
    why: "Completely stops unverified money transfers.",
    icon: ShieldCheck,
    theme: {
      text: "text-rose-400",
      border: "hover:border-rose-500/50 border-white/5",
      bg: "hover:bg-rose-500/5 bg-white/[0.02]",
      shadow: "hover:shadow-[0_8px_30px_-5px_rgba(244,63,94,0.2)]",
      iconBorder: "border-slate-800 group-hover:border-rose-500/50",
      iconGlow:
        "group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] group-hover:bg-rose-500/10",
      whyBg: "from-rose-500/10 to-transparent",
    },
  },
  {
    layer: "Observability",
    component: "OpenTelemetry tracks tool performance and records step latencies.",
    why: "Flags slow database calls or model lag instantly.",
    icon: Activity,
    theme: {
      text: "text-cyan-400",
      border: "hover:border-cyan-500/50 border-white/5",
      bg: "hover:bg-cyan-500/5 bg-white/[0.02]",
      shadow: "hover:shadow-[0_8px_30px_-5px_rgba(6,182,212,0.2)]",
      iconBorder: "border-slate-800 group-hover:border-cyan-500/50",
      iconGlow:
        "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:bg-cyan-500/10",
      whyBg: "from-cyan-500/10 to-transparent",
    },
  },
  {
    layer: "Evaluation",
    component:
      "Trajectory logs are saved to an offline storage cluster for nightly model grading.",
    why: "Catches drift or changes in agent performance over time.",
    icon: LineChart,
    theme: {
      text: "text-emerald-400",
      border: "hover:border-emerald-500/50 border-white/5",
      bg: "hover:bg-emerald-500/5 bg-white/[0.02]",
      shadow: "hover:shadow-[0_8px_30px_-5px_rgba(16,185,129,0.2)]",
      iconBorder: "border-slate-800 group-hover:border-emerald-500/50",
      iconGlow:
        "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:bg-emerald-500/10",
      whyBg: "from-emerald-500/10 to-transparent",
    },
  },
];

export function AgenticWorkflowSystemDesign() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="agentic-workflow-system-design"
      aria-labelledby="agentic-workflow-system-design-heading"
      className="bg-[#050B14] px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <h2 id="agentic-workflow-system-design-heading" className="sr-only">
        Agentic Workflow System Design
      </h2>

      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#030712] py-16 px-4 font-sans sm:px-6 sm:py-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
          <div className="absolute top-[40%] right-[-10%] h-[40%] w-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <div
            className={`mb-16 text-center transition-all duration-1000 ease-out sm:mb-20 ${
              mounted ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
          >
            <h3 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Agentic Workflow <br className="md:hidden" />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                System Design
              </span>
            </h3>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              An end-to-end look at the production architecture for an autonomous AI agent,
              detailing the components, layers, and their impact on reliability.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-6 bottom-6 left-[23px] w-[2px] rounded-full bg-slate-800/60 md:left-[27px]" />

            <div className="pointer-events-none absolute top-6 bottom-6 left-[23px] w-[2px] overflow-hidden rounded-full md:left-[27px]">
              <div className="animate-agentic-flow-line absolute h-[30%] w-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>

            <div className="space-y-0">
              {workflowData.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.layer}
                    className={`group relative flex transform gap-6 pb-12 transition-all duration-1000 ease-out last:pb-0 md:gap-8 ${
                      mounted ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="relative z-10 mt-2 flex-shrink-0">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 bg-[#030712] transition-all duration-500 md:h-14 md:w-14 ${item.theme.iconBorder} ${item.theme.iconGlow} ${item.theme.text}`}
                      >
                        <Icon size={22} className="hidden md:block" aria-hidden />
                        <Icon size={18} className="block md:hidden" aria-hidden />
                      </div>
                    </div>

                    <div
                      className={`relative flex-1 cursor-default overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] ${item.theme.bg} ${item.theme.border} ${item.theme.shadow}`}
                    >
                      <div className="p-6 md:p-8">
                        <div className="mb-3 flex items-center justify-between">
                          <h4
                            className={`text-sm font-bold tracking-[0.15em] uppercase md:text-base ${item.theme.text}`}
                          >
                            {item.layer} Layer
                          </h4>
                        </div>

                        <p className="text-[15px] leading-relaxed text-slate-300 md:text-base">
                          {item.component}
                        </p>

                        <div className="relative mt-6 border-t border-white/5 pt-5 transition-colors duration-500 group-hover:border-transparent">
                          <div
                            className={`pointer-events-none absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${item.theme.whyBg}`}
                          />

                          <div className="relative flex items-start gap-3">
                            <div className={`mt-0.5 ${item.theme.text}`}>
                              <CheckCircle2 size={18} aria-hidden />
                            </div>
                            <div>
                              <h5 className="mb-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-hover:text-slate-400 md:text-xs">
                                Why it matters for Production
                              </h5>
                              <p className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white md:text-[15px]">
                                {item.why}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
