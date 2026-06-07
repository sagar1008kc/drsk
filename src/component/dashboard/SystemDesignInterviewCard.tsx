import Link from 'next/link';
import { Activity, Database, Network, ShieldCheck, Zap } from 'lucide-react';

const layerPreview = [
  { label: 'Trigger', icon: Zap, color: 'text-amber-500 bg-amber-500/10 border-amber-500/25' },
  { label: 'Orchestration', icon: Network, color: 'text-purple-500 bg-purple-500/10 border-purple-500/25' },
  { label: 'Retrieval', icon: Database, color: 'text-blue-500 bg-blue-500/10 border-blue-500/25' },
  { label: 'Security', icon: ShieldCheck, color: 'text-rose-500 bg-rose-500/10 border-rose-500/25' },
  { label: 'Observability', icon: Activity, color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/25' },
];

export default function SystemDesignInterviewCard() {
  return (
    <Link
      href="/dashboard/interview-guide/system-design"
      className="group block overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#111827] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:border-cyan-500/35 hover:shadow-[0_12px_40px_rgba(6,182,212,0.12)] sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-semibold text-cyan-300">
          System Design
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-semibold text-slate-300">
          Agentic AI
        </span>
        <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-semibold text-emerald-300">
          7 layers
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
        Agentic Workflow Architecture
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-[15px]">
        Walk through a production-grade autonomous agent stack — from API triggers and
        orchestration to retrieval, MCP tools, guardrails, observability, and offline evaluation.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {layerPreview.map(({ label, icon: Icon, color }) => (
          <span
            key={label}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${color}`}
          >
            <Icon size={12} aria-hidden />
            {label}
          </span>
        ))}
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400">
          +2 more
        </span>
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:text-cyan-200">
        Open full system design
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
