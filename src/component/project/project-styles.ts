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
    gradient: 'from-violet-600/30 via-violet-500/10 to-transparent',
    border: 'border-violet-500/30 hover:border-violet-400/50',
    tag: 'bg-violet-500/15 text-violet-200 ring-violet-500/25',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    dot: 'bg-violet-400',
    btn: 'bg-violet-600 hover:bg-violet-500',
    preview: 'from-violet-950 via-violet-900/80 to-zinc-950',
  },
  indigo: {
    gradient: 'from-indigo-600/30 via-indigo-500/10 to-transparent',
    border: 'border-indigo-500/30 hover:border-indigo-400/50',
    tag: 'bg-indigo-500/15 text-indigo-200 ring-indigo-500/25',
    glow: 'shadow-[0_0_40px_rgba(99,102,241,0.15)]',
    dot: 'bg-indigo-400',
    btn: 'bg-indigo-600 hover:bg-indigo-500',
    preview: 'from-indigo-950 via-indigo-900/80 to-zinc-950',
  },
  emerald: {
    gradient: 'from-emerald-600/30 via-emerald-500/10 to-transparent',
    border: 'border-emerald-500/30 hover:border-emerald-400/50',
    tag: 'bg-emerald-500/15 text-emerald-200 ring-emerald-500/25',
    glow: 'shadow-[0_0_40px_rgba(52,211,153,0.12)]',
    dot: 'bg-emerald-400',
    btn: 'bg-emerald-600 hover:bg-emerald-500',
    preview: 'from-emerald-950 via-emerald-900/80 to-zinc-950',
  },
  amber: {
    gradient: 'from-amber-600/30 via-amber-500/10 to-transparent',
    border: 'border-amber-500/30 hover:border-amber-400/50',
    tag: 'bg-amber-500/15 text-amber-200 ring-amber-500/25',
    glow: 'shadow-[0_0_40px_rgba(245,158,11,0.12)]',
    dot: 'bg-amber-400',
    btn: 'bg-amber-600 hover:bg-amber-500',
    preview: 'from-amber-950 via-amber-900/80 to-zinc-950',
  },
  rose: {
    gradient: 'from-rose-600/30 via-rose-500/10 to-transparent',
    border: 'border-rose-500/30 hover:border-rose-400/50',
    tag: 'bg-rose-500/15 text-rose-200 ring-rose-500/25',
    glow: 'shadow-[0_0_40px_rgba(244,114,182,0.15)]',
    dot: 'bg-rose-400',
    btn: 'bg-rose-600 hover:bg-rose-500',
    preview: 'from-rose-950 via-rose-900/80 to-zinc-950',
  },
  cyan: {
    gradient: 'from-cyan-600/30 via-cyan-500/10 to-transparent',
    border: 'border-cyan-500/30 hover:border-cyan-400/50',
    tag: 'bg-cyan-500/15 text-cyan-200 ring-cyan-500/25',
    glow: 'shadow-[0_0_40px_rgba(34,211,238,0.12)]',
    dot: 'bg-cyan-400',
    btn: 'bg-cyan-600 hover:bg-cyan-500',
    preview: 'from-cyan-950 via-cyan-900/80 to-zinc-950',
  },
};
