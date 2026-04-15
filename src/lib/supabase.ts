import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { BookingRow } from '@/types/booking';

let adminClient: SupabaseClient | null = null;

function getSupabaseUrl() {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
}

/**
 * Server-only Supabase client with the service role key.
 * Never import this module from client components.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    getSupabaseUrl()?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;

  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  adminClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return adminClient;
}

export type BookingsTable = BookingRow;
