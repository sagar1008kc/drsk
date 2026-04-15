import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=oauth-callback', req.url));
  }

  const supabase = createRouteHandlerSupabaseClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error('[auth/callback] session exchange failed', error);
    return NextResponse.redirect(new URL('/login?error=oauth-callback', req.url));
  }

  const user = data.user;
  const admin = getSupabaseAdmin();
  const metadata = user.user_metadata || {};

  await admin.from('profiles').upsert(
    {
      id: user.id,
      full_name:
        (metadata.full_name as string | undefined) ||
        (metadata.name as string | undefined) ||
        null,
      username:
        (metadata.user_name as string | undefined) ||
        (metadata.preferred_username as string | undefined) ||
        user.email?.split('@')[0] ||
        null,
      email: user.email || null,
      avatar_url: (metadata.avatar_url as string | undefined) || null,
    },
    {
      onConflict: 'id',
    }
  );

  return NextResponse.redirect(new URL(next, req.url));
}
