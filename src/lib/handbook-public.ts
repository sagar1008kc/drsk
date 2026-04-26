/**
 * Canonical handbook download endpoint used by the UI.
 * Route supports production hosting via HANDBOOK_PUBLIC_URL and local fallback.
 */
export const HANDBOOK_PUBLIC_PATH = '/api/handbook/download';

/** Local static fallback used when HANDBOOK_PUBLIC_URL is not configured. */
export const HANDBOOK_LOCAL_FALLBACK_PATH =
  '/samples/The_Mind_Matters_Handbook_by_DrSK.pdf';

export const HANDBOOK_DOWNLOAD_FILENAME =
  'The-Mind-Matters-Handbook-by-Dr-SK.pdf';

export const MOTIVATIONAL_EBOOK_PUBLIC_PATH = '/samples/motivational_ebook_01.pdf';
export const MOTIVATIONAL_EBOOK_DOWNLOAD_FILENAME = 'motivational_ebook_01.pdf';
