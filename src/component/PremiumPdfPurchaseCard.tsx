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
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="h-40 w-28 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
          <Image
            src={coverImage}
            alt={title}
            width={112}
            height={160}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-1 font-medium text-violet-700">
              Premium PDF
            </span>
            <span className="rounded-full border border-zinc-300 bg-zinc-50 px-2 py-1 font-semibold text-zinc-700">
              {priceLabel}
            </span>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-zinc-900">{title}</h2>
          <p className="mt-2 text-sm text-zinc-600">{description}</p>
          <p className="mt-2 text-xs text-zinc-500">
            Download unlocks only after successful Stripe payment.
          </p>
          <button
            type="button"
            onClick={handlePurchase}
            disabled={loading}
            className="mt-4 h-10 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Redirecting to Stripe...' : 'Buy and unlock PDF'}
          </button>
          {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}
