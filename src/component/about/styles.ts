/** Light AI-themed styles for About page */

export const aboutBg = 'bg-[#F8F7FF] text-zinc-900';

/** Horizontal inset for all About sections — scales up on larger screens */
export const aboutPadX = 'px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14';

export const sectionPad = `${aboutPadX} py-12 sm:py-14 md:py-16 lg:py-20`;

export const container = 'relative mx-auto w-full max-w-6xl';

export const sectionBorder = 'border-b border-violet-200/60';

export const badgeClass =
  'inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-700 sm:text-xs';

export const sectionTitle =
  'text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-[2rem]';

export const sectionDesc = 'mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base';

export const cardClass =
  'rounded-2xl border border-violet-200/80 bg-white/90 p-5 shadow-[0_8px_32px_rgba(139,92,246,0.08)] backdrop-blur-sm sm:p-6';

export const glowBgLight =
  'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent_55%),radial-gradient(circle_at_90%_80%,rgba(99,102,241,0.08),transparent_45%)]';

export const gradientText =
  'bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent';

export const ctaPrimary =
  'inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] transition hover:brightness-110 sm:w-auto';

export const ctaSecondary =
  'inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-violet-300 bg-white px-6 py-2.5 text-sm font-semibold text-violet-800 transition hover:border-violet-400 hover:bg-violet-50 sm:w-auto';

export const ctaEmerald =
  'inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto';

export const ctaAmber =
  'inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-amber-300 bg-amber-50 px-6 py-2.5 text-sm font-semibold text-amber-900 transition hover:bg-amber-100 sm:w-auto';
