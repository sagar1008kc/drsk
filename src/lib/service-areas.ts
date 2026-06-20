import {
  BookOpen,
  Code2,
  Cpu,
  Flower2,
  Lightbulb,
  Route,
  type LucideIcon,
} from 'lucide-react';

export const SERVICE_QUOTE_OPTIONS = [
  'AI Integration & Agentic Workflow',
  'Career Strategy & AI-Era Branding',
  'Digital Solutions',
  'Book Writing & Publishing Support',
  'Mental Health Awareness & Wellness Education',
  'Business Development & R&D Strategy',
  'Other / Not Sure',
] as const;

export type ServiceQuoteType = (typeof SERVICE_QUOTE_OPTIONS)[number];

export type ServiceAccent = 'violet' | 'indigo' | 'emerald' | 'amber';

export type ServiceArea = {
  id: string;
  title: string;
  eyebrow: string;
  navTitle: string;
  navKicker: string;
  subtitle: string;
  bullets: string[];
  note: string;
  disclaimer?: string;
  icon: LucideIcon;
  accent: ServiceAccent;
};

export const SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'ai-integration',
    title: 'AI Integration & Agentic Workflows',
    eyebrow: 'AI Integration',
    navTitle: 'AI Integration & Agentic Workflow',
    navKicker: 'Systems · Automation',
    subtitle: 'Build practical AI systems that automate work, improve decisions, and connect with real tools.',
    bullets: [
      'AI chatbot or website assistant',
      'RAG knowledge assistant using business documents',
      'Workflow automation with APIs, forms, email, and dashboards',
      'Agentic workflow planning for business operations',
      'AI readiness guidance for teams or personal productivity',
    ],
    note: 'Quote-based',
    icon: Cpu,
    accent: 'violet',
  },
  {
    id: 'career-brand',
    title: 'Career Strategy & AI-Era Branding',
    eyebrow: 'Career + Brand',
    navTitle: 'Career Strategy & Personal Brand',
    navKicker: 'Growth · Identity',
    subtitle:
      'Guidance for professionals who feel stuck, uncertain, or ready to reposition themselves in the AI-powered job market.',
    bullets: [
      'Career direction and role positioning',
      'Resume and LinkedIn improvement',
      'Interview preparation',
      'AI career transition planning',
      'Portfolio and project guidance',
    ],
    note: 'From $99 / 1:1 session',
    icon: Route,
    accent: 'amber',
  },
  {
    id: 'digital-solutions',
    title: 'Digital Solutions',
    eyebrow: 'Digital Solutions',
    navTitle: 'Digital Solutions',
    navKicker: 'Build · Scale',
    subtitle:
      'From idea to live website, business platform, portfolio, or digital presence with ongoing support.',
    bullets: [
      'Website design and development',
      'Portfolio or business website',
      'Landing pages and service pages',
      'Hosting, domain, and deployment',
      'Website maintenance and basic marketing setup',
    ],
    note: 'Quote-based',
    icon: Code2,
    accent: 'indigo',
  },
  {
    id: 'book-publishing',
    title: 'Book Writing & Publishing Support',
    eyebrow: 'Book + Publishing',
    navTitle: 'Book Writing & Publishing',
    navKicker: 'Author · Distribute',
    subtitle:
      'Support for authors, professionals, and creators who want to turn ideas into a structured book and publish with confidence.',
    bullets: [
      'Book idea validation',
      'Chapter outline and structure',
      'Manuscript review and improvement',
      'Motivational or self-help book guidance',
      'Amazon KDP publishing support',
      'Book title, description, and launch planning',
    ],
    note: 'Session or quote-based',
    icon: BookOpen,
    accent: 'violet',
  },
  {
    id: 'business-rd',
    title: 'Business Development & R&D Strategy',
    eyebrow: 'Business + R&D',
    navTitle: 'Business Development & R&D Strategy',
    navKicker: 'Research · Growth',
    subtitle:
      'Practical support for entrepreneurs, creators, and small businesses exploring new ideas, market opportunities, product direction, or AI-enabled growth.',
    bullets: [
      'Business idea review and validation',
      'Market and competitor research guidance',
      'Product/service positioning',
      'Go-to-market and growth strategy',
      'AI use-case discovery for business improvement',
      'R&D planning for new digital or AI-powered solutions',
      'Proposal, pitch, and concept-document support',
    ],
    note: 'Quote-based',
    icon: Lightbulb,
    accent: 'indigo',
  },
  {
    id: 'wellness-education',
    title: 'Mental Health Awareness & Wellness Education',
    eyebrow: 'Wellness Education',
    navTitle: 'Wellness Education',
    navKicker: 'Balance · Focus',
    subtitle:
      'Educational support for stress awareness, resilience, emotional balance, and personal growth.',
    bullets: [
      'Stress and burnout awareness',
      'Emotional resilience education',
      'Wellness-focused group sessions',
      'Motivation and mindset guidance',
      'Workplace or community awareness sessions',
      'Mental Health First Aid-informed education',
    ],
    disclaimer: 'Educational support only. Not therapy, diagnosis, or emergency care.',
    note: 'From $49 / group seat or quote-based',
    icon: Flower2,
    accent: 'emerald',
  },
];
