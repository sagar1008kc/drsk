type AiHeroDiagramProps = {
  /** `light` for light heroes; `dark` for home hero; `brand` for nav teal accent */
  theme?: 'light' | 'dark' | 'brand';
};

export default function AiHeroDiagram({ theme = 'light' }: AiHeroDiagramProps) {
  const id = theme === 'dark' ? 'home' : theme === 'brand' ? 'brand' : 'about';
  const isDark = theme === 'dark';
  const isBrand = theme === 'brand';

  const lineGradient = isDark ? (
    <linearGradient id={`${id}-ai-line`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45" />
      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
    </linearGradient>
  ) : isBrand ? (
    <linearGradient id={`${id}-ai-line`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.15" />
    </linearGradient>
  ) : (
    <linearGradient id={`${id}-ai-line`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
    </linearGradient>
  );

  const nodeGradient = (
    <radialGradient id={`${id}-ai-node`} cx="50%" cy="50%" r="50%">
      <stop
        offset="0%"
        stopColor={isDark ? '#c4b5fd' : isBrand ? '#5eead4' : '#a78bfa'}
        stopOpacity="0.95"
      />
      <stop
        offset="100%"
        stopColor={isBrand ? '#0d9488' : '#8b5cf6'}
        stopOpacity={isDark ? 0.55 : 0.4}
      />
    </radialGradient>
  );

  const lineOpacity = isDark ? 0.85 : 0.7;
  const arrowFill = isDark ? '#a78bfa' : isBrand ? '#0d9488' : '#8b5cf6';
  const arrowOpacity = isDark ? 0.35 : 0.25;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        {lineGradient}
        {nodeGradient}
        <filter id={`${id}-ai-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        stroke={`url(#${id}-ai-line)`}
        strokeWidth="1.2"
        fill="none"
        opacity={lineOpacity}
      >
        <path d="M120 200 L280 320 L420 180 L580 280 L720 140 L900 240 L1080 160" />
        <path d="M80 420 L240 380 L400 480 L560 360 L740 440 L920 380 L1120 420" />
        <path d="M200 600 L360 520 L520 640 L680 500 L860 580 L1040 520" />
        <path d="M280 320 L400 480 L560 360" />
        <path d="M420 180 L560 360 L720 140" />
        <path d="M580 280 L740 440 L900 240" />
        <path d="M240 380 L360 520 L520 640" />
        <path d="M900 240 L1040 520 L1080 160" />
        <path d="M120 200 L80 420 L200 600" />
        <path d="M720 140 L860 580 L1040 520" />
      </g>


      <g filter={`url(#${id}-ai-glow)`}>
        {[
          [120, 200],
          [280, 320],
          [420, 180],
          [580, 280],
          [720, 140],
          [900, 240],
          [1080, 160],
          [80, 420],
          [240, 380],
          [400, 480],
          [560, 360],
          [740, 440],
          [920, 380],
          [1120, 420],
          [200, 600],
          [360, 520],
          [520, 640],
          [680, 500],
          [860, 580],
          [1040, 520],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i % 3 === 0 ? 10 : 7}
            fill={`url(#${id}-ai-node)`}
            opacity={0.85}
          />
        ))}
      </g>

      <g fill={arrowFill} opacity={arrowOpacity}>
        <polygon points="300,298 320,308 300,318" />
        <polygon points="550,268 570,278 550,288" />
        <polygon points="800,228 820,238 800,248" />
        <polygon points="450,468 470,478 450,488" />
        <polygon points="750,428 770,438 750,448" />
      </g>
    </svg>
  );
}
