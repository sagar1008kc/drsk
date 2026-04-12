'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import type { Service } from '@/lib/services';
import { SESSION_SERVICES } from '@/lib/services';

const BookingDialog = dynamic(() => import('@/component/BookingDialog'), {
  ssr: false,
});

const fadeUp = {
  hidden: { opacity: 1, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function getCardStyles(accent: Service['accent']) {
  if (accent === 'sky') {
    return {
      glow: 'shadow-[0_18px_50px_rgba(2,132,199,0.10)]',
      badge: 'border border-sky-200 bg-sky-50 text-sky-700',
      accentBar: 'from-sky-500 to-cyan-400',
      button:
        'inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 hover:border-sky-700',
    };
  }

  if (accent === 'violet') {
    return {
      glow: 'shadow-[0_18px_50px_rgba(139,92,246,0.12)]',
      badge: 'border border-violet-200 bg-violet-50 text-violet-800',
      accentBar: 'from-violet-500 to-purple-400',
      button:
        'inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800 hover:border-violet-800',
    };
  }

  if (accent === 'rose') {
    return {
      glow: 'shadow-[0_18px_50px_rgba(244,63,94,0.10)]',
      badge: 'border border-rose-200 bg-rose-50 text-rose-800',
      accentBar: 'from-rose-500 to-pink-400',
      button:
        'inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 hover:border-rose-700',
    };
  }

  return {
    glow: 'shadow-[0_18px_50px_rgba(16,185,129,0.10)]',
    badge: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
    accentBar: 'from-emerald-500 to-lime-400',
    button:
      'inline-flex items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 hover:border-emerald-700',
  };
}

export default function Services() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openBooking = (svc: Service) => {
    setSelectedService(svc);
    setDialogVisible(true);
  };

  const closeBooking = () => {
    setDialogVisible(false);
    setSelectedService(null);
  };

  return (
    <>
      <main className="min-h-screen bg-[#F8F7F4] pb-16 text-zinc-900">
        <section id="services" className="py-8 md:py-12">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm md:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                <div>
                  <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
                    Virtual Sessions
                  </div>

                  <h1 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
                    How Can I Help You?
                  </h1>

                  <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">
                    I offer practical virtual sessions designed to help
                    individuals, professionals, and creators move forward with
                    more clarity, confidence, and direction.
                  </p>

                  <p className="mt-4 text-base font-semibold text-zinc-800">
                    Sessions available in English, Nepali, and Hindi.
                  </p>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
                  <h2 className="text-base font-bold text-zinc-900">
                    Simple booking process
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    Choose your session, share your preferences, and complete
                    checkout on Stripe. After payment is confirmed, you will
                    receive a confirmation email with meeting details.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {SESSION_SERVICES.map((service) => {
                  const styles = getCardStyles(service.accent);

                  return (
                    <article
                      key={service.id}
                      className={`group relative overflow-hidden rounded-[26px] border border-white/10 bg-white p-6 text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] md:p-7 ${styles.glow}`}
                    >
                      <div
                        className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${styles.accentBar}`}
                      />

                      <div className="flex items-start justify-between">
                        <div>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
                          >
                            {service.tag}
                          </span>

                          <h3 className="mt-4 text-2xl font-bold tracking-tight text-black">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-5 text-base leading-8 text-black/80">
                        {service.description}
                      </p>

                      <ul className="mt-5 space-y-3">
                        {service.bullets.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm leading-7 text-black"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex flex-wrap items-end gap-3">
                        {service.oldPriceDisplay ? (
                          <span className="text-lg font-semibold text-red-500 line-through">
                            {service.oldPriceDisplay}
                          </span>
                        ) : null}
                        <span
                          className={`text-4xl font-bold tracking-tight ${
                            service.requiresPayment
                              ? 'text-green-600'
                              : 'text-violet-700'
                          }`}
                        >
                          {service.priceDisplay}
                        </span>
                        <span className="pb-1 text-base font-medium text-black">
                          / {service.durationLabel}
                        </span>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => openBooking(service)}
                          className={styles.button}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Book Session
                        </button>
                      </div>

                      {service.note ? (
                        <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-black/80">
                          {service.note}
                        </p>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <BookingDialog
        visible={dialogVisible}
        service={selectedService}
        onHide={closeBooking}
      />
    </>
  );
}
