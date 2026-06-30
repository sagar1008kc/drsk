'use client';

import { useCallback, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  useBodyScrollLock,
  useClientMounted,
  useEscapeKey,
  useInitialDialogFocus,
} from '@/component/shared/modal-hooks';
import HitlBookShowcase from '@/component/portfolio/HitlBookShowcase';

type HitlBookShowcaseModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function HitlBookShowcaseModal({ open, onClose }: HitlBookShowcaseModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useClientMounted();

  const handleClose = useCallback(() => onClose(), [onClose]);

  useBodyScrollLock(open);
  useEscapeKey(open, handleClose);
  useInitialDialogFocus(open, panelRef);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-[3vw] backdrop-blur-sm sm:p-[4vw]"
          role="presentation"
        >
          <div className="absolute inset-0" aria-hidden onClick={handleClose} />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 flex h-[min(86vh,680px)] w-[min(94vw,56rem)] max-h-[86dvh] flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.45)]"
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3 sm:px-5 sm:py-3.5">
              <div className="min-w-0">
                <p id={titleId} className="truncate text-sm font-bold text-white sm:text-base">
                  HITL Knowledge Base
                </p>
                <p className="text-[11px] text-slate-400 sm:text-xs">
                  Essential patterns for secure and aligned AI
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close HITL knowledge base"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 shadow-sm transition hover:bg-slate-700 hover:text-white sm:h-10 sm:w-10"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
              <HitlBookShowcase className="min-h-0 flex-1" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
