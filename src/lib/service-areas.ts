import {
  BrainCircuit,
  Code2,
  HeartHandshake,
  Users,
  type LucideIcon,
} from 'lucide-react';

export const SERVICE_QUOTE_OPTIONS = [
  'Virtual Session',
  'Digital Solutions',
  'Group Session',
  'Volunteering',
  'Other',
] as const;

export type ServiceQuoteType = (typeof SERVICE_QUOTE_OPTIONS)[number];

export type ServiceAccent = 'violet' | 'indigo' | 'emerald' | 'amber';

export type ServiceArea = {
  id: string;
  title: ServiceQuoteType;
  eyebrow: string;
  subtitle: string;
  bullets: string[];
  note: string;
  icon: LucideIcon;
  accent: ServiceAccent;
};

export const SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'virtual-session',
    title: 'Virtual Session',
    eyebrow: 'Agentic AI · 1:1',
    subtitle: 'Private sessions for career, brand, wellness awareness, publishing, and more.',
    bullets: [
      'Career development and strategy',
      'Personal brand guidance',
      'Mental health awareness',
      'Book writing and publishing guidance',
    ],
    note: 'From $99 / session (1 hour)',
    icon: BrainCircuit,
    accent: 'violet',
  },
  {
    id: 'digital-solutions',
    title: 'Digital Solutions',
    eyebrow: 'AI integration · build',
    subtitle: 'Websites, integrations, hosting, and ongoing support — tailored to your stack.',
    bullets: [
      'Website design and development',
      'Hosting setup and deployment',
      'Ongoing maintenance',
      'AI integration and smart features',
    ],
    note: 'Quote — tailored pricing',
    icon: Code2,
    accent: 'indigo',
  },
  {
    id: 'group-session',
    title: 'Group Session',
    eyebrow: 'Mental health · cohort',
    subtitle: 'Small-group sessions on fixed dates with set topics.',
    bullets: [
      'May 16, 2026 — Career development and strategy',
      'June 20, 2026 — Mental health awareness',
      'June 27, 2026 — Book writing and publishing guidance',
    ],
    note: 'From $49 / seat (90 min)',
    icon: Users,
    accent: 'emerald',
  },
  {
    id: 'volunteering',
    title: 'Volunteering',
    eyebrow: 'Community · nonprofit',
    subtitle:
      'Complimentary sessions for registered nonprofits and volunteer-led work when capacity allows.',
    bullets: [
      'No payment — mission-driven contexts',
      'Educational and supportive focus',
      'Subject to availability',
      'Confirmation by email after review',
    ],
    note: 'Complimentary',
    icon: HeartHandshake,
    accent: 'amber',
  },
];
