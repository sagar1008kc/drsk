import Link from 'next/link';

export const metadata = {
  title: 'Payment canceled',
};

export default function BookingCancelPage() {
  return (
    <main className="min-h-[70vh] px-4 py-16 text-white">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 ring-1 ring-white/10">
          <svg
            className="h-8 w-8 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight md:text-4xl">
          Payment canceled
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-400">
          Your payment was canceled. You can return to the services page and try
          again whenever you are ready.
        </p>
        <Link
          href="/services"
          className="mt-10 inline-flex rounded-full border-2 border-white bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          Back to services
        </Link>
      </div>
    </main>
  );
}
