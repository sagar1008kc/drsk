/**
 * International-style phone helpers: digit-only storage (E.164 max 15 digits),
 * display grouping, validation. No country lock-in.
 */

/** ITU-T E.164 maximum length (digits only, no +). */
export const E164_MAX_DIGITS = 15;

/** Minimum digits when a number is required (avoids trivially short junk). */
export const E164_MIN_DIGITS = 8;

export function phoneDigits(value: string, maxLen: number): string {
  return value.replace(/\D/g, '').slice(0, maxLen);
}

/** Required phone: full international number as digits (country code + subscriber). */
export function isValidInternationalPhoneDigits(digits: string): boolean {
  return new RegExp(`^\\d{${E164_MIN_DIGITS},${E164_MAX_DIGITS}}$`).test(digits);
}

/** Optional field: empty, or 8–15 digits. */
export function isValidOptionalInternationalPhone(digits: string): boolean {
  if (!digits) return true;
  return isValidInternationalPhoneDigits(digits);
}

/** Readable grouping (no “ext.”); spaces every 3 digits, max 15 digits stored. */
export function formatInternationalPhoneDisplay(digits: string): string {
  const d = phoneDigits(digits, E164_MAX_DIGITS);
  if (!d) return '';
  const parts: string[] = [];
  for (let i = 0; i < d.length; i += 3) {
    parts.push(d.slice(i, i + 3));
  }
  return parts.join(' ');
}
