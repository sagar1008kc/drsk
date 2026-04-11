import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createOAuth2Client } from '@/lib/googleAuth';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieStore = cookies();
  const expected = cookieStore.get('gcal_oauth_state')?.value;
  cookieStore.delete('gcal_oauth_state');

  if (!code || !state || !expected || state !== expected) {
    return new NextResponse('Invalid or expired OAuth state. Start again from /api/google/oauth/start', {
      status: 400,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  const oauth2 = createOAuth2Client();
  if (!oauth2) {
    return new NextResponse('Server missing Google OAuth client configuration.', {
      status: 500,
    });
  }

  try {
    const { tokens } = await oauth2.getToken(code);
    const refresh = tokens.refresh_token || '';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Google Calendar connected</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 640px; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    pre { background: #f4f4f4; padding: 1rem; overflow-x: auto; word-break: break-all; font-size: 12px; }
    code { background: #eee; padding: 2px 6px; }
  </style>
</head>
<body>
  <h1>Google Calendar — setup</h1>
  <p>Copy the line below into your production environment (e.g. Vercel env vars), then redeploy if needed:</p>
  <pre>GOOGLE_REFRESH_TOKEN=${escapeHtml(refresh)}</pre>
  ${
    !refresh
      ? '<p><strong>No refresh token returned.</strong> Revoke app access in <a href="https://myaccount.google.com/permissions">Google Account permissions</a> and run the flow again with <code>prompt=consent</code> (already enabled).</p>'
      : '<p>Keep this token secret — it acts like a password for your calendar.</p>'
  }
  <p>Also ensure <code>GOOGLE_REDIRECT_URI</code> matches the authorized redirect URI in Google Cloud exactly (e.g. <code>https://www.skcreation.org/api/google/oauth/callback</code>).</p>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  } catch (e) {
    console.error('[google oauth callback]', e);
    return new NextResponse('Token exchange failed. Check client id/secret and redirect URI.', {
      status: 500,
    });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
