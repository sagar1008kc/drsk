import type { Metadata } from 'next';
import BooksCatalog from '@/component/books/BooksCatalog';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/books',
  title: 'Books',
  description: 'Books by Dr. SK — AI Forward Deployed Engineering, AI career titles, and wellness collections.',
});

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-white py-14 text-zinc-900">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-center text-3xl font-bold tracking-tight md:text-4xl">Books</h1>
        <BooksCatalog />
      </div>
    </main>
  );
}
