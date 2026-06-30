'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AgenticDataArchitectureDiagram } from '@/component/portfolio/AgenticDataArchitectureDiagram';

export interface FlipBookPage {
  id: number;
  type: 'cover' | 'content';
  content: ReactNode;
}

function PageShell({
  chapter,
  title,
  children,
  pageLabel,
  compact = false,
}: {
  chapter?: string;
  title: string;
  children: ReactNode;
  pageLabel: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col bg-[#fdfbf7] text-slate-800 shadow-inner ${
        compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6 md:p-8'
      }`}
    >
      {chapter ? (
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 sm:text-xs">
          {chapter}
        </p>
      ) : null}
      <h2 className="border-b-2 border-slate-200 pb-3 text-lg font-bold sm:text-xl md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed text-slate-700">
        {children}
      </div>
      <p className="mt-4 shrink-0 text-right font-mono text-[10px] text-slate-400 sm:text-xs">
        {pageLabel}
      </p>
    </div>
  );
}

export const agenticDataPages: FlipBookPage[] = [
  {
    id: 1,
    type: 'cover',
    content: (
      <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-r-lg bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-inner sm:p-8">
        <div className="rounded-xl border-4 border-slate-600 bg-white/5 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-8">
          <h1 className="mb-3 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            The Agentic Data Layer
          </h1>
          <h2 className="mt-2 text-base font-light text-slate-300 sm:text-xl md:text-2xl">
            Enterprise Deep Dive
          </h2>
          <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-emerald-500" />
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 sm:text-sm">
            Confidential & Proprietary
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    type: 'content',
    content: (
      <PageShell chapter="Chapter 1" title="What is Agentic Data?" pageLabel="Page 1">
        <div className="space-y-4">
          <p>
            In traditional software, data is a static repository waiting to be queried. In{' '}
            <strong>Enterprise Agentic Workflows</strong>, data is the active, dynamic environment
            in which autonomous agents operate. It is the sensory input, the contextual memory, and
            the grounding reality of the AI.
          </p>
          <div className="my-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="mb-2 font-semibold text-slate-900">Beyond the Prompt</h4>
            <p>
              Agentic data represents the shift from{' '}
              <em>&quot;providing context in a prompt&quot;</em> to agents having autonomous,
              continuous access to massive, multi-modal enterprise state.
            </p>
          </div>
          <p>
            For an enterprise agent, data encompasses real-time APIs, unstructured documents,
            organizational policies, and the episodic memory of the agent&apos;s own past actions.
          </p>
        </div>
      </PageShell>
    ),
  },
  {
    id: 3,
    type: 'content',
    content: (
      <PageShell chapter="Chapter 2" title="The Enterprise Imperative" pageLabel="Page 2">
        <div className="space-y-4">
          <p>
            LLMs are reasoning engines, but they lack proprietary truth. The data facet is the most
            critical component of an enterprise agentic deployment.
          </p>
          <ul className="mt-2 space-y-4">
            {[
              {
                n: '1',
                tone: 'bg-emerald-100 text-emerald-600',
                title: 'Eradicating Hallucinations',
                body: 'High-fidelity data layers enforce strictly grounded reasoning from verified internal truth.',
              },
              {
                n: '2',
                tone: 'bg-blue-100 text-blue-600',
                title: 'Contextual Determinism',
                body: 'Rigorous control of data inputs helps achieve deterministic behavior from non-deterministic models.',
              },
              {
                n: '3',
                tone: 'bg-purple-100 text-purple-600',
                title: 'The Moat is Data',
                body: 'Models commoditize quickly. Competitive advantage lies in proprietary data structures.',
              },
            ].map((item) => (
              <li key={item.n} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${item.tone}`}
                >
                  {item.n}
                </span>
                <div>
                  <strong className="block text-slate-900">{item.title}</strong>
                  {item.body}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PageShell>
    ),
  },
  {
    id: 4,
    type: 'content',
    content: (
      <PageShell chapter="Chapter 3" title="Where Does Data Live?" pageLabel="Page 3">
        <div className="space-y-4">
          <p>
            In an agentic ecosystem, data is distributed across layers designed for how agents{' '}
            <em>think</em> and <em>retrieve</em>.
          </p>
          <div className="mt-2 space-y-3">
            <div className="rounded-r-lg border-l-4 border-blue-500 bg-blue-50/50 p-3">
              <h4 className="mb-1 font-bold text-blue-900">1. Working Memory (Context Window)</h4>
              <p className="text-xs text-blue-800">
                Ephemeral data for active reasoning: task objective, tool outputs, and short-term
                conversation history.
              </p>
            </div>
            <div className="rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50/50 p-3">
              <h4 className="mb-1 font-bold text-emerald-900">2. Semantic Layer (Vector Stores)</h4>
              <p className="text-xs text-emerald-800">
                Unstructured data transformed into embeddings for intent-based similarity search
                (RAG).
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    ),
  },
  {
    id: 5,
    type: 'content',
    content: (
      <PageShell
        chapter="Visual Mapping"
        title="Agentic Architecture"
        pageLabel="Page 4"
        compact
      >
        <AgenticDataArchitectureDiagram />
      </PageShell>
    ),
  },
  {
    id: 6,
    type: 'content',
    content: (
      <PageShell
        chapter="Chapter 3 (Continued)"
        title="Advanced Storage Layers"
        pageLabel="Page 5"
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="rounded-r-lg border-l-4 border-purple-500 bg-purple-50/50 p-3">
              <h4 className="mb-1 font-bold text-purple-900">3. Relational Layer (Knowledge Graphs)</h4>
              <p className="text-xs text-purple-800">
                Graph DBs map explicit relationships so agents navigate corporate structures via
                GraphRAG.
              </p>
            </div>
            <div className="rounded-r-lg border-l-4 border-amber-500 bg-amber-50/50 p-3">
              <h4 className="mb-1 font-bold text-amber-900">4. Transactional Layer (SQL/APIs)</h4>
              <p className="text-xs text-amber-800">
                Ground truth for structured data — inventory, financial records, and CRM states via
                SQL or API payloads.
              </p>
            </div>
          </div>
          <p className="rounded border border-slate-200 bg-slate-100 p-3 text-sm font-medium text-slate-900">
            <strong>Conclusion:</strong> Data does not move to the agent; the agent orchestrates
            retrieval across persistence layers via tool calling.
          </p>
        </div>
      </PageShell>
    ),
  },
  {
    id: 7,
    type: 'content',
    content: (
      <PageShell chapter="Chapter 4" title="Governance & Security" pageLabel="Page 6">
        <div className="space-y-4">
          <p>
            Because agents have autonomous reasoning, granting data access introduces novel attack
            vectors such as prompt injection leading to data exfiltration.
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-emerald-500">
            <li>
              <strong>Role-Based Agent Access:</strong> Agents inherit the precise permissions of the
              invoking user.
            </li>
            <li>
              <strong>Data Masking in Transit:</strong> Sensitive PII is redacted before entering
              the context window.
            </li>
            <li>
              <strong>Read-Only by Default:</strong> Transactional layers enforce read-only limits
              until human approval for state changes.
            </li>
          </ul>
        </div>
      </PageShell>
    ),
  },
  {
    id: 8,
    type: 'cover',
    content: (
      <div className="flex h-full min-h-0 w-full flex-col items-center justify-center rounded-l-lg bg-gradient-to-tl from-slate-900 to-slate-800 p-5 text-white shadow-inner sm:p-8">
        <div className="text-center">
          <svg
            className="mx-auto mb-5 h-12 w-12 text-emerald-500 sm:h-16 sm:w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
            />
          </svg>
          <h2 className="mb-3 text-xl font-bold text-slate-200 sm:text-2xl">
            Data is the Environment.
            <br />
            Agents are the Actors.
          </h2>
          <p className="mx-auto max-w-xs text-xs leading-relaxed text-slate-400 sm:text-sm">
            Mastering the data layer — structure, availability, and security — is the prerequisite
            for enterprise-grade autonomous workflows.
          </p>
        </div>
      </div>
    ),
  },
];

function useWideSpread() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return wide;
}

type AgenticDataFlipbookProps = {
  className?: string;
};

export default function AgenticDataFlipbook({ className = '' }: AgenticDataFlipbookProps) {
  const wideSpread = useWideSpread();
  const [pageIndex, setPageIndex] = useState(0);
  const [spreadIndex, setSpreadIndex] = useState(0);

  const maxSpreads = Math.ceil((agenticDataPages.length + 1) / 2) - 1;
  const maxPageIndex = agenticDataPages.length - 1;

  const handleNext = useCallback(() => {
    if (wideSpread) {
      setSpreadIndex((i) => Math.min(i + 1, maxSpreads));
    } else {
      setPageIndex((i) => Math.min(i + 1, maxPageIndex));
    }
  }, [wideSpread, maxSpreads, maxPageIndex]);

  const handlePrev = useCallback(() => {
    if (wideSpread) {
      setSpreadIndex((i) => Math.max(i - 1, 0));
    } else {
      setPageIndex((i) => Math.max(i - 1, 0));
    }
  }, [wideSpread]);

  const atStart = wideSpread ? spreadIndex === 0 : pageIndex === 0;
  const atEnd = wideSpread ? spreadIndex === maxSpreads : pageIndex === maxPageIndex;

  const leftPageIndex = spreadIndex === 0 ? null : spreadIndex * 2 - 1;
  const rightPageIndex = spreadIndex * 2;
  const leftPage =
    leftPageIndex !== null && leftPageIndex < agenticDataPages.length
      ? agenticDataPages[leftPageIndex]
      : null;
  const rightPage =
    rightPageIndex < agenticDataPages.length ? agenticDataPages[rightPageIndex] : null;

  const currentLabel = wideSpread
    ? `Spread ${spreadIndex + 1} of ${maxSpreads + 1}`
    : `Page ${pageIndex + 1} of ${agenticDataPages.length}`;

  return (
    <div className={`flex min-h-0 flex-1 flex-col ${className}`}>
      <div className="relative mx-auto flex min-h-0 w-full flex-1 flex-col">
        {wideSpread ? (
          <div className="relative flex h-[min(52vh,420px)] w-full flex-1 overflow-hidden rounded-xl border-4 border-slate-800 bg-[#f0eadd] shadow-xl sm:h-full sm:min-h-0 sm:border-8">
            <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-10 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            <div className="relative h-full w-1/2 overflow-hidden border-r border-black/10 bg-[#fdfbf7] shadow-[inset_-20px_0_30px_rgba(0,0,0,0.06)]">
              {leftPage ? leftPage.content : <div className="h-full bg-slate-800/90" />}
            </div>
            <div className="relative h-full w-1/2 overflow-hidden bg-[#fdfbf7] shadow-[inset_20px_0_30px_rgba(0,0,0,0.06)]">
              {rightPage ? rightPage.content : <div className="h-full bg-slate-800/90" />}
            </div>
          </div>
        ) : (
          <div className="relative flex h-[min(58vh,460px)] w-full flex-1 overflow-hidden rounded-xl border-4 border-slate-800 bg-[#f0eadd] shadow-xl sm:h-full sm:min-h-0">
            <div className="h-full w-full overflow-y-auto bg-[#fdfbf7]">
              {agenticDataPages[pageIndex].content}
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 flex shrink-0 flex-col items-stretch gap-2 px-0.5 sm:mt-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={atStart}
          className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[44px] sm:gap-2 sm:px-5 sm:text-sm"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
          Previous
        </button>

        <p className="text-center font-mono text-[10px] font-medium text-slate-500 sm:text-xs">
          {currentLabel}
        </p>

        <button
          type="button"
          onClick={handleNext}
          disabled={atEnd}
          className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[44px] sm:gap-2 sm:px-5 sm:text-sm"
        >
          Next
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
