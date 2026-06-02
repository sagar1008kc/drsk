'use client';

import { motion } from 'framer-motion';
import type { ProjectAccent } from '@/lib/projects';

const accentGlow: Record<ProjectAccent, string> = {
  violet: 'from-violet-500/40 via-indigo-500/20',
  indigo: 'from-indigo-500/40 via-violet-500/20',
  emerald: 'from-emerald-500/40 via-teal-500/20',
  amber: 'from-amber-500/40 via-orange-500/20',
  rose: 'from-rose-500/40 via-pink-500/20',
  cyan: 'from-cyan-500/40 via-sky-500/20',
};

type Props = {
  projectId: string;
  accent: ProjectAccent;
  layout?: 'stack' | 'wide';
};

function PilotDemo({ gradId }: { gradId: string }) {
  const bars = [72, 88, 41, 99, 65];
  return (
    <div className="flex h-full items-center justify-center gap-4 px-4 py-3">
      <motion.div
        className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-violet-950/60"
        animate={{ boxShadow: ['0 0 0 rgba(139,92,246,0)', '0 0 24px rgba(139,92,246,0.35)', '0 0 0 rgba(139,92,246,0)'] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      >
        <motion.span
          className="text-lg font-bold text-violet-200"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          81%
        </motion.span>
        <svg className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] -rotate-90" viewBox="0 0 36 36" aria-hidden>
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="3" />
          <motion.circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="94"
            initial={{ strokeDashoffset: 94 }}
            animate={{ strokeDashoffset: 18 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="h-1.5 overflow-hidden rounded-full bg-white/10"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-400 to-indigo-400"
              initial={{ width: 0 }}
              animate={{ width: `${h}%` }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const sparkPoints = [18, 28, 22, 35, 30, 42, 38, 52, 46, 60];

function AuctionDemo() {
  const rows = 3;

  const polyline = sparkPoints
    .map((y, i) => `${(i / (sparkPoints.length - 1)) * 80 + 4},${62 - y * 0.55}`)
    .join(' ');

  return (
    <div className="flex h-full flex-col justify-center gap-1 px-3 py-2.5">
      {/* Column headers */}
      <div className="mb-0.5 flex gap-2 px-1">
        {['Address', 'Sale date', 'Amount'].map((col, i) => (
          <motion.span
            key={col}
            className="flex-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-300/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            {col}
          </motion.span>
        ))}
      </div>

      {/* Data rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          className="flex gap-2 rounded-md border border-emerald-500/15 bg-emerald-950/40 px-2 py-1.5"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 + i * 0.1, duration: 0.4 }}
        >
          <span className="h-2 flex-[2] rounded bg-emerald-400/50" />
          <span className="h-2 flex-1 rounded bg-white/20" />
          <span className="h-2 flex-1 rounded bg-emerald-300/40" />
        </motion.div>
      ))}

      {/* AI analysis panel */}
      <motion.div
        className="mt-1.5 flex items-center gap-2.5 rounded-lg border border-emerald-400/20 bg-emerald-950/60 px-2.5 py-2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        {/* Pulse scan ring */}
        <div className="relative flex h-7 w-7 shrink-0 items-center justify-center">
          <motion.span
            className="absolute h-7 w-7 rounded-full border border-emerald-400/40"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute h-5 w-5 rounded-full border border-emerald-400/60"
            animate={{ scale: [1, 1.35, 1], opacity: [0.8, 0.1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
          />
          <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400/90">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-200"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </span>
        </div>

        {/* Sparkline */}
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <motion.span
              className="text-[9px] font-semibold uppercase tracking-wider text-emerald-300/90"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              AI Trend
            </motion.span>
            <motion.span
              className="text-[10px] font-bold text-emerald-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              +12.4%
            </motion.span>
          </div>
          <svg viewBox="0 0 88 32" className="h-5 w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="spark-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
            <motion.polygon
              points={`4,32 ${polyline} 84,32`}
              fill="url(#spark-fill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
            <motion.polyline
              points={polyline}
              fill="none"
              stroke="url(#spark-line)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.65, duration: 1, ease: 'easeOut' }}
            />
            <motion.circle
              cx={sparkPoints.length > 0 ? (((sparkPoints.length - 1) / (sparkPoints.length - 1)) * 80 + 4) : 84}
              cy={62 - sparkPoints[sparkPoints.length - 1] * 0.55}
              r="2"
              fill="#34d399"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: 1 }}
              transition={{ delay: 1.6, duration: 1, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* Confidence score */}
        <div className="flex shrink-0 flex-col items-center gap-0.5">
          <motion.span
            className="text-[13px] font-bold leading-none text-emerald-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            94%
          </motion.span>
          <span className="text-[8px] font-medium uppercase tracking-wide text-emerald-400/60">
            conf.
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function AvianaaDemo() {
  const tiles = [
    'bg-rose-400/70',
    'bg-amber-400/70',
    'bg-violet-400/70',
    'bg-cyan-400/70',
  ];
  return (
    <div className="grid h-full grid-cols-2 gap-2 p-4">
      {tiles.map((bg, i) => (
        <motion.div
          key={i}
          className={`flex items-center justify-center rounded-xl ${bg} shadow-lg`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.04, 1],
            opacity: 1,
            rotate: [0, i % 2 === 0 ? 2 : -2, 0],
          }}
          transition={{
            scale: { duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 0.4, delay: i * 0.08 },
            rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span className="text-2xl" aria-hidden>
            {['🎮', '📚', '✨', '🎨'][i]}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProjectDemoPreview({ projectId, accent, layout = 'stack' }: Props) {
  const glow = accentGlow[accent];
  const isWide = layout === 'wide';

  return (
    <div
      className={`relative w-full overflow-hidden border-white/10 ${
        isWide
          ? 'h-[148px] border-b border-violet-100 md:h-full md:min-h-[220px] md:border-b-0 lg:min-h-[240px]'
          : 'h-[148px] border-b border-violet-100 sm:h-[160px]'
      }`}
    >
      <motion.div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glow} to-transparent`}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      {projectId === 'pilotmycareer' ? <PilotDemo gradId={`pilot-grad-${projectId}`} /> : null}
      {projectId === 'getauctionlist' ? <AuctionDemo /> : null}
      {projectId === 'avianaa' ? <AvianaaDemo /> : null}
      <motion.div
        className="drsk-card-shine pointer-events-none absolute inset-0 opacity-0"
        aria-hidden
      />
    </div>
  );
}
