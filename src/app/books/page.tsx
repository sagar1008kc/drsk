import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Browse all published books across emotional wellness and AI/career tracks.',
};

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] py-14 text-zinc-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
            Book catalog
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Choose your reading path
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
            Browse both collections and jump straight to the Amazon pages for full details and purchase.
          </p>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <a
              href="https://www.amazon.com/author/drsk1"
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 transition hover:shadow-md"
            >
              <Image
                src="/eb.png"
                alt="Emotional wellness books collection"
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </a>
            <h2 className="mt-4 text-xl font-semibold text-zinc-900">Emotional wellness series</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Titles focused on emotional balance, mindset, and practical life guidance.
            </p>
            <a
              href="https://www.amazon.com/author/drsk1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              View on Amazon
            </a>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <a
              href="https://www.amazon.com/author/sagar2025"
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 transition hover:shadow-md"
            >
              <Image
                src="/aibook.png"
                alt="AI and career books collection"
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </a>
            <h2 className="mt-4 text-xl font-semibold text-zinc-900">AI and career series</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Books for AI-driven software development, cybersecurity interviews, and growth in modern tech careers.
            </p>
            <a
              href="https://www.amazon.com/author/sagar2025"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              View on Amazon
            </a>
          </article>
        </div>
      </div>
    </main>
  );
}
