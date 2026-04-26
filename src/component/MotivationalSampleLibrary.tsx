'use client';

import { useMemo, useState } from 'react';
import DownloadButton from '@/component/DownloadButton';
import {
  motivationalSampleCategories,
  motivationalSamples,
  type MotivationalSampleCategory,
} from '@/lib/dashboard/motivational-samples';

type MotivationalSampleLibraryProps = {
  resourceIdBySlug: Record<string, string>;
  unlockedSlugs: string[];
};

function priceLabel(cents: number | null) {
  if (!cents) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function MotivationalSampleLibrary({
  resourceIdBySlug,
  unlockedSlugs,
}: MotivationalSampleLibraryProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<MotivationalSampleCategory | 'all'>('all');
  const [buyingSlug, setBuyingSlug] = useState('');
  const [errorBySlug, setErrorBySlug] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return motivationalSamples.filter((item) => {
      const catOk = category === 'all' || item.category === category;
      if (!q) return catOk;
      const blob = `${item.title} ${item.description}`.toLowerCase();
      return catOk && blob.includes(q);
    });
  }, [query, category]);

  async function handleBuy(slug: string) {
    if (buyingSlug) return;
    setBuyingSlug(slug);
    setErrorBySlug((prev) => ({ ...prev, [slug]: '' }));
    try {
      const response = await fetch('/api/resources/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
        alreadyPurchased?: boolean;
      };

      if (result.alreadyPurchased) {
        window.location.href = '/dashboard';
        return;
      }

      if (!response.ok || !result.url) {
        setErrorBySlug((prev) => ({
          ...prev,
          [slug]: result.error || 'Unable to start checkout right now.',
        }));
        return;
      }

      window.location.href = result.url;
    } catch {
      setErrorBySlug((prev) => ({
        ...prev,
        [slug]: 'Unable to start checkout right now.',
      }));
    } finally {
      setBuyingSlug('');
    }
  }

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
            eBook 01 is free for everyone on dashboard. eBooks 02-05 are premium and unlock
            instantly after Stripe checkout.
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
            <article className="group flex h-full flex-col rounded-xl border border-zinc-100 bg-gradient-to-br from-white to-zinc-50/80 p-4 shadow-sm transition hover:border-violet-200/80 hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-800">
                  {item.category}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    item.isFree
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.isFree ? 'Free' : 'Paid'}
                </span>
              </div>
              <p className="mt-2 font-semibold text-zinc-900">{item.title}</p>
              <p className="mt-1 flex-1 text-sm leading-snug text-zinc-600">{item.description}</p>
              <div className="mt-3 space-y-2">
                <p className="text-sm font-semibold text-zinc-900">
                  {item.isFree ? 'Free download' : priceLabel(item.priceCents)}
                </p>
                {item.isFree || unlockedSlugs.includes(item.slug) ? (
                  item.isFree && !resourceIdBySlug[item.slug] ? (
                    <a
                      href="/api/resources/public-download/motivational-ebook-01"
                      className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
                    >
                      Download
                    </a>
                  ) : resourceIdBySlug[item.slug] ? (
                    <DownloadButton resourceId={resourceIdBySlug[item.slug]} />
                  ) : (
                    <p className="text-xs text-amber-700">
                      Access is being finalized. Refresh in a moment.
                    </p>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={() => handleBuy(item.slug)}
                    disabled={buyingSlug === item.slug}
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-violet-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {buyingSlug === item.slug ? 'Redirecting to Stripe…' : `Buy now • ${priceLabel(item.priceCents)}`}
                  </button>
                )}
                {errorBySlug[item.slug] ? (
                  <p className="text-xs text-rose-600">{errorBySlug[item.slug]}</p>
                ) : null}
              </div>
            </article>
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
