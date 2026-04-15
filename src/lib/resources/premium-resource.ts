import { getSupabaseAdmin } from '@/lib/supabase';

const defaultPriceCents = 1999;

export const premiumPdfConfig = {
  slug: process.env.NEXT_PUBLIC_PREMIUM_PDF_SLUG || 'emotional-balance',
  title: process.env.NEXT_PUBLIC_PREMIUM_PDF_TITLE || 'Emotional Balance',
  description:
    process.env.NEXT_PUBLIC_PREMIUM_PDF_DESCRIPTION ||
    'Premium PDF by Dr. SK with practical guidance and exercises.',
  storageKey:
    process.env.NEXT_PUBLIC_PREMIUM_PDF_STORAGE_KEY || 'books/emotional-balance.pdf',
  thumbnailUrl: '/eb.png',
  resourceType: 'PDF',
  category: 'premium',
  priceCents: Number(process.env.PREMIUM_PDF_PRICE_CENTS || defaultPriceCents),
  currency: (process.env.PREMIUM_PDF_CURRENCY || 'usd').toLowerCase(),
};

export function getPremiumPdfPriceCents() {
  const value = premiumPdfConfig.priceCents;
  if (!Number.isInteger(value) || value <= 0) return defaultPriceCents;
  return value;
}

export async function ensurePremiumPdfResource() {
  const admin = getSupabaseAdmin();
  const config = premiumPdfConfig;

  const { data: existing, error: selectError } = await admin
    .from('resources')
    .select('id, slug')
    .eq('slug', config.slug)
    .maybeSingle<{ id: string; slug: string }>();

  if (selectError) {
    throw new Error('Unable to find premium PDF resource.');
  }

  if (existing?.id) return existing.id;

  const { data, error } = await admin
    .from('resources')
    .insert({
      title: config.title,
      slug: config.slug,
      description: config.description,
      storage_key: config.storageKey,
      thumbnail_url: config.thumbnailUrl,
      category: config.category,
      resource_type: config.resourceType,
      is_active: true,
    })
    .select('id')
    .single<{ id: string }>();

  if (error || !data?.id) {
    throw new Error('Unable to create premium PDF resource.');
  }

  return data.id;
}

export async function userHasResourceAccess(userId: string, resourceId: string) {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from('user_resource_access')
    .select('id, expires_at')
    .eq('user_id', userId)
    .eq('resource_id', resourceId)
    .maybeSingle<{ id: string; expires_at: string | null }>();

  if (error || !data) return false;
  if (!data.expires_at) return true;
  return new Date(data.expires_at) > new Date();
}
