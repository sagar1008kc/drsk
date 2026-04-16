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
    <section className="overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 shadow-sm">
      {/* Cover image — full-width on mobile, constrained on desktop */}
      <div className="relative w-full overflow-hidden bg-white sm:hidden">
        <div className="relative mx-auto w-full max-w-[200px] py-4">
          <Image
            src={coverImage}
            alt={title}
            width={200}
            height={280}
            className="mx-auto block h-auto w-full object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start">
        {/* Cover — desktop sidebar */}
        <div className="relative hidden h-44 w-32 shrink-0 overflow-hidden rounded-xl border border-violet-100 bg-white sm:block">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-contain p-1"
            sizes="128px"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-1 font-semibold text-rose-700">
              Paid Resource
            </span>
            <span className="rounded-full border border-violet-200 bg-violet-100 px-2 py-1 font-semibold text-violet-700">
              {priceLabel}
            </span>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-zinc-900">{title}</h2>
          <p className="mt-2 text-sm text-zinc-600">{description}</p>
          <p className="mt-2 text-xs text-zinc-500">
            This PDF unlocks only after successful Stripe payment.
          </p>
          <button
            type="button"
            onClick={handlePurchase}
            disabled={loading}
            className="mt-4 h-10 rounded-xl bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Redirecting to Stripe...' : 'Buy and unlock PDF'}
          </button>
          {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}
