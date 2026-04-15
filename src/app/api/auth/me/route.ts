import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const admin = getSupabaseAdmin();
    const { data: profile } = await admin
      .from('profiles')
      .select('full_name,username,email')
      .eq('id', user.id)
      .maybeSingle<{ full_name: string | null; username: string | null; email: string | null }>();

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email || null,
          fullName: profile?.full_name || null,
          username: profile?.username || null,
        },
      },
      { status: 200 }
    );
  } catch (routeError) {
    console.error('[api/auth/me] failed', routeError);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
