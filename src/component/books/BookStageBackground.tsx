type BookStageTone = 'teal' | 'indigo' | 'amber';

const TONE = {
  teal: {
    well: 'from-[#ecfdf5] via-[#f0fdfa] to-[#e0f2fe]',
    a: '#0d9488',
    b: '#14b8a6',
    c: '#22d3ee',
  },
  indigo: {
    well: 'from-[#eef2ff] via-[#f5f3ff] to-[#e0e7ff]',
    a: '#4f46e5',
    b: '#7c3aed',
    c: '#a78bfa',
  },
  amber: {
    well: 'from-[#fff7ed] via-[#f8fafc] to-[#e0f2fe]',
    a: '#0ea5e9',
    b: '#f59e0b',
    c: '#38bdf8',
  },
} as const;

export default function BookStageBackground({ tone }: { tone: BookStageTone }) {
  const colors = TONE[tone];
  const id = `book-stage-${tone}`;

  return (
    <div className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${colors.well}`}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 480"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.a} stopOpacity="0.35" />
            <stop offset="100%" stopColor={colors.c} stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="42%" r="45%">
            <stop offset="0%" stopColor={colors.b} stopOpacity="0.22" />
            <stop offset="100%" stopColor={colors.b} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="480" fill={`url(#${id}-glow)`} />
        <circle cx="70" cy="90" r="52" stroke={`url(#${id}-line)`} strokeWidth="1.2" />
        <circle cx="70" cy="90" r="28" stroke={colors.a} strokeOpacity="0.2" strokeWidth="1" />
        <circle cx="340" cy="380" r="70" stroke={`url(#${id}-line)`} strokeWidth="1.2" />
        <circle cx="340" cy="380" r="38" stroke={colors.c} strokeOpacity="0.25" strokeWidth="1" />
        <path
          d="M40 240 C120 180 180 320 280 250 C340 210 360 140 390 90"
          stroke={`url(#${id}-line)`}
          strokeWidth="1.4"
        />
        <path
          d="M20 360 C110 300 200 400 310 330"
          stroke={colors.a}
          strokeOpacity="0.18"
          strokeWidth="1.2"
        />
        {[
          [70, 90],
          [160, 210],
          [250, 160],
          [310, 330],
          [340, 380],
          [210, 70],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill={colors.a} fillOpacity="0.45" />
        ))}
        <path
          d="M80 420h40M100 400v40M300 60h36M318 42v36"
          stroke={colors.b}
          strokeOpacity="0.2"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

export function bookStageTone(accent: 'teal' | 'indigo' | 'amber'): BookStageTone {
  return accent;
}
