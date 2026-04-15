import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import {
  claimBookingPaid,
  getBookingById,
  getBookingByStripeSessionId,
} from '@/lib/booking';
import { fulfillBookingMeetAndEmails } from '@/lib/fulfillBooking';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

async function fulfillPaidCheckout(session: Stripe.Checkout.Session) {
  const bookingId =
    session.metadata?.bookingId ||
    session.client_reference_id ||
    undefined;

  let booking = bookingId ? await getBookingById(bookingId) : null;
  if (!booking && session.id) {
    booking = await getBookingByStripeSessionId(session.id);
  }

  if (!booking) {
    console.error('[stripe webhook] No booking linked to session', session.id);
    return;
  }

  const id = booking.id;

  let current = booking;

  if (current.payment_status !== 'paid') {
    const pi =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? null;

    const claimed = await claimBookingPaid(id, {
      stripe_payment_intent_id: pi,
      amount_total: session.amount_total,
      stripe_customer_email: session.customer_details?.email ?? null,
    });

    if (!claimed) {
      const again = await getBookingById(id);
      if (!again || again.payment_status !== 'paid') {
        console.warn('[stripe webhook] Could not claim booking as paid', id);
        return;
      }
      current = again;
    } else {
      current = claimed;
    }
  }

  await fulfillBookingMeetAndEmails(id);
}

async function fulfillPremiumPdfCheckout(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const resourceId = session.metadata?.resourceId;

  if (!userId || !resourceId) {
    console.error('[stripe webhook] Missing premium PDF metadata', session.id);
    return;
  }

  const admin = getSupabaseAdmin();
  const { error } = await admin.from('user_resource_access').upsert(
    {
      user_id: userId,
      resource_id: resourceId,
      access_type: 'stripe_purchase',
      expires_at: null,
    },
    { onConflict: 'user_id,resource_id' }
  );

  if (error) {
    console.error('[stripe webhook] Failed to grant PDF access', error);
  }
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[stripe webhook] STRIPE_WEBHOOK_SECRET missing');
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error('[stripe webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === 'paid') {
        if (session.metadata?.purchaseType === 'premium_pdf') {
          await fulfillPremiumPdfCheckout(session);
        } else {
          await fulfillPaidCheckout(session);
        }
      }
    }
  } catch (e) {
    console.error('[stripe webhook] Handler error:', e);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
