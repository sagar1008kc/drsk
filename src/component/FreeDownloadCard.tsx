'use client';

import Image from 'next/image';
import { useState } from 'react';

type FreeDownloadCardProps = {
  title: string;
  description: string;
  coverImage: string;
  downloadHref: string;
  fileName?: string;
};

export default function FreeDownloadCard({
  title,
  description,
  coverImage,
  downloadHref,
  fileName,
}: FreeDownloadCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleDownload() {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      window.location.href = downloadHref;
    } catch {
      setError('Download failed. Please try again.');
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-sm">
      {/* Cover — mobile full-width */}
      <div className="relative w-full overflow-hidden bg-white sm:hidden">
        <div className="relative mx-auto w-full max-w-[200px] py-4">
          <Image
            src={coverImage}
            alt={title}
            width={200}
            height={200}
            className="mx-auto block h-auto w-full object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start">
        {/* Cover — desktop sidebar */}
        <div className="relative hidden h-44 w-44 shrink-0 overflow-hidden rounded-xl border border-emerald-100 bg-white sm:block">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-contain p-2"
            sizes="176px"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-emerald-300 bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
              Free Download
            </span>
            <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-1 font-semibold text-teal-700">
              PDF
            </span>
          </div>

          <h2 className="mt-3 text-lg font-semibold text-zinc-900">{title}</h2>
          <p className="mt-2 text-sm text-zinc-600">{description}</p>
          {fileName ? (
            <p className="mt-1 text-xs text-zinc-400">{fileName}</p>
          ) : null}

          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Preparing…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Free Download
              </>
            )}
          </button>

          {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}

          <p className="mt-3 text-xs text-zinc-400">
            No account required • Instant PDF download
          </p>
        </div>
      </div>
    </section>
  );
}
