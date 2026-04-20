'use client';

import Image from 'next/image';
import { useState } from 'react';

type PremiumPdfPurchaseCardProps = {
  title: string;
  description: string;
  coverImage: string;
  priceLabel: string;
};

export default function PremiumPdfPurchaseCard({
  title,
  description,
  coverImage,
  priceLabel,
}: PremiumPdfPurchaseCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePurchase() {
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/resources/premium/checkout', {
        method: 'POST',
      });
      const result = (await response.json()) as {
        url?: string;
        error?: string;
        alreadyPurchased?: boolean;
      };

      if (result.alreadyPurchased) {
        window.location.href = '/dashboard';
        return;
      }

      if (!response.ok || !result.url) {
        setError(result.error || 'Unable to start secure checkout.');
        return;
      }

      window.location.href = result.url;
    } catch {
      setError('Unable to start secure checkout.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-xl shadow-zinc-900/[0.06]">
      <div className="flex flex-col sm:flex-row">
        {/* Mobile: centered cover with max width; sm+: fixed sidebar strip */}
        <div className="flex justify-center px-4 pt-4 sm:contents">
          <div className="relative aspect-[3/4] w-full max-w-[240px] shrink-0 bg-white sm:aspect-auto sm:h-[min(340px,52vh)] sm:w-[260px] sm:max-w-none sm:min-h-0">
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 240px, 260px"
              className="object-contain object-center"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center gap-3 bg-white px-5 pb-5 pt-4 sm:gap-4 sm:px-8 sm:py-7">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
            <span className="rounded-full bg-white/90 px-2.5 py-1 font-semibold text-violet-800 shadow-sm ring-1 ring-violet-200/80 backdrop-blur-sm">
              Premium PDF
            </span>
            <span className="rounded-full bg-zinc-900 px-2.5 py-1 font-semibold text-white shadow-sm">
              {priceLabel}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold leading-snug tracking-normal text-zinc-900">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
            <p className="mt-2 text-xs text-zinc-500">
              Unlocks instantly after Stripe confirms payment — tied to your account only.
            </p>
          </div>
          <div className="pt-0.5">
            <button
              type="button"
              onClick={handlePurchase}
              disabled={loading}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-violet-700 px-6 text-sm font-semibold text-white shadow-md transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Redirecting to Stripe…' : 'Buy & unlock PDF'}
            </button>
            {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
