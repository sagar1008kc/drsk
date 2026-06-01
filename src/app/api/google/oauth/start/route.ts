import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createOAuth2Client } from '@/lib/googleAuth';

export const runtime = 'nodejs';

function isAuthorizedSetupRequest(req: Request) {
  if (process.env.NODE_ENV !== 'production') return true;
  const expected = process.env.GOOGLE_OAUTH_SETUP_SECRET;
  if (!expected) return false;

  const url = new URL(req.url);
  const supplied =
    url.searchParams.get('setup_secret') ||
    req.headers.get('x-google-oauth-setup-secret');

  return supplied === expected;
}

/**
 * Visit this URL once while logged into the Google account that owns the calendar.
 * After consent, the callback page shows GOOGLE_REFRESH_TOKEN to paste into server env.
 */
export async function GET(req: Request) {
  if (!isAuthorizedSetupRequest(req)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const oauth2 = createOAuth2Client();
  if (!oauth2) {
    return NextResponse.json(
      { error: 'Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET' },
      { status: 500 }
    );
  }

  const state = randomBytes(24).toString('hex');
  const cookieStore = cookies();
  cookieStore.set('gcal_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });

  const url = oauth2.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/calendar'],
    state,
  });

  return NextResponse.redirect(url);
}
