import { getSupabaseAdmin } from '@/lib/supabase';
import {
  motivationalEbooks,
  motivationalPaidEbooks,
  type MotivationalEbook,
} from '@/lib/resources/motivational-ebooks-catalog';

type ResourceIdRow = { id: string };

async function ensureCatalogResource(ebook: MotivationalEbook) {
  const admin = getSupabaseAdmin();

  const { data: existing, error: selectError } = await admin
    .from('resources')
    .select('id')
    .eq('slug', ebook.slug)
    .maybeSingle<ResourceIdRow>();

  if (selectError) {
    throw new Error(selectError.message || 'Unable to load ebook resource.');
  }

  if (existing?.id) {
    await admin
      .from('resources')
      .update({
        title: ebook.title,
        description: ebook.description,
        storage_key: ebook.storageKey,
        thumbnail_url: ebook.thumbnailUrl,
        category: ebook.isFree ? 'free-sample' : 'premium',
        resource_type: 'PDF',
        is_active: true,
      })
      .eq('id', existing.id);
    return existing.id;
  }

  const { data, error } = await admin
    .from('resources')
    .insert({
      title: ebook.title,
      slug: ebook.slug,
      description: ebook.description,
      storage_key: ebook.storageKey,
      thumbnail_url: ebook.thumbnailUrl,
      category: ebook.isFree ? 'free-sample' : 'premium',
      resource_type: 'PDF',
      is_active: true,
    })
    .select('id')
    .single<ResourceIdRow>();

  if (error?.code === '23505') {
    const { data: concurrent } = await admin
      .from('resources')
      .select('id')
      .eq('slug', ebook.slug)
      .maybeSingle<ResourceIdRow>();
    if (concurrent?.id) return concurrent.id;
  }

  if (error || !data?.id) {
    throw new Error(error?.message || 'Unable to create ebook resource.');
  }

  return data.id;
}

export async function ensureMotivationalCatalogResources() {
  await Promise.all(motivationalEbooks.map((ebook) => ensureCatalogResource(ebook)));
}

export async function ensurePaidEbookResourceBySlug(slug: string) {
  const ebook = motivationalPaidEbooks.find((item) => item.slug === slug);
  if (!ebook) throw new Error('Invalid ebook selection.');
  return ensureCatalogResource(ebook);
}
