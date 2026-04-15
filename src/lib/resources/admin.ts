import { getSupabaseAdmin } from '@/lib/supabase';

export type ResourceInput = {
  title: string;
  slug: string;
  description?: string | null;
  storage_key: string;
  thumbnail_url?: string | null;
  category?: string | null;
  resource_type?: string | null;
  is_active?: boolean;
};

export async function createResource(input: ResourceInput) {
  const admin = getSupabaseAdmin();
  return admin.from('resources').insert(input).select('*').single();
}

export async function updateResource(resourceId: string, input: Partial<ResourceInput>) {
  const admin = getSupabaseAdmin();
  return admin.from('resources').update(input).eq('id', resourceId).select('*').single();
}

export async function deleteResource(resourceId: string) {
  const admin = getSupabaseAdmin();
  return admin.from('resources').delete().eq('id', resourceId);
}

export async function assignResourceToUser(params: {
  userId: string;
  resourceId: string;
  accessType?: string;
  expiresAt?: string | null;
}) {
  const admin = getSupabaseAdmin();
  return admin.from('user_resource_access').insert({
    user_id: params.userId,
    resource_id: params.resourceId,
    access_type: params.accessType || 'manual',
    expires_at: params.expiresAt || null,
  });
}
