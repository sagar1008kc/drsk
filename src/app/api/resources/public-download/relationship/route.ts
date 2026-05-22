import { NextResponse } from 'next/server';
import { requireRouteUser } from '@/lib/auth/require-route-user';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

const BUCKET = process.env.SUPABASE_PREMIUM_DOWNLOADS_BUCKET || 'premium-downloads';
const STORAGE_KEY = 'books/relationship.pdf';
const FILENAME = 'When-Relationship-Hurt-and-Heal.pdf';

/** Member-only download — requires login (used from /dashboard). */
export async function GET() {
  const { response } = await requireRouteUser();
  if (response) return response;

  try {
    const admin = getSupabaseAdmin();

    const { data, error } = await admin.storage
      .from(BUCKET)
      .createSignedUrl(STORAGE_KEY, 60, { download: FILENAME });

    if (error || !data?.signedUrl) {
      console.error('[public-download/relationship] signed URL failed:', error);
      return NextResponse.json(
        { error: 'Download is temporarily unavailable. Please try again.' },
        { status: 500 }
      );
    }

    const upstream = await fetch(data.signedUrl);
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: 'Unable to fetch file at this time.' },
        { status: 502 }
      );
    }

    return new NextResponse(upstream.body, {
      headers: {
        'Content-Type':
          upstream.headers.get('content-type') || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${FILENAME}"`,
        'Cache-Control': 'private, no-store, max-age=0',
      },
    });
  } catch (err) {
    console.error('[public-download/relationship]', err);
    return NextResponse.json({ error: 'Download failed.' }, { status: 500 });
  }
}
