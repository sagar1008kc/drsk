import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      serviceKey,
      serviceTitle,
      paymentPriceId,
      name,
      email,
      phone,
      language,
      preferredDate,
      notes,
    } = body;

    if (!paymentPriceId || !name || !email || !serviceTitle) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: paymentPriceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${baseUrl}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/services`,
      metadata: {
        serviceKey: serviceKey || '',
        serviceTitle: serviceTitle || '',
        name: name || '',
        email: email || '',
        phone: phone || '',
        language: language || '',
        preferredDate: preferredDate || '',
        notes: notes || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Unable to create checkout session.' },
      { status: 500 }
    );
  }
}