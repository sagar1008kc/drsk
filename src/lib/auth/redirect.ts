const DEFAULT_AUTH_REDIRECT = '/dashboard';

export function safeInternalRedirectPath(
  value: string | string[] | undefined | null,
  fallback = DEFAULT_AUTH_REDIRECT
) {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate) return fallback;

  try {
    const decoded = decodeURIComponent(candidate).trim();
    if (!decoded.startsWith('/') || decoded.startsWith('//')) return fallback;

    const url = new URL(decoded, 'https://skcreation.local');
    if (url.origin !== 'https://skcreation.local') return fallback;

    return `${url.pathname}${url.search}${url.hash}` || fallback;
  } catch {
    return fallback;
  }
}
