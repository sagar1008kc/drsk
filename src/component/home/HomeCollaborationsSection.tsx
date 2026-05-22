'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionShell from './SectionShell';
import { badgeClass, container, gradientText, sectionTitle } from './styles';

const AUTO_MS = 5000;
const VISIBLE_LG = 3;

type Accent = 'rose' | 'amber' | 'sky' | 'emerald';

const accentStyles: Record<
  Accent,
  { tag: string; quote: string; star: string; bar: string }
> = {
  rose: {
    tag: 'border-rose-200 bg-rose-50 text-rose-800',
    quote: 'text-rose-600',
    star: 'text-rose-500',
    bar: 'bg-rose-500',
  },
  amber: {
    tag: 'border-amber-200 bg-amber-50 text-amber-900',
    quote: 'text-amber-700',
    star: 'text-amber-500',
    bar: 'bg-amber-500',
  },
  sky: {
    tag: 'border-sky-200 bg-sky-50 text-sky-800',
    quote: 'text-sky-600',
    star: 'text-sky-500',
    bar: 'bg-sky-500',
  },
  emerald: {
    tag: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    quote: 'text-emerald-600',
    star: 'text-emerald-500',
    bar: 'bg-emerald-500',
  },
};

const clientStories = [
  {
    id: 'ai-integration',
    accent: 'rose' as Accent,
    field: 'Small business · AI integration',
    quote:
      'We were losing leads after hours and repeating the same answers every day. After Dr. SK wired an assistant into our site and booking flow, responses got faster and our team finally had one place to see what customers actually asked for.',
    author: 'Maria R.',
    role: 'Owner',
    context: 'Local wellness studio',
  },
  {
    id: 'digital-services',
    accent: 'amber' as Accent,
    field: 'Digital services',
    quote:
      'Our old site looked fine but did not convert. The rebuild was mobile-first, clearer, and connected to the tools we already used. Within weeks we had better form completion and fewer “how do I book?” messages.',
    author: 'James T.',
    role: 'Founder',
    context: 'Boutique consulting firm',
  },
  {
    id: 'publishing',
    accent: 'sky' as Accent,
    field: 'Book writing & publishing',
    quote:
      'Dr. SK helped shape a story-led manuscript on AI stress and daily balance — clear chapters, real examples, and a path to publish without drowning in jargon. Readers tell us it reads like a conversation.',
    author: 'Priya K.',
    role: 'Co-author & editor',
    context: 'Independent professional network',
  },
  {
    id: 'wellness-sessions',
    accent: 'emerald' as Accent,
    field: 'Mental health awareness · sessions',
    quote:
      'The session was story-based and grounded — not preachy. People left with language for stress and overthinking, and a few colleagues finally reached out for support. It shifted the room in a way slides never did.',
    author: 'Alex M.',
    role: 'People & culture lead',
    context: 'Mid-size technology team',
  },
] as const;

const DESKTOP_PAGE_COUNT = clientStories.length - VISIBLE_LG + 1;

function useIsLgUp() {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isLg;
}

function StarRow({ className }: { className: string }) {
  return (
    <div className={`flex justify-center gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20">
          <path d="M10 1.5l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ClientTestimonialCard({
  story,
  className = '',
}: {
  story: (typeof clientStories)[number];
  className?: string;
}) {
  const style = accentStyles[story.accent];

  return (
    <article
      className={`flex h-full w-full flex-col overflow-hidden rounded-xl border border-violet-200/80 bg-white shadow-[0_8px_28px_rgba(139,92,246,0.08)] ${className}`}
    >
      <div className={`h-1 shrink-0 ${style.bar}`} aria-hidden />

      <div className="flex flex-1 flex-col gap-2 p-2 lg:gap-3 lg:p-6">
        <span
          className={`inline-flex w-fit max-w-full rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold uppercase leading-tight tracking-wide lg:px-3 lg:py-1 lg:text-[0.6875rem] ${style.tag}`}
        >
          {story.field}
        </span>

        <blockquote className="flex-1 text-sm leading-relaxed text-zinc-700 lg:text-sm lg:leading-relaxed">
          <span className={`mr-0.5 text-lg leading-none ${style.quote}`} aria-hidden>
            “
          </span>
          {story.quote}
          <span className={`ml-0.5 text-lg leading-none ${style.quote}`} aria-hidden>
            ”
          </span>
        </blockquote>

        <div className="border-t border-violet-100 pt-2 text-center lg:pt-4">
          <StarRow className={style.star} />
          <p className="mt-1.5 text-sm font-semibold text-zinc-900 lg:mt-2 lg:text-base">{story.author}</p>
          <p className="mt-0.5 text-xs leading-snug text-zinc-500">
            {story.role} · {story.context}
          </p>
        </div>
      </div>
    </article>
  );
}

function CarouselArrow({
  direction,
  onClick,
  label,
  compact = false,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  label: string;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex shrink-0 items-center justify-center rounded-full border border-violet-200 bg-white text-zinc-600 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800 ${
        compact ? 'h-10 w-10 text-base' : 'h-11 w-11 text-lg lg:h-12 lg:w-12'
      }`}
    >
      <span aria-hidden>{direction === 'prev' ? '←' : '→'}</span>
    </button>
  );
}

export default function HomeCollaborationsSection() {
  const isLg = useIsLgUp();
  const [pos, setPos] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const pageCount = isLg ? DESKTOP_PAGE_COUNT : clientStories.length;
  const desktopStart = Math.min(pos, clientStories.length - VISIBLE_LG);
  const visibleDesktop = clientStories.slice(desktopStart, desktopStart + VISIBLE_LG);
  const mobileStory = clientStories[pos];

  const goTo = useCallback(
    (index: number) => {
      setPos((index + pageCount) % pageCount);
    },
    [pageCount]
  );

  const goNext = useCallback(() => goTo(pos + 1), [goTo, pos]);
  const goPrev = useCallback(() => goTo(pos - 1), [goTo, pos]);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setPos((p) => (p + 1) % pageCount);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, pageCount]);

  useEffect(() => {
    if (pos >= pageCount) setPos(0);
  }, [pageCount, pos]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const endX = e.changedTouches[0]?.clientX ?? 0;
    const diff = touchStartX.current - endX;
    if (diff > 48) goNext();
    else if (diff < -48) goPrev();
  }

  const dotButtons = (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: pageCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={
            isLg
              ? `Client stories slide ${index + 1} of ${pageCount}`
              : `${clientStories[index].field} — story ${index + 1}`
          }
          aria-current={index === pos ? 'true' : undefined}
          onClick={() => goTo(index)}
          className="min-h-[44px] min-w-[36px] rounded-full p-2"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              index === pos ? 'h-2 w-7 bg-violet-500' : 'h-2 w-2 bg-violet-200'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <SectionShell ariaLabelledBy="collab-heading" className="!overflow-visible">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Clients & collaborations</span>
          <h2 id="collab-heading" className={`${sectionTitle} mt-3`}>
            What <span className={gradientText}>clients say</span>
          </h2>
        </div>
      </div>

      <div
        className="relative mt-8 w-full sm:mt-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Desktop: arrows flanking 3 full-width cards */}
        <div className="mx-auto hidden w-full items-center gap-4 px-4 lg:flex lg:px-6 xl:gap-5">
          <CarouselArrow direction="prev" onClick={goPrev} label="Previous client stories" />

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={desktopStart}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-3 gap-3 lg:gap-4"
              >
                {visibleDesktop.map((s) => (
                  <ClientTestimonialCard key={s.id} story={s} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <CarouselArrow direction="next" onClick={goNext} label="Next client stories" />
        </div>

        {/* Mobile: full-width card, controls underneath */}
        <div className="px-4 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileStory.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="w-full"
            >
              <ClientTestimonialCard story={mobileStory} />
            </motion.div>
          </AnimatePresence>

          <div className="mt-3 flex items-center justify-between gap-2">
            <CarouselArrow
              direction="prev"
              onClick={goPrev}
              label="Previous client story"
              compact
            />
            {dotButtons}
            <CarouselArrow
              direction="next"
              onClick={goNext}
              label="Next client story"
              compact
            />
          </div>
        </div>

        <div className={`${container} mt-4 hidden lg:block`}>{dotButtons}</div>
      </div>
    </SectionShell>
  );
}
