'use client';

import { useId } from 'react';

export function AgenticDataArchitectureDiagram() {
  const markerId = useId().replace(/:/g, '');

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <svg
          viewBox="0 0 400 320"
          role="img"
          aria-label="Agentic data architecture diagram showing an autonomous agent connected to context window, vector database, graph database, and SQL APIs"
          className="mx-auto h-auto w-full min-w-[280px] max-w-lg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L0,8 L8,4 z" fill="#64748b" />
            </marker>
          </defs>

          <rect x="140" y="130" width="120" height="60" rx="8" fill="#10b981" />
          <text x="200" y="158" fill="white" textAnchor="middle" fontWeight="bold" fontSize="14">
            Autonomous Agent
          </text>
          <text x="200" y="174" fill="white" textAnchor="middle" fontSize="10" opacity="0.9">
            orchestrates retrieval
          </text>

          <rect
            x="120"
            y="20"
            width="160"
            height="50"
            rx="6"
            fill="#3b82f6"
            fillOpacity="0.15"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <text x="200" y="42" fill="#1e3a8a" textAnchor="middle" fontSize="12" fontWeight="bold">
            1. Context Window
          </text>
          <text x="200" y="58" fill="#1e3a8a" textAnchor="middle" fontSize="10">
            Working Memory / LLM
          </text>
          <path
            d="M190,75 L190,125"
            stroke="#64748b"
            strokeWidth="2"
            markerEnd={`url(#${markerId})`}
          />
          <path
            d="M210,125 L210,75"
            stroke="#64748b"
            strokeWidth="2"
            markerEnd={`url(#${markerId})`}
          />

          <rect
            x="290"
            y="135"
            width="100"
            height="50"
            rx="6"
            fill="#10b981"
            fillOpacity="0.15"
            stroke="#10b981"
            strokeWidth="2"
          />
          <text x="340" y="157" fill="#064e3b" textAnchor="middle" fontSize="11" fontWeight="bold">
            2. Vector DB
          </text>
          <text x="340" y="173" fill="#064e3b" textAnchor="middle" fontSize="10">
            Semantic / RAG
          </text>
          <path
            d="M265,160 L285,160"
            stroke="#64748b"
            strokeWidth="2"
            markerEnd={`url(#${markerId})`}
          />
          <path
            d="M285,150 L265,150"
            stroke="#64748b"
            strokeWidth="2"
            markerEnd={`url(#${markerId})`}
          />

          <rect
            x="10"
            y="135"
            width="100"
            height="50"
            rx="6"
            fill="#a855f7"
            fillOpacity="0.15"
            stroke="#a855f7"
            strokeWidth="2"
          />
          <text x="60" y="157" fill="#4c1d95" textAnchor="middle" fontSize="11" fontWeight="bold">
            3. Graph DB
          </text>
          <text x="60" y="173" fill="#4c1d95" textAnchor="middle" fontSize="10">
            Relational
          </text>
          <path
            d="M135,160 L115,160"
            stroke="#64748b"
            strokeWidth="2"
            markerEnd={`url(#${markerId})`}
          />
          <path
            d="M115,150 L135,150"
            stroke="#64748b"
            strokeWidth="2"
            markerEnd={`url(#${markerId})`}
          />

          <rect
            x="130"
            y="250"
            width="140"
            height="50"
            rx="6"
            fill="#f59e0b"
            fillOpacity="0.15"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x="200" y="272" fill="#78350f" textAnchor="middle" fontSize="11" fontWeight="bold">
            4. SQL / APIs
          </text>
          <text x="200" y="288" fill="#78350f" textAnchor="middle" fontSize="10">
            Transactional Truth
          </text>
          <path
            d="M190,195 L190,245"
            stroke="#64748b"
            strokeWidth="2"
            markerEnd={`url(#${markerId})`}
          />
          <path
            d="M210,245 L210,195"
            stroke="#64748b"
            strokeWidth="2"
            markerEnd={`url(#${markerId})`}
          />
        </svg>
      </div>

      <ul className="mt-3 grid w-full grid-cols-2 gap-2 text-[10px] leading-snug text-slate-600 sm:grid-cols-4 sm:text-xs">
        <li className="rounded-lg border border-blue-100 bg-blue-50/80 px-2 py-1.5">
          <span className="font-bold text-blue-900">Context</span> — active reasoning
        </li>
        <li className="rounded-lg border border-emerald-100 bg-emerald-50/80 px-2 py-1.5">
          <span className="font-bold text-emerald-900">Vector</span> — semantic RAG
        </li>
        <li className="rounded-lg border border-purple-100 bg-purple-50/80 px-2 py-1.5">
          <span className="font-bold text-purple-900">Graph</span> — relationships
        </li>
        <li className="rounded-lg border border-amber-100 bg-amber-50/80 px-2 py-1.5">
          <span className="font-bold text-amber-900">SQL/API</span> — ground truth
        </li>
      </ul>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500 sm:text-xs">
        The agent dynamically queries specialized databases based on task context, routing complex
        logic through relational graphs and retrieving exact states via transactional APIs.
      </p>
    </div>
  );
}
