import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import {
  isEmail,
  validatePasswordStrength,
  validateUsername,
} from '@/lib/auth/validation';

export const runtime = 'nodejs';

type SignupPayload = {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SignupPayload;
    const fullName = body.fullName?.trim() || '';
    const username = body.username?.trim().toLowerCase() || '';
    const email = body.email?.trim().toLowerCase() || '';
    const password = body.password || '';
    const confirmPassword = body.confirmPassword || '';

    if (!fullName || !username || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const usernameError = validateUsername(username);
    if (usernameError) {
      return NextResponse.json({ error: usernameError }, { status: 400 });
    }

    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Password and confirm password must match.' },
        { status: 400 }
      );
    }

    const admin = getSupabaseAdmin();
    const { data: existingUsername } = await admin
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle<{ id: string }>();
    if (existingUsername?.id) {
      return NextResponse.json(
        { error: 'That username is already taken.' },
        { status: 409 }
      );
    }

    const supabase = createRouteHandlerSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username,
        },
      },
    });

    if (error) {
      const message =
        error.message?.toLowerCase().includes('already registered') ||
        error.message?.toLowerCase().includes('already exists')
          ? 'An account with this email already exists.'
          : 'Unable to create account right now.';
      return NextResponse.json({ error: message }, { status: 400 });
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Account created, but user data is unavailable.' },
        { status: 500 }
      );
    }

    const { error: profileError } = await admin.from('profiles').upsert(
      {
        id: data.user.id,
        full_name: fullName,
        username,
        email,
      },
      {
        onConflict: 'id',
      }
    );

    if (profileError) {
      const message = (profileError.message || '').toLowerCase();
      const profilesMissing =
        profileError.code === 'PGRST205' &&
        message.includes("could not find the table 'public.profiles'");

      if (profilesMissing) {
        // Auth account is created, but project migration is not applied yet.
        return NextResponse.json(
          {
            error:
              'Account created, but profile table is not set up in Supabase yet. Run migration 004_customer_resources.sql, then login with email.',
            autoLoggedIn: Boolean(data.session),
          },
          { status: 200 }
        );
      }

      console.error('[api/auth/signup] profile upsert failed', profileError);
      return NextResponse.json(
        { error: 'Account created but profile setup failed. Please contact support.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, autoLoggedIn: Boolean(data.session) },
      { status: 201 }
    );
  } catch (error) {
    console.error('[api/auth/signup] failed', error);
    return NextResponse.json(
      { error: 'Unable to create account at this time.' },
      { status: 500 }
    );
  }
}
