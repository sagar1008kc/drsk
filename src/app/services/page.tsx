'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'primereact/button';
import BookingDialog, { Service } from '@/component/BookingDialog';

const fadeUp = {
  hidden: { opacity: 1, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const services: Service[] = [
  {
    key: 'business',
    tag: 'Business / Career',
    title: 'Business & Career Advancement',
    description:
      'Focused virtual guidance for professionals, job seekers, and creators who want clearer direction, stronger positioning, and practical next steps.',
    bullets: [
      'Career development and job search strategy',
      'Book writing and Publishing Support',
      'AI integration and strategy for businesses and creators',
      'Digital business and personal brand development',
    ],
    oldPrice: '$250',
    newPrice: '$99',
    duration: '1 hour',
    accent: 'emerald',
    paypalHostedButtonId: 'M2PDKM9QK9KBJ',
  },
  {
    key: 'support',
    tag: 'Support / Awareness',
    title: 'Mental Health Support Session',
    description:
      'Supportive non-clinical conversations focused on awareness, emotional check-ins, encouragement, and practical guidance.',
    bullets: [
      'Stress and emotional awareness',
      'Supportive listening',
      'Burnout and life-balance discussion',
      'Resource and help-seeking guidance',
    ],
    oldPrice: '$250',
    newPrice: '$99',
    duration: '1 hour',
    accent: 'sky',
    paypalHostedButtonId: 'M2PDKM9QK9KBJ',
    note:
      'Support sessions are educational and supportive only. No therapy, diagnosis, or medical treatment is provided.',
  },
];

function getCardStyles(accent: Service['accent']) {
  if (accent === 'sky') {
    return {
      glow: 'shadow-[0_18px_50px_rgba(2,132,199,0.10)]',
      badge: 'border border-sky-200 bg-sky-50 text-sky-700',
      iconBox: 'border border-sky-100 bg-white text-sky-700',
      accentBar: 'from-sky-500 to-cyan-400',
    };
  }

  return {
    glow: 'shadow-[0_18px_50px_rgba(16,185,129,0.10)]',
    badge: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
    iconBox: 'border border-emerald-100 bg-white text-emerald-700',
    accentBar: 'from-emerald-500 to-lime-400',
  };
}

export default function ServicesPage() {
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
      <main className="min-h-screen bg-white">
        <section id="services" className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[28px] border border-black/5 bg-[#FAF7F2] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                <div>
                  <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm">
                    Virtual Sessions
                  </div>

                  <h1 className="mt-5 text-3xl font-bold tracking-tight text-black md:text-4xl">
                    How Can I Help You?
                  </h1>

                  <p className="mt-4 max-w-3xl text-lg leading-8 text-black/80">
                    I offer practical virtual sessions designed to help individuals,
                    professionals, and creators move forward with more clarity,
                    confidence, and direction.
                  </p>

                  <p className="mt-4 text-base font-semibold text-black">
                    Sessions available in English, Nepali, and Hindi.
                  </p>
                </div>

                <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
              
                    <div>
                      <h2 className="text-base font-bold text-black">
                        Simple booking process
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-black/75">
                        Choose your session, fill in your details, and complete
                        secure payment with PayPal. After payment, I will follow up
                        using your provided email to confirm scheduling.
                      </p>
                    </div>
                  </div>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {services.map((service) => {
                  const styles = getCardStyles(service.accent);

                  return (
                    <article
                      key={service.key}
                      className={`group relative overflow-hidden rounded-[26px] border border-black/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)] md:p-7 ${styles.glow}`}
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
                            <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex items-end gap-3">
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
                        <Button
                          label="Book Session"
                          icon="pi pi-calendar"
                          rounded
                          outlined
                          onClick={() => openBooking(service)}
                          pt={{
                            root: {
                              className:
                                'px-4 py-3 font-semibold border-black bg-black text-white text-black hover:bg-sky-700',
                            },
                          }}
                        />
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