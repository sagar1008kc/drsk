'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import type { Service } from '@/lib/services';
import { SESSION_SERVICES } from '@/lib/services';

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
  cta: string;
  onClick: () => void;
  eyebrow: string;
  accent: 'emerald' | 'violet';
};

function ServiceCard({
  title,
  subtitle,
  bullets,
  price,
  cta,
  onClick,
  eyebrow,
  accent,
}: ServiceCardProps) {
  const isViolet = accent === 'violet';

  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className={`group relative overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(2,6,23,0.45)] md:p-8 ${
        isViolet
          ? 'border-violet-400/20 bg-gradient-to-br from-[#1A1730] via-[#121320] to-[#0C0D15]'
          : 'border-emerald-400/20 bg-gradient-to-br from-[#13241F] via-[#101C1A] to-[#0C0F12]'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          isViolet
            ? 'bg-[radial-gradient(circle_at_top_right,rgba(167,139,250,0.2),transparent_55%)]'
            : 'bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_55%)]'
        }`}
      />
      <div className="relative z-[1]">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
            isViolet
              ? 'border-violet-300/30 bg-violet-400/10 text-violet-200'
              : 'border-emerald-300/30 bg-emerald-400/10 text-emerald-200'
          }`}
        >
          {eyebrow}
        </span>

        <h3 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h3>

        <p className="mt-4 text-base leading-7 text-zinc-300">{subtitle}</p>

        <ul className="mt-6 space-y-3">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-7 text-zinc-200"
            >
              <span
                className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                  isViolet ? 'bg-violet-300' : 'bg-emerald-300'
                }`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-end justify-between gap-4">
          <p className="text-xl font-semibold text-white md:text-2xl">{price}</p>
          <button
            type="button"
            onClick={onClick}
            className={`inline-flex min-h-[46px] items-center justify-center rounded-full border px-6 py-2.5 text-sm font-semibold transition ${
              isViolet
                ? 'border-violet-300/60 bg-violet-500 text-white hover:bg-violet-400'
                : 'border-emerald-300/60 bg-emerald-500 text-white hover:bg-emerald-400'
            }`}
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

  return (
    <>
      <main className="min-h-screen bg-[#0A0B12] pb-16 text-white">
        <section id="services" className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center md:text-left"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Services
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-zinc-300 md:mx-0">
                Virtual sessions and digital solutions — book a session or request
                a quote. Available in English, Nepali, and Hindi.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12 },
                },
              }}
              className="grid gap-6 lg:grid-cols-2"
            >
              <ServiceCard
                title="Virtual Session"
                eyebrow="Virtual Session"
                subtitle="One-on-one guidance for career growth, AI usage, personal branding, and next steps."
                bullets={[
                  'Career development and strategy',
                  'Personal brand guidance',
                  'Mental Health Awareness',
                  'Book writing and publishing guidance',
                ]}
                price="$99 / session"
                cta="Book Session"
                accent="emerald"
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
                accent="violet"
                onClick={() => setQuoteDialogVisible(true)}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-zinc-300 md:p-8"
            >
              <h2 className="text-base font-bold text-white">How it works</h2>
              <p className="mt-2">
                For virtual sessions, choose your focus and time, then complete
                secure checkout. For digital projects, send your scope — we reply
                with a quote by email.
              </p>
            </motion.div>
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
