import { NextRequest, NextResponse } from 'next/server';
import {
  HANDBOOK_DOWNLOAD_FILENAME,
  HANDBOOK_LOCAL_FALLBACK_PATH,
} from '@/lib/handbook-public';

export async function GET(request: NextRequest) {
  const externalUrl = process.env.HANDBOOK_PUBLIC_URL?.trim();

  if (externalUrl) {
    return NextResponse.redirect(externalUrl, {
      status: 302,
      headers: {
        // Allow browser/proxy refresh when env changes.
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    });
  }

  const fallbackUrl = new URL(HANDBOOK_LOCAL_FALLBACK_PATH, request.nextUrl.origin);
  fallbackUrl.searchParams.set('download', HANDBOOK_DOWNLOAD_FILENAME);

  return NextResponse.redirect(fallbackUrl.toString(), {
    status: 302,
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
