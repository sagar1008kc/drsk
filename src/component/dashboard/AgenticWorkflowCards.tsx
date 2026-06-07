'use client';

import { useState, useEffect } from 'react';
import {
  Zap,
  Network,
  Database,
  Wrench,
  ShieldCheck,
  Activity,
  LineChart,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';

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
    layer: 'Trigger',
    component: 'API Gateway parses a WebSocket payload from the web app.',
    why: 'Ensures fast connection handling.',
    icon: Zap,
    theme: {
      text: 'text-amber-400',
      border: 'hover:border-amber-500/50 border-white/5',
      bg: 'hover:bg-amber-500/5 bg-white/[0.02]',
      shadow: 'hover:shadow-[0_8px_30px_-5px_rgba(245,158,11,0.2)]',
      iconBorder: 'border-slate-800 group-hover:border-amber-500/50',
      iconGlow:
        'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:bg-amber-500/10',
      whyBg: 'from-amber-500/10 to-transparent',
    },
  },
  {
    layer: 'Orchestration',
    component: 'State Machine router selects the Account_Manager sub-agent.',
    why: 'Prevents model hallucinations from skipping steps.',
    icon: Network,
    theme: {
      text: 'text-purple-400',
      border: 'hover:border-purple-500/50 border-white/5',
      bg: 'hover:bg-purple-500/5 bg-white/[0.02]',
      shadow: 'hover:shadow-[0_8px_30px_-5px_rgba(168,85,247,0.2)]',
      iconBorder: 'border-slate-800 group-hover:border-purple-500/50',
      iconGlow:
        'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:bg-purple-500/10',
      whyBg: 'from-purple-500/10 to-transparent',
    },
  },
  {
    layer: 'Retrieval',
    component: "Vector DB pulls the customer's specific account tier rules.",
    why: 'Feeds active account rules directly into prompt memory.',
    icon: Database,
    theme: {
      text: 'text-blue-400',
      border: 'hover:border-blue-500/50 border-white/5',
      bg: 'hover:bg-blue-500/5 bg-white/[0.02]',
      shadow: 'hover:shadow-[0_8px_30px_-5px_rgba(59,130,246,0.2)]',
      iconBorder: 'border-slate-800 group-hover:border-blue-500/50',
      iconGlow:
        'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:bg-blue-500/10',
      whyBg: 'from-blue-500/10 to-transparent',
    },
  },
  {
    layer: 'Tools',
    component: 'The agent calls a secure MCP Server via gRPC to pull account balances.',
    why: 'Keeps data access separate from the core prompt engine.',
    icon: Wrench,
    theme: {
      text: 'text-orange-400',
      border: 'hover:border-orange-500/50 border-white/5',
      bg: 'hover:bg-orange-500/5 bg-white/[0.02]',
      shadow: 'hover:shadow-[0_8px_30px_-5px_rgba(249,115,22,0.2)]',
      iconBorder: 'border-slate-800 group-hover:border-orange-500/50',
      iconGlow:
        'group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:bg-orange-500/10',
      whyBg: 'from-orange-500/10 to-transparent',
    },
  },
  {
    layer: 'Security',
    component:
      'A guardrail catches the transfer request, flags it as over the $1k threshold, and routes it to a Human Approval Gate.',
    why: 'Completely stops unverified money transfers.',
    icon: ShieldCheck,
    theme: {
      text: 'text-rose-400',
      border: 'hover:border-rose-500/50 border-white/5',
      bg: 'hover:bg-rose-500/5 bg-white/[0.02]',
      shadow: 'hover:shadow-[0_8px_30px_-5px_rgba(244,63,94,0.2)]',
      iconBorder: 'border-slate-800 group-hover:border-rose-500/50',
      iconGlow:
        'group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] group-hover:bg-rose-500/10',
      whyBg: 'from-rose-500/10 to-transparent',
    },
  },
  {
    layer: 'Observability',
    component: 'OpenTelemetry tracks tool performance and records step latencies.',
    why: 'Flags slow database calls or model lag instantly.',
    icon: Activity,
    theme: {
      text: 'text-cyan-400',
      border: 'hover:border-cyan-500/50 border-white/5',
      bg: 'hover:bg-cyan-500/5 bg-white/[0.02]',
      shadow: 'hover:shadow-[0_8px_30px_-5px_rgba(6,182,212,0.2)]',
      iconBorder: 'border-slate-800 group-hover:border-cyan-500/50',
      iconGlow:
        'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:bg-cyan-500/10',
      whyBg: 'from-cyan-500/10 to-transparent',
    },
  },
  {
    layer: 'Evaluation',
    component:
      'Trajectory logs are saved to an offline storage cluster for nightly model grading.',
    why: 'Catches drift or changes in agent performance over time.',
    icon: LineChart,
    theme: {
      text: 'text-emerald-400',
      border: 'hover:border-emerald-500/50 border-white/5',
      bg: 'hover:bg-emerald-500/5 bg-white/[0.02]',
      shadow: 'hover:shadow-[0_8px_30px_-5px_rgba(16,185,129,0.2)]',
      iconBorder: 'border-slate-800 group-hover:border-emerald-500/50',
      iconGlow:
        'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:bg-emerald-500/10',
      whyBg: 'from-emerald-500/10 to-transparent',
    },
  },
];

export default function AgenticWorkflowCards() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#030712] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes flowLine {
          0% { top: -20%; }
          100% { top: 120%; }
        }
        .animate-flowLine {
          animation: flowLine 4s linear infinite;
        }
      `,
        }}
      />

      <div className="relative max-w-3xl mx-auto z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Agentic Workflow <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              System Design
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            An end-to-end look at the production architecture for an autonomous AI agent,
            detailing the components, layers, and their impact on reliability.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[23px] md:left-[27px] top-6 bottom-6 w-[2px] bg-slate-800/60 rounded-full" />

          <div className="absolute left-[23px] md:left-[27px] top-6 bottom-6 w-[2px] overflow-hidden rounded-full pointer-events-none">
            <div className="w-full h-[30%] bg-gradient-to-b from-transparent via-blue-500 to-transparent absolute animate-flowLine" />
          </div>

          <div className="space-y-0">
            {workflowData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.layer}
                  className={`group relative flex gap-6 md:gap-8 pb-12 last:pb-0 transition-all duration-1000 ease-out transform ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative z-10 flex-shrink-0 mt-2">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 bg-[#030712] transition-all duration-500 ${item.theme.iconBorder} ${item.theme.iconGlow} ${item.theme.text}`}
                    >
                      <Icon size={22} className="hidden md:block" />
                      <Icon size={18} className="block md:hidden" />
                    </div>
                  </div>

                  <div
                    className={`flex-1 relative rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] cursor-default ${item.theme.bg} ${item.theme.border} ${item.theme.shadow} backdrop-blur-sm overflow-hidden`}
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className={`text-sm md:text-base font-bold uppercase tracking-[0.15em] ${item.theme.text}`}
                        >
                          {item.layer} Layer
                        </h3>
                      </div>

                      <p className="text-slate-300 text-[15px] md:text-base leading-relaxed">
                        {item.component}
                      </p>

                      <div className="mt-6 pt-5 border-t border-white/5 relative group-hover:border-transparent transition-colors duration-500">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.theme.whyBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                        />

                        <div className="relative flex items-start gap-3">
                          <div className={`mt-0.5 ${item.theme.text}`}>
                            <CheckCircle2 size={18} />
                          </div>
                          <div>
                            <h4 className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 group-hover:text-slate-400 transition-colors">
                              Why it matters for Production
                            </h4>
                            <p className="text-sm md:text-[15px] font-medium text-slate-300 group-hover:text-white transition-colors">
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
  );
}
