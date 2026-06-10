'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bot, Sparkles } from 'lucide-react';
import ServicesHeroSection from '@/component/services/ServicesHeroSection';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import {
  SERVICE_AREAS,
  type ServiceArea,
  type ServiceAccent,
  type ServiceQuoteType,
} from '@/lib/service-areas';

const WebsiteQuoteDialog = dynamic(() => import('@/component/WebsiteQuoteDialog'), {
  ssr: false,
});

const CONTACT_EMAIL = 'info@skcreation.org';

const accentStyles: Record<
  ServiceAccent,
  {
    ring: string;
    glow: string;
    eyebrow: string;
    icon: string;
    dot: string;
    border: string;
  }
> = {
  violet: {
    ring: 'ring-violet-400/30',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.14)]',
    eyebrow: 'bg-violet-500/10 text-violet-700 ring-violet-200',
    icon: 'bg-violet-500/15 text-violet-600',
    dot: 'bg-violet-500',
    border: 'border-violet-200/70 hover:border-violet-300',
  },
  indigo: {
    ring: 'ring-indigo-400/30',
    glow: 'shadow-[0_0_40px_rgba(99,102,241,0.14)]',
    eyebrow: 'bg-indigo-500/10 text-indigo-700 ring-indigo-200',
    icon: 'bg-indigo-500/15 text-indigo-600',
    dot: 'bg-indigo-500',
    border: 'border-indigo-200/70 hover:border-indigo-300',
  },
  emerald: {
    ring: 'ring-emerald-400/30',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.14)]',
    eyebrow: 'bg-emerald-500/10 text-emerald-700 ring-emerald-200',
    icon: 'bg-emerald-500/15 text-emerald-600',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200/70 hover:border-emerald-300',
  },
  amber: {
    ring: 'ring-amber-400/30',
    glow: 'shadow-[0_0_40px_rgba(245,158,11,0.14)]',
    eyebrow: 'bg-amber-500/10 text-amber-800 ring-amber-200',
    icon: 'bg-amber-500/15 text-amber-700',
    dot: 'bg-amber-500',
    border: 'border-amber-200/70 hover:border-amber-300',
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ServiceAreaCard({
  area,
  onQuote,
}: {
  area: ServiceArea;
  onQuote: (service: ServiceQuoteType) => void;
}) {
  const style = accentStyles[area.accent];
  const Icon = area.icon;

  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/90 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 sm:p-6 ${style.border} ${style.glow}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(139,92,246,0.05) 0%, transparent 50%, rgba(6,182,212,0.05) 100%)',
        }}
      />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 sm:text-xs ${style.eyebrow}`}
          >
            {area.eyebrow}
          </span>
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${style.icon} ${style.ring}`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">{area.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">{area.subtitle}</p>

        <ul className="mt-5 space-y-2.5 sm:mt-6">
          {area.bullets.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700">
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex w-full flex-col gap-3 border-t border-zinc-200/80 pt-5 sm:pt-6">
          <p className="text-sm font-semibold text-zinc-500">{area.note}</p>
          <button
            type="button"
            onClick={() => onQuote(area.title)}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Request a quote
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const [quoteDialogVisible, setQuoteDialogVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceQuoteType | ''>('');

  const openQuote = (service: ServiceQuoteType | '' = '') => {
    setSelectedService(service);
    setQuoteDialogVisible(true);
  };

  const closeQuote = () => {
    setQuoteDialogVisible(false);
    setSelectedService('');
  };

  return (
    <>
      <main className="min-h-screen bg-[#F8F7FF] text-zinc-900">
        <ServicesHeroSection />

        <section
          id="services"
          className="relative scroll-mt-20 overflow-hidden border-t border-violet-200/60 bg-gradient-to-b from-white via-[#FAFAFF] to-violet-50/40 py-12 sm:py-16 lg:py-20"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.32]">
            <AiHeroDiagram theme="light" />
          </div>
          <div className="dot-pattern pointer-events-none absolute inset-0 opacity-25" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,92,246,0.09),transparent_55%)]" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-700 shadow-sm backdrop-blur-sm sm:text-xs">
                <Bot className="h-3.5 w-3.5" aria-hidden />
                Service areas
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Choose your path
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Every card uses the same quote flow — pick a service, share your goals, and we&apos;ll
                follow up with tailored next steps.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.06 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="relative mt-10 grid items-stretch gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2"
            >
              {SERVICE_AREAS.map((area) => (
                <ServiceAreaCard key={area.id} area={area} onQuote={openQuote} />
              ))}
            </motion.div>

            <p className="relative mt-6 text-center text-xs text-zinc-500 sm:text-sm">
              Sessions available in English, Nepali, or Hindi.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-violet-200/80 bg-white/90 p-6 text-center shadow-[0_16px_48px_rgba(139,92,246,0.1)] backdrop-blur-sm sm:mt-14 sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.1),transparent_65%)]" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
                  Ready to start?
                </p>
                <h3 className="mt-2 text-xl font-bold text-zinc-900 sm:text-2xl">
                  Request a quote for any service
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                  One form covers virtual sessions, digital builds, group cohorts, and nonprofit
                  requests. Select your service in the dropdown and tell us what you need.
                </p>
                <button
                  type="button"
                  onClick={() => openQuote()}
                  className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 sm:w-auto"
                >
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Request a quote
                </button>

                <div className="mt-8 border-t border-violet-100 pt-6">
                  <p className="text-sm leading-relaxed text-zinc-600">
                    You can also reach us directly using our{' '}
                    <Link href="/contact" className="font-semibold text-violet-700 hover:underline">
                      contact form
                    </Link>{' '}
                    on the home page, or email{' '}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-semibold text-violet-700 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    . We&apos;ll respond about sessions, quotes, or volunteer requests.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <WebsiteQuoteDialog
        visible={quoteDialogVisible}
        onHide={closeQuote}
        initialService={selectedService}
      />
    </>
  );
}
