import { cache } from 'react';
import { createServerSupabaseReadOnlyClient } from '@/lib/supabase/server-auth';

export type ProfileRow = {
  id: string;
  full_name: string | null;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
};

export type ResourceRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  storage_key: string;
  thumbnail_url: string | null;
  category: string | null;
  resource_type: string | null;
  is_active: boolean;
};

type ResourceAccessRow = {
  access_type: string;
  expires_at: string | null;
  resources: ResourceRow | null;
};

export const getAuthenticatedUser = cache(async () => {
  const supabase = createServerSupabaseReadOnlyClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
});

export async function getProfile(userId: string) {
  const supabase = createServerSupabaseReadOnlyClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single<ProfileRow>();

  if (error) return null;
  return data;
}

export async function getAccessibleResources(userId: string) {
  const supabase = createServerSupabaseReadOnlyClient();
  const { data, error } = await supabase
    .from('user_resource_access')
    .select(
      `
      access_type,
      expires_at,
      resources (
        id,
        title,
        slug,
        description,
        storage_key,
        thumbnail_url,
        category,
        resource_type,
        is_active
      )
    `
    )
    .eq('user_id', userId)
    .eq('resources.is_active', true)
    .returns<ResourceAccessRow[]>();

  if (error || !data) return [];

  return data
    .filter((row) => row.resources)
    .map((row) => ({
      access_type: row.access_type,
      expires_at: row.expires_at,
      resource: row.resources as ResourceRow,
    }));
}
