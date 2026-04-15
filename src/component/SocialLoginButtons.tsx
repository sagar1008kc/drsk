'use client';

type SocialLoginButtonsProps = {
  loading: boolean;
  nextPath: string;
};

export default function SocialLoginButtons({
  loading,
  nextPath,
}: SocialLoginButtonsProps) {
  return (
    <div className="space-y-2">
      <a
        href={`/api/auth/oauth?provider=google&next=${encodeURIComponent(nextPath)}`}
        className={`flex h-11 w-full items-center justify-center rounded-xl border border-zinc-300 bg-white text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 ${
          loading ? 'pointer-events-none opacity-60' : ''
        }`}
        aria-disabled={loading}
      >
        Continue with Google
      </a>
    </div>
  );
}
