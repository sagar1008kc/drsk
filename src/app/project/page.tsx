import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected work — digital platforms, e‑commerce, and creative technology by Dr. SK.',
};

export default function ProjectPage() {
  return (
    <main className="min-h-screen bg-[#0A0B12] pb-20 pt-8 text-white md:pt-12">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-violet-300/80">
          Portfolio
        </p>
        <h1 className="mt-3 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Projects
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-zinc-400">
          A sample of builds spanning internal tools, public-facing experiences,
          and commerce. Each engagement focused on clarity, performance, and a
          maintainable stack.
        </p>

        {/* Project 1 — SK Store */}
        <article className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 shadow-2xl ring-1 ring-white/5">
          <div className="border-b border-white/10 px-6 py-6 md:px-10 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400/90">
                  E‑commerce
                </p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">SK Store</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  A modern retail storefront concept with category navigation,
                  promotional hero, product grid, and subscription capture —
                  optimized for mobile shopping and fast iteration on offers.
                </p>
              </div>
              <dl className="flex shrink-0 flex-wrap gap-4 text-sm md:flex-col md:gap-2">
                <div>
                  <dt className="text-zinc-500">Role</dt>
                  <dd className="font-medium text-zinc-200">Design & development</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Focus</dt>
                  <dd className="font-medium text-zinc-200">UX, UI, responsive layout</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-[#f5f4f0] p-2 sm:p-4">
            <Image
              src="/skstore.png"
              alt="SK Store e-commerce website screenshot"
              width={1920}
              height={1200}
              className="h-auto w-full rounded-xl object-contain shadow-lg"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </article>

        {/* Project 2 — Platform / dashboard */}
        <article className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 shadow-2xl ring-1 ring-white/5">
          <div className="border-b border-white/10 px-6 py-6 md:px-10 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-400/90">
                  Product & data
                </p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                  Analytics & operations platform
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  Dashboard-style experience for monitoring metrics and workflows.
                  Built with attention to information hierarchy, accessibility, and
                  consistency across dense data views.
                </p>
              </div>
              <dl className="flex shrink-0 flex-wrap gap-4 text-sm md:flex-col md:gap-2">
                <div>
                  <dt className="text-zinc-500">Role</dt>
                  <dd className="font-medium text-zinc-200">Frontend architecture</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Focus</dt>
                  <dd className="font-medium text-zinc-200">Dashboard UI, charts</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-zinc-950 p-2 sm:p-4">
            <Image
              src="/project.png"
              alt="Analytics and operations platform screenshot"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-xl object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </article>

        <p className="mt-12 text-center text-sm text-zinc-500">
          Interested in something similar?{' '}
          <Link
            href="/services"
            className="font-semibold text-violet-400 underline-offset-4 hover:text-violet-300 hover:underline"
          >
            View services
          </Link>{' '}
          or{' '}
          <Link
            href="/#links"
            className="font-semibold text-violet-400 underline-offset-4 hover:text-violet-300 hover:underline"
          >
            get in touch
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
