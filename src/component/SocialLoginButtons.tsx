'use client';

import { useState } from 'react';

type SocialLoginButtonsProps = {
  loading: boolean;
};

export default function SocialLoginButtons({ loading }: SocialLoginButtonsProps) {
  const [oauthLoading, setOauthLoading] = useState(false);
  const [oauthError, setOauthError] = useState('');

  async function onGoogleSignIn() {
    if (loading || oauthLoading) return;
    setOauthError('');
    setOauthLoading(true);

    try {
      // Route OAuth through the server handler so redirect + error handling stay centralized.
      window.location.assign('/api/auth/oauth?provider=google');
    } catch {
      setOauthError('Unable to start Google sign-in right now.');
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
