import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isEmail } from '@/lib/auth/validation';

export const runtime = 'nodejs';

type LoginPayload = {
  identifier?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginPayload;
    const identifier = body.identifier?.trim() || '';
    const password = body.password || '';

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Username/email and password are required.' },
        { status: 400 }
      );
    }

    let email = identifier.toLowerCase();
    if (!isEmail(identifier)) {
      const admin = getSupabaseAdmin();
      const { data: profile, error } = await admin
        .from('profiles')
        .select('email')
        .ilike('username', identifier)
        .maybeSingle<{ email: string | null }>();

      if (error) {
        const message = (error.message || '').toLowerCase();
        const profilesMissing =
          error.code === 'PGRST205' &&
          message.includes("could not find the table 'public.profiles'");
        if (profilesMissing) {
          return NextResponse.json(
            {
              error:
                'Username login is unavailable until profiles table is set up. Please login with email for now.',
            },
            { status: 400 }
          );
        }
      }

      if (error || !profile?.email) {
        return NextResponse.json(
          { error: 'Invalid username/email or password.' },
          { status: 401 }
        );
      }
      email = profile.email.toLowerCase();
    }

    const supabase = createRouteHandlerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json(
        { error: 'Invalid username/email or password.' },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('[api/auth/login] failed', error);
    return NextResponse.json(
      { error: 'Unable to login at this time.' },
      { status: 500 }
    );
  }
}
