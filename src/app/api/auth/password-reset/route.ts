import { NextResponse } from 'next/server';
import { isEmail } from '@/lib/auth/validation';
import { getSiteUrl } from '@/lib/supabase/auth-config';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';
import { rateLimitResponse } from '@/lib/http/rate-limit-response';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

type PasswordResetPayload = {
  email?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PasswordResetPayload;
    const email = body.email?.trim().toLowerCase() || '';
    const ip = getClientIp(req);
    const rate = checkRateLimit({
      key: `auth:password-reset:${ip}:${email || 'unknown'}`,
      limit: 3,
      windowMs: 60 * 60 * 1000,
    });
    if (!rate.allowed) return rateLimitResponse(rate.retryAfterSeconds);

    if (!email || !isEmail(email)) {
      return NextResponse.json(
        { error: 'Enter the email address for your account.' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerSupabaseClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getSiteUrl().replace(/\/$/, '')}/login?reset=sent`,
    });

    return NextResponse.json({
      message:
        'If an account exists for that email, a password reset link will be sent.',
    });
  } catch (error) {
    console.error('[api/auth/password-reset] failed', error);
    return NextResponse.json(
      { error: 'Unable to start password reset right now.' },
      { status: 500 }
    );
  }
}
