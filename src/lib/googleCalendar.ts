import { google } from 'googleapis';
import { createOAuth2Client } from '@/lib/googleAuth';
import { getServiceByType } from '@/lib/services';
import { americanTimeLabelTo24h } from '@/lib/timeLabels';

export type MeetCreationResult = {
  meeting_event_id: string;
  meeting_url: string;
  meeting_provider: 'google_meet';
};

function getPrivateKey(): string | null {
  const raw = process.env.GOOGLE_PRIVATE_KEY;
  if (!raw) return null;
  return raw.replace(/\\n/g, '\n');
}

function getCalendarAuth():
  | InstanceType<typeof google.auth.OAuth2>
  | InstanceType<typeof google.auth.JWT>
  | null {
  const oauth2 = createOAuth2Client();
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (oauth2 && refreshToken) {
    oauth2.setCredentials({ refresh_token: refreshToken });
    return oauth2;
  }

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();
  if (clientEmail && privateKey) {
    return new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
  }

  return null;
}

/**
 * Maps preferred-time dropdown labels (CT) to 24h HH:MM for Calendar `dateTime` strings.
 * Meet links are created via `conferenceData`; the calendar event is not emailed to guests
 * (`sendUpdates: 'none'`) — only the Meet URL is surfaced in your app’s confirmation flow.
 */
function wallClockFromLabel(timeLabel: string): `${string}:${string}` | null {
  return americanTimeLabelTo24h(timeLabel);
}

/** Same calendar day; sufficient for 1h slots that do not cross midnight. */
function addWallClockMinutes(
  dateYmd: string,
  hm: `${string}:${string}`,
  addMinutes: number
): string {
  const [y, mo, d] = dateYmd.split('-').map(Number);
  const [h, mi] = hm.split(':').map(Number);
  let total = h * 60 + mi + addMinutes;
  const extraDays = Math.floor(total / (24 * 60));
  total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const eh = Math.floor(total / 60);
  const em = total % 60;
  const nd = d + extraDays;
  return `${y}-${String(mo).padStart(2, '0')}-${String(nd).padStart(2, '0')}T${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}:00`;
}

/**
 * Creates a **Google Calendar** event so the API can return a **Google Meet** URL.
 * Microsoft Teams links are not generated here — add a Teams URL manually in booking notes if needed.
 *
 * The event is created with `sendUpdates: 'none'`, so guests do not get a separate “calendar invite”
 * from Google; you typically email only the **Meet link** from your own confirmation template.
 *
 * Auth: OAuth (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`) or
 * service account (`GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`). See `docs/GOOGLE_MEET_SETUP.md`.
 */
export async function createGoogleMeetEventForBooking(params: {
  bookingId: string;
  serviceType: string;
  customerName: string;
  customerEmail: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  notes: string | null;
  meetingPreference: string;
  attendeeCount?: number;
}): Promise<MeetCreationResult | null> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  const auth = getCalendarAuth();
  if (!auth) {
    console.warn(
      '[googleCalendar] No Google auth: set OAuth (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) or service account (GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY).'
    );
    return null;
  }

  const service = getServiceByType(params.serviceType);
  const durationMinutes = service?.durationMinutes ?? 60;

  const hm = wallClockFromLabel(params.preferredTime);
  if (!hm) {
    console.error(
      '[googleCalendar] Could not parse preferred time for calendar:',
      params.preferredTime
    );
    return null;
  }

  const calendar = google.calendar({ version: 'v3', auth });
  const timeZone = params.timezone || 'America/Chicago';

  const startDateTime = `${params.preferredDate}T${hm}:00`;
  const endDateTime = addWallClockMinutes(
    params.preferredDate,
    hm,
    durationMinutes
  );

  const summary = service
    ? `${service.title} — ${params.customerName}`
    : `Session — ${params.customerName}`;

  const size =
    params.attendeeCount && params.attendeeCount > 1
      ? `Group size: ${params.attendeeCount} people`
      : '';

  const description = [
    `Customer: ${params.customerName}`,
    `Email: ${params.customerEmail}`,
    size,
    `Video: ${params.meetingPreference}`,
    params.notes ? `Notes: ${params.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const requestId = `bk-${params.bookingId.replace(/-/g, '')}`.slice(0, 60);

  try {
    const res = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: 'none',
      requestBody: {
        summary,
        description,
        start: {
          dateTime: startDateTime,
          timeZone,
        },
        end: {
          dateTime: endDateTime,
          timeZone,
        },
        attendees: [{ email: params.customerEmail }],
        conferenceData: {
          createRequest: {
            requestId,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    const eventId = res.data.id;
    const meetLink =
      res.data.hangoutLink ||
      res.data.conferenceData?.entryPoints?.find(
        (e) => e.entryPointType === 'video'
      )?.uri;

    if (!eventId || !meetLink) {
      console.error(
        '[googleCalendar] Event created but missing id or Meet link:',
        JSON.stringify(res.data, null, 0)
      );
      return null;
    }

    return {
      meeting_event_id: eventId,
      meeting_url: meetLink,
      meeting_provider: 'google_meet',
    };
  } catch (e) {
    console.error('[googleCalendar] events.insert failed:', e);
    return null;
  }
}
