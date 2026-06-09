import { NextResponse } from 'next/server';
import { isEmail } from '@/lib/email';
import { isSupabaseConfigured, getSupabaseAdmin } from '@/lib/supabase';
import { rateLimitResponse } from '@/lib/http/rate-limit-response';
import { sendHandbookThankYouEmail, sendHandbookSubscribeAdminNotification } from '@/lib/mail';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

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
    const ip = getClientIp(req);
    const rate = checkRateLimit({
      key: `handbook-subscribe:${ip}:${email || 'unknown'}`,
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });
    if (!rate.allowed) return rateLimitResponse(rate.retryAfterSeconds);
    if (!email) {
      return NextResponse.json(
        { error: 'Please enter your email address.' },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
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
              'You’re already subscribed with this email. You’ll continue to receive SK Creation updates.',
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
        ? 'We saved your address but the thank-you email could not be sent. Please try again or contact us at info@skcreation.org.'
        : 'The thank-you email could not be sent. Check that mail is configured, or contact us at info@skcreation.org.';
      return NextResponse.json({ error: errMsg }, { status: 500 });
    }

    if (savedToList) {
      try {
        await sendHandbookSubscribeAdminNotification(email);
      } catch (e) {
        console.error('[handbook-subscribe] admin notification failed:', e);
      }
    }

    const successMessage =
      'Thanks for subscribing. Check your inbox for a short note from SK Creation with useful links.';

    if (!savedToList && isSupabaseConfigured()) {
      return NextResponse.json({ message: successMessage }, { status: 200 });
    }

    if (!savedToList) {
      return NextResponse.json({ message: successMessage }, { status: 200 });
    }

    return NextResponse.json({ message: successMessage }, { status: 200 });
  } catch (error) {
    console.error('handbook-subscribe error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Could not complete subscription';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
