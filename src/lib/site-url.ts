import type { Metadata } from 'next';

/** Public site origin — no trailing slash. */
export function getSiteUrl(): string {
  const vercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`.replace(/\/$/, '')
    : '';
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '') ||
    vercel ||
    'https://www.skcreation.org';
  return raw.replace(/\/$/, '');
}

export const SITE_URL = getSiteUrl();

export function pagePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function absolutePageUrl(path: string): string {
  const normalized = pagePath(path);
  return normalized === '/' ? SITE_URL : `${SITE_URL}${normalized}`;
}

type PageMetadataOptions = {
  path: string;
  title: string;
  description: string;
  openGraphTitle?: string;
  ogImage?: string;
};

/** Per-route canonical + Open Graph URLs so shared links keep the full path. */
export function createPageMetadata({
  path,
  title,
  description,
  openGraphTitle,
  ogImage = '/drsk.png',
}: PageMetadataOptions): Metadata {
  const canonicalPath = pagePath(path);
  const url = absolutePageUrl(path);
  const ogTitle = openGraphTitle ?? title;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}
