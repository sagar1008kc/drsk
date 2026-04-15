'use client';

import Link from 'next/link';
import { useMemo, useState, type FormEvent } from 'react';
import AuthCard from '@/component/AuthCard';
import SignupModal from '@/component/SignupModal';
import SocialLoginButtons from '@/component/SocialLoginButtons';

type LoginPageClientProps = {
  nextPath: string;
  oauthError?: string;
};

const oauthErrorMap: Record<string, string> = {
  provider: 'Invalid social login provider selected.',
  oauth: 'Social login is unavailable right now. Please try again.',
  'google-not-enabled':
    'Google sign-in is not enabled in Supabase yet. Enable Google provider in Supabase Auth settings.',
  'oauth-callback': 'Unable to complete social login. Please retry.',
};

export default function LoginPageClient({
  nextPath,
  oauthError,
}: LoginPageClientProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  const oauthMessage = useMemo(() => {
    if (!oauthError) return '';
    return oauthErrorMap[oauthError] || 'Authentication failed. Please try again.';
  }, [oauthError]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error || 'Unable to login.');
        return;
      }

      window.location.href = nextPath;
    } catch {
      setError('Unable to login right now.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AuthCard
        title="Customer Login"
        subtitle="Sign in to access your private downloadable resources."
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700" htmlFor="identifier">
              Username or Email
            </label>
            <input
              id="identifier"
              autoComplete="username"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              required
              className="h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-xs font-medium text-zinc-500 underline-offset-2 hover:text-zinc-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {oauthMessage ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
              {oauthMessage}
            </p>
          ) : null}

          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-zinc-900 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs uppercase tracking-wide text-zinc-400">or</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <SocialLoginButtons loading={loading} nextPath={nextPath} />

        <p className="mt-5 text-center text-sm text-zinc-500">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => setShowSignup(true)}
            className="font-semibold text-zinc-800 underline-offset-2 hover:underline"
          >
            Sign up
          </button>
        </p>

        <p className="mt-4 text-center text-xs text-zinc-400">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-zinc-600">
            terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-zinc-600">
            privacy policy
          </Link>
          .
        </p>
      </AuthCard>

      <SignupModal
        open={showSignup}
        onClose={() => setShowSignup(false)}
        nextPath={nextPath}
      />
    </>
  );
}
