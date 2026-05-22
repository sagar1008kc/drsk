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
  },
  indigo: {
    gradient: 'from-indigo-100/90 via-white/50 to-transparent',
    border: 'border-indigo-200 hover:border-indigo-300',
    tag: 'bg-indigo-50 text-indigo-800 ring-indigo-200',
    glow: 'shadow-[0_8px_32px_rgba(99,102,241,0.1)]',
    dot: 'bg-indigo-500',
    btn: 'bg-indigo-600 hover:bg-indigo-500',
    preview: 'from-indigo-50 via-white to-zinc-50',
  },
  emerald: {
    gradient: 'from-emerald-100/90 via-white/50 to-transparent',
    border: 'border-emerald-200 hover:border-emerald-300',
    tag: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    glow: 'shadow-[0_8px_32px_rgba(52,211,153,0.1)]',
    dot: 'bg-emerald-500',
    btn: 'bg-emerald-600 hover:bg-emerald-500',
    preview: 'from-emerald-50 via-white to-zinc-50',
  },
  amber: {
    gradient: 'from-amber-100/90 via-white/50 to-transparent',
    border: 'border-amber-200 hover:border-amber-300',
    tag: 'bg-amber-50 text-amber-900 ring-amber-200',
    glow: 'shadow-[0_8px_32px_rgba(245,158,11,0.1)]',
    dot: 'bg-amber-500',
    btn: 'bg-amber-600 hover:bg-amber-500',
    preview: 'from-amber-50 via-white to-zinc-50',
  },
  rose: {
    gradient: 'from-rose-100/90 via-white/50 to-transparent',
    border: 'border-rose-200 hover:border-rose-300',
    tag: 'bg-rose-50 text-rose-800 ring-rose-200',
    glow: 'shadow-[0_8px_32px_rgba(244,114,182,0.1)]',
    dot: 'bg-rose-500',
    btn: 'bg-rose-600 hover:bg-rose-500',
    preview: 'from-rose-50 via-white to-zinc-50',
  },
  cyan: {
    gradient: 'from-cyan-100/90 via-white/50 to-transparent',
    border: 'border-cyan-200 hover:border-cyan-300',
    tag: 'bg-cyan-50 text-cyan-800 ring-cyan-200',
    glow: 'shadow-[0_8px_32px_rgba(34,211,238,0.1)]',
    dot: 'bg-cyan-500',
    btn: 'bg-cyan-600 hover:bg-cyan-500',
    preview: 'from-cyan-50 via-white to-zinc-50',
  },
};
