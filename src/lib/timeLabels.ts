/**
 * Converts US-style time labels (e.g. "06:00 PM") to 24h "HH:MM" for Calendar API.
 */
export function americanTimeLabelTo24h(label: string): `${string}:${string}` | null {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(label.trim());
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const mi = m[2];
  const ap = m[3].toUpperCase();
  if (ap === 'PM' && h !== 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  if (h < 0 || h > 23) return null;
  return `${String(h).padStart(2, '0')}:${mi}` as `${string}:${string}`;
}
