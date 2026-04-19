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
    <section className="overflow-hidden rounded-2xl shadow-xl shadow-zinc-900/[0.06]">
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-square w-full shrink-0 bg-[#F8F7F4] sm:aspect-auto sm:h-[min(340px,52vh)] sm:w-[260px] sm:shrink-0">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-contain object-center"
            sizes="(max-width: 640px) 100vw, 260px"
            priority
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent sm:hidden" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-emerald-700 px-2.5 py-1 font-semibold text-white shadow-sm">
              Free for members
            </span>
            <span className="rounded-full bg-white/90 px-2.5 py-1 font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-200/80 backdrop-blur-sm">
              PDF
            </span>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
            {fileName ? (
              <p className="mt-1 text-xs text-zinc-400">{fileName}</p>
            ) : null}
          </div>

          <div>
            <button
              type="button"
              onClick={handleDownload}
              disabled={loading}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Preparing…
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download free PDF
                </>
              )}
            </button>

            {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}

            <p className="mt-3 text-xs text-zinc-500">
              Secure link • Logged-in members only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
