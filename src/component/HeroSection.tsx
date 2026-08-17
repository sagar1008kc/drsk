'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_BOOKS, FDE_BOOK } from '@/lib/featured-books';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import { PROFILE_TAGS } from '@/lib/profile-tags';

const otherBooks = FEATURED_BOOKS.filter((book) => book.id !== 'fde');

export default function HeroSection() {
  return (
    <>
      <section
        id="fde-release"
        aria-labelledby="home-fde-heading"
        className="relative flex min-h-[100dvh] flex-col overflow-hidden border-b border-teal-200/60 bg-gradient-to-br from-[#f0fdfa] via-white to-emerald-50/90 text-zinc-900"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <AiHeroDiagram theme="brand" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_45%,rgba(13,148,136,0.16),transparent_58%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:px-10 xl:px-12">
          <motion.a
            href={FDE_BOOK.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="group relative mx-auto flex w-full max-w-[22rem] items-center justify-center sm:max-w-[26rem] lg:max-w-none"
          >
            <div className="absolute inset-[12%] rounded-full bg-teal-400/20 blur-3xl" />
            <Image
              src="/fde-book1.png"
              alt={FDE_BOOK.alt}
              width={1122}
              height={1402}
              className="relative h-auto w-full max-w-[20rem] rounded-2xl object-contain shadow-[0_24px_48px_rgba(15,23,42,0.18)] transition duration-500 group-hover:scale-[1.02] sm:max-w-[24rem] lg:max-w-[26rem]"
              sizes="(max-width: 1024px) 70vw, 420px"
              priority
            />
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white">
                Hot
              </span>
              <span className="inline-flex items-center rounded-full border border-teal-300 bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-teal-800">
                New release
              </span>
              <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-800">
                Launch sale
              </span>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-sm">
              Fundamentals &amp; system design
            </p>
            <h2
              id="home-fde-heading"
              className="mt-2 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl md:text-[2.6rem] md:leading-[1.12]"
            >
              {FDE_BOOK.title}
            </h2>
            <p className="mt-3 text-lg font-semibold text-zinc-800">{FDE_BOOK.tagline}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              {FDE_BOOK.body}
            </p>

            <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
              <div className="rounded-2xl border border-teal-200 bg-white/90 px-4 py-3 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-700">Ebook</p>
                <p className="mt-1 text-2xl font-black tracking-tight text-zinc-900">
                  {FDE_BOOK.pricing?.ebook}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Paperback
                </p>
                <p className="mt-1 text-2xl font-black tracking-tight text-zinc-900">
                  {FDE_BOOK.pricing?.paperback}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm font-semibold text-zinc-800">
              5 scenario-based system designs
            </p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {FDE_BOOK.scenarios?.map((scenario) => (
                <li key={scenario} className="flex gap-2 text-sm text-zinc-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                  {scenario}
                </li>
              ))}
            </ul>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">{FDE_BOOK.audience}</p>

            <a
              href={FDE_BOOK.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#0d9488] px-7 py-3 text-sm font-bold text-white shadow-[0_0_28px_rgba(13,148,136,0.35)] transition hover:bg-teal-700"
            >
              {FDE_BOOK.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-violet-200/60 bg-gradient-to-br from-[#F8F7FF] via-white to-indigo-50/90 text-zinc-900">
        <div className="pointer-events-none absolute inset-0 opacity-[0.4]">
          <AiHeroDiagram theme="light" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
              AI, digital solutions, and{' '}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
                mental health awareness
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              AI-Native Full-Stack Engineering, 1:1 sessions, digital solutions, and wellness-oriented
              frameworks designed to improve performance, increase income potential, and support
              sustainable growth.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#0d9488] px-7 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {otherBooks.map((book) => (
              <article
                key={book.id}
                className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white/80 p-4 shadow-sm"
              >
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[5.5rem] shrink-0 sm:w-[7rem]"
                >
                  <Image
                    src={book.image}
                    alt={book.alt}
                    width={280}
                    height={360}
                    className="h-auto w-full object-contain"
                  />
                </a>
                <div className="min-w-0">
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                      book.accent === 'amber' ? 'text-amber-700' : 'text-violet-600'
                    }`}
                  >
                    {book.shortTitle}
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-zinc-900 sm:text-base">
                    {book.title}
                  </p>
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm font-semibold text-teal-700 hover:underline"
                  >
                    {book.cta} →
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-teal-200/60 pt-6">
            {PROFILE_TAGS.map((name) => (
              <span key={name} className="text-xs font-semibold tracking-wide text-teal-800 sm:text-sm">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
