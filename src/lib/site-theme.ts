/** Site-wide light page canvas (matches /about). Nav & footer stay dark in layout. */

export const SITE_PAGE_BG = 'bg-[#F8F7FF]';
export const SITE_PAGE_TEXT = 'text-zinc-900';
export const sitePageMain = `min-h-screen ${SITE_PAGE_BG} ${SITE_PAGE_TEXT}`;

/** Navbar / SK Creation brand teal */
export const BRAND_TEAL = '#0d9488';

export const ctaPrimaryClass =
  'inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#0d9488] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(13,148,136,0.35)] transition hover:bg-teal-700 sm:w-auto';

export const ctaSecondaryClass =
  'inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-teal-300 bg-white px-6 py-2.5 text-sm font-semibold text-teal-800 transition hover:border-teal-400 hover:bg-teal-50 sm:w-auto';

export const btnBrandSolid =
  'bg-[#0d9488] text-white transition hover:bg-teal-700';

export const btnBrandRounded =
  'inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0d9488] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700';

export const btnBrandRoundedXl =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700';

export const btnBrandSubscribe =
  'inline-flex min-h-[3rem] shrink-0 items-center justify-center rounded-xl bg-[#0d9488] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60';
