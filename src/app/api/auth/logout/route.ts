import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const supabase = createRouteHandlerSupabaseClient();
    await supabase.auth.signOut();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[api/auth/logout] failed', error);
    return NextResponse.json({ error: 'Unable to logout.' }, { status: 500 });
  }
}
