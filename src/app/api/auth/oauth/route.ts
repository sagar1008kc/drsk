import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';

const allowedProviders = new Set(['google']);
const redirectTo = 'https://www.skcreation.org/auth/callback';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const provider = url.searchParams.get('provider');

    if (!provider || !allowedProviders.has(provider)) {
      return NextResponse.redirect(new URL('/login?error=provider', req.url));
    }

    const supabase = createRouteHandlerSupabaseClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as 'google',
      options: {
        redirectTo,
      },
    });

    if (error || !data.url) {
      const message = (error?.message || '').toLowerCase();
      if (message.includes('provider is not enabled')) {
        return NextResponse.redirect(new URL('/login?error=google-not-enabled', req.url));
      }
      return NextResponse.redirect(new URL('/login?error=oauth', req.url));
    }

    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error('[api/auth/oauth] failed', error);
    return NextResponse.redirect(new URL('/login?error=oauth', req.url));
  }
}
