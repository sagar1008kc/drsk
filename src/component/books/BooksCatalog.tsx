'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { FEATURED_BOOKS, type FeaturedBook } from '@/lib/featured-books';
import BookStageBackground, { bookStageTone } from '@/component/books/BookStageBackground';

function BookDetails({
  book,
  heading,
  hideIntro = false,
}: {
  book: FeaturedBook;
  heading: string;
  hideIntro?: boolean;
}) {
  return (
    <div className="mt-4 space-y-4 border-t border-zinc-100 pt-4 text-left">
      {!hideIntro && book.tagline ? (
        <p className="text-sm font-semibold leading-relaxed text-zinc-800">{book.tagline}</p>
      ) : null}
      {!hideIntro && heading !== book.title ? (
        <p className="text-sm leading-relaxed text-zinc-600">{book.title}</p>
      ) : null}
      {!hideIntro ? <p className="text-sm leading-relaxed text-zinc-600">{book.body}</p> : null}

      {book.topics?.length ? (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Go in depth</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {book.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-800"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {book.lifecycle?.length ? (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            System-design lifecycle
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">{book.lifecycle.join(' → ')}</p>
        </div>
      ) : null}

      {book.scenarios?.length ? (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            5 scenario-based system designs
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-700">
            {book.scenarios.map((scenario) => (
              <li key={scenario} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                {scenario}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {book.audience ? (
        <p className="text-sm leading-relaxed text-zinc-600">{book.audience}</p>
      ) : null}

      {book.pricing ? (
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-teal-200 bg-teal-50/70 px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-700">Ebook</p>
            <p className="mt-0.5 text-lg font-black text-zinc-900">{book.pricing.ebook}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Paperback</p>
            <p className="mt-0.5 text-lg font-black text-zinc-900">{book.pricing.paperback}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BookCover({
  book,
  featured = false,
  priority = false,
}: {
  book: FeaturedBook;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <a
      href={book.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative isolate block aspect-[3/4] w-full overflow-hidden rounded-2xl"
    >
      <BookStageBackground tone={bookStageTone(book.accent)} />
      <Image
        src={book.image}
        alt={book.alt}
        fill
        className="object-contain p-3 drop-shadow-[0_16px_28px_rgba(15,23,42,0.14)] sm:p-4"
        sizes={featured ? '(max-width: 1024px) 90vw, 380px' : '(max-width: 1024px) 50vw, 360px'}
        priority={priority}
      />
    </a>
  );
}

function ExpandActions({
  open,
  onToggle,
  href,
  cta,
  heading,
}: {
  open: boolean;
  onToggle: () => void;
  href: string;
  cta: string;
  heading: string;
}) {
  return (
    <div className="mt-5 flex items-center gap-2">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-teal-300 hover:text-teal-800"
        aria-expanded={open}
        aria-label={open ? `Hide details for ${heading}` : `Show more for ${heading}`}
      >
        {open ? <Minus className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
      </button>
      <span className="mr-auto text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {open ? 'Less' : 'More'}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        {cta}
      </a>
    </div>
  );
}

function FeaturedFdeBook({ book }: { book: FeaturedBook }) {
  const [open, setOpen] = useState(false);
  const heading = book.title;

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="grid items-start gap-0 lg:grid-cols-[minmax(17rem,22rem)_1fr]">
        <div className="p-4 sm:p-5">
          <BookCover book={book} featured priority />
        </div>
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <span className="inline-flex w-fit items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-teal-800">
            New release
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{heading}</h2>
          {book.tagline ? (
            <p className="mt-4 text-lg font-semibold leading-snug text-zinc-800 sm:text-xl">
              {book.tagline}
            </p>
          ) : null}
          <p className="mt-3 text-base leading-relaxed text-zinc-600 sm:text-lg">{book.body}</p>
          {open ? <BookDetails book={book} heading={heading} hideIntro /> : null}
          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-teal-300 bg-teal-50 text-teal-800 transition hover:bg-teal-100"
                aria-expanded={open}
                aria-label={open ? 'Hide more details' : 'Show more details'}
              >
                {open ? <Minus className="h-5 w-5" aria-hidden /> : <Plus className="h-5 w-5" aria-hidden />}
              </button>
              <span className="text-sm font-semibold text-zinc-500">{open ? 'Less' : 'More'}</span>
              <a
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#0d9488] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                {book.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function HorizontalBookCard({ book }: { book: FeaturedBook }) {
  const [open, setOpen] = useState(false);
  const heading = book.shortTitle;
  const preview = book.body;

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto w-full max-w-[22rem] p-4 sm:p-5">
        <BookCover book={book} />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-zinc-900">{heading}</h3>
        {!open ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">{preview}</p>
        ) : (
          <BookDetails book={book} heading={heading} />
        )}
        <div className="mt-auto">
          <ExpandActions
            open={open}
            onToggle={() => setOpen((value) => !value)}
            href={book.href}
            cta={book.cta}
            heading={heading}
          />
        </div>
      </div>
    </article>
  );
}

export default function BooksCatalog() {
  const fdeBook = FEATURED_BOOKS.find((book) => book.id === 'fde') ?? FEATURED_BOOKS[0];
  const otherBooks = FEATURED_BOOKS.filter((book) => book.id !== fdeBook.id);

  return (
    <div className="mt-10 space-y-8">
      <FeaturedFdeBook book={fdeBook} />
      <div className="grid gap-6 md:grid-cols-2">
        {otherBooks.map((book) => (
          <HorizontalBookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
