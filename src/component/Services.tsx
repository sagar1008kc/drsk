'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import type { Service } from '@/lib/services';
import { SESSION_SERVICES } from '@/lib/services';
import { BOOKING_MEETING_FROM_EMAIL } from '@/lib/meetingPlatform';
import Link from 'next/link';

const BookingDialog = dynamic(() => import('@/component/BookingDialog'), {
  ssr: false,
});

const WebsiteQuoteDialog = dynamic(
  () => import('@/component/WebsiteQuoteDialog'),
  {
    ssr: false,
  }
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type ServiceCardProps = {
  title: string;
  subtitle: string;
  bullets: string[];
  price: string;
  /** e.g. strikethrough list price */
  compareAtPrice?: string;
  cta: string;
  onClick: () => void;
  eyebrow: string;
};

const cardShell =
  'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-gradient-to-b from-white to-[#F9F6F0] p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-900/10 sm:rounded-2xl sm:p-7 md:p-8';

function ServiceCard({
  title,
  subtitle,
  bullets,
  price,
  compareAtPrice,
  cta,
  onClick,
  eyebrow,
}: ServiceCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.4 }}
      className={cardShell}
    >
      <div className="flex flex-1 flex-col">
        <span className="inline-flex w-fit max-w-full items-center rounded-full bg-amber-50/80 px-3 py-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-amber-950/80 sm:text-xs sm:tracking-[0.14em]">
          {eyebrow}
        </span>

        <h3 className="mt-3 text-xl font-bold tracking-tight text-stone-900 sm:mt-4 sm:text-2xl">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:mt-3 sm:text-base">
          {subtitle}
        </p>

        <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm leading-6 text-stone-700 sm:gap-3 sm:leading-7"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600/70 sm:mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex w-full flex-col gap-4 border-t border-stone-200/80 pt-6 sm:pt-8">
          <div>
            {compareAtPrice ? (
              <p className="text-base font-medium text-stone-400 line-through sm:text-lg">
                {compareAtPrice}
              </p>
            ) : null}
            <p className="text-lg font-bold text-stone-900 sm:text-xl md:text-2xl">
              {price}
            </p>
          </div>
          <button
            type="button"
            onClick={onClick}
            className="mx-auto flex min-h-[48px] w-full min-w-0 max-w-xs items-center justify-center rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-center text-sm font-semibold tracking-wide text-[#FDF9F0] transition hover:bg-stone-800 sm:min-h-[50px] sm:rounded-2xl sm:px-5"
          >
            {cta}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [quoteDialogVisible, setQuoteDialogVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openBooking = (svc: Service) => {
    setSelectedService(svc);
    setDialogVisible(true);
  };

  const closeBooking = () => {
    setDialogVisible(false);
    setSelectedService(null);
  };

  const virtualSessionService =
    SESSION_SERVICES.find((s) => s.id === 'business-career-session') ||
    SESSION_SERVICES[0] ||
    null;

  const nonprofitSession =
    SESSION_SERVICES.find((s) => s.id === 'nonprofit-community-session') ||
    null;

  const scheduledGroupSession =
    SESSION_SERVICES.find((s) => s.id === 'scheduled-group-session') || null;

  return (
    <>
      <main className="min-h-screen bg-[#0a0a0b] pb-12 text-zinc-100 sm:pb-16">
        <section id="services" className="relative border-b border-[#C9A962]/10 pb-8 pt-2 sm:pb-10 sm:pt-4 md:py-12">
          <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(180deg,white,transparent_85%)]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(201, 169, 98, 0.1) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>
          <div className="relative mx-auto max-w-6xl px-3 sm:px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center sm:mb-12"
            >
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                <span className="relative inline-block">
                  Services
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#5c4a22] via-[#D4B96A] to-[#5c4a22]"
                    aria-hidden
                  />
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:mt-6 sm:text-base md:text-lg">
                Book virtual sessions, request digital solutions, or apply for
                complimentary nonprofit support — clear pricing and a simple booking
                flow for each option.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid items-stretch gap-4 sm:gap-6 md:grid-cols-2"
            >
              <ServiceCard
                title="Virtual Session"
                eyebrow="Virtual Session · 1:1"
                subtitle="Private one-on-one (1:1) session for:"
                bullets={[
                  'Career development and strategy',
                  'Personal brand guidance',
                  'Mental Health Awareness',
                  'Book writing and publishing guidance',
                  'Other',
                ]}
                compareAtPrice="$250"
                price="$99 / session (1 hour)"
                cta="Book Session"
                onClick={() => {
                  if (virtualSessionService) openBooking(virtualSessionService);
                }}
              />

              <ServiceCard
                title="Digital solutions"
                eyebrow="Digital solutions"
                subtitle="Websites, integrations, hosting, and ongoing support — request a tailored quote for your project."
                bullets={[
                  'Website design and development',
                  'Hosting setup and deployment',
                  'Ongoing maintenance',
                  'AI integration and smart features',
                ]}
                price="Quote — tailored pricing"
                cta="Request a quote"
                onClick={() => setQuoteDialogVisible(true)}
              />

              <ServiceCard
                title="Group session"
                eyebrow="Scheduled cohorts"
                subtitle="Small-group sessions on fixed dates with set topics. Pick your date when you register."
                bullets={
                  scheduledGroupSession?.bullets ?? [
                    'May 16, 2026 — Career development and strategy',
                    'June 20, 2026 — Mental health awareness',
                    'June 27, 2026 — Book writing and publishing guidance',
                  ]
                }
                compareAtPrice="$150"
                price="$49 / seat (90 min)"
                cta="Register now"
                onClick={() => {
                  if (scheduledGroupSession) openBooking(scheduledGroupSession);
                }}
              />

              <ServiceCard
                title="Volunteering"
                eyebrow="Nonprofits & communities"
                subtitle="Complimentary sessions for registered nonprofits, schools, and volunteer-led community work when capacity allows."
                bullets={[
                  'No payment — mission-driven contexts',
                  'Educational and supportive focus',
                  'Subject to availability',
                  `Meeting details from ${BOOKING_MEETING_FROM_EMAIL} after approval`,
                ]}
                price="Complimentary"
                cta="Request session"
                onClick={() => {
                  if (nonprofitSession) openBooking(nonprofitSession);
                }}
              />
            </motion.div>

            <p className="mt-4 text-center text-xs text-zinc-500 sm:text-sm">
              Note: Sessions are available in English, Nepali, or Hindi.
            </p>

          </div>
        </section>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#C9A962]/25 bg-zinc-900/60 px-4 py-5 text-center ring-1 ring-zinc-800/80 sm:mt-12">
          <p className="text-sm font-medium text-zinc-200 md:text-base">
            Want to level up AI skills or emotional balance?
          </p>
          <Link
            href="/books"
            className="mt-3 inline-flex items-center justify-center rounded-full border border-[#8B7535] bg-gradient-to-b from-[#D4B96A] to-[#8E7235] px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-md transition hover:brightness-110"
          >
            Read Books
          </Link>
        </div>
        <p className="mt-6 px-1 text-center text-sm leading-relaxed text-zinc-500 sm:mt-8">
          Interested in something similar?{' '}
          <Link
            href="/project"
            className="font-semibold text-[#C9A962] underline-offset-4 hover:text-white hover:underline"
          >
            View projects
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
      </main>

      <BookingDialog
        visible={dialogVisible}
        service={selectedService}
        onHide={closeBooking}
      />
      <WebsiteQuoteDialog
        visible={quoteDialogVisible}
        onHide={() => setQuoteDialogVisible(false)}
      />
      
    </>
  );
}
