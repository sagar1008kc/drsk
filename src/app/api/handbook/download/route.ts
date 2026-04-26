import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';
import { NextResponse } from 'next/server';
import { HANDBOOK_DOWNLOAD_FILENAME } from '@/lib/handbook-public';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
/** Large PDF; extend on Vercel Pro if downloads time out. */
export const maxDuration = 300;

const HANDBOOK_ON_DISK = path.join(
  process.cwd(),
  'public',
  'samples',
  'The_Mind_Matters_Handbook_by_DrSK.pdf'
);

export async function GET() {
  const externalUrl = process.env.HANDBOOK_PUBLIC_URL?.trim();

  if (externalUrl) {
    return NextResponse.redirect(externalUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    });
  }

  try {
    const s = await stat(HANDBOOK_ON_DISK);
    if (!s.isFile()) {
      return NextResponse.json({ error: 'Handbook not available' }, { status: 404 });
    }

    const nodeStream = createReadStream(HANDBOOK_ON_DISK);
    const body = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${HANDBOOK_DOWNLOAD_FILENAME}"`,
        'Content-Length': String(s.size),
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Handbook not available' }, { status: 404 });
  }
}
