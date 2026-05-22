'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Service } from '@/lib/services';
import { SESSION_SERVICES } from '@/lib/services';
import { BOOKING_MEETING_FROM_EMAIL } from '@/lib/meetingPlatform';
import ServicesHeroSection from '@/component/services/ServicesHeroSection';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';

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
  compareAtPrice?: string;
  cta: string;
  onClick: () => void;
  eyebrow: string;
  accent: 'violet' | 'indigo' | 'emerald' | 'amber';
};

const accentStyles = {
  violet: {
    eyebrow: 'bg-violet-100 text-violet-800',
    bullet: 'bg-violet-500',
    border: 'border-violet-200/80 hover:border-violet-300',
  },
  indigo: {
    eyebrow: 'bg-indigo-100 text-indigo-800',
    bullet: 'bg-indigo-500',
    border: 'border-indigo-200/80 hover:border-indigo-300',
  },
  emerald: {
    eyebrow: 'bg-emerald-100 text-emerald-800',
    bullet: 'bg-emerald-500',
    border: 'border-emerald-200/80 hover:border-emerald-300',
  },
  amber: {
    eyebrow: 'bg-amber-100 text-amber-900',
    bullet: 'bg-amber-500',
    border: 'border-amber-200/80 hover:border-amber-300',
  },
};

function ServiceCard({
  title,
  subtitle,
  bullets,
  price,
  compareAtPrice,
  cta,
  onClick,
  eyebrow,
  accent,
}: ServiceCardProps) {
  const style = accentStyles[accent];

  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.4 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-md sm:p-6 ${style.border}`}
    >
      <div className="flex flex-1 flex-col">
        <span
          className={`inline-flex w-fit max-w-full rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${style.eyebrow}`}
        >
          {eyebrow}
        </span>

        <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">{title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">{subtitle}</p>

        <ul className="mt-5 space-y-2 sm:mt-6">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700"
            >
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.bullet}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex w-full flex-col gap-3 border-t border-zinc-200/90 pt-5 sm:pt-6">
          {compareAtPrice ? (
            <p className="text-sm font-medium text-zinc-400 line-through sm:text-base">
              {compareAtPrice}
            </p>
          ) : null}
          <p className="text-lg font-bold text-zinc-900 sm:text-xl">{price}</p>
          <button
            type="button"
            onClick={onClick}
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
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
      <main className="min-h-screen bg-white text-zinc-900">
        <ServicesHeroSection />

        <section
          id="services"
          className="relative scroll-mt-20 overflow-hidden border-t border-zinc-200/80 bg-[#FAFAFA] py-12 sm:py-16 lg:py-20"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
            <AiHeroDiagram theme="light" />
          </div>
          <div className="dot-pattern pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,92,246,0.08),transparent_55%)]" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-700 sm:text-xs">
                Book &amp; build
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Choose your path
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Virtual sessions, digital project quotes, group cohorts, and nonprofit support.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.06 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="relative mt-10 grid items-stretch gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2"
            >
              <div
                className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-200 via-indigo-200 to-transparent md:block"
                aria-hidden
              />

              <ServiceCard
                accent="violet"
                title="Virtual Session"
                eyebrow="Agentic AI · 1:1 session"
                subtitle="Private one-on-one session for career, brand, wellness awareness, publishing, and more."
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
                accent="indigo"
                title="Digital solutions"
                eyebrow="Digital solutions · quote"
                subtitle="Websites, integrations, hosting, and ongoing support — request a tailored quote."
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
                accent="emerald"
                title="Group session"
                eyebrow="Mental health · cohort"
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
                accent="amber"
                title="Volunteering"
                eyebrow="Community · nonprofit"
                subtitle="Complimentary sessions for registered nonprofits, schools, and volunteer-led work when capacity allows."
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

            <p className="relative mt-6 text-center text-xs text-zinc-500 sm:text-sm">
              Sessions available in English, Nepali, or Hindi.
            </p>

            <div className="relative mx-auto mt-10 max-w-xl rounded-2xl border border-violet-200 bg-white px-5 py-6 text-center shadow-sm sm:mt-12">
              <p className="text-sm font-medium text-zinc-800 sm:text-base">
                Want to level up AI skills or emotional balance?
              </p>
              <Link
                href="https://www.amazon.com/author/drsk1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                View books on Amazon
              </Link>
            </div>

            <p className="relative mt-8 text-center text-sm text-zinc-500">
              Similar work on{' '}
              <Link href="/project" className="font-semibold text-violet-700 hover:underline">
                projects
              </Link>{' '}
              or{' '}
              <Link href="/#contact" className="font-semibold text-violet-700 hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </section>
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
