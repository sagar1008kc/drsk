import { Shield } from 'lucide-react';
import { AGENT_SECURITY_RISKS } from '@/lib/agent-security-risks';

export default function AgentSecurityRisksTable({
  className = '',
}: {
  className?: string;
}) {
  return (
    <section
      id="agent-security-risks"
      aria-labelledby="agent-security-risks-heading"
      className={`w-full scroll-mt-24 ${className}`}
    >
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/15 text-rose-300">
          <Shield className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-rose-300">
            Guardrails & safety
          </p>
          <h2
            id="agent-security-risks-heading"
            className="mt-1 text-xl font-bold text-white sm:text-2xl"
          >
            Agent security risks the guardrail layer is built to stop
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
            Input and output guardrails, tool allowlists, identity isolation, and HITL exist because
            agents fail in ways chatbots do not. These ten risks (ASI01–ASI10) are the threat model
            behind those controls.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-[#0b0f16] shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-700/80 bg-slate-900/80">
              <th className="w-[5.5rem] px-4 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                ID
              </th>
              <th className="min-w-[12rem] px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                Risk
              </th>
              <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                In plain terms
              </th>
            </tr>
          </thead>
          <tbody>
            {AGENT_SECURITY_RISKS.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-800 last:border-b-0 hover:bg-white/[0.03]"
              >
                <td className="px-4 py-3.5 text-center font-mono text-xs font-bold text-rose-300">
                  {row.id}
                </td>
                <td className="px-4 py-3.5 font-semibold text-zinc-100">{row.risk}</td>
                <td className="px-4 py-3.5 leading-relaxed text-zinc-400">{row.plainTerms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
