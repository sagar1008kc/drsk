'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import ServicesHeroSection from '@/component/services/ServicesHeroSection';
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
    panel: string;
    text: string;
    wave: string;
  }
> = {
  violet: {
    ring: 'ring-violet-400/30',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.14)]',
    eyebrow: 'bg-violet-500/10 text-violet-700 ring-violet-200',
    icon: 'bg-violet-500/15 text-violet-600',
    dot: 'bg-violet-500',
    border: 'border-violet-200/70 hover:border-violet-300',
    panel: 'from-violet-50/95 via-white to-white',
    text: 'text-violet-700',
    wave: 'text-violet-200/60',
  },
  indigo: {
    ring: 'ring-indigo-400/30',
    glow: 'shadow-[0_0_40px_rgba(99,102,241,0.14)]',
    eyebrow: 'bg-indigo-500/10 text-indigo-700 ring-indigo-200',
    icon: 'bg-indigo-500/15 text-indigo-600',
    dot: 'bg-indigo-500',
    border: 'border-indigo-200/70 hover:border-indigo-300',
    panel: 'from-indigo-50/95 via-white to-white',
    text: 'text-indigo-700',
    wave: 'text-indigo-200/60',
  },
  emerald: {
    ring: 'ring-emerald-400/30',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.14)]',
    eyebrow: 'bg-emerald-500/10 text-emerald-700 ring-emerald-200',
    icon: 'bg-emerald-500/15 text-emerald-600',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200/70 hover:border-emerald-300',
    panel: 'from-emerald-50/95 via-white to-white',
    text: 'text-emerald-700',
    wave: 'text-emerald-200/60',
  },
  amber: {
    ring: 'ring-amber-400/30',
    glow: 'shadow-[0_0_40px_rgba(245,158,11,0.14)]',
    eyebrow: 'bg-amber-500/10 text-amber-800 ring-amber-200',
    icon: 'bg-amber-500/15 text-amber-700',
    dot: 'bg-amber-500',
    border: 'border-amber-200/70 hover:border-amber-300',
    panel: 'from-amber-50/95 via-white to-white',
    text: 'text-amber-700',
    wave: 'text-amber-200/60',
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ServicesWaveLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute left-0 top-0 h-full w-full text-violet-100/80"
        viewBox="0 0 1440 3600"
        preserveAspectRatio="none"
      >
        <motion.path
          animate={{
            d: [
              'M0 220 C240 120 420 320 720 220 C980 130 1160 300 1440 190 V3600 H0 Z',
              'M0 260 C250 170 460 280 720 230 C990 175 1190 250 1440 230 V3600 H0 Z',
              'M0 220 C240 120 420 320 720 220 C980 130 1160 300 1440 190 V3600 H0 Z',
            ],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          fill="currentColor"
        />
      </svg>
      <svg
        className="absolute left-0 top-[12%] h-[78%] w-full text-indigo-200/35"
        viewBox="0 0 1440 2800"
        preserveAspectRatio="none"
      >
        <motion.path
          animate={{
            d: [
              'M0 220 C260 310 420 80 720 190 C980 285 1180 120 1440 220',
              'M0 180 C260 100 460 320 720 210 C990 95 1180 330 1440 170',
              'M0 220 C260 310 420 80 720 190 C980 285 1180 120 1440 220',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(139,92,246,0.10),transparent_30%),radial-gradient(circle_at_86%_38%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_16%_74%,rgba(16,185,129,0.08),transparent_30%)]" />
    </div>
  );
}

function ServiceSectionVectorBackground({
  style,
  index,
}: {
  style: (typeof accentStyles)[ServiceAccent];
  index: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className={`absolute -right-20 top-10 h-72 w-72 rounded-full bg-current opacity-70 blur-3xl sm:h-96 sm:w-96 ${style.wave}`}
        animate={{
          x: [0, -28, 8, 0],
          y: [0, 18, -10, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{ duration: 14 + index, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute -left-16 bottom-8 h-56 w-56 rounded-full bg-current opacity-60 blur-3xl sm:h-80 sm:w-80 ${style.wave}`}
        animate={{
          x: [0, 24, -12, 0],
          y: [0, -20, 12, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{ duration: 16 + index, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg
        className={`absolute inset-0 h-full w-full ${style.wave}`}
        viewBox="0 0 1200 760"
        preserveAspectRatio="none"
      >
        <motion.path
          animate={{
            d: [
              'M-80 235 C150 80 335 380 555 235 C765 95 930 300 1280 150',
              'M-80 275 C160 390 355 95 570 250 C780 405 970 120 1280 230',
              'M-80 235 C150 80 335 380 555 235 C765 95 930 300 1280 150',
            ],
          }}
          transition={{ duration: 12 + index * 0.7, repeat: Infinity, ease: 'easeInOut' }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 18"
          opacity="0.75"
        />
        <motion.path
          animate={{
            d: [
              'M-60 525 C180 410 350 635 600 505 C825 388 980 585 1260 455',
              'M-60 485 C190 650 390 390 610 515 C820 635 1010 405 1260 520',
              'M-60 525 C180 410 350 635 600 505 C825 388 980 585 1260 455',
            ],
          }}
          transition={{ duration: 15 + index * 0.6, repeat: Infinity, ease: 'easeInOut' }}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.45"
        />
        {[0, 1, 2, 3, 4].map((node) => (
          <motion.circle
            key={node}
            cx={180 + node * 205}
            cy={index % 2 === 0 ? 170 + (node % 2) * 310 : 470 - (node % 2) * 300}
            r={node % 2 === 0 ? 7 : 5}
            fill="currentColor"
            opacity="0.45"
            animate={{
              y: [0, -18, 12, 0],
              opacity: [0.25, 0.55, 0.35, 0.25],
            }}
            transition={{
              duration: 5 + node + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.55),transparent_34%,rgba(255,255,255,0.36)_68%,transparent)]" />
    </div>
  );
}

function ServiceDetailSection({ area, index }: { area: ServiceArea; index: number }) {
  const style = accentStyles[area.accent];
  const Icon = area.icon;
  const reverse = index % 2 === 1;

  return (
    <motion.section
      id={area.id}
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className="relative flex min-h-[100dvh] w-full scroll-mt-20 items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <ServiceSectionVectorBackground style={style} index={index} />
      <div
        className={`relative z-10 mx-auto flex min-h-[74dvh] w-full max-w-6xl items-center overflow-hidden rounded-[2rem] border bg-gradient-to-br p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8 lg:p-10 ${style.border} ${style.panel}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.1),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(16,185,129,0.08),transparent_34%)]" />
        <div className={`relative grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
          <div className={reverse ? 'lg:col-start-2' : ''}>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 sm:text-xs ${style.eyebrow}`}
            >
              {area.eyebrow}
            </span>
            <h3 className="mt-5 text-[clamp(2.5rem,7vw,5.75rem)] font-black leading-[0.95] tracking-tight text-zinc-900">
              {area.title}
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              {area.subtitle}
            </p>
            {area.disclaimer ? (
              <p className="mt-5 rounded-xl bg-white/80 px-3 py-2 text-xs leading-relaxed text-zinc-600 ring-1 ring-zinc-200/80">
                {area.disclaimer}
              </p>
            ) : null}
          </div>

          <div className={`relative ${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div className="absolute -inset-4 rounded-[2rem] bg-white/40 blur-2xl" aria-hidden />
            <div className="relative rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-sm sm:p-6 lg:p-8">
              <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <span
                  className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-[2rem] ring-1 sm:h-32 sm:w-32 ${style.icon} ${style.ring}`}
                >
                  <Icon className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden />
                </span>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${style.text}`}>
                    Highlights
                  </p>
                  <p className="mt-1 text-xl font-bold text-zinc-900 sm:text-2xl">{area.navKicker}</p>
                </div>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {area.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-2xl border border-zinc-100 bg-white/75 p-3 text-sm leading-relaxed text-zinc-700"
                  >
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
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
          className="relative scroll-mt-20 overflow-hidden border-t border-violet-200/60 bg-gradient-to-b from-white via-[#FAFAFF] to-violet-50/40"
        >
          <ServicesWaveLayer />
          <div className="dot-pattern pointer-events-none absolute inset-0 opacity-25" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,92,246,0.09),transparent_55%)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-700 shadow-sm backdrop-blur-sm sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Service paths
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Individual services with practical highlights
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Each section below explains what the service can realistically support. For specific quotes, please use the request a quote button below.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="relative w-full"
          >
            {SERVICE_AREAS.map((area, index) => (
              <ServiceDetailSection key={area.id} area={area} index={index} />
            ))}
          </motion.div>

          <div className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
            <p className="relative mt-8 text-center text-xs text-zinc-500 sm:text-sm">
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
                  Start the conversation
                </p>
                <h3 className="mt-2 text-xl font-bold text-zinc-900 sm:text-2xl">
                  Ready to discuss your goal?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
                  Choose the service area, share your need, and we&apos;ll reply with the best next
                  step, pricing, or session option.
                </p>
                <button
                  type="button"
                  onClick={() => openQuote()}
                  className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 sm:w-auto"
                >
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Request a Quote
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
                    . We&apos;ll respond about sessions, quotes, or practical next steps.
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
