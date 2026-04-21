'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';

function StarGlyph({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-full w-full"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.611l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.611l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 00.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

export default function StarFeedback() {
  const dialogTitleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setHoverRating(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  const handleRate = () => {
    toast.success('Thank you so much for your feedback!', {
      duration: 4500,
    });
    close();
  };

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="star-feedback-overlay"
          className="fixed inset-0 z-[1150] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close feedback"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={close}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-[1] w-full max-w-md rounded-3xl border border-stone-200/90 bg-[#F8F7F4] p-6 text-zinc-900 shadow-[0_24px_64px_-12px_rgba(24,24,27,0.18)] outline-none ring-1 ring-black/[0.04] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700/90">
                  Quick feedback
                </p>
                <h2 id={dialogTitleId} className="mt-2 text-xl font-bold sm:text-2xl">
                  How would you rate your experience?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Tap a star to share your rating. Your response helps us improve.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-full border border-zinc-200/90 bg-white p-2 text-zinc-500 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-800"
                aria-label="Close"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="mt-8 flex items-center justify-between gap-1 sm:gap-2"
              onMouseLeave={() => setHoverRating(null)}
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const display = hoverRating ?? 0;
                const active = value <= display;
                return (
                  <button
                    key={value}
                    type="button"
                    onMouseEnter={() => setHoverRating(value)}
                    onClick={handleRate}
                    aria-label={`Rate ${value} out of 5 stars`}
                    className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl border transition sm:h-14 sm:w-14 ${
                      active
                        ? 'border-amber-400/70 bg-amber-50 text-amber-600 shadow-sm'
                        : 'border-zinc-200/90 bg-white text-zinc-400 shadow-sm hover:border-zinc-300 hover:text-zinc-700'
                    }`}
                  >
                    <span className="h-7 w-7 sm:h-8 sm:w-8">
                      <StarGlyph active={active} />
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-center text-xs text-zinc-500/90">
              1 — needs work · 5 — excellent
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Hover zone extends left so the tab is easy to uncover; only the star shows until hover/focus */}
      <div className="group fixed right-0 top-1/2 z-[1100] flex -translate-y-1/2 items-center justify-end pl-10 sm:pl-14">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open feedback"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="pointer-events-auto flex max-h-[3rem] min-h-[3rem] items-center overflow-hidden rounded-l-2xl border border-white/15 border-r-0 bg-zinc-900/95 py-0 shadow-xl backdrop-blur-md transition-[max-width,background-color] duration-300 ease-out max-w-[3rem] group-hover:max-w-[13.5rem] group-hover:bg-zinc-800 group-focus-within:max-w-[13.5rem] group-focus-within:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          <span className="flex h-[3rem] w-12 shrink-0 items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-inner">
            <span className="h-5 w-5">
              <StarGlyph active />
            </span>
          </span>
          <span
            className="whitespace-nowrap pr-4 text-left text-sm font-semibold leading-tight text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
            aria-hidden
          >
            Feedback
          </span>
        </button>
      </div>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
