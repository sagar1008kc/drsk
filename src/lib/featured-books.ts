export type FeaturedBookCta = {
  label: string;
  variant: 'primary' | 'secondary' | 'link';
};

export type FeaturedBook = {
  id: string;
  image: string;
  alt: string;
  shortTitle: string;
  title: string;
  /** Punchy ad line used in tight layouts */
  tagline?: string;
  body: string;
  href: string;
  cta: string;
  ctas?: FeaturedBookCta[];
  accent: 'indigo' | 'amber' | 'teal';
  /** PNG has transparency — do not place on a solid cover background */
  transparentImage?: boolean;
  /** Cover mockup sits on black — use a dark well behind the image */
  darkCover?: boolean;
  topics?: string[];
  lifecycle?: string[];
  scenarios?: string[];
  audience?: string;
  pricing?: {
    ebook: string;
    paperback: string;
  };
};

export const FDE_BOOK_HREF = 'https://a.co/d/0hiUzFUc';

export const FEATURED_BOOKS: FeaturedBook[] = [
  {
    id: 'fde',
    image: '/fde-book.png',
    alt: 'AI Forward Deployed Engineering: Fundamentals & System Design by Dr. Sagar Khatri',
    shortTitle: 'Read FDE',
    title: 'AI Forward Deployed Engineering',
    tagline: 'Build AI systems that work beyond the prototype.',
    body: 'A practical guide to designing, deploying, and operating production-ready AI systems — agents, RAG, MCP, A2A, and the full system-design lifecycle.',
    href: FDE_BOOK_HREF,
    cta: 'Read now',
    accent: 'teal',
    transparentImage: true,
    topics: [
      'AI agents',
      'RAG',
      'MCP',
      'A2A',
      'Multi-agent systems',
      'Tool calling',
      'Memory',
      'Guardrails',
      'HITL',
      'Evaluation',
      'Observability',
      'Production architecture',
    ],
    lifecycle: [
      'Discovery & Scoping',
      'Requirements',
      'MVP Architecture',
      'Production Design',
      'Security & Reliability',
      'Deployment & Scaling',
      'Evaluation & Observability',
    ],
    scenarios: [
      'Enterprise RAG & Knowledge Assistant',
      'Intelligent Invoice Automation Agent',
      'Agentic Commerce & Product Discovery',
      'Customer Service & Case Resolution Agent',
      'AI Sales & Customer Onboarding Agent',
    ],
    audience:
      'Designed for AI engineers, forward-deployed engineers, software engineers, and system architects building real-world agentic AI systems.',
    pricing: {
      ebook: '$2.99',
      paperback: '$15',
    },
  },
  {
    id: 'ai',
    image: '/aibook.png',
    alt: 'AI and future-focused books by Dr. SK',
    shortTitle: 'AI Books',
    title: 'Do you want to know how AI is changing and shaping the world?',
    body: 'Read this practical AI book set to understand what is changing, what skills matter now, and how to stay relevant with confidence in your work and life.',
    href: 'https://www.amazon.com/author/sagar2025',
    cta: 'Grab the set',
    accent: 'indigo',
  },
  {
    id: 'wellness',
    image: '/eb.png',
    alt: 'Emotional balance and wellness books by Dr. SK',
    shortTitle: 'Wellness Books',
    title: 'Are you struggling with a busy life, AI changes, and emotional overload?',
    body: 'Learn how to balance emotions, reduce stress, and build a happier daily life even in fast-changing times. Start with these emotional wellness books.',
    href: 'https://a.co/d/04XV6CYh',
    cta: 'Read now',
    accent: 'amber',
    transparentImage: true,
  },
];

export const FDE_BOOK = FEATURED_BOOKS.find((book) => book.id === 'fde')!;
