import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

const BUCKET = process.env.SUPABASE_PREMIUM_DOWNLOADS_BUCKET || 'premium-downloads';
const STORAGE_KEY =
  process.env.NEXT_PUBLIC_FREE_SAMPLE_PDF_STORAGE_KEY || 'ebook/motivational_ebook_01.pdf';
const FILENAME = 'motivational_ebook_01.pdf';

export async function GET() {
  try {
    const admin = getSupabaseAdmin();

    const { data, error } = await admin.storage
      .from(BUCKET)
      .createSignedUrl(STORAGE_KEY, 60, { download: FILENAME });

    if (error || !data?.signedUrl) {
      console.error('[public-download/motivational-ebook-01] signed URL failed:', error);
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
    console.error('[public-download/motivational-ebook-01]', err);
    return NextResponse.json({ error: 'Download failed.' }, { status: 500 });
  }
}
