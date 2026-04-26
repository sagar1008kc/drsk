export const MEETING_PLATFORM_IDS = ['google_meet', 'teams', 'zoom'] as const;
export type MeetingPlatformId = (typeof MEETING_PLATFORM_IDS)[number];

export const MEETING_PLATFORM_OPTIONS: {
  id: MeetingPlatformId;
  label: string;
}[] = [
  { id: 'google_meet', label: 'Google Meet (Recommended)' },
  { id: 'teams', label: 'Microsoft Teams' },
  { id: 'zoom', label: 'Zoom' },
];

export function isMeetingPlatformId(value: string): value is MeetingPlatformId {
  return (MEETING_PLATFORM_IDS as readonly string[]).includes(value);
}

export function meetingPreferenceLabel(id: MeetingPlatformId): string {
  return (
    MEETING_PLATFORM_OPTIONS.find((o) => o.id === id)?.label ??
    'Google Meet (Recommended)'
  );
}

/** Only Google Meet can receive an auto-generated Meet URL from Calendar API. */
export function prefersGoogleMeetAutoLink(preference: string | null): boolean {
  if (!preference) return true;
  return preference.toLowerCase().includes('google meet');
}

export const BOOKING_MEETING_FROM_EMAIL = 'info@smindbusiness.org' as const;
