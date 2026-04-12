import { NextResponse } from 'next/server';
import {
  getServiceByType,
  STANDARD_MEETING_PLATFORM,
  totalCentsForBooking,
} from '@/lib/services';
import { insertBooking } from '@/lib/booking';
import { validateCreateBookingPayload } from '@/lib/validations';
import { isSupabaseConfigured } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          'Booking database is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local (restart npm run dev) or to your Vercel project → Settings → Environment Variables, then redeploy.',
      },
      { status: 503 }
    );
  }

  try {
    const json = await req.json();
    const parsed = validateCreateBookingPayload(json);

    if (!parsed.ok) {
      if (parsed.honeypot) {
        return NextResponse.json({ ok: true }, { status: 200 });
      }
      return NextResponse.json({ errors: parsed.errors }, { status: 400 });
    }

    const { data } = parsed;
    const service = getServiceByType(data.serviceType);
    if (!service) {
      return NextResponse.json(
        { errors: { serviceType: 'Invalid session type.' } },
        { status: 400 }
      );
    }

    const priceCents = totalCentsForBooking(service, data.attendeeCount);

    const notesCombined =
      data.serviceType === 'business-career-session' && data.sessionFocus
        ? [
            `Session focus: ${data.sessionFocus}`,
            data.notes?.trim(),
          ]
            .filter(Boolean)
            .join('\n\n')
        : data.notes?.trim() || null;

    try {
      const { id } = await insertBooking({
        service_type: service.id,
        price_cents: priceCents,
        attendee_count: data.attendeeCount,
        currency: service.currency,
        customer_name: data.fullName,
        customer_email: data.email,
        customer_phone: data.phone?.trim() || null,
        language: data.language,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        timezone: 'America/Chicago',
        meeting_preference: STANDARD_MEETING_PLATFORM,
        notes: notesCombined || null,
        company: null,
        consent: data.consent,
        initial_payment_status: service.requiresPayment
          ? 'pending_payment'
          : 'complimentary_pending',
      });

      return NextResponse.json(
        {
          bookingId: id,
          flow: service.requiresPayment ? 'checkout' : 'complimentary',
        },
        { status: 201 }
      );
    } catch (insertErr) {
      const msg =
        insertErr instanceof Error ? insertErr.message : 'Could not save booking.';
      console.error('[api/booking/create] insert failed:', insertErr);
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  } catch (e) {
    console.error('[api/booking/create]', e);
    return NextResponse.json(
      { error: 'Invalid request or server error.' },
      { status: 500 }
    );
  }
}
