import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';
import { NextResponse } from 'next/server';
import { requireRouteUser } from '@/lib/auth/require-route-user';
import {
  HANDBOOK_DOWNLOAD_FILENAME,
  HANDBOOK_LOCAL_FALLBACK_PATH,
} from '@/lib/handbook-public';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
/** Large PDF; extend on Vercel Pro if downloads time out. */
export const maxDuration = 300;

const HANDBOOK_ON_DISK = path.join(
  process.cwd(),
  'public',
  ...HANDBOOK_LOCAL_FALLBACK_PATH.replace(/^\//, '').split('/')
);

/** Member-only handbook PDF — requires login (used from /dashboard). */
export async function GET() {
  const { response } = await requireRouteUser();
  if (response) return response;

  const externalUrl = process.env.HANDBOOK_PUBLIC_URL?.trim();

  if (externalUrl) {
    return NextResponse.redirect(externalUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'private, no-store, max-age=0',
      },
    });
  }

  try {
    const s = await stat(HANDBOOK_ON_DISK);
    if (!s.isFile()) {
      return NextResponse.json(
        {
          error:
            'Handbook file is not configured. Set HANDBOOK_PUBLIC_URL or add the local fallback PDF.',
        },
        { status: 503 }
      );
    }

    const nodeStream = createReadStream(HANDBOOK_ON_DISK);
    const body = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${HANDBOOK_DOWNLOAD_FILENAME}"`,
        'Content-Length': String(s.size),
        'Cache-Control': 'private, no-store, max-age=0',
      },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          'Handbook file is not configured. Set HANDBOOK_PUBLIC_URL or add the local fallback PDF.',
      },
      { status: 503 }
    );
  }
}
