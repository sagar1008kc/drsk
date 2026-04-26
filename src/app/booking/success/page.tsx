import Link from 'next/link';
import { BOOKING_MEETING_FROM_EMAIL } from '@/lib/meetingPlatform';

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
    <main className="min-h-[70vh] bg-[#F8F7F4] px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-2 ring-emerald-200">
          <svg
            className="h-8 w-8 text-emerald-600"
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

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          Thank you!
        </h1>

        {complimentary ? (
          <>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Your complimentary session request has been received. Watch for a
              confirmation and meeting details from{' '}
              <span className="font-medium text-zinc-800">
                {BOOKING_MEETING_FROM_EMAIL}
              </span>
              .
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              If you do not see an email within a few minutes, check your spam folder.
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Your payment was received. Your confirmation and meeting link will
              come from{' '}
              <span className="font-medium text-zinc-800">
                {BOOKING_MEETING_FROM_EMAIL}
              </span>{' '}
              shortly.
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              It can take a moment for confirmation to arrive while your payment is
              finalized. If you do not see an email, please check your spam folder.
            </p>
          </>
        )}

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
