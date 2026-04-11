'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
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

  const openBooking = (service: Service) => {
    setSelectedService(service);
    setDialogVisible(true);
  };

  const closeBooking = () => {
    setDialogVisible(false);
    setSelectedService(null);
  };

  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a] pb-16 text-white">
        <section id="services" className="py-8 md:py-12">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-[#141414] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                <div>
                  <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                    Virtual Sessions
                  </div>

                  <h1 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
                    How Can I Help You?
                  </h1>

                  <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
                    I offer practical virtual sessions designed to help
                    individuals, professionals, and creators move forward with
                    more clarity, confidence, and direction.
                  </p>

                  <p className="mt-4 text-base font-semibold text-white">
                    Sessions available in English, Nepali, and Hindi.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-sm backdrop-blur-sm">
                  <h2 className="text-base font-bold text-white">
                    Simple booking process
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    Choose your session, fill in your details, complete payment,
                    and send your booking request. I will follow up using your
                    provided email to confirm scheduling.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {SESSION_SERVICES.map((service) => {
                  const styles = getCardStyles(service.accent);

                  return (
                    <article
                      key={service.key}
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
                        <span className="text-lg font-semibold text-red-500 line-through">
                          {service.oldPrice}
                        </span>
                        <span className="text-4xl font-bold tracking-tight text-green-600">
                          {service.newPrice}
                        </span>
                        <span className="pb-1 text-base font-medium text-black">
                          / {service.duration}
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
        onBookingSuccess={(message) => toast.success(message, { duration: 6000 })}
      />
    </>
  );
}
