import { getSupabaseAdmin } from '@/lib/supabase';

const defaultPriceCents = 999;

export const premiumPdfConfig = {
  slug: process.env.NEXT_PUBLIC_PREMIUM_PDF_SLUG || 'emotional-balance',
  title:
    process.env.NEXT_PUBLIC_PREMIUM_PDF_TITLE ||
    'How to stop overthinking and find inner peace',
  description:
    process.env.NEXT_PUBLIC_PREMIUM_PDF_DESCRIPTION ||
    'A focused PDF guide by Dr. SK: calm looping thoughts, ground your mind, and build simple daily practices so you can think clearly again. One-time purchase — instant secure download after payment.',
  storageKey:
    process.env.NEXT_PUBLIC_PREMIUM_PDF_STORAGE_KEY || 'books/emotional-balance.pdf',
  thumbnailUrl: '/stop-overthinking.png',
  resourceType: 'PDF',
  category: 'premium',
  priceCents: Number(process.env.PREMIUM_PDF_PRICE_CENTS || defaultPriceCents),
  currency: (process.env.PREMIUM_PDF_CURRENCY || 'usd').toLowerCase(),
};

export const freeSamplePdfConfig = {
  slug: process.env.NEXT_PUBLIC_FREE_SAMPLE_PDF_SLUG || 'relationship-sample',
  title: process.env.NEXT_PUBLIC_FREE_SAMPLE_PDF_TITLE || 'Relationship Sample',
  description:
    process.env.NEXT_PUBLIC_FREE_SAMPLE_PDF_DESCRIPTION ||
    'Free sample PDF for logged-in users with practical relationship insights.',
  storageKey:
    process.env.NEXT_PUBLIC_FREE_SAMPLE_PDF_STORAGE_KEY || 'books/relationship.pdf',
  thumbnailUrl: '/relationship.png',
  resourceType: 'PDF',
  category: 'free-sample',
};

export function getPremiumPdfPriceCents() {
  const value = premiumPdfConfig.priceCents;
  if (!Number.isInteger(value) || value <= 0) return defaultPriceCents;
  return value;
}

const RESOURCES_SCHEMA_HINT =
  ' Apply migration supabase/migrations/004_customer_resources.sql once in Supabase Dashboard → SQL Editor (creates public.resources).';

function hintIfResourcesTableMissing(error: {
  code?: string;
  message?: string;
}): string {
  const msg = String(error?.message || '');
  if (
    error?.code === 'PGRST205' ||
    msg.includes("Could not find the table 'public.resources'")
  ) {
    return RESOURCES_SCHEMA_HINT;
  }
  return '';
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
    console.error('[ensurePremiumPdfResource] select failed', selectError);
    throw new Error(
      `Unable to load premium PDF resource: ${selectError.message || selectError.code || 'database error'}${hintIfResourcesTableMissing(selectError)}`
    );
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

  if (error?.code === '23505') {
    const { data: concurrent, error: retryErr } = await admin
      .from('resources')
      .select('id')
      .eq('slug', config.slug)
      .maybeSingle<{ id: string }>();

    if (!retryErr && concurrent?.id) return concurrent.id;
  }

  if (error || !data?.id) {
    console.error('[ensurePremiumPdfResource] insert failed', error);
    throw new Error(
      `Unable to create premium PDF resource: ${error?.message || error?.code || 'database error'}${hintIfResourcesTableMissing(error || {})}`
    );
  }

  return data.id;
}

export async function ensureFreeSamplePdfResource() {
  const admin = getSupabaseAdmin();
  const config = freeSamplePdfConfig;

  const { data: existing, error: selectError } = await admin
    .from('resources')
    .select('id, slug')
    .eq('slug', config.slug)
    .maybeSingle<{ id: string; slug: string }>();

  if (selectError) {
    throw new Error(
      `Unable to find free sample PDF resource.${hintIfResourcesTableMissing(selectError)}`
    );
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
    throw new Error(
      `Unable to create free sample PDF resource.${hintIfResourcesTableMissing(error || {})}`
    );
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
