'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import HashScrollOnLoad from '@/component/home/HashScrollOnLoad';
import { FEATURED_BOOKS } from '@/lib/featured-books';
import { RESOURCE_GROUPS, type ResourceItem } from '@/lib/resources';
import {
  badgeTeal,
  container,
  ctaPrimary,
  ctaSecondary,
  sectionDesc,
  sectionPad,
  sectionTitle,
} from '@/component/home/styles';

const CARD_CLASS =
  'group flex h-full flex-col rounded-2xl border border-teal-200/70 bg-white p-5 shadow-sm transition hover:border-teal-400 hover:shadow-[0_10px_28px_rgba(13,148,136,0.1)] sm:p-6';

const CATEGORIES = [
  ...RESOURCE_GROUPS.map((group) => ({ id: group.id, label: group.title })),
  { id: 'books', label: 'Books' },
];

function ResourceCard({ item }: { item: ResourceItem }) {
  const cta = (
    <>
      <h3 className="text-lg font-bold text-zinc-900">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{item.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-800">
        {item.external ? 'Visit product' : 'Open resource'}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={CARD_CLASS}>
        {cta}
      </a>
    );
  }

  return (
    <Link href={item.href} className={CARD_CLASS}>
      {cta}
    </Link>
  );
}

export default function ResourcesPageContent() {
  return (
    <main className="min-h-screen bg-[#F8F7FF] text-zinc-900">
      <HashScrollOnLoad />
      <section
        aria-labelledby="resources-heading"
        className="relative -mt-[3.75rem] flex min-h-[70dvh] flex-col overflow-hidden border-b border-teal-200/60 bg-[#f7fffd] pt-[3.75rem]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-8%,rgba(13,148,136,0.16),transparent_58%),radial-gradient(circle_at_88%_82%,rgba(6,182,212,0.1),transparent_42%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(13,148,136,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.07) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-8 sm:py-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-teal-700 sm:text-xs"
          >
            SK Creation
          </motion.p>
          <motion.h1
            id="resources-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mt-5 font-display text-[clamp(2.15rem,8vw,4.5rem)] font-semibold leading-[1.08] tracking-tight text-zinc-900"
          >
            Knowledge for the{' '}
            <span className="bg-gradient-to-r from-teal-700 via-cyan-700 to-emerald-700 bg-clip-text text-transparent">
              AI Era
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:mt-8 sm:text-lg sm:leading-8"
          >
            Practical AI engineering, live products, architecture examples, and books — organized in
            one place.
          </motion.p>

          <nav
            aria-label="Resource categories"
            className="mt-8 flex w-full max-w-3xl flex-wrap justify-center gap-2 sm:mt-10"
          >
            {CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-teal-200 bg-white px-3.5 py-2 text-xs font-semibold text-teal-800 transition hover:border-teal-400 hover:bg-teal-50 sm:text-sm"
              >
                {category.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {RESOURCE_GROUPS.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-heading`}
          className={`relative scroll-mt-20 overflow-hidden border-b border-teal-200/50 ${
            groupIndex % 2 === 0 ? 'bg-white' : 'bg-[#F8F7FF]'
          } ${sectionPad}`}
        >
          <div className={container}>
            <div className="mx-auto max-w-3xl text-center">
              <span className={badgeTeal}>{group.eyebrow}</span>
              <h2 id={`${group.id}-heading`} className={`${sectionTitle} mt-3`}>
                {group.title}
              </h2>
              <p className={sectionDesc}>{group.description}</p>
            </div>

            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
              {group.items.map((item, index) => (
                <motion.article
                  key={`${item.title}-${item.href}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ResourceCard item={item} />
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section
        id="books"
        aria-labelledby="books-heading"
        className={`relative scroll-mt-20 overflow-hidden bg-white ${sectionPad}`}
      >
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center">
            <span className={badgeTeal}>Publish</span>
            <h2 id="books-heading" className={`${sectionTitle} mt-3`}>
              Books
            </h2>
            <p className={sectionDesc}>
              Practical titles on production AI systems, AI literacy, and maintaining balance in a
              digital world.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_BOOKS.map((book) => (
              <article
                key={book.id}
                className="flex h-full flex-col rounded-2xl border border-teal-200/70 bg-[#f8fffd] p-5"
              >
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto w-full max-w-[10rem]"
                >
                  <Image
                    src={book.image}
                    alt={book.alt}
                    width={280}
                    height={360}
                    className="h-auto w-full object-contain"
                  />
                </a>
                <h3 className="mt-4 text-base font-bold leading-snug text-zinc-900">{book.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{book.body}</p>
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-teal-800 hover:underline"
                >
                  {book.cta} →
                </a>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/books" className={ctaPrimary}>
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4" aria-hidden />
                Explore Books
              </span>
            </Link>
            <Link href="/services" className={ctaSecondary}>
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
