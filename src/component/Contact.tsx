'use client';

import { FormEvent, useMemo, useState } from 'react';
import { toast } from 'sonner';
import ContactConfirmation from '@/component/BookingConfirmation';

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type StatusState = {
  type: 'idle' | 'error';
  message: string;
};

type ContactFormProps = {
  onClose?: () => void;
  /** Dark card + fields for use on black page sections */
  appearance?: 'light' | 'dark';
};

const MESSAGE_LIMIT = 1000;

const fieldClass =
  'min-h-[48px] w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-200';

const fieldClassDark =
  'min-h-[48px] w-full rounded-2xl border border-zinc-400 bg-zinc-950 px-4 py-3 text-base text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30';

export default function ContactForm({
  onClose,
  appearance = 'light',
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    company: '',
  });

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    type: 'idle',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'message' ? value.slice(0, MESSAGE_LIMIT) : value,
    }));

    if (status.type === 'error') {
      setStatus({ type: 'idle', message: '' });
    }
  };

  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  }, [form.email]);

  const isFormReady = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      isEmailValid &&
      form.message.trim().length > 0
    );
  }, [form.name, form.email, form.message, isEmailValid]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || !isFormReady) return;

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      let data: { error?: string; message?: string } | null = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            `Failed to send message. Server returned ${response.status}.`
        );
      }

      toast.success('Message sent. We will get back to you soon.', {
        duration: 5000,
      });
      setShowConfirmation(true);

      if (onClose) {
        onClose();
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <ContactConfirmation
        appearance={appearance}
        onClose={() => {
          setShowConfirmation(false);
          setForm({
            name: '',
            email: '',
            message: '',
            company: '',
          });
        }}
      />
    );
  }

  const messageLength = form.message.length;
  const isNearLimit = messageLength >= 900;
  const isDark = appearance === 'dark';
  const field = isDark ? fieldClassDark : fieldClass;
  const labelClass = isDark
    ? 'mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-400'
    : 'mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500';

  return (
    <div className="flex min-h-0 w-full justify-center px-1 py-6 sm:px-2 sm:py-8">
      <div className="relative w-full max-w-lg">
        <div
          className={
            isDark
              ? 'pointer-events-none absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-violet-500/25 via-violet-600/15 to-transparent opacity-90 blur-sm'
              : 'pointer-events-none absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-violet-300/60 via-sky-200/50 to-transparent opacity-80 blur-sm'
          }
          aria-hidden
        />
        <div
          className={
            isDark
              ? 'relative overflow-hidden rounded-[1.25rem] border border-zinc-400 bg-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-zinc-400/30'
              : 'relative overflow-hidden rounded-[1.25rem] border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] ring-1 ring-white/80'
          }
        >
          <div
            className={
              isDark
                ? 'border-b border-zinc-400 bg-zinc-950/90 px-5 py-6 sm:px-8 sm:py-8'
                : 'border-b border-zinc-100 bg-gradient-to-r from-violet-50 via-white to-sky-50 px-5 py-6 sm:px-8 sm:py-8'
            }
          >
            <h2
              className={
                isDark
                  ? 'mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl'
                  : 'mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl'
              }
            >
              Send a message
            </h2>
            <p
              className={
                isDark
                  ? 'mt-2 max-w-md text-sm leading-relaxed text-zinc-400'
                  : 'mt-2 max-w-md text-sm leading-relaxed text-zinc-600'
              }
            >
              We usually reply within 1–2 business days.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-5 pb-8 pt-6 sm:px-8">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={field}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                inputMode="email"
                className={field}
              />
              <p
                className={
                  isDark
                    ? 'mt-1.5 text-xs leading-relaxed text-zinc-500'
                    : 'mt-1.5 text-xs leading-relaxed text-zinc-500'
                }
              >
                Provide a valid email address — we use it for replies and
                confirmations.
              </p>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={MESSAGE_LIMIT}
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to share?"
                className={`${field} min-h-[140px] resize-y sm:min-h-[160px]`}
              />
              <div
                className={`mt-2 text-right text-xs ${
                  isNearLimit
                    ? isDark
                      ? 'text-amber-400'
                      : 'text-amber-600'
                    : isDark
                      ? 'text-zinc-500'
                      : 'text-zinc-500'
                }`}
              >
                {messageLength}/{MESSAGE_LIMIT}
              </div>
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            {status.type === 'error' && status.message ? (
              <div
                role="alert"
                className={
                  isDark
                    ? 'rounded-2xl border border-red-900/60 bg-red-950/50 px-4 py-3 text-sm text-red-200'
                    : 'rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
                }
              >
                {status.message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!isFormReady || loading}
              className="mx-auto flex min-h-[52px] w-1/2 min-w-[180px] items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500 px-4 text-sm font-bold text-white shadow-lg shadow-violet-300/40 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100 sm:text-base"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending…
                </span>
              ) : (
                'Send message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
