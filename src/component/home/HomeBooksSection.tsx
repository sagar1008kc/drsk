'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionShell from './SectionShell';
import { FEATURED_BOOKS } from '@/lib/featured-books';
import {
  badgeClass,
  container,
  ctaIndigo,
  ctaSecondary,
  glassCard,
  sectionDesc,
  sectionTitle,
} from './styles';

const ctaByAccent = {
  indigo: ctaIndigo,
  amber: ctaSecondary,
} as const;

export default function HomeBooksSection() {
  return (
    <SectionShell id="books" ariaLabelledBy="books-heading">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Featured books</span>
          <h2 id="books-heading" className={`${sectionTitle} mt-3`}>
            Read the right book for your next breakthrough
          </h2>
          <p className={sectionDesc}>
            Two focused paths: AI and future readiness, or emotional balance in a changing world.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {FEATURED_BOOKS.map((book, index) => (
            <motion.article
              key={book.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={glassCard}
            >
              <a
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl ring-1 ring-white/10"
              >
                <Image
                  src={book.image}
                  alt={book.alt}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </a>
              <h3 className="mt-5 text-lg font-bold text-white sm:text-xl">{book.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{book.body}</p>
              <a
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 ${ctaByAccent[book.accent]}`}
              >
                {book.cta}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
