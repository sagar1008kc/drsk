'use client';

type ContactConfirmationProps = {
  onClose: () => void;
};

export default function ContactConfirmation({
  onClose,
}: ContactConfirmationProps) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center py-8">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-900/80 px-6 py-12 text-center shadow-xl backdrop-blur md:px-10 md:py-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-2 ring-emerald-400/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-emerald-400"
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

        <h3 className="mt-6 text-2xl font-bold text-white md:text-3xl">
          Message Sent
        </h3>

        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-zinc-400">
          Thank you for reaching out. Your message has been sent successfully.
          We will get back to you as soon as possible.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
        >
          Send Another Message
        </button>
      </div>
    </div>
  );
}
