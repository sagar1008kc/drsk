'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { INTERFACE_SHOWCASE } from '@/lib/projects';
import { accentMap } from '@/component/project/project-styles';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectScreensShowcase() {
  return (
    <div className="mt-8 flex w-full flex-col gap-5 sm:mt-10 sm:gap-6 lg:gap-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="w-full rounded-2xl border border-violet-200 bg-white px-5 py-5 shadow-sm sm:rounded-3xl sm:px-8 sm:py-6"
      >
        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-700 sm:text-xs">
          {INTERFACE_SHOWCASE.tag}
        </span>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl lg:text-3xl">
          {INTERFACE_SHOWCASE.title}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          {INTERFACE_SHOWCASE.description}
        </p>
      </motion.div>

      {INTERFACE_SHOWCASE.items.map((item, i) => {
        const style = accentMap[item.accent];
        return (
          <motion.figure
            key={item.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className={`flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-lg sm:rounded-3xl ${style.border} ${style.glow}`}
          >
            <figcaption className="w-full border-b border-violet-100 px-5 py-4 sm:px-6 sm:py-5">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 ${style.tag}`}
              >
                {item.tag}
              </span>
              <p className="mt-3 text-lg font-bold text-zinc-900 sm:text-xl">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.description}</p>
              <dl className="mt-4 flex flex-wrap gap-6">
                {item.meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                      {m.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium text-zinc-800">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </figcaption>
            <div className="w-full bg-zinc-50 p-3 sm:p-4 lg:p-5">
              <Image
                src={item.image}
                alt={`${item.title} screenshot`}
                width={1920}
                height={1080}
                className="mx-auto h-auto w-full max-w-full rounded-lg object-contain ring-1 ring-violet-100 sm:rounded-xl"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          </motion.figure>
        );
      })}
    </div>
  );
}
