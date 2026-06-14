import type { ProjectAccent } from '@/lib/projects';

export const accentMap: Record<
  ProjectAccent,
  {
    gradient: string;
    border: string;
    tag: string;
    glow: string;
    dot: string;
    btn: string;
    preview: string;
    link: string;
  }
> = {
  violet: {
    gradient: 'from-violet-100/90 via-white/50 to-transparent',
    border: 'border-violet-200 hover:border-violet-300',
    tag: 'bg-violet-50 text-violet-800 ring-violet-200',
    glow: 'shadow-[0_8px_32px_rgba(139,92,246,0.12)]',
    dot: 'bg-violet-500',
    btn: 'bg-violet-600 hover:bg-violet-500',
    preview: 'from-violet-50 via-white to-zinc-50',
    link: 'text-violet-700',
  },
  blue: {
    gradient: 'from-blue-100/90 via-white/50 to-transparent',
    border: 'border-blue-200 hover:border-blue-300',
    tag: 'bg-blue-50 text-blue-800 ring-blue-200',
    glow: 'shadow-[0_8px_32px_rgba(59,130,246,0.12)]',
    dot: 'bg-blue-500',
    btn: 'bg-blue-600 hover:bg-blue-500',
    preview: 'from-blue-50 via-white to-zinc-50',
    link: 'text-blue-700',
  },
  indigo: {
    gradient: 'from-indigo-100/90 via-white/50 to-transparent',
    border: 'border-indigo-200 hover:border-indigo-300',
    tag: 'bg-indigo-50 text-indigo-800 ring-indigo-200',
    glow: 'shadow-[0_8px_32px_rgba(99,102,241,0.1)]',
    dot: 'bg-indigo-500',
    btn: 'bg-indigo-600 hover:bg-indigo-500',
    preview: 'from-indigo-50 via-white to-zinc-50',
    link: 'text-indigo-700',
  },
  emerald: {
    gradient: 'from-emerald-100/90 via-white/50 to-transparent',
    border: 'border-emerald-200 hover:border-emerald-300',
    tag: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    glow: 'shadow-[0_8px_32px_rgba(52,211,153,0.1)]',
    dot: 'bg-emerald-500',
    btn: 'bg-emerald-600 hover:bg-emerald-500',
    preview: 'from-emerald-50 via-white to-zinc-50',
    link: 'text-emerald-700',
  },
  amber: {
    gradient: 'from-amber-100/90 via-white/50 to-transparent',
    border: 'border-amber-200 hover:border-amber-300',
    tag: 'bg-amber-50 text-amber-900 ring-amber-200',
    glow: 'shadow-[0_8px_32px_rgba(245,158,11,0.1)]',
    dot: 'bg-amber-500',
    btn: 'bg-amber-600 hover:bg-amber-500',
    preview: 'from-amber-50 via-white to-zinc-50',
    link: 'text-amber-800',
  },
  rose: {
    gradient: 'from-rose-100/90 via-white/50 to-transparent',
    border: 'border-rose-200 hover:border-rose-300',
    tag: 'bg-rose-50 text-rose-800 ring-rose-200',
    glow: 'shadow-[0_8px_32px_rgba(244,114,182,0.1)]',
    dot: 'bg-rose-500',
    btn: 'bg-rose-600 hover:bg-rose-500',
    preview: 'from-rose-50 via-white to-zinc-50',
    link: 'text-rose-700',
  },
  cyan: {
    gradient: 'from-cyan-100/90 via-white/50 to-transparent',
    border: 'border-cyan-200 hover:border-cyan-300',
    tag: 'bg-cyan-50 text-cyan-800 ring-cyan-200',
    glow: 'shadow-[0_8px_32px_rgba(34,211,238,0.1)]',
    dot: 'bg-cyan-500',
    btn: 'bg-cyan-600 hover:bg-cyan-500',
    preview: 'from-cyan-50 via-white to-zinc-50',
    link: 'text-cyan-700',
  },
};

export const accentDarkMap: Record<
  ProjectAccent,
  {
    border: string;
    tag: string;
    dot: string;
    glow: string;
    gradient: string;
    btn: string;
    cta: string;
    mesh: string;
  }
> = {
  violet: {
    border: 'border-violet-500/25 hover:border-violet-400/45',
    tag: 'bg-violet-500/15 text-violet-300 ring-violet-500/30',
    dot: 'bg-violet-400',
    glow: 'group-hover:shadow-[0_28px_72px_rgba(139,92,246,0.22)]',
    gradient: 'from-violet-600/25 via-transparent to-indigo-600/10',
    btn: 'bg-violet-600 hover:bg-violet-500',
    cta: 'text-violet-400 group-hover:text-violet-300',
    mesh: 'bg-[radial-gradient(ellipse_at_85%_15%,rgba(139,92,246,0.22),transparent_55%)]',
  },
  blue: {
    border: 'border-blue-500/25 hover:border-blue-400/45',
    tag: 'bg-blue-500/15 text-blue-300 ring-blue-500/30',
    dot: 'bg-blue-400',
    glow: 'group-hover:shadow-[0_28px_72px_rgba(59,130,246,0.22)]',
    gradient: 'from-blue-600/25 via-transparent to-sky-600/10',
    btn: 'bg-blue-600 hover:bg-blue-500',
    cta: 'text-blue-400 group-hover:text-blue-300',
    mesh: 'bg-[radial-gradient(ellipse_at_85%_15%,rgba(59,130,246,0.22),transparent_55%)]',
  },
  indigo: {
    border: 'border-indigo-500/25 hover:border-indigo-400/45',
    tag: 'bg-indigo-500/15 text-indigo-300 ring-indigo-500/30',
    dot: 'bg-indigo-400',
    glow: 'group-hover:shadow-[0_28px_72px_rgba(99,102,241,0.22)]',
    gradient: 'from-indigo-600/25 via-transparent to-violet-600/10',
    btn: 'bg-indigo-600 hover:bg-indigo-500',
    cta: 'text-indigo-400 group-hover:text-indigo-300',
    mesh: 'bg-[radial-gradient(ellipse_at_85%_15%,rgba(99,102,241,0.22),transparent_55%)]',
  },
  emerald: {
    border: 'border-emerald-500/25 hover:border-emerald-400/45',
    tag: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
    dot: 'bg-emerald-400',
    glow: 'group-hover:shadow-[0_28px_72px_rgba(16,185,129,0.22)]',
    gradient: 'from-emerald-600/25 via-transparent to-teal-600/10',
    btn: 'bg-emerald-600 hover:bg-emerald-500',
    cta: 'text-emerald-400 group-hover:text-emerald-300',
    mesh: 'bg-[radial-gradient(ellipse_at_85%_15%,rgba(16,185,129,0.22),transparent_55%)]',
  },
  amber: {
    border: 'border-amber-500/25 hover:border-amber-400/45',
    tag: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
    dot: 'bg-amber-400',
    glow: 'group-hover:shadow-[0_28px_72px_rgba(245,158,11,0.22)]',
    gradient: 'from-amber-600/25 via-transparent to-orange-600/10',
    btn: 'bg-amber-600 hover:bg-amber-500',
    cta: 'text-amber-400 group-hover:text-amber-300',
    mesh: 'bg-[radial-gradient(ellipse_at_85%_15%,rgba(245,158,11,0.22),transparent_55%)]',
  },
  rose: {
    border: 'border-rose-500/25 hover:border-rose-400/45',
    tag: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
    dot: 'bg-rose-400',
    glow: 'group-hover:shadow-[0_28px_72px_rgba(244,63,94,0.22)]',
    gradient: 'from-rose-600/25 via-transparent to-pink-600/10',
    btn: 'bg-rose-600 hover:bg-rose-500',
    cta: 'text-rose-400 group-hover:text-rose-300',
    mesh: 'bg-[radial-gradient(ellipse_at_85%_15%,rgba(244,63,94,0.22),transparent_55%)]',
  },
  cyan: {
    border: 'border-cyan-500/25 hover:border-cyan-400/45',
    tag: 'bg-cyan-500/15 text-cyan-300 ring-cyan-500/30',
    dot: 'bg-cyan-400',
    glow: 'group-hover:shadow-[0_28px_72px_rgba(6,182,212,0.22)]',
    gradient: 'from-cyan-600/25 via-transparent to-sky-600/10',
    btn: 'bg-cyan-600 hover:bg-cyan-500',
    cta: 'text-cyan-400 group-hover:text-cyan-300',
    mesh: 'bg-[radial-gradient(ellipse_at_85%_15%,rgba(6,182,212,0.22),transparent_55%)]',
  },
};
