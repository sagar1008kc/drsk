import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';
import { getStripe } from '@/lib/stripe';
import {
  motivationalPaidEbooks,
  type MotivationalEbook,
} from '@/lib/resources/motivational-ebooks-catalog';
import { ensurePaidEbookResourceBySlug } from '@/lib/resources/motivational-ebooks';
import { userHasResourceAccess } from '@/lib/resources/premium-resource';

export const runtime = 'nodejs';

function siteBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return raw.replace(/\/$/, '');
}

function getSelectedEbook(slug: string): MotivationalEbook | null {
  return motivationalPaidEbooks.find((item) => item.slug === slug) || null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { slug?: string };
    const slug = String(body?.slug || '').trim();
    const selected = getSelectedEbook(slug);

    if (!selected) {
      return NextResponse.json({ error: 'Invalid ebook selected.' }, { status: 400 });
    }

    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Please login to continue.' }, { status: 401 });
    }

    const resourceId = await ensurePaidEbookResourceBySlug(selected.slug);
    const alreadyHasAccess = await userHasResourceAccess(user.id, resourceId);
    if (alreadyHasAccess) {
      return NextResponse.json({ alreadyPurchased: true }, { status: 200 });
    }

    const stripe = getStripe();
    const base = siteBaseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: selected.priceCents || 399,
            product_data: {
              name: selected.title,
              description: selected.description,
            },
          },
        },
      ],
      metadata: {
        purchaseType: 'premium_pdf',
        userId: user.id,
        resourceId,
        resourceSlug: selected.slug,
      },
      success_url: `${base}/dashboard?purchase=success`,
      cancel_url: `${base}/dashboard?purchase=cancel`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return checkout URL.' }, { status: 502 });
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error('[api/resources/checkout] failed', error);
    const msg = error instanceof Error ? error.message : '';
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'development'
            ? msg || 'Unable to start secure checkout.'
            : 'Unable to start secure checkout. Please try again shortly.',
      },
      { status: 500 }
    );
  }
}
