'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import type { Service } from '@/lib/services';
import { SESSION_SERVICES } from '@/lib/services';
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

/** Virtual = purplish, Digital = greenish, Group cohort = sky, Volunteering = rose */
type CardTheme = 'purple' | 'green' | 'sky' | 'rose';

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
  theme: CardTheme;
};

const themeStyles: Record<
  CardTheme,
  {
    shell: string;
    glow: string;
    badge: string;
    dot: string;
    button: string;
  }
> = {
  purple: {
    shell:
      'border-violet-500/25 bg-gradient-to-br from-[#1e1040] via-[#151028] to-[#0c0a14]',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(167,139,250,0.28),transparent_55%)]',
    badge: 'border-violet-400/35 bg-violet-500/15 text-violet-100',
    dot: 'bg-violet-300',
    button:
      'border-violet-400/50 bg-violet-600 text-white hover:bg-violet-500 shadow-[0_8px_30px_rgba(124,58,237,0.35)]',
  },
  green: {
    shell:
      'border-emerald-500/25 bg-gradient-to-br from-[#0f2419] via-[#0c1a14] to-[#0a1210]',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.22),transparent_55%)]',
    badge: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-100',
    dot: 'bg-emerald-300',
    button:
      'border-emerald-400/50 bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_8px_30px_rgba(16,185,129,0.3)]',
  },
  sky: {
    shell:
      'border-sky-500/25 bg-gradient-to-br from-[#0f1a28] via-[#0c1520] to-[#0a1018]',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_55%)]',
    badge: 'border-sky-400/35 bg-sky-500/15 text-sky-100',
    dot: 'bg-sky-300',
    button:
      'border-sky-400/50 bg-sky-600 text-white hover:bg-sky-500 shadow-[0_8px_30px_rgba(14,165,233,0.28)]',
  },
  rose: {
    shell:
      'border-rose-500/25 bg-gradient-to-br from-[#301018] via-[#1a1014] to-[#0f0a0c]',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.2),transparent_55%)]',
    badge: 'border-rose-400/35 bg-rose-500/12 text-rose-100',
    dot: 'bg-rose-300',
    button:
      'border-rose-400/50 bg-rose-600 text-white hover:bg-rose-500 shadow-[0_8px_30px_rgba(225,29,72,0.28)]',
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
  theme,
}: ServiceCardProps) {
  const s = themeStyles[theme];

  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-8 ${s.shell}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${s.glow}`}
      />
      <div className="relative z-[1] flex flex-1 flex-col">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${s.badge}`}
        >
          {eyebrow}
        </span>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h3>

        <p className="mt-4 text-base leading-7 text-zinc-300">{subtitle}</p>

        <ul className="mt-6 space-y-3">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-7 text-zinc-200"
            >
              <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex w-full flex-col gap-4 border-t border-white/10 pt-8">
          <div>
            {compareAtPrice ? (
              <p className="text-lg font-semibold text-red-400/90 line-through decoration-red-400/80">
                {compareAtPrice}
              </p>
            ) : null}
            <p className="text-xl font-semibold text-white md:text-2xl">{price}</p>
          </div>
          <button
            type="button"
            onClick={onClick}
            className={`flex min-h-[52px] w-full items-center justify-center rounded-2xl border px-5 py-3 text-center text-sm font-semibold tracking-wide transition ${s.button}`}
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
      <main className="min-h-screen bg-[#0A0B12] pb-16 text-white">
        <section id="services" className="pb-10 pt-6 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                <span className="relative inline-block">
                  Services
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-indigo-500"
                    aria-hidden
                  />
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
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
              className="grid items-stretch gap-6 md:grid-cols-2"
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
                  'Note: Sessions are available in English, Nepali, or Hindi',
                ]}
                compareAtPrice="$250"
                price="$99 / session (1 hour)"
                cta="Book Session"
                theme="purple"
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
                theme="green"
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
                theme="sky"
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
                  'Meet link sent by email after approval',
                ]}
                price="Complimentary"
                cta="Request session"
                theme="rose"
                onClick={() => {
                  if (nonprofitSession) openBooking(nonprofitSession);
                }}
              />
            </motion.div>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-16 border-t border-white/10 pt-14 md:mt-20 md:pt-16"
              aria-labelledby="clients-heading"
            >
              <h2
                id="clients-heading"
                className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500"
              >
                Collaborations & clients
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-base text-zinc-400">
                Organizations and partners we&apos;ve worked with across
                technology, publishing, and community initiatives.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-inner">
                <Image
                  src="/client.png"
                  alt="Client and collaboration logos"
                  width={1600}
                  height={900}
                  className="h-auto w-full object-contain object-center"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                />
              </div>
            </motion.section>
          </div>
        </section>
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-violet-500/25 bg-violet-500/10 px-4 py-5 text-center">
          <p className="text-sm font-medium text-zinc-200 md:text-base">
            Want to level up AI skills or emotional balance?
          </p>
          <Link
            href="/books"
            className="mt-3 inline-flex items-center rounded-full border border-violet-400/40 bg-violet-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            Read Books
          </Link>
        </div>
        <p className="mt-8 text-center text-sm text-zinc-500">
          Interested in something similar?{' '}
          <Link
            href="/project"
            className="font-semibold text-violet-400 underline-offset-4 hover:text-violet-300 hover:underline"
          >
            View projects
          </Link>{' '}
          or{' '}
          <Link
            href="/#contact"
            className="font-semibold text-violet-400 underline-offset-4 hover:text-violet-300 hover:underline"
          >
            get in touch
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
