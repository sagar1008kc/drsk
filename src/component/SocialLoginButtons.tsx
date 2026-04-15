'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

type SocialLoginButtonsProps = {
  loading: boolean;
};

function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export default function SocialLoginButtons({ loading }: SocialLoginButtonsProps) {
  const [oauthLoading, setOauthLoading] = useState(false);
  const [oauthError, setOauthError] = useState('');

  async function onGoogleSignIn() {
    if (loading || oauthLoading) return;
    setOauthError('');
    setOauthLoading(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      });

      if (error) {
        setOauthError(error.message || 'Unable to start Google sign-in.');
      }
    } catch {
      setOauthError('Unable to start Google sign-in right now.');
    } finally {
      setOauthLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onGoogleSignIn}
        disabled={loading || oauthLoading}
        className={`flex h-11 w-full items-center justify-center rounded-xl border border-zinc-300 bg-white text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 ${
          loading || oauthLoading ? 'cursor-not-allowed opacity-60' : ''
        }`}
        aria-disabled={loading || oauthLoading}
      >
        {oauthLoading ? 'Redirecting to Google...' : 'Continue with Google'}
      </button>
      {oauthError ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {oauthError}
        </p>
      ) : null}
    </div>
  );
}
