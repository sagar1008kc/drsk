import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

const BUCKET = process.env.SUPABASE_PREMIUM_DOWNLOADS_BUCKET || 'premium-downloads';
const STORAGE_KEY = 'books/relationship.pdf';
const FILENAME = 'When-Relationship-Hurt-and-Heal.pdf';

/**
 * Public endpoint — no authentication required.
 * Generates a short-lived signed URL and redirects the browser directly to it,
 * triggering an automatic download of the free relationship PDF.
 */
export async function GET() {
  try {
    const admin = getSupabaseAdmin();

    const { data, error } = await admin.storage
      .from(BUCKET)
      .createSignedUrl(STORAGE_KEY, 300, { download: FILENAME });

    if (error || !data?.signedUrl) {
      console.error('[public-download/relationship] signed URL failed:', error);
      return NextResponse.json(
        { error: 'Download is temporarily unavailable. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.redirect(data.signedUrl, { status: 302 });
  } catch (err) {
    console.error('[public-download/relationship]', err);
    return NextResponse.json({ error: 'Download failed.' }, { status: 500 });
  }
}
