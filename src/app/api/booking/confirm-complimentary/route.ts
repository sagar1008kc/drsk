import { NextResponse } from 'next/server';
import {
  claimComplimentaryBooking,
  getBookingById,
} from '@/lib/booking';
import { fulfillBookingMeetAndEmails } from '@/lib/fulfillBooking';
import { validateCheckoutPayload } from '@/lib/validations';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = validateCheckoutPayload(json);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const booking = await getBookingById(parsed.bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }

    if (booking.price_cents !== 0) {
      return NextResponse.json(
        { error: 'This session uses paid checkout.' },
        { status: 400 }
      );
    }

    if (booking.payment_status === 'waived') {
      await fulfillBookingMeetAndEmails(booking.id);
      return NextResponse.json({ ok: true, alreadyProcessed: true });
    }

    if (booking.payment_status !== 'complimentary_pending') {
      return NextResponse.json(
        { error: 'This booking cannot be confirmed as complimentary.' },
        { status: 409 }
      );
    }

    const claimed = await claimComplimentaryBooking(booking.id);
    if (!claimed) {
      const again = await getBookingById(booking.id);
      if (again?.payment_status === 'waived') {
        await fulfillBookingMeetAndEmails(again.id);
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json(
        { error: 'Could not confirm booking. Try again.' },
        { status: 409 }
      );
    }

    await fulfillBookingMeetAndEmails(claimed.id);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[api/booking/confirm-complimentary]', e);
    return NextResponse.json(
      { error: 'Could not complete request.' },
      { status: 500 }
    );
  }
}
