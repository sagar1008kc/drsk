'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import HandbookSubscribeCTA from '@/component/HandbookSubscribeCTA';
import {
  HANDBOOK_DOWNLOAD_FILENAME,
  MOTIVATIONAL_EBOOK_DOWNLOAD_FILENAME,
  MOTIVATIONAL_EBOOK_PUBLIC_PATH,
  HANDBOOK_PUBLIC_PATH,
} from '@/lib/handbook-public';
import SectionShell from './SectionShell';
import {
  badgeClass,
  container,
  ctaAmber,
  ctaEmerald,
  ctaPrimary,
  glassCard,
  sectionDesc,
  sectionTitle,
} from './styles';

const cards = [
  {
    label: 'Free',
    labelClass: 'text-emerald-400',
    title: 'The Mind Matters Handbook',
    subtitle: 'Mental wellness awareness · practical story format',
    body: 'A gentle, story-style PDF that helps you notice stress, overthinking, and emotional patterns with clarity. Download the full file here with no account.',
    cta: (
      <a href={HANDBOOK_PUBLIC_PATH} download={HANDBOOK_DOWNLOAD_FILENAME} className={ctaEmerald}>
        Download PDF
      </a>
    ),
    delay: 0,
  },
  {
    label: 'Premium',
    labelClass: 'text-amber-300',
    title: 'Member library',
    subtitle: 'Purchases, samples & assigned materials',
    body: 'Sign in to see premium PDFs, guided samples, and assigned program files. New drops land here first with private, user-locked downloads.',
    cta: (
      <Link href="/login" className={ctaAmber}>
        Sign in to access
      </Link>
    ),
    delay: 0.08,
    accent: 'border-amber-500/20 bg-gradient-to-b from-[#1a1510]/90 to-[#12121a]/90',
  },
  {
    label: 'Free',
    labelClass: 'text-blue-400',
    title: 'Motivation Powerpack eBook',
    subtitle: 'Motivation and action prompts · quick reset',
    body: 'A practical motivation powerpack with focused prompts to restart momentum, boost clarity, and take confident action in daily life and work.',
    cta: (
      <a
        href={MOTIVATIONAL_EBOOK_PUBLIC_PATH}
        download={MOTIVATIONAL_EBOOK_DOWNLOAD_FILENAME}
        className={ctaPrimary}
      >
        Download motivation ebook
      </a>
    ),
    delay: 0.16,
  },
] as const;

export default function HomeResourcesSection() {
  return (
    <SectionShell id="resources" ariaLabelledBy="resources-heading">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Resources</span>
          <h2 id="resources-heading" className={`${sectionTitle} mt-3`}>
            Free download, member content, and updates
          </h2>
          <p className={sectionDesc}>
            Free handbook PDF, premium library after sign-in, and email updates—built for mobile
            and desktop.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map((card) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: card.delay }}
              className={`${glassCard} ${'accent' in card ? card.accent : ''}`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wider ${card.labelClass}`}>
                {card.label}
              </p>
              <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">{card.title}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                {card.subtitle}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{card.body}</p>
              <div className="mt-5 border-t border-white/10 pt-5">{card.cta}</div>
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl border-t border-white/10 pt-8 sm:mt-12 sm:pt-10">
          <HandbookSubscribeCTA
            variant="dark"
            flushTop
            heading="Subscribe for email updates"
            description="Get a short welcome message from SK Creation with links to free resources, services, and your member login. PDFs stay on this site—not attached to email."
          />
        </div>
      </div>
    </SectionShell>
  );
}
