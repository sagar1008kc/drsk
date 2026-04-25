import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getSupabaseAdmin } from '@/lib/supabase';
import { sendHandbookThankYouEmail } from '@/lib/mail';

export const runtime = 'nodejs';

type Body = { email?: string; company?: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const company = body.company?.trim() || '';
    if (company) {
      return NextResponse.json(
        { message: 'You’re on the list.' },
        { status: 200 }
      );
    }

    const email = body.email?.trim().toLowerCase() || '';
    if (!email) {
      return NextResponse.json(
        { error: 'Please enter your email address.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    let savedToList = false;

    if (isSupabaseConfigured()) {
      const { error } = await getSupabaseAdmin()
        .from('handbook_subscribers')
        .insert({ email, source: 'the-mind-matters-handbook' });

      if (error?.code === '23505') {
        return NextResponse.json(
          {
            message:
              'Thank you for subscribing. This email is already registered, and you can explore free and premium resources on our website anytime.',
            alreadySubscribed: true,
          },
          { status: 200 }
        );
      }

      if (error) {
        console.error('[handbook-subscribe] Supabase insert failed:', error);
        // Missing table / misconfiguration is common until migration is applied.
        // Still send the welcome email so the visitor is not blocked.
      } else {
        savedToList = true;
      }
    } else {
      console.warn(
        '[handbook-subscribe] Supabase not configured — sending email only (email not stored).'
      );
    }

    const emailOk = await sendHandbookThankYouEmail(email);
    if (!emailOk) {
      const errMsg = isSupabaseConfigured()
        ? 'We saved your address but the thank-you email could not be sent. We’ll try to reach you, or use the direct download on the page.'
        : 'The thank-you email could not be sent. Check that mail (e.g. Resend or Zoho) is configured, or use the direct download on the page.';
      return NextResponse.json({ error: errMsg }, { status: 500 });
    }

    if (!savedToList && isSupabaseConfigured()) {
      return NextResponse.json(
        {
          message:
            'Thank you for subscribing. Please check your inbox for our thank-you email, and explore free and premium resources on our website.',
        },
        { status: 200 }
      );
    }

    if (!savedToList) {
      return NextResponse.json(
        {
          message:
            'Thank you for subscribing. Please check your inbox for our thank-you email, and explore free and premium resources on our website.',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message:
          'Thank you for subscribing. Please check your inbox for our thank-you email, and explore free and premium resources on our website.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('handbook-subscribe error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Could not complete subscription';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
