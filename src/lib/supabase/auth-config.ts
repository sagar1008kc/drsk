/**
 * Prefer non-public vars on the server (same as `getSupabaseAdmin` in `@/lib/supabase`).
 * `NEXT_PUBLIC_*` often contains a literal `$SUPABASE_URL` on Vercel because the dashboard
 * does not expand `$VAR`; that breaks auth in route handlers while admin/DB still works.
 */
function rejectUnexpandedRef(value: string | undefined, name: string): void {
  const v = value?.trim();
  if (v?.startsWith('$')) {
    throw new Error(
      `${name} is set to an unexpanded reference (e.g. literally "$SUPABASE_URL"). Use the full value in .env / Vercel (hosting UIs usually do not substitute $VAR).`
    );
  }
}

export function getSupabaseUrl(): string {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) {
    throw new Error('Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL');
  }
  rejectUnexpandedRef(url, 'SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL');
  return url;
}

export function getSupabaseAnonKey(): string {
  const key =
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!key) {
    throw new Error('Missing SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  rejectUnexpandedRef(key, 'SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY');
  return key;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}
