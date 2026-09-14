'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import HitlBookShowcase from '@/component/portfolio/HitlBookShowcase';

export default function HitlResourceContent() {
  return (
    <main className="min-h-screen bg-[#050810] text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col px-4 pb-6 pt-[4.75rem] sm:px-6 sm:pb-8">
        <Link
          href="/resources"
          className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-teal-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Resources
        </Link>
        <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">HITL Knowledge Base</h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Essential patterns for secure and aligned AI
        </p>
        <div className="mt-5 min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.45)]">
          <div className="h-[min(78dvh,680px)] min-h-[28rem] p-3 sm:p-4">
            <HitlBookShowcase className="h-full min-h-0" />
          </div>
        </div>
      </div>
    </main>
  );
}
