'use client';

import { useMemo, useState } from 'react';
import {
  motivationalSampleCategories,
  motivationalSamples,
  type MotivationalSampleCategory,
} from '@/lib/dashboard/motivational-samples';

export default function MotivationalSampleLibrary() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<MotivationalSampleCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return motivationalSamples.filter((item) => {
      const catOk = category === 'all' || item.category === category;
      if (!q) return catOk;
      const blob = `${item.title} ${item.description}`.toLowerCase();
      return catOk && blob.includes(q);
    });
  }, [query, category]);

  return (
    <section className="rounded-2xl bg-white/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-zinc-200/80 backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600/90">
            Sample library
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
            Motivational previews
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-600">
            Grab instant PDF previews. Search and filter scale easily when you add dozens of
            titles — structure is ready for a larger catalog.
          </p>
        </div>
        <p className="text-xs font-medium text-zinc-500">
          {filtered.length} of {motivationalSamples.length} shown
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search samples</span>
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or topic…"
            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50/80 pl-9 pr-3 text-sm text-zinc-900 outline-none ring-violet-500/0 transition placeholder:text-zinc-400 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-500/20"
          />
        </label>
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Filter by category"
        >
          {motivationalSampleCategories.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {filtered.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              download={item.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-zinc-100 bg-gradient-to-br from-white to-zinc-50/80 p-4 shadow-sm transition hover:border-violet-200/80 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-800">
                  {item.category}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-400 opacity-0 transition group-hover:opacity-100">
                  PDF
                </span>
              </div>
              <p className="mt-2 font-semibold text-zinc-900">{item.title}</p>
              <p className="mt-1 flex-1 text-sm leading-snug text-zinc-600">{item.description}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700">
                Open sample
                <svg
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 px-4 py-6 text-center text-sm text-zinc-500">
          No samples match that search. Try another keyword or reset filters.
        </p>
      ) : null}
    </section>
  );
}
