'use client';

type ContactConfirmationProps = {
  onClose: () => void;
};

export default function ContactConfirmation({
  onClose,
}: ContactConfirmationProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center py-10">
      <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-zinc-950/90 px-6 py-12 text-center shadow-2xl backdrop-blur-md md:px-10 md:py-16">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-emerald-400"
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

        <h3 className="mt-6 text-3xl font-bold text-white md:text-4xl">
          Message Sent
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400">
          Thank you for reaching out. Your message has been successfully sent.
          We appreciate your time and will get back to you as soon as possible.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-10 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-zinc-200"
        >
          Send Another Message
        </button>
      </div>
    </div>
  );
}
