/**
 * Canonical handbook download endpoint used by the UI.
 * Route supports production hosting via HANDBOOK_PUBLIC_URL and local fallback.
 */
export const HANDBOOK_PUBLIC_PATH = '/api/handbook/download';

/** Local static fallback used when HANDBOOK_PUBLIC_URL is not configured. */
export const HANDBOOK_LOCAL_FALLBACK_PATH =
  '/samples/the_mind_matters_handbook_by_drsk.pdf';

export const HANDBOOK_DOWNLOAD_FILENAME =
  'The-Mind-Matters-Handbook-by-Dr-SK.pdf';
