/**
 * Scheduling in US Central Time (Chicago). Used for slot lists and validation.
 */

export const CENTRAL_TZ = 'America/Chicago';

/** Mon–Fri evenings */
export const WEEKDAY_EVENING_SLOTS_CT = [
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
] as const;

/** Sat–Sun, 9:00 AM–5:00 PM hourly */
export const WEEKEND_DAYTIME_SLOTS_CT = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
] as const;

export type PreferredTimeSlot =
  | (typeof WEEKDAY_EVENING_SLOTS_CT)[number]
  | (typeof WEEKEND_DAYTIME_SLOTS_CT)[number];

function weekdayShortInChicago(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return '';
  const utcNoon = Date.UTC(y, m - 1, d, 12, 0, 0);
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CENTRAL_TZ,
    weekday: 'short',
  }).formatToParts(new Date(utcNoon));
  return parts.find((p) => p.type === 'weekday')?.value ?? '';
}

/** 0 = Sunday … 6 = Saturday (US locale weekday index). */
export function getChicagoWeekdayIndex(ymd: string): number | null {
  const w = weekdayShortInChicago(ymd);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return w in map ? map[w]! : null;
}

export function isChicagoWeekend(ymd: string): boolean {
  const idx = getChicagoWeekdayIndex(ymd);
  return idx === 0 || idx === 6;
}

export function getTimeSlotsForChicagoDate(ymd: string): PreferredTimeSlot[] {
  if (isChicagoWeekend(ymd)) {
    return [...WEEKEND_DAYTIME_SLOTS_CT];
  }
  return [...WEEKDAY_EVENING_SLOTS_CT];
}

export function isValidTimeForChicagoDate(
  ymd: string,
  time: string
): boolean {
  const slots = getTimeSlotsForChicagoDate(ymd);
  return slots.includes(time as PreferredTimeSlot);
}

/** Today's date YYYY-MM-DD in Chicago (for min= on date input). */
export function todayYmdChicago(): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: CENTRAL_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const y = parts.find((p) => p.type === 'year')?.value;
  const m = parts.find((p) => p.type === 'month')?.value;
  const d = parts.find((p) => p.type === 'day')?.value;
  if (!y || !m || !d) return new Date().toISOString().slice(0, 10);
  return `${y}-${m}-${d}`;
}

const ALL_KNOWN_SLOTS = new Set<string>([
  ...WEEKDAY_EVENING_SLOTS_CT,
  ...WEEKEND_DAYTIME_SLOTS_CT,
]);

export function isKnownPreferredTime(t: string): boolean {
  return ALL_KNOWN_SLOTS.has(t);
}
