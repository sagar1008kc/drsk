import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected work — digital platforms, e‑commerce, and creative technology by Dr. SK.',
};

const cardClass =
  'overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/60 shadow-lg ring-1 ring-zinc-800/70 sm:rounded-3xl';
const linkBtn =
  'inline-flex w-full min-h-[44px] items-center justify-center rounded-full border border-white/10 bg-zinc-800/50 px-4 py-2.5 text-center text-sm font-semibold text-zinc-100 transition hover:border-[#C9A962]/40 hover:bg-zinc-800/80 sm:w-auto sm:px-5';

export default function ProjectPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] pb-16 pt-2 text-zinc-100 sm:pb-20 sm:pt-4 md:pt-8">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 bottom-auto h-48 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(201, 169, 98, 0.1) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-3 sm:px-4">
        <div className="mx-auto mb-4 max-w-3xl rounded-2xl border border-[#C9A962]/25 bg-zinc-900/50 px-3 py-4 text-center ring-1 ring-zinc-800/80 sm:mb-5 sm:px-4 sm:py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A962] sm:text-[11px]">
            Ad
          </p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-300 sm:text-base">
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
            className="mt-3 inline-flex items-center justify-center rounded-full border border-[#8B7535] bg-gradient-to-b from-[#D4B96A] to-[#8E7235] px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-sm transition hover:brightness-110"
          >
            View on Amazon
          </a>
        </div>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] sm:text-sm">
          Dr. SK
        </p>
        <h1 className="mt-1 text-center font-display text-3xl font-bold tracking-tight text-white sm:mt-2 sm:text-4xl md:text-5xl">
          <span className="relative inline-block">
            Projects
            <span
              className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#5c4a22] via-[#D4B96A] to-[#5c4a22]"
              aria-hidden
            />
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-zinc-400 sm:mt-4 sm:text-base">
          A sample of builds spanning internal tools, public-facing experiences,
          and commerce. Each engagement focused on clarity, performance, and a
          maintainable stack.
        </p>
        {/* Project 3 — AI tools and integration POC */}
        <article className={`${cardClass} mt-8 sm:mt-10`}>
          <div className="border-b border-zinc-800/80 px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A962] sm:text-xs">
                  AI strategy POC
                </p>
                <h2 className="mt-2 text-xl font-bold sm:text-2xl md:text-3xl">
                  AI Tools & Integration Services
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  Business-first AI platform concept focused on website assistance,
                  lead capture, booking requests, feedback insights, and practical
                  workflow automation for small and mid-sized businesses.
                </p>
              </div>
              <dl className="flex shrink-0 flex-wrap gap-3 text-sm sm:gap-4 md:flex-col md:gap-2">
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
            <div className="mt-5 sm:mt-6">
              <Link href="/project/ai-poc" className={linkBtn}>
                View AI POC demo
              </Link>
            </div>
          </div>
          <div className="bg-zinc-950/50 px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Includes a complete blueprint covering mission, scope, architecture,
              target users, delivery phases, data model, security principles, and
              measurable business outcomes for a scalable launch.
            </p>
          </div>
        </article>
        {/* Project 4 — TechOcean app */}
        <article className={`${cardClass} mt-8 sm:mt-10`}>
          <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A962] sm:text-xs">
                  Live app
                </p>
                <h2 className="mt-2 text-xl font-bold sm:text-2xl md:text-3xl">TechOcean</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  Interactive Streamlit application focused on practical workflows and
                  a clean, lightweight experience for quick exploration.
                </p>
              </div>
              <dl className="flex shrink-0 flex-wrap gap-3 text-sm sm:gap-4 md:flex-col md:gap-2">
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
            <div className="mt-5 sm:mt-6">
              <a
                href="https://techocean.streamlit.app/?embed_options=show_toolbar,light_theme"
                target="_blank"
                rel="noopener noreferrer"
                className={linkBtn}
              >
                Open TechOcean app
              </a>
            </div>
          </div>
        </article>
        {/* Project 1 — SK Store */}
        <article className={`${cardClass} mt-8 sm:mt-12`}>
          <div className="border-b border-zinc-800/80 px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A962] sm:text-xs">
                  E‑commerce
                </p>
                <h2 className="mt-2 text-xl font-bold sm:text-2xl md:text-3xl">SK Store</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  A modern retail storefront concept with category navigation,
                  promotional hero, product grid, and subscription capture —
                  optimized for mobile shopping and fast iteration on offers.
                </p>
              </div>
              <dl className="flex shrink-0 flex-wrap gap-3 text-sm sm:gap-4 md:flex-col md:gap-2">
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
          <div className="bg-zinc-200/10 p-2 sm:p-3">
            <Image
              src="/skstore.png"
              alt="SK Store e-commerce website screenshot"
              width={1920}
              height={1200}
              className="h-auto w-full rounded-lg object-contain shadow-md sm:rounded-xl"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </article>

        {/* Project 2 — Platform / dashboard */}
        <article className={`${cardClass} mt-8 sm:mt-10`}>
          <div className="border-b border-zinc-800/80 px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A962] sm:text-xs">
                  Product & data
                </p>
                <h2 className="mt-2 text-xl font-bold sm:text-2xl md:text-3xl">
                  Analytics & operations platform
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                  Dashboard-style experience for monitoring metrics and workflows.
                  Built with attention to information hierarchy, accessibility, and
                  consistency across dense data views.
                </p>
              </div>
              <dl className="flex shrink-0 flex-wrap gap-3 text-sm sm:gap-4 md:flex-col md:gap-2">
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
          <div className="bg-zinc-950/80 p-2 sm:p-3">
            <Image
              src="/project.png"
              alt="Analytics and operations platform screenshot"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-lg object-contain sm:rounded-xl"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </article>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#C9A962]/25 bg-zinc-900/50 px-3 py-5 text-center ring-1 ring-zinc-800/80 sm:mt-12 sm:px-4">
          <p className="text-sm font-medium text-zinc-200 md:text-base">
            Want to level up AI skills or emotional balance?
          </p>
          <a
            href="https://www.amazon.com/author/drsk1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full min-h-[44px] items-center justify-center rounded-full border border-[#8B7535] bg-gradient-to-b from-[#D4B96A] to-[#8E7235] px-4 text-sm font-bold text-zinc-950 shadow-sm transition hover:brightness-110 sm:w-auto sm:px-5"
          >
            Read Books
          </a>
        </div>
        <p className="mt-6 px-1 text-center text-sm leading-relaxed text-zinc-500 sm:mt-8">
          Interested in something similar?{' '}
          <Link
            href="/services"
            className="font-semibold text-[#C9A962] underline-offset-4 hover:text-white hover:underline"
          >
            View services
          </Link>{' '}
          or{' '}
          <Link
            href="/#contact"
            className="font-semibold text-[#C9A962] underline-offset-4 hover:text-white hover:underline"
          >
            Get in touch
          </Link>
          .
        </p>
      </div>
      </div>
    </main>
  );
}
