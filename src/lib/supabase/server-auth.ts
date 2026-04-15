import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/auth-config';

export function createServerSupabaseReadOnlyClient() {
  const cookieStore = cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set() {
        // No-op in server components.
      },
      remove() {
        // No-op in server components.
      },
    },
  });
}
