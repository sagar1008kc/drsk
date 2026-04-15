import { NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient } from '@/lib/supabase/route-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
const downloadsBucket =
  process.env.SUPABASE_PREMIUM_DOWNLOADS_BUCKET || 'premium-downloads';

function sanitizeFilename(value: string) {
  return value.replace(/[^a-zA-Z0-9-_\.]/g, '_');
}

function getClientIp(req: Request) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    null
  );
}

export async function GET(
  req: Request,
  { params }: { params: { resourceId: string } }
) {
  try {
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = getSupabaseAdmin();
    const { data: profile } = await admin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle<{ role: string | null }>();

    const isAdmin = (profile?.role || '').toLowerCase() === 'admin';

    let resourceRecord:
      | {
          id: string;
          title: string;
          storage_key: string;
          is_active: boolean;
        }
      | null = null;

    if (isAdmin) {
      const { data: resource, error: resourceError } = await admin
        .from('resources')
        .select('id,title,storage_key,is_active')
        .eq('id', params.resourceId)
        .maybeSingle<{
          id: string;
          title: string;
          storage_key: string;
          is_active: boolean;
        }>();

      if (resourceError || !resource || !resource.is_active) {
        return NextResponse.json({ error: 'Resource access denied.' }, { status: 403 });
      }

      resourceRecord = resource;
    } else {
      const { data: access, error: accessError } = await admin
        .from('user_resource_access')
        .select(
          `
          id,
          expires_at,
          resources (
            id,
            title,
            storage_key,
            is_active
          )
        `
        )
        .eq('user_id', user.id)
        .eq('resource_id', params.resourceId)
        .maybeSingle<{
          id: string;
          expires_at: string | null;
          resources: {
            id: string;
            title: string;
            storage_key: string;
            is_active: boolean;
          } | null;
        }>();

      if (
        accessError ||
        !access?.resources ||
        !access.resources.is_active ||
        (access.expires_at && new Date(access.expires_at) < new Date())
      ) {
        return NextResponse.json({ error: 'Resource access denied.' }, { status: 403 });
      }

      resourceRecord = access.resources;
    }

    const { data: signedData, error: signedError } = await admin.storage
      .from(downloadsBucket)
      .createSignedUrl(resourceRecord.storage_key, 60, {
        download: sanitizeFilename(`${resourceRecord.title}.pdf`),
      });

    if (signedError || !signedData?.signedUrl) {
      return NextResponse.json(
        { error: 'Unable to generate secure download.' },
        { status: 500 }
      );
    }

    const upstream = await fetch(signedData.signedUrl);
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: 'Unable to fetch file at this time.' },
        { status: 502 }
      );
    }

    const ext = resourceRecord.storage_key.split('.').pop() || 'pdf';
    const safeFileName = sanitizeFilename(`${resourceRecord.title}.${ext}`);

    const ipAddress = getClientIp(req);
    const userAgent = req.headers.get('user-agent');
    await admin.from('download_logs').insert({
      user_id: user.id,
      resource_id: resourceRecord.id,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    return new NextResponse(upstream.body, {
      headers: {
        'Content-Type':
          upstream.headers.get('content-type') || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${safeFileName}"`,
        'Cache-Control': 'private, no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[api/resources/:id/download] failed', error);
    return NextResponse.json({ error: 'Download failed.' }, { status: 500 });
  }
}
