import Link from 'next/link';

export const metadata = {
  title: 'Booking confirmed',
};

export default function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const complimentary = searchParams.complimentary === '1';

  return (
    <main className="min-h-[70vh] px-4 py-16 text-white">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40">
          <svg
            className="h-8 w-8 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight md:text-4xl">
          Thank you
        </h1>
        {complimentary ? (
          <>
            <p className="mt-4 text-lg leading-8 text-zinc-400">
              Your complimentary session request is received. Confirmation and
              meeting details will be sent to your email shortly.
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-500">
              If you do not see an email within a few minutes, check your spam
              folder.
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-lg leading-8 text-zinc-400">
              Your payment was received. Your booking confirmation and meeting
              details will be sent to your email shortly.
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-500">
              It can take a minute for confirmation to arrive while your payment
              is finalized. If you do not see an email, please check your spam
              folder.
            </p>
          </>
        )}
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
