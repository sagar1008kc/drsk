import {
  BookOpen,
  Briefcase,
  Database,
  HeartHandshake,
  Home,
  Layers,
  Link2,
  Newspaper,
  ToyBrick,
  UserCircle,
  type LucideIcon,
} from 'lucide-react';
import { WELLNESS_EDUCATION_HREF } from '@/lib/mental-health-resources';
import { RESOURCE_HREFS } from '@/lib/resource-hrefs';

export type ParentAgentId = 'rag' | 'books' | 'projects' | 'link';

export type SubAgentId =
  | 'projects_hub'
  | 'career'
  | 'realestate'
  | 'aviana'
  | 'sitemap_about'
  | 'sitemap_kb'
  | 'resources_hub'
  | 'services_hub'
  | 'portfolio'
  | 'education_exp'
  | 'pub_catalog'
  | 'wellness_books'
  | 'ai_books'
  | 'medium'
  | 'onecrm';

export type FlowStep =
  | 'idle'
  | 'ingesting'
  | 'classifying'
  | 'routing'
  | 'delegating'
  | 'retrieving'
  | 'synthesizing'
  | 'delivering'
  | 'complete';

export type AgentCta = { text: string; url: string };

export type SubAgentDef = {
  id: SubAgentId;
  name: string;
  keywords: string[];
  response: string;
  ctas: AgentCta[];
};

export type ParentAgentDef = {
  id: ParentAgentId;
  name: string;
  shortName: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  glow: string;
  keywords: string[];
  hubResponse: string;
  hubCtas: AgentCta[];
  subAgents: SubAgentDef[];
};

export const LINKS = {
  home: '/home',
  resources: RESOURCE_HREFS.hub,
  wellness: WELLNESS_EDUCATION_HREF,
  stopOverthinking: '/data/stop-overthinking.pdf',
  workingWell: '/data/working-well-wellness-guide.pdf',
  breathingReset: '/data/5-minute-breathing-reset.pdf',
  jobSearchBurnout: '/data/job-search-burnout-signals.pdf',
  rejectionRecovery: '/data/rejection-recovery-framework.pdf',
  about: '/about',
  contact: '/contact',
  projectsHub: `${RESOURCE_HREFS.hub}#products`,
  portfolio: '/portfolio',
  books: '/books',
  services: '/services',
  wellnessService: '/services#wellness-education',
  medium: 'https://medium.com/@drskauthor',
  linkedin: 'https://www.linkedin.com/in/drskofficial',
  wellnessAmazon: 'https://a.co/d/04XV6CYh',
  aiAmazon: 'https://www.amazon.com/author/sagar2025',
  pilotmycareer: 'https://www.pilotmycareer.com/',
  getauctionlist: 'https://getauctionlist.com/',
  avianaa: 'https://www.avianaa.com/',
  salesforceOneCrm: 'https://www.salesforce.com/',
} as const;

export const PARENT_AGENTS: Record<ParentAgentId, ParentAgentDef> = {
  rag: {
    id: 'rag',
    name: 'RAG Agent',
    shortName: 'RAG',
    icon: Database,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/15',
    borderColor: 'border-blue-500/40',
    glow: 'shadow-[0_0_20px_rgba(37,99,235,0.25)]',
    keywords: [
      'who is',
      'about dr',
      'dr sk',
      'drsk',
      'dr. sk',
      'sagar',
      'portfolio',
      'background',
      'experience',
      'education',
      'certification',
      'dba',
      'credentials',
      'linkedin',
      'tell me about',
      'engineer',
      'skcreation',
      'sk creation',
      'site',
      'services',
      'service',
      'knowledge',
      'resources',
      'resource',
      'mission',
      'organization',
      'about page',
      'nav',
      'navigation',
    ],
    hubResponse:
      'SK Creation’s site is organized around Build · Share · Support. I can point you to About, Services, Resources (AI, Books, Wellness Education), or Portfolio. What do you need?',
    hubCtas: [
      { text: 'About SK Creation', url: LINKS.about },
      { text: 'Services', url: LINKS.services },
      { text: 'Resources', url: LINKS.resources },
      { text: 'Portfolio', url: LINKS.portfolio },
    ],
    subAgents: [
      {
        id: 'sitemap_about',
        name: 'About Dr. SK',
        keywords: ['who is', 'tell me about', 'sagar khatri', 'story', 'bio', 'what does', 'about dr', 'dr sk', 'drsk', 'dr. sk'],
        response:
          'Dr. SK (Dr. Sagar Khatri) is an AI forward deployed engineer who builds practical production AI systems. He is also a published author and MHFA-informed mental-health advocate. His work on this site sits under SK Creation’s mission: Build, Share, and Support.',
        ctas: [
          { text: 'View portfolio', url: LINKS.portfolio },
          { text: 'About SK Creation', url: LINKS.about },
          { text: 'LinkedIn', url: LINKS.linkedin },
        ],
      },
      {
        id: 'sitemap_kb',
        name: 'SK Creation',
        keywords: ['skcreation', 'sk creation', 'this site', 'this website', 'organization', 'mission', 'about page', 'build share', 'what is this site'],
        response:
          'SK Creation is a mission-driven AI and digital organization: Build practical systems, Share useful knowledge, and Support people in an AI-powered world. Main pages are Home, Services, Resources, Wellness, About, and Portfolio.',
        ctas: [
          { text: 'About SK Creation', url: LINKS.about },
          { text: 'Home', url: LINKS.home },
          { text: 'Contact', url: LINKS.contact },
        ],
      },
      {
        id: 'resources_hub',
        name: 'Resources',
        keywords: [
          'resources',
          'resource',
          '/resources',
          'ai resources',
          'agentic',
          'resource hub',
          'knowledge for the ai era',
        ],
        response:
          'The Resources page has three paths: AI (agentic systems, RAG, LLMs, architecture), Books, and Wellness Education. Open /resources, then pick a path — or go straight to the Wellness Education hub.',
        ctas: [
          { text: 'Resources', url: LINKS.resources },
          { text: 'Wellness Education', url: LINKS.wellness },
          { text: 'Books', url: LINKS.books },
        ],
      },
      {
        id: 'services_hub',
        name: 'Services',
        keywords: [
          'services',
          'service',
          'offer',
          'what can you',
          'book a session',
          'request a quote',
          'ai integration',
          'career strategy',
          'digital solutions',
          'publishing support',
          'business r&d',
        ],
        response:
          'SK Creation services cover: AI Integration & Agentic Workflows; Career Strategy & AI-Era Branding; Digital Solutions; Book Writing & Publishing Support; Business Development & R&D Strategy; and Mental Health Awareness & Wellness Education (education only, not therapy). Quotes and sessions are on the Services page.',
        ctas: [
          { text: 'Explore Services', url: LINKS.services },
          { text: 'Wellness Education service', url: LINKS.wellnessService },
          { text: 'Request a quote', url: LINKS.contact },
        ],
      },
      {
        id: 'portfolio',
        name: '/portfolio',
        keywords: ['portfolio', 'experience', 'certification', 'work', 'resume', 'cv', 'background', 'live project'],
        response:
          'The /portfolio page covers Dr. SK’s experience, education, certifications, live projects, and official links.',
        ctas: [{ text: 'Open /portfolio', url: LINKS.portfolio }],
      },
      {
        id: 'education_exp',
        name: 'Education & Experience',
        keywords: ['education', 'experience', 'dba', 'degree', 'certification', 'fortune', 'engineer', 'career history'],
        response:
          'Education spans DBA (Information Systems), master’s and bachelor’s degrees, plus Fortune Top 25 and Fortune Global 50 engineering experience and certifications. Details are on /portfolio.',
        ctas: [{ text: 'View experience', url: LINKS.portfolio }],
      },
    ],
  },
  books: {
    id: 'books',
    name: 'Book Agent',
    shortName: 'Books',
    icon: BookOpen,
    color: 'text-green-600',
    bgColor: 'bg-green-500/15',
    borderColor: 'border-green-500/40',
    glow: 'shadow-[0_0_20px_rgba(22,163,74,0.22)]',
    keywords: [
      'book',
      'books',
      'read',
      'amazon',
      'kdp',
      'published',
      'article',
      'medium',
      'essay',
      'writing',
      'emotional',
      'stress',
      'wellness',
      'wellness education',
      'mental',
      'mental health',
      'mental health awareness',
      'overthinking',
      'inner peace',
      'stop overthinking',
      'mindfulness',
      'anxiety',
      'burnout',
      'ai book',
      'tech book',
      'software',
      'cybersecurity',
      'author page',
      'find book',
    ],
    hubResponse:
      'I can help you find books — Emotional Wellness, AI & Career tracks, or articles on Medium. What are you looking for?',
    hubCtas: [
      { text: 'Wellness books', url: LINKS.wellnessAmazon },
      { text: 'AI & tech books', url: LINKS.aiAmazon },
      { text: 'Medium articles', url: LINKS.medium },
      { text: 'Book catalog', url: LINKS.books },
    ],
    subAgents: [
      {
        id: 'wellness_books',
        name: 'Wellness books',
        keywords: [
          'emotional balance',
          'stress',
          'mental wellness',
          'wellness',
          'wellness education',
          'mental health',
          'mental health awareness',
          'overthinking',
          'inner peace',
          'stop overthinking',
          'mindfulness',
          'anxiety',
          'burnout',
          'overload',
          'mhfa',
          'happier',
          'emotional',
          'breathing',
          'rejection',
          'job search burnout',
          'working well',
          'workplace wellness',
        ],
        response:
          'Wellness Education on this site is at /resources/wellness-education. Start with the featured PDF How to Stop Overthinking & Find Inner Peace in 30 Days, or The Working Well — a five-module workplace wellness guide for professionals. There are also short Pilot My Career PDFs for a 5-minute breathing reset, job-search burnout signals, and rejection recovery, emotional wellness books on Amazon, and group wellness-education sessions under Services — education and awareness only, not therapy or emergency care.',
        ctas: [
          { text: 'Wellness Education hub', url: LINKS.wellness },
          { text: 'Open the featured PDF', url: LINKS.stopOverthinking },
          { text: 'The Working Well PDF', url: LINKS.workingWell },
          { text: 'Wellness books on Amazon', url: LINKS.wellnessAmazon },
          { text: 'Wellness Education service', url: LINKS.wellnessService },
        ],
      },
      {
        id: 'ai_books',
        name: 'AI & tech books',
        keywords: [
          'ai book',
          'tech book',
          'software engineer',
          'cybersecurity',
          'machine learning',
          'artificial intelligence',
          'coding',
          'engineer book',
          'ai powered',
        ],
        response:
          'For AI, software engineering, and tech career topics, the AI & Career book series is on Amazon.',
        ctas: [
          { text: 'AI books on Amazon', url: LINKS.aiAmazon },
          { text: 'Book catalog', url: LINKS.books },
        ],
      },
      {
        id: 'medium',
        name: 'Medium articles',
        keywords: ['medium', 'article', 'articles', 'essay', 'writing', 'post', 'blog', 'read online', 'drsk article'],
        response: 'Dr. SK publishes articles on Medium — AI, emotional balance, and practical ideas for everyday life.',
        ctas: [{ text: 'Read on Medium', url: LINKS.medium }],
      },
      {
        id: 'pub_catalog',
        name: 'Find books',
        keywords: ['catalog', 'all book', 'author page', 'published work', 'find book'],
        response: 'Pick a reading path: Emotional Wellness books, AI & Career books, or articles on Medium.',
        ctas: [
          { text: 'Wellness books', url: LINKS.wellnessAmazon },
          { text: 'AI & tech books', url: LINKS.aiAmazon },
          { text: 'Medium articles', url: LINKS.medium },
        ],
      },
    ],
  },
  projects: {
    id: 'projects',
    name: 'Project Agent',
    shortName: 'Projects',
    icon: Layers,
    color: 'text-teal-600',
    bgColor: 'bg-teal-500/15',
    borderColor: 'border-teal-500/40',
    glow: 'shadow-[0_0_20px_rgba(13,148,136,0.25)]',
    keywords: [
      'project',
      'projects',
      'live',
      'product',
      'platform',
      'website',
      'career',
      'interview',
      'job',
      'resume',
      'pilot',
      'auction',
      'foreclosure',
      'texas',
      'real estate',
      'kids',
      'aviana',
      'children',
      'game',
    ],
    hubResponse:
      'I work on three live sites. Which one are you looking for?\n\n• Career & interview prep → Pilot My Career\n• Texas real estate auctions → Get Auction List\n• Kids books & games → Aviana\n\nPick an option below, or browse all projects.',
    hubCtas: [
      { text: 'Pilot My Career', url: LINKS.pilotmycareer },
      { text: 'Get Auction List', url: LINKS.getauctionlist },
      { text: 'Aviana', url: LINKS.avianaa },
      { text: 'All projects', url: LINKS.projectsHub },
    ],
    subAgents: [
      {
        id: 'career',
        name: 'Pilot My Career',
        keywords: ['career', 'interview', 'job', 'resume', 'pilot', 'star', 'ats', 'linkedin', 'prep'],
        response:
          'You’re asking about career and interview prep. Pilot My Career is a live site for readiness checkups, resume + job-description matching, and interview guidance.\n\nDoes that sound like what you need? You can open the site directly below.',
        ctas: [
          { text: 'Visit Pilot My Career', url: LINKS.pilotmycareer },
          { text: 'See all projects', url: LINKS.projectsHub },
        ],
      },
      {
        id: 'realestate',
        name: 'Get Auction List',
        keywords: ['auction', 'foreclosure', 'texas', 'real estate', 'house', 'county', 'trustee', 'investor'],
        response:
          'You’re asking about Texas real estate auctions. Get Auction List pulls foreclosure and trustee sales into one searchable table — by county, date, and property details.\n\nWant to explore the live site?',
        ctas: [
          { text: 'Visit Get Auction List', url: LINKS.getauctionlist },
          { text: 'See all projects', url: LINKS.projectsHub },
        ],
      },
      {
        id: 'aviana',
        name: 'Aviana',
        keywords: ['kids', 'aviana', 'children', 'game', 'games', 'coloring', 'affirmation', 'family'],
        response:
          'You’re asking about kids content. Aviana is a live family site with mini games, affirmations, coloring books, and story-driven kids’ books.\n\nWant to take a look?',
        ctas: [
          { text: 'Visit Aviana', url: LINKS.avianaa },
          { text: 'See all projects', url: LINKS.projectsHub },
        ],
      },
      {
        id: 'projects_hub',
        name: 'All projects',
        keywords: ['showcase', 'all project', 'live product', 'all sites'],
        response:
          'Here’s an overview of all three live builds. Tap the one that fits, or open the full projects page.',
        ctas: [
          { text: 'Pilot My Career', url: LINKS.pilotmycareer },
          { text: 'Get Auction List', url: LINKS.getauctionlist },
          { text: 'Aviana', url: LINKS.avianaa },
          { text: 'Projects page', url: LINKS.projectsHub },
        ],
      },
    ],
  },
  link: {
    id: 'link',
    name: 'Link Agent',
    shortName: 'Link',
    icon: Link2,
    color: 'text-blue-700',
    bgColor: 'bg-blue-500/15',
    borderColor: 'border-blue-500/40',
    glow: 'shadow-[0_0_20px_rgba(29,78,216,0.25)]',
    keywords: [
      'salesforce',
      'crm',
      'onecrm',
      'one crm',
      'integration',
      'enterprise',
      'connect',
      'link',
      'api',
      'workflow',
    ],
    hubResponse:
      'The Link Agent routes outbound integrations — including Salesforce OneCRM for enterprise CRM workflows.',
    hubCtas: [{ text: 'Salesforce OneCRM', url: LINKS.salesforceOneCrm }],
    subAgents: [
      {
        id: 'onecrm',
        name: 'Salesforce OneCRM',
        keywords: ['salesforce', 'crm', 'onecrm', 'one crm', 'enterprise crm', 'customer'],
        response:
          'Salesforce OneCRM connects customer data, sales workflows, and service touchpoints in one enterprise CRM layer.',
        ctas: [{ text: 'Open Salesforce OneCRM', url: LINKS.salesforceOneCrm }],
      },
    ],
  },
};

export type RouteResult = {
  parent: ParentAgentId;
  subAgent: SubAgentId;
  subAgentName: string;
  confidence: number;
  matchedTerms: string[];
};

const MEDIUM_KEYWORDS = ['medium', 'article', 'articles', 'essay', 'writing', 'post', 'blog', 'read online'];

const MIN_ROUTE_CONFIDENCE = 68;

/** Single-word hits that are too broad to route on alone */
const AMBIGUOUS_KEYWORDS = new Set([
  'house',
  'home',
  'game',
  'games',
  'career',
  'job',
  'read',
  'link',
  'engineer',
  'build',
  'live',
  'children',
  'kids',
  'connect',
  'api',
  'site',
  'platform',
  'website',
  'product',
]);

const SUB_AGENT_STRONG_KEYWORDS: Partial<Record<SubAgentId, string[]>> = {
  realestate: ['auction', 'foreclosure', 'texas', 'real estate', 'trustee', 'investor', 'county', 'get auction'],
  career: ['interview', 'resume', 'pilot', 'ats', 'prep', 'pilot my career', 'job description', 'linkedin'],
  aviana: ['aviana', 'coloring', 'affirmation', 'mini game', 'kids book', 'story-driven'],
  wellness_books: [
    'wellness',
    'wellness education',
    'stress',
    'emotional',
    'mindfulness',
    'anxiety',
    'burnout',
    'mhfa',
    'mental wellness',
    'mental health',
    'overthinking',
    'inner peace',
    'stop overthinking',
  ],
  ai_books: ['ai book', 'tech book', 'cybersecurity', 'machine learning', 'artificial intelligence', 'software engineer'],
  medium: ['medium', 'article', 'articles', 'essay', 'blog post'],
  onecrm: ['salesforce', 'crm', 'onecrm', 'one crm', 'enterprise crm'],
  sitemap_about: ['who is', 'about dr', 'dr sk', 'drsk', 'dr. sk', 'tell me about', 'sagar khatri', 'bio'],
  portfolio: ['portfolio', '/portfolio'],
  education_exp: ['education', 'experience', 'dba', 'certification', 'degree'],
  sitemap_kb: ['skcreation', 'sk creation', 'knowledge base', 'this site', 'this website', 'mission', 'organization'],
  resources_hub: ['resources', 'resource', '/resources', 'ai resources', 'resource hub', 'agentic'],
  services_hub: ['services', 'service', 'ai integration', 'career strategy', 'digital solutions', 'request a quote'],
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function scoreKeywords(text: string, keywords: string[]): string[] {
  const lower = text.toLowerCase();
  return keywords.filter((keyword) => {
    const k = keyword.toLowerCase();
    if (k.includes(' ')) return lower.includes(k);
    return new RegExp(`\\b${escapeRegExp(k)}\\b`, 'i').test(text);
  });
}

function isOnlyAmbiguousMatch(matched: string[]): boolean {
  return matched.length > 0 && matched.every((term) => AMBIGUOUS_KEYWORDS.has(term.toLowerCase()));
}

function isOffTopicQuery(text: string): boolean {
  const lower = text.trim().toLowerCase();
  if (!lower) return true;

  if (/\d+\s*[\+\-\*\/x×÷]\s*\d+/.test(lower)) return true;
  if (/^(what is|how much is|calculate|solve)\b/.test(lower) && /\d/.test(lower)) return true;

  const constructionIntent =
    /\b(build|building|construct|construction)\b/.test(lower) &&
    /\b(house|home)\b/.test(lower);
  const diyGuideIntent = /\b(step[\s-]by[\s-]step|how to build|guide to build)\b/.test(lower);
  const hasAuctionContext = scoreKeywords(text, SUB_AGENT_STRONG_KEYWORDS.realestate ?? []).length > 0;

  if ((constructionIntent || diyGuideIntent) && !hasAuctionContext) return true;

  return false;
}

function hasStrongSubAgentMatch(text: string, subId: SubAgentId): boolean {
  const strong = SUB_AGENT_STRONG_KEYWORDS[subId];
  if (!strong || strong.length === 0) return true;
  return scoreKeywords(text, strong).length > 0;
}

function isConfidentRoute(
  text: string,
  parentMatched: string[],
  sub: SubAgentDef,
  subMatched: string[]
): boolean {
  if (isOffTopicQuery(text)) return false;

  const allMatched = [...new Set([...parentMatched, ...subMatched])];
  if (allMatched.length === 0) return false;
  if (isOnlyAmbiguousMatch(allMatched)) return false;

  if (!hasStrongSubAgentMatch(text, sub.id)) return false;

  if (subMatched.length === 0) {
    const hubSubs: SubAgentId[] = [
      'projects_hub',
      'pub_catalog',
      'sitemap_about',
      'sitemap_kb',
      'resources_hub',
      'services_hub',
      'portfolio',
      'education_exp',
    ];
    if (hubSubs.includes(sub.id)) {
      const clearParentHits = parentMatched.filter((term) => !AMBIGUOUS_KEYWORDS.has(term.toLowerCase()));
      if (clearParentHits.length === 0 && parentMatched.length < 2) return false;
    }
  }

  const confidence = Math.min(96, 50 + (parentMatched.length + subMatched.length) * 10);
  return confidence >= MIN_ROUTE_CONFIDENCE;
}

function resolveSubAgent(parent: ParentAgentDef, text: string): SubAgentDef {
  let best: SubAgentDef = parent.subAgents[0];
  let bestScore = 0;

  for (const sub of parent.subAgents) {
    const matched = scoreKeywords(text, sub.keywords);
    if (matched.length > bestScore) {
      bestScore = matched.length;
      best = sub;
    }
  }

  if (bestScore === 0) {
    if (parent.id === 'projects') return parent.subAgents.find((s) => s.id === 'projects_hub')!;
    if (parent.id === 'rag') return parent.subAgents.find((s) => s.id === 'sitemap_about')!;
    if (parent.id === 'link') return parent.subAgents.find((s) => s.id === 'onecrm')!;
    return parent.subAgents.find((s) => s.id === 'pub_catalog')!;
  }

  return best;
}

function resolveParent(text: string): { parent: ParentAgentDef; matched: string[] } | null {
  const lower = text.toLowerCase();

  const mediumOnly =
    scoreKeywords(text, MEDIUM_KEYWORDS).length > 0 &&
    !lower.includes('book') &&
    !scoreKeywords(text, ['wellness', 'stress', 'emotional', 'amazon', 'kdp']).length;

  if (mediumOnly) {
    return {
      parent: PARENT_AGENTS.books,
      matched: scoreKeywords(text, MEDIUM_KEYWORDS),
    };
  }

  const scores = (Object.keys(PARENT_AGENTS) as ParentAgentId[]).map((id) => {
    const agent = PARENT_AGENTS[id];
    const matched = scoreKeywords(text, agent.keywords);
    return { agent, matched, score: matched.length };
  });

  scores.sort((a, b) => b.score - a.score);
  if (scores[0].score === 0) return null;
  if (scores.length > 1 && scores[0].score === scores[1].score) return null;
  if (isOnlyAmbiguousMatch(scores[0].matched)) return null;
  return { parent: scores[0].agent, matched: scores[0].matched };
}

export function resolveAgent(text: string): RouteResult | null {
  if (isOffTopicQuery(text)) return null;

  const hit = resolveParent(text);
  if (!hit) return null;

  const sub = resolveSubAgent(hit.parent, text);
  const subMatched = scoreKeywords(text, sub.keywords);
  if (!isConfidentRoute(text, hit.matched, sub, subMatched)) return null;

  const confidence = Math.min(96, 50 + (hit.matched.length + subMatched.length) * 10);

  return {
    parent: hit.parent.id,
    subAgent: sub.id,
    subAgentName: sub.name,
    confidence,
    matchedTerms: [...new Set([...hit.matched, ...subMatched])],
  };
}

export function buildAgentReply(route: RouteResult): { content: string; ctas: AgentCta[] } {
  const parent = PARENT_AGENTS[route.parent];
  const sub = parent.subAgents.find((s) => s.id === route.subAgent)!;
  const subMatched = scoreKeywords(route.matchedTerms.join(' '), sub.keywords);

  const useHub =
    subMatched.length === 0 &&
    (route.subAgent === 'projects_hub' ||
      route.subAgent === 'pub_catalog' ||
      route.subAgent === 'sitemap_about' ||
      route.subAgent === 'sitemap_kb' ||
      route.subAgent === 'resources_hub' ||
      route.subAgent === 'services_hub' ||
      route.subAgent === 'onecrm');

  if (useHub) {
    return { content: parent.hubResponse, ctas: parent.hubCtas };
  }

  return { content: sub.response, ctas: sub.ctas };
}

export function getParentAgent(id: ParentAgentId): ParentAgentDef {
  return PARENT_AGENTS[id];
}

/** Left-panel routing stages (top → bottom) */
export const ROUTING_STAGES = [
  { id: 'chat', label: 'Chat Experience Layer', desc: 'UI channel and message intake' },
  { id: 'identity', label: 'Identity + Session Context', desc: 'User profile, thread state, prior turns' },
  { id: 'safety_input', label: 'Input Safety / PII Scrubber', desc: 'Redact sensitive fields before routing' },
  { id: 'supervisor', label: 'Supervisor Agent / Intent Router', desc: 'Classify intent and pick specialist' },
  {
    id: 'specialized',
    label: 'Specialized Agent',
    desc: 'RAG · Books · Projects · Link',
  },
  { id: 'safety_output', label: 'Safety & Guardrail Layer', desc: 'Policy check before delivery' },
  { id: 'response', label: 'User Response', desc: 'Final reply with links' },
] as const;

export type RoutingStageId = (typeof ROUTING_STAGES)[number]['id'];

export function getRoutingStageStatus(
  stageId: RoutingStageId,
  flowStep: FlowStep
): 'waiting' | 'active' | 'done' {
  if (flowStep === 'idle') return 'waiting';
  if (flowStep === 'complete') return 'done';

  const order: RoutingStageId[] = [
    'chat',
    'identity',
    'safety_input',
    'supervisor',
    'specialized',
    'safety_output',
    'response',
  ];
  const stageIdx = order.indexOf(stageId);

  const stepToStage: Partial<Record<FlowStep, RoutingStageId>> = {
    ingesting: 'chat',
    classifying: 'identity',
    routing: 'safety_input',
    delegating: 'supervisor',
    retrieving: 'specialized',
    synthesizing: 'safety_output',
    delivering: 'response',
  };

  const activeStage = stepToStage[flowStep] ?? 'chat';
  const activeIdx = order.indexOf(activeStage);

  if (stageIdx < activeIdx) return 'done';
  if (stageIdx === activeIdx) return 'active';
  return 'waiting';
}

export type FlowTraceContext = {
  query?: string;
  route?: RouteResult;
  fallback?: boolean;
  ctaCount?: number;
  hubMode?: boolean;
};

export type FlowTraceEntry = {
  layer: string;
  action: string;
  detail: string;
};

export function buildTechnicalFlowEvent(
  step: FlowStep,
  ctx: FlowTraceContext = {}
): FlowTraceEntry {
  const q = ctx.query?.trim() ?? '';
  const tokenEstimate = Math.max(1, Math.ceil(q.length / 4));
  const route = ctx.route;

  switch (step) {
    case 'ingesting':
      return {
        layer: 'Chat Experience',
        action: 'chat.message_received',
        detail: `Inbound message accepted · ${q.length} chars · ~${tokenEstimate} tokens`,
      };
    case 'classifying':
      return {
        layer: 'Identity',
        action: 'session.context_bind',
        detail: 'Identity + session context attached · thread history and profile slots loaded',
      };
    case 'routing':
      if (ctx.fallback) {
        return {
          layer: 'Input Safety',
          action: 'pii.scrub_pass',
          detail: 'PII scrub complete · no specialist route — escalating to fallback handler',
        };
      }
      return {
        layer: 'Input Safety',
        action: 'pii.scrub_pass',
        detail: 'PII scrubber redacted sensitive fields · payload cleared for supervisor routing',
      };
    case 'delegating':
      if (ctx.fallback) {
        return {
          layer: 'Supervisor',
          action: 'supervisor.route_miss',
          detail: 'Intent router found no confident specialist match',
        };
      }
      if (route) {
        return {
          layer: 'Supervisor',
          action: 'supervisor.route_hit',
          detail: `${PARENT_AGENTS[route.parent].name} selected · confidence ${route.confidence}% · [${route.matchedTerms.slice(0, 4).join(', ')}]`,
        };
      }
      return {
        layer: 'Supervisor',
        action: 'supervisor.intent_route',
        detail: 'Supervisor scoring RAG · Books · Projects · Link agent namespaces',
      };
    case 'retrieving':
      return {
        layer: 'Specialized Agent',
        action: 'specialist.retrieve',
        detail: route
          ? `${PARENT_AGENTS[route.parent].name} → \`${route.subAgentName}\` · sitemap / catalog slice loaded`
          : 'Specialist retrieval pending',
      };
    case 'synthesizing':
      if (ctx.fallback) {
        return {
          layer: 'Guardrails',
          action: 'guardrail.fallback_compose',
          detail: 'Safety layer composing guided recovery with suggestion chips',
        };
      }
      return {
        layer: 'Guardrails',
        action: ctx.hubMode ? 'guardrail.hub_compose' : 'guardrail.subagent_compose',
        detail: ctx.hubMode
          ? 'Policy check passed · hub template with multi-option CTAs'
          : `Policy check passed · ${ctx.ctaCount ?? 0} outbound link(s) validated`,
      };
    case 'delivering':
      if (ctx.fallback) {
        return {
          layer: 'User Response',
          action: 'response.fallback_emit',
          detail: 'Fallback reply delivered to chat experience layer',
        };
      }
      return {
        layer: 'User Response',
        action: 'response.emit',
        detail: `Final user response delivered · ${ctx.ctaCount ?? 0} CTA(s) · flow complete`,
      };
    case 'complete':
      return {
        layer: 'Observability',
        action: 'trace.complete',
        detail: 'End-to-end agentic trace closed · state reset to idle',
      };
    default:
      return {
        layer: 'System',
        action: 'orchestrator.idle',
        detail: 'Agentic layer standing by',
      };
  }
}

export const FLOW_STEP_MESSAGES: Record<Exclude<FlowStep, 'idle' | 'complete'>, string> = {
  ingesting: 'Chat experience layer',
  classifying: 'Binding identity + session',
  routing: 'Scrubbing PII & validating input',
  delegating: 'Supervisor routing intent',
  retrieving: 'Specialized agent retrieval',
  synthesizing: 'Safety & guardrail check',
  delivering: 'Delivering user response',
};

export const FLOW_DELAYS: Record<Exclude<FlowStep, 'idle' | 'complete'>, number> = {
  ingesting: 360,
  classifying: 520,
  routing: 480,
  delegating: 420,
  retrieving: 880,
  synthesizing: 620,
  delivering: 300,
};

export const SUGGESTIONS = [
  'Who is Dr. SK?',
  'What services does SK Creation offer?',
  'Where are the AI resources?',
  'Where is wellness education?',
  'Which live projects are on this site?',
];

export const FALLBACK_REPLY =
  "I’m focused on Dr. SK Creation’s website knowledge. For general questions, please use the chatbot assistant on this page.";

export const WELCOME_MESSAGE =
  'Welcome! Ask about this website — Dr. SK, services, resources, wellness education, books, or live projects.';

export const SUB_AGENT_ICONS: Partial<Record<SubAgentId, LucideIcon>> = {
  career: Briefcase,
  realestate: Home,
  aviana: ToyBrick,
  medium: Newspaper,
  sitemap_about: UserCircle,
  sitemap_kb: Database,
  resources_hub: Database,
  services_hub: Layers,
  wellness_books: HeartHandshake,
  portfolio: UserCircle,
  education_exp: UserCircle,
  onecrm: Link2,
};
