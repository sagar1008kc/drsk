import Link from 'next/link';

export const metadata = {
  title: 'Payment canceled',
};

export default function BookingCancelPage() {
  return (
    <main className="min-h-[70vh] bg-[#F8F7F4] px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 ring-2 ring-zinc-200">
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

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          Payment canceled
        </h1>

        <p className="mt-4 text-lg leading-8 text-zinc-600">
          Your payment was canceled. You can return to the services page and try
          again whenever you are ready.
        </p>

        <Link
          href="/services"
          className="mt-10 inline-flex items-center gap-2 rounded-full border-2 border-zinc-900 bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700 hover:border-zinc-700"
        >
          Back to Services
        </Link>
      </div>
    </main>
  );
}
