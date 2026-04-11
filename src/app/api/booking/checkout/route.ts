import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import {
  getBookingById,
  getServiceTitleForBooking,
  updateBookingStripeSession,
} from '@/lib/booking';
import { validateCheckoutPayload } from '@/lib/validations';

export const runtime = 'nodejs';

function siteBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return raw.replace(/\/$/, '');
}

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

    if (booking.price_cents <= 0) {
      return NextResponse.json(
        { error: 'This booking does not require payment.' },
        { status: 400 }
      );
    }

    if (booking.payment_status !== 'pending_payment') {
      return NextResponse.json(
        { error: 'This booking is not awaiting payment.' },
        { status: 409 }
      );
    }

    const stripe = getStripe();
    const base = siteBaseUrl();
    const title = getServiceTitleForBooking(booking.service_type);

    const people = booking.attendee_count ?? 1;
    const groupLine =
      people > 1
        ? ` · ${people} participants @ checkout`
        : '';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      client_reference_id: booking.id,
      customer_email: booking.customer_email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: booking.currency,
            unit_amount: booking.price_cents,
            product_data: {
              name:
                people > 1
                  ? `${title} — Group (${people} people)`
                  : `${title} — Virtual session`,
              description: `Ref ${booking.id.slice(0, 8)}…${groupLine}`.trim(),
            },
          },
        },
      ],
      metadata: {
        bookingId: booking.id,
        service_type: booking.service_type,
        attendee_count: String(people),
      },
      success_url: `${base}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/booking/cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL.' },
        { status: 502 }
      );
    }

    const ok = await updateBookingStripeSession(booking.id, session.id);
    if (!ok) {
      return NextResponse.json(
        {
          error:
            'Could not attach checkout session to booking. It may have been updated already.',
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    console.error('[api/booking/checkout]', e);
    const msg = e instanceof Error ? e.message : '';
    const dev = process.env.NODE_ENV === 'development';
    return NextResponse.json(
      {
        error: dev
          ? msg || 'Could not start checkout.'
          : 'Could not start checkout. Confirm STRIPE_SECRET_KEY and webhook URL are set on the server (e.g. Vercel env).',
      },
      { status: 500 }
    );
  }
}
