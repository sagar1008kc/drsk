import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/auth-config';

export function createRouteHandlerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: Record<string, unknown> = {}) {
        cookieStore.set({ name, value, ...(options as object) });
      },
      remove(name: string, options: Record<string, unknown> = {}) {
        cookieStore.set({ name, value: '', ...(options as object), maxAge: 0 });
      },
    },
  });
}
