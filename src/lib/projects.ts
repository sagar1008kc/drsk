export type ProjectAccent =
  | 'violet'
  | 'indigo'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'cyan';

export type ProjectItem = {
  id: string;
  title: string;
  domain: string;
  tag: string;
  description: string;
  href: string;
  external: boolean;
  accent: ProjectAccent;
  highlights: string[];
  meta: { label: string; value: string }[];
  featured?: boolean;
  image?: string;
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'pilotmycareer',
    title: 'Pilot My Career',
    domain: 'pilotmycareer.com',
    tag: 'Live · AI career platform',
    description:
      'You are the pilot — AI is your copilot. Career readiness checkups, resume + JD matching, LinkedIn optimization, AI career reports, and mental fitness tools in one cockpit.',
    href: 'https://www.pilotmycareer.com/',
    external: true,
    accent: 'violet',
    featured: true,
    highlights: [
      'Career readiness scoring & pillar insights',
      'Resume + JD alignment & ATS guidance',
      'AI career reports & document vault',
      'Stress check-ins & mindfulness for professionals',
    ],
    meta: [
      { label: 'Stack', value: 'Next.js · AI orchestration' },
      { label: 'Focus', value: 'Career + wellness' },
    ],
  },
  {
    id: 'getauctionlist',
    title: 'Get Auction List',
    domain: 'getauctionlist.com',
    tag: 'Live · Data product',
    description:
      'Texas foreclosure and trustee sales in one book-style table — sale dates, parties, legal lines, and property context without hopping across county PDFs and clerk sites.',
    href: 'https://getauctionlist.com/',
    external: true,
    accent: 'emerald',
    featured: true,
    highlights: [
      'County auction rows in a single scrollable table',
      'Web view and downloadable PDF exports',
      'Filter by county, city, ZIP, and sale month',
      'Links to official CAD & clerk records',
    ],
    meta: [
      { label: 'Audience', value: 'Real-estate investors' },
      { label: 'Focus', value: 'Research velocity' },
    ],
  },
  {
    id: 'avianaa',
    title: 'Avianaa',
    domain: 'avianaa.com',
    tag: 'Live · Family experience',
    description:
      "Aviana's fun world — brain-boosting mini games and inspiring kids' books in one cozy corner of the internet, with Amazon book links and a playful games hub.",
    href: 'https://www.avianaa.com/',
    external: true,
    accent: 'rose',
    featured: true,
    highlights: [
      'Kid-friendly games hub',
      'Positive affirmations & coloring books',
      'Story-driven book storefront',
      'YouTube and Amazon integrations',
    ],
    meta: [
      { label: 'Type', value: 'Games + publishing' },
      { label: 'Focus', value: 'Family engagement' },
    ],
  },
];

export const MORE_PROJECTS: ProjectItem[] = [
  {
    id: 'ai-poc',
    title: 'AI Tools & Integration',
    domain: 'SK Creation POC',
    tag: 'Blueprint · Agentic AI',
    description:
      'Business-first AI platform concept — website assistant, lead capture, booking requests, feedback insights, and workflow automation for SMBs.',
    href: '/project/ai-poc',
    external: false,
    accent: 'indigo',
    highlights: [
      'Mission, scope, and architecture blueprint',
      'Phased POC → MVP → production roadmap',
      'Measurable ROI for operations teams',
    ],
    meta: [
      { label: 'Type', value: 'Product + services' },
      { label: 'Goal', value: 'Operational ROI' },
    ],
  },
  {
    id: 'techocean',
    title: 'TechOcean',
    domain: 'techocean.streamlit.app',
    tag: 'Live app',
    description:
      'Interactive Streamlit application for practical workflows and a lightweight exploration experience.',
    href: 'https://techocean.streamlit.app/?embed_options=show_toolbar,light_theme',
    external: true,
    accent: 'cyan',
    highlights: ['Streamlit web app', 'Quick practical workflows'],
    meta: [
      { label: 'Platform', value: 'Streamlit' },
      { label: 'Type', value: 'Web app' },
    ],
  },
];

export type ShowcaseImageItem = {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  meta: { label: string; value: string }[];
  accent: ProjectAccent;
};

export const SHOWCASE_IMAGES: ShowcaseImageItem[] = [
  {
    id: 'ai-platform',
    title: 'AI-powered future platform',
    tag: 'AI & analytics',
    description:
      'Future-ready AI interface for intelligent automation, insights, and scalable growth.',
    image: '/project.png',
    meta: [
      { label: 'Role', value: 'Frontend architecture' },
      { label: 'Focus', value: 'Dashboard UI, charts' },
    ],
    accent: 'violet' as ProjectAccent,
  },
  {
    id: 'sk-store',
    title: 'SK Store',
    tag: 'E‑commerce',
    description:
      'E-commerce storefront with product highlights and a polished shopping flow.',
    image: '/skstore.png',
    meta: [
      { label: 'Role', value: 'Design & development' },
      { label: 'Focus', value: 'UX, responsive layout' },
    ],
    accent: 'amber' as ProjectAccent,
  },
  {
    id: 'project-ui',
    title: 'Project interface concept',
    tag: 'Product showcase',
    description:
      'Clean project UI highlighting modules, layout, and navigation structure.',
    image: '/project1.png',
    meta: [
      { label: 'Role', value: 'UI implementation' },
      { label: 'Focus', value: 'Layout & clarity' },
    ],
    accent: 'indigo' as ProjectAccent,
  },
];

export const INTERFACE_SHOWCASE = {
  title: 'Platforms, commerce & product UI',
  tag: 'Interface gallery',
  description:
    'A unified look at analytics dashboards, e‑commerce storefronts, and modular product UI — frontend architecture, responsive UX, and visual clarity across engagements.',
  items: SHOWCASE_IMAGES,
} as const;

export const PROJECT_HERO_STATS = [
  { label: 'Live products', value: '3+' },
  { label: 'AI platforms', value: 'Agentic' },
  { label: 'Domains', value: 'Web · data · family' },
] as const;
