'use client';

type ContactConfirmationProps = {
  onClose: () => void;
  appearance?: 'light' | 'dark';
};

export default function ContactConfirmation({
  onClose,
  appearance = 'light',
}: ContactConfirmationProps) {
  const isDark = appearance === 'dark';

  return (
    <div className="flex min-h-[40vh] items-center justify-center py-8">
      <div
        className={
          isDark
            ? 'w-full max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-10 text-center shadow-[0_18px_45px_rgba(0,0,0,0.45)] ring-1 ring-zinc-800 md:px-10 md:py-12'
            : 'w-full max-w-2xl rounded-2xl border border-emerald-100 bg-white px-6 py-10 text-center shadow-[0_18px_45px_rgba(15,23,42,0.12)] md:px-10 md:py-12'
        }
      >
        <div
          className={
            isDark
              ? 'mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950 ring-2 ring-emerald-800/80'
              : 'mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 ring-2 ring-emerald-200'
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={
              isDark ? 'h-8 w-8 text-emerald-400' : 'h-8 w-8 text-emerald-600'
            }
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3
          className={
            isDark
              ? 'mt-6 text-2xl font-bold text-white md:text-3xl'
              : 'mt-6 text-2xl font-bold text-zinc-900 md:text-3xl'
          }
        >
          Message sent successfully
        </h3>

        <p
          className={
            isDark
              ? 'mx-auto mt-3 max-w-md text-base leading-7 text-zinc-400'
              : 'mx-auto mt-3 max-w-md text-base leading-7 text-zinc-600'
          }
        >
          Thank you for reaching out. We usually respond within 1 to 2 business days.
        </p>
        <p
          className={
            isDark
              ? 'mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500'
              : 'mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500'
          }
        >
          If your request is urgent, you can book a session directly and we will prioritize your
          response.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/services"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-violet-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800"
          >
            Book a session
          </a>
          <button
            type="button"
            onClick={onClose}
            className={
              isDark
                ? 'inline-flex min-h-[44px] items-center justify-center rounded-full border border-zinc-600 bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800'
                : 'inline-flex min-h-[44px] items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-6 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100'
            }
          >
            Send another message
          </button>
        </div>
      </div>
    </div>
  );
}
