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
    <main className="min-h-screen bg-[#0A0B12] pb-20 pt-5 text-white md:pt-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-violet-500/25 bg-violet-500/10 px-4 py-4 text-center shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-200/90">
            Ad
          </p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-200 md:text-base">
            Want to go deeper on practical AI development workflows? Explore{' '}
            <span className="font-semibold text-white">
              AI Powered Software Engineer
            </span>{' '}
            for implementation strategies, real-world patterns, and hands-on
            guidance.
          </p>
          <a
            href="https://a.co/d/06z7LV25"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center rounded-full border border-violet-400/40 bg-violet-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            View on Amazon
          </a>
        </div>
        <h1 className="mt-2 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Projects
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-zinc-400">
          A sample of builds spanning internal tools, public-facing experiences,
          and commerce. Each engagement focused on clarity, performance, and a
          maintainable stack.
        </p>
        {/* Project 3 — AI tools and integration POC */}
        <article className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 shadow-2xl ring-1 ring-white/5">
          <div className="border-b border-white/10 px-6 py-6 md:px-10 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400/90">
                  AI strategy POC
                </p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                  AI Tools & Integration Services
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  Business-first AI platform concept focused on website assistance,
                  lead capture, booking requests, feedback insights, and practical
                  workflow automation for small and mid-sized businesses.
                </p>
              </div>
              <dl className="flex shrink-0 flex-wrap gap-4 text-sm md:flex-col md:gap-2">
                <div>
                  <dt className="text-zinc-500">Type</dt>
                  <dd className="font-medium text-zinc-200">Product + services</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Goal</dt>
                  <dd className="font-medium text-zinc-200">Operational ROI</dd>
                </div>
              </dl>
            </div>
            <div className="mt-6">
              <Link
                href="/project/ai-poc"
                className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/20 hover:text-cyan-100"
              >
                View AI POC demo
              </Link>
            </div>
          </div>
          <div className="bg-zinc-950/60 px-6 py-6 md:px-10 md:py-8">
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Includes a complete blueprint covering mission, scope, architecture,
              target users, delivery phases, data model, security principles, and
              measurable business outcomes for a scalable launch.
            </p>
          </div>
        </article>
        {/* Project 4 — TechOcean app */}
        <article className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 shadow-2xl ring-1 ring-white/5">
          <div className="border-b border-white/10 px-6 py-6 md:px-10 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-sky-400/90">
                  Live app
                </p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">TechOcean</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  Interactive Streamlit application focused on practical workflows and
                  a clean, lightweight experience for quick exploration.
                </p>
              </div>
              <dl className="flex shrink-0 flex-wrap gap-4 text-sm md:flex-col md:gap-2">
                <div>
                  <dt className="text-zinc-500">Platform</dt>
                  <dd className="font-medium text-zinc-200">Streamlit</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Type</dt>
                  <dd className="font-medium text-zinc-200">Web app</dd>
                </div>
              </dl>
            </div>
            <div className="mt-6">
              <a
                href="https://techocean.streamlit.app/?embed_options=show_toolbar,light_theme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-200 transition hover:border-sky-300/60 hover:bg-sky-400/20 hover:text-sky-100"
              >
                Open TechOcean app
              </a>
            </div>
          </div>
        </article>
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
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-violet-500/25 bg-violet-500/10 px-4 py-5 text-center">
          <p className="text-sm font-medium text-zinc-200 md:text-base">
            Want to level up AI skills or emotional balance?
          </p>
          <a
            href="https://www.amazon.com/author/drsk1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center rounded-full border border-violet-400/40 bg-violet-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            Read Books
          </a>
        </div>
        <p className="mt-8 text-center text-sm text-zinc-500">
          Interested in something similar?{' '}
          <Link
            href="/services"
            className="font-semibold text-violet-400 underline-offset-4 hover:text-violet-300 hover:underline"
          >
            View services
          </Link>{' '}
          or{' '}
          <Link
            href="/#contact"
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
