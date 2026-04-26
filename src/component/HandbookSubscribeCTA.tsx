'use client';

import { FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';
type Variant = 'light' | 'dark';

const DEFAULT_FULL_HEADING = 'Subscribe for updates';
const DEFAULT_FULL_DESCRIPTION =
  'Occasional emails from SK Creation with links to resources, services, and announcements.';

/** Comfortable tap target + vertical padding; min width so fields don’t feel squeezed in grids */
const emailFieldClass =
  'box-border w-full min-h-[3rem] min-w-[min(100%,18rem)] flex-1 rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3.5 text-base leading-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-300/40';

const emailFieldDarkClass =
  'box-border w-full min-h-[3rem] min-w-[min(100%,18rem)] flex-1 rounded-xl border border-zinc-700/90 bg-zinc-950/80 px-4 py-3.5 text-base leading-normal text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-[#C9A962]/60 focus:ring-2 focus:ring-[#C9A962]/20';

const subscribeButtonNeutralClass =
  'inline-flex min-h-[3rem] shrink-0 items-center justify-center rounded-xl bg-zinc-900 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60';

const subscribeButtonVioletClass =
  'inline-flex min-h-[3rem] shrink-0 items-center justify-center rounded-xl bg-violet-700 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60';

const subscribeButtonDarkClass =
  'inline-flex min-h-[3rem] shrink-0 items-center justify-center rounded-xl border border-[#8B7535] bg-gradient-to-b from-[#D4B96A] to-[#9A7B35] px-6 py-3.5 text-base font-bold uppercase tracking-wide text-zinc-950 shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60';

const emailFieldLightOnWhiteClass =
  'box-border w-full min-h-[3rem] min-w-[min(100%,18rem)] flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-base leading-normal text-zinc-900 outline-none ring-violet-500/0 transition placeholder:text-zinc-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-500/20';

const emailFieldEmbeddedClass =
  'box-border w-full min-h-[3rem] min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3.5 text-base leading-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-300/40';

export type HandbookSubscribeCTAProps = {
  variant?: Variant;
  /** Short headline + email + subscribe only (home page). */
  minimal?: boolean;
  /** With `minimal`: no card/title — parent supplies heading (e.g. in a grid card). */
  embedded?: boolean;
  /** Full variant only: overrides default heading (e.g. home page Resources). */
  heading?: string;
  /** Full variant only: overrides default description. */
  description?: string;
  /** Full variant + light: omit default top margin (e.g. nested under Resources). */
  flushTop?: boolean;
};

export default function HandbookSubscribeCTA({
  variant = 'light',
  minimal = false,
  embedded = false,
  heading,
  description,
  flushTop = false,
}: HandbookSubscribeCTAProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const companyRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error('Please enter your email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/handbook-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          company: companyRef.current?.value || '',
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
        alreadySubscribed?: boolean;
      };
      if (!res.ok) {
        toast.error(data.error || 'Something went wrong. Please try again.');
        return;
      }
      if (data.alreadySubscribed) {
        toast.message(data.message || "You're already on the list.");
        return;
      }
      toast.success(
        data.message || 'Thank you for subscribing. Please check your inbox for a confirmation message.'
      );
      setEmail('');
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (minimal && embedded) {
    return (
      <div className="relative w-full">
        <form
          onSubmit={onSubmit}
          className="mt-2 flex flex-col gap-3"
        >
          <label className="sr-only" htmlFor="handbook-subscribe-email-embedded">
            Email
          </label>
          <input
            id="handbook-subscribe-email-embedded"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className={emailFieldEmbeddedClass}
          />
          <input
            ref={companyRef}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            aria-hidden
          />
          <button
            type="submit"
            disabled={loading}
            className={`${subscribeButtonNeutralClass} w-full`}
          >
            {loading ? 'Sending…' : 'Subscribe'}
          </button>
        </form>
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">
          By subscribing you agree to receive updates from Dr. SK.
        </p>
      </div>
    );
  }

  if (minimal) {
    return (
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-center font-display text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Subscribe for more from Dr. SK
        </h1>
        <form
          onSubmit={onSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3"
        >
          <label className="sr-only" htmlFor="handbook-subscribe-email">
            Email
          </label>
          <input
            id="handbook-subscribe-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className={emailFieldClass}
          />
          <input
            ref={companyRef}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            aria-hidden
          />
          <button
            type="submit"
            disabled={loading}
            className={subscribeButtonNeutralClass}
          >
            {loading ? 'Sending…' : 'Subscribe'}
          </button>
        </form>
        <p className="mt-4 text-center text-xs leading-relaxed text-zinc-500">
          By subscribing you agree to receive updates from Dr. SK.
        </p>
      </div>
    );
  }

  const isDark = variant === 'dark';
  const fullHeading = heading ?? DEFAULT_FULL_HEADING;
  const fullDescription = description ?? DEFAULT_FULL_DESCRIPTION;

  const lightShell =
    (flushTop ? '' : 'mt-8 ') +
    'rounded-2xl border border-violet-200/90 bg-gradient-to-b from-violet-50/80 to-white/90 p-5 shadow-sm sm:p-6';

  return (
    <div
      className={
        isDark
          ? 'rounded-2xl border border-[#C9A962]/30 bg-zinc-900/90 p-5 shadow-[0_0_40px_rgba(201,169,98,0.08)] ring-1 ring-zinc-800/80 sm:p-7'
          : lightShell
      }
    >
      <h3
        className={
          isDark
            ? 'text-lg font-semibold text-[#E8D5A3]'
            : 'text-base font-semibold text-zinc-900'
        }
      >
        {fullHeading}
      </h3>
      <p
        className={
          isDark
            ? 'mt-2 text-sm leading-relaxed text-zinc-400'
            : 'mt-2 text-sm leading-relaxed text-zinc-600'
        }
      >
        {fullDescription}
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3"
      >
        <label className="sr-only" htmlFor="handbook-subscribe-email-full">
          Email
        </label>
        <input
          id="handbook-subscribe-email-full"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className={isDark ? emailFieldDarkClass : emailFieldLightOnWhiteClass}
        />
        <input
          ref={companyRef}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-hidden
        />
        <button
          type="submit"
          disabled={loading}
          className={isDark ? subscribeButtonDarkClass : subscribeButtonVioletClass}
        >
          {loading ? 'Sending…' : 'Subscribe'}
        </button>
      </form>
      <p className={isDark ? 'mt-3 text-xs text-zinc-500' : 'mt-3 text-xs text-zinc-500'}>
        By subscribing you agree to receive this message and occasional updates.
      </p>
    </div>
  );
}
