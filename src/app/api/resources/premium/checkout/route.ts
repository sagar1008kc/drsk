import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';
import { getStripe } from '@/lib/stripe';
import {
  ensurePremiumPdfResource,
  getPremiumPdfPriceCents,
  premiumPdfConfig,
  userHasResourceAccess,
} from '@/lib/resources/premium-resource';

export const runtime = 'nodejs';

function siteBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return raw.replace(/\/$/, '');
}

export async function POST() {
  try {
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Please login to continue.' }, { status: 401 });
    }

    const resourceId = await ensurePremiumPdfResource();
    const alreadyHasAccess = await userHasResourceAccess(user.id, resourceId);
    if (alreadyHasAccess) {
      return NextResponse.json({ alreadyPurchased: true }, { status: 200 });
    }

    const stripe = getStripe();
    const base = siteBaseUrl();
    const priceCents = getPremiumPdfPriceCents();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: premiumPdfConfig.currency,
            unit_amount: priceCents,
            product_data: {
              name: premiumPdfConfig.title,
              description: premiumPdfConfig.description,
            },
          },
        },
      ],
      metadata: {
        purchaseType: 'premium_pdf',
        userId: user.id,
        resourceId,
        resourceSlug: premiumPdfConfig.slug,
      },
      success_url: `${base}/dashboard?purchase=success`,
      cancel_url: `${base}/dashboard?purchase=cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return checkout URL.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error('[api/resources/premium/checkout] failed', error);
    return NextResponse.json(
      { error: 'Unable to start secure checkout.' },
      { status: 500 }
    );
  }
}
