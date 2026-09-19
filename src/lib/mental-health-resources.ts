export const WELLNESS_EDUCATION_HREF = '/resources/wellness-education';

export const WELLNESS_HUB_PATH = [
  {
    step: '01',
    title: 'Start with a guide',
    body: 'Open a featured PDF or a short guide if looping thoughts, stress, or information overload are getting in the way.',
  },
  {
    step: '02',
    title: 'Go deeper with books',
    body: 'Use the wellness titles for emotional balance, busy-life stress, and staying human while technology moves faster.',
  },
  {
    step: '03',
    title: 'Optional sessions',
    body: 'Group or quoted wellness-education sessions live under Services — awareness only, not therapy.',
  },
] as const;

export const WELLNESS_INCLUDED = [
  'Educational guides and books',
  'Stress, resilience, and mindset awareness',
  'Healthier technology-use education',
  'MHFA-informed group or community sessions',
] as const;

export const WELLNESS_NOT_INCLUDED = [
  'Therapy, counseling, or diagnosis',
  'Medical or emergency care',
  'A substitute for licensed treatment',
  'Crisis support or clinical advice',
] as const;

export const WELLNESS_GUIDE_PHASES = [
  {
    label: 'Notice',
    title: 'Catch the loop',
    body: 'Spot rumination before it takes the whole day.',
  },
  {
    label: 'Calm',
    title: 'Settle the mind',
    body: 'Use short practices that interrupt worry and restore focus.',
  },
  {
    label: 'Practice',
    title: 'Build steadier days',
    body: 'Turn the 30-day sequence into habits you can keep.',
  },
] as const;

export type MentalHealthResource = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  href: string;
  cta: string;
  cover?: string;
  coverAlt?: string;
  format: 'PDF' | 'Book' | 'Guide';
  featured?: boolean;
  external?: boolean;
  source?: string;
};

export const MENTAL_HEALTH_RESOURCES: MentalHealthResource[] = [
  {
    id: 'stop-overthinking',
    title: 'How to Stop Overthinking & Find Inner Peace in 30 Days',
    tag: 'Featured guide',
    summary:
      'A practical 30-day guide for catching rumination early, calming the mind, and building steadier daily habits. Start here if stress and looping thoughts are getting in the way.',
    href: '/data/stop-overthinking.pdf',
    cta: 'Open the PDF',
    cover: '/stop_overthinking.png',
    coverAlt: 'How to Stop Overthinking and Find Inner Peace in 30 Days by Dr. SK',
    format: 'PDF',
    featured: true,
  },
  {
    id: 'working-well',
    title: 'The Working Well',
    tag: 'Wellness Education Series',
    summary:
      'A practical wellness education guide for professionals — five modules on stress, energy, movement, focus, and recovery that can survive a busy week. Includes a 30-day personal plan.',
    href: '/data/working-well-wellness-guide.pdf',
    cta: 'Open the PDF',
    cover: '/working-well-wellness-guide.png',
    coverAlt: 'The Working Well — a practical wellness education guide for professionals by SK Creation',
    format: 'PDF',
  },
  {
    id: 'breathing-reset',
    title: '5-Minute Breathing Reset',
    tag: 'Pilot My Career',
    summary:
      'A five-minute reset for interview and application spikes: why a slower exhale can help, when to pause, the timed sequence with coaching notes, context versions, and a one-week practice log. Education only — not treatment.',
    href: '/data/5-minute-breathing-reset.pdf',
    cta: 'Open the PDF',
    cover: '/5-minute-breathing-reset.png',
    coverAlt: '5-Minute Breathing Reset — SK Creation wellness education guide',
    format: 'PDF',
    source: 'Pilot My Career',
  },
  {
    id: 'job-search-burnout',
    title: 'Job Search Burnout Signals',
    tag: 'Pilot My Career',
    summary:
      'How job-search drain differs from a hard week: a four-area signal map, a weekly self-check that is not a diagnosis, load you can change, a recovery week, and how to re-enter without snapping back.',
    href: '/data/job-search-burnout-signals.pdf',
    cta: 'Open the PDF',
    cover: '/job-search-burnout-signals.png',
    coverAlt: 'Job Search Burnout Signals — SK Creation wellness education guide',
    format: 'PDF',
    source: 'Pilot My Career',
  },
  {
    id: 'rejection-recovery',
    title: 'Rejection Recovery Framework',
    tag: 'Pilot My Career',
    summary:
      'A same-week structure after a no: name the event, stabilize, separate identity from outcome, learn one signal, change one artifact, and re-engage without a catch-up spiral. Education only — not therapy.',
    href: '/data/rejection-recovery-framework.pdf',
    cta: 'Open the PDF',
    cover: '/rejection-recovery-framework.png',
    coverAlt: 'Rejection Recovery Framework — SK Creation wellness education guide',
    format: 'PDF',
    source: 'Pilot My Career',
  },
  {
    id: 'wellness-books',
    title: 'Emotional wellness books',
    tag: 'Amazon',
    summary:
      'Books on emotional balance, stress, and staying human in a fast-changing AI era — written for busy professionals and families.',
    href: 'https://a.co/d/04XV6CYh',
    cta: 'View on Amazon',
    cover: '/eb.png',
    coverAlt: 'Emotional wellness books by Dr. SK',
    format: 'Book',
    external: true,
  },
];
