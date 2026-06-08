import {
  BookOpen,
  Briefcase,
  Home,
  Layers,
  Newspaper,
  ToyBrick,
  UserCircle,
  type LucideIcon,
} from 'lucide-react';

export type ParentAgentId = 'projects' | 'about' | 'publications';

export type SubAgentId =
  | 'projects_hub'
  | 'career'
  | 'realestate'
  | 'aviana'
  | 'portfolio'
  | 'profile'
  | 'pub_catalog'
  | 'wellness_books'
  | 'ai_books'
  | 'medium';

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
  projectsHub: '/project',
  portfolio: '/portfolio',
  books: '/books',
  medium: 'https://medium.com/@drskauthor',
  linkedin: 'https://www.linkedin.com/in/drskofficial',
  wellnessAmazon: 'https://www.amazon.com/author/drsk1',
  aiAmazon: 'https://www.amazon.com/author/sagar2025',
  pilotmycareer: 'https://www.pilotmycareer.com/',
  getauctionlist: 'https://getauctionlist.com/',
  avianaa: 'https://www.avianaa.com/',
} as const;

export const PARENT_AGENTS: Record<ParentAgentId, ParentAgentDef> = {
  projects: {
    id: 'projects',
    name: 'Project Agent',
    shortName: 'Projects',
    icon: Layers,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-500/15',
    borderColor: 'border-cyan-500/40',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.25)]',
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
      'house',
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
  about: {
    id: 'about',
    name: 'About Dr. SK',
    shortName: 'About',
    icon: UserCircle,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500/15',
    borderColor: 'border-indigo-500/40',
    glow: 'shadow-[0_0_20px_rgba(99,102,241,0.25)]',
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
    ],
    hubResponse:
      'Happy to help you learn about Dr. SK. He’s an AI forward deployed engineer, author, and MHFA-certified mental health advocate. The portfolio page has his background, experience, and links.',
    hubCtas: [{ text: 'Open portfolio', url: LINKS.portfolio }],
    subAgents: [
      {
        id: 'portfolio',
        name: 'Portfolio',
        keywords: ['portfolio', 'experience', 'education', 'certification', 'work', 'resume', 'cv', 'background'],
        response:
          'The portfolio page covers Dr. SK’s experience, education, certifications, live projects, and official links — a good place to start.',
        ctas: [{ text: 'View portfolio', url: LINKS.portfolio }],
      },
      {
        id: 'profile',
        name: 'Quick intro',
        keywords: ['who is', 'tell me about', 'sagar khatri', 'story', 'bio', 'what does'],
        response:
          'Dr. SK is an AI forward deployed engineer who builds practical AI systems in production. He’s also a published author and MHFA-certified mental health advocate. For the full picture, visit the portfolio.',
        ctas: [
          { text: 'View portfolio', url: LINKS.portfolio },
          { text: 'LinkedIn', url: LINKS.linkedin },
        ],
      },
    ],
  },
  publications: {
    id: 'publications',
    name: 'Publications',
    shortName: 'Publications',
    icon: BookOpen,
    color: 'text-rose-600',
    bgColor: 'bg-rose-500/15',
    borderColor: 'border-rose-500/40',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.22)]',
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
      'mental',
      'mindfulness',
      'anxiety',
      'burnout',
      'ai book',
      'tech book',
      'software',
      'cybersecurity',
      'author page',
    ],
    hubResponse:
      'Dr. SK writes in two book tracks — Emotional Wellness and AI & Career — plus articles on Medium. What are you in the mood for?',
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
          'mindfulness',
          'anxiety',
          'burnout',
          'overload',
          'mhfa',
          'happier',
          'emotional',
        ],
        response:
          'For stress, emotional balance, and mental wellness, Dr. SK’s Emotional Wellness books are on Amazon. You can also browse the book catalog here.',
        ctas: [
          { text: 'Wellness books on Amazon', url: LINKS.wellnessAmazon },
          { text: 'Book catalog', url: LINKS.books },
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
          'For AI, software engineering, and tech career topics, the AI & Career book series is on Amazon under Sagar Khatri’s author page.',
        ctas: [
          { text: 'AI books on Amazon', url: LINKS.aiAmazon },
          { text: 'Book catalog', url: LINKS.books },
        ],
      },
      {
        id: 'medium',
        name: 'Medium articles',
        keywords: ['medium', 'article', 'articles', 'essay', 'writing', 'post', 'blog', 'read online', 'drsk article'],
        response:
          'Dr. SK publishes articles on Medium — AI, emotional balance, and practical ideas for everyday life.',
        ctas: [{ text: 'Read on Medium', url: LINKS.medium }],
      },
      {
        id: 'pub_catalog',
        name: 'Book catalog',
        keywords: ['catalog', 'all book', 'author page', 'published work'],
        response:
          'Pick a reading path: Emotional Wellness books, AI & Career books, or articles on Medium.',
        ctas: [
          { text: 'Wellness books', url: LINKS.wellnessAmazon },
          { text: 'AI & tech books', url: LINKS.aiAmazon },
          { text: 'Medium articles', url: LINKS.medium },
        ],
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

function scoreKeywords(text: string, keywords: string[]): string[] {
  const lower = text.toLowerCase();
  return keywords.filter((k) => lower.includes(k));
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
    if (parent.id === 'about') return parent.subAgents.find((s) => s.id === 'profile')!;
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
      parent: PARENT_AGENTS.publications,
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
  return { parent: scores[0].agent, matched: scores[0].matched };
}

export function resolveAgent(text: string): RouteResult | null {
  const hit = resolveParent(text);
  if (!hit) return null;

  const sub = resolveSubAgent(hit.parent, text);
  const subMatched = scoreKeywords(text, sub.keywords);
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
    (route.subAgent === 'projects_hub' || route.subAgent === 'pub_catalog' || route.subAgent === 'profile');

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
  { id: 'orchestrator', label: 'Orchestrator', desc: 'Reads your message' },
  { id: 'route', label: 'Route', desc: 'Decides the best agent' },
  { id: 'main', label: 'Main agent', desc: 'Projects · About · Publications' },
  { id: 'sub', label: 'Sub-agent', desc: 'Narrows to a specific topic' },
  { id: 'response', label: 'Response', desc: 'Reply with links' },
] as const;

export type RoutingStageId = (typeof ROUTING_STAGES)[number]['id'];

export function getRoutingStageStatus(
  stageId: RoutingStageId,
  flowStep: FlowStep
): 'waiting' | 'active' | 'done' {
  if (flowStep === 'idle') return 'waiting';
  if (flowStep === 'complete') return 'done';

  const order: RoutingStageId[] = ['orchestrator', 'route', 'main', 'sub', 'response'];
  const stageIdx = order.indexOf(stageId);

  const stepToStage: Partial<Record<FlowStep, RoutingStageId>> = {
    ingesting: 'orchestrator',
    classifying: 'orchestrator',
    routing: 'route',
    delegating: 'main',
    retrieving: 'sub',
    synthesizing: 'response',
    delivering: 'response',
  };

  const activeStage = stepToStage[flowStep] ?? 'orchestrator';
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
        layer: 'Ingestion',
        action: 'user_query.received',
        detail: `Inbound payload accepted · ${q.length} chars · ~${tokenEstimate} tokens normalized`,
      };
    case 'classifying':
      return {
        layer: 'Intent',
        action: 'intent.classify',
        detail: 'Keyword scoring + slot extraction across Projects, About, Publications namespaces',
      };
    case 'routing':
      if (ctx.fallback) {
        return {
          layer: 'Router',
          action: 'orchestrator.route_miss',
          detail: 'No parent agent exceeded match threshold — escalation to fallback handler',
        };
      }
      if (route) {
        return {
          layer: 'Router',
          action: 'orchestrator.route_hit',
          detail: `Parent agent \`${route.parent}\` selected · confidence ${route.confidence}% · terms [${route.matchedTerms.slice(0, 4).join(', ')}]`,
        };
      }
      return {
        layer: 'Router',
        action: 'orchestrator.route',
        detail: 'Evaluating parent-agent keyword graph for highest-scoring match',
      };
    case 'delegating':
      return {
        layer: 'Orchestration',
        action: 'main_agent.delegate',
        detail: route
          ? `State handoff → ${PARENT_AGENTS[route.parent].name} · session context bound`
          : 'Awaiting parent-agent assignment from router',
      };
    case 'retrieving':
      return {
        layer: 'Retrieval',
        action: 'subagent.resolve',
        detail: route
          ? `Sub-agent \`${route.subAgent}\` (${route.subAgentName}) resolved · knowledge slice loaded`
          : 'Sub-agent resolution pending',
      };
    case 'synthesizing':
      if (ctx.fallback) {
        return {
          layer: 'Generation',
          action: 'response.fallback_compose',
          detail: 'Low-confidence route — synthesizing guided recovery with suggestion chips',
        };
      }
      return {
        layer: 'Generation',
        action: ctx.hubMode ? 'response.hub_compose' : 'response.subagent_compose',
        detail: ctx.hubMode
          ? 'Hub template emitted — multi-option CTAs for human-in-the-loop selection'
          : `Sub-agent template rendered · ${ctx.ctaCount ?? 0} outbound link(s) attached`,
      };
    case 'delivering':
      if (ctx.fallback) {
        return {
          layer: 'Delivery',
          action: 'response.fallback_emit',
          detail: 'Fallback reply pushed to client stream · suggestion triggers armed',
        };
      }
      return {
        layer: 'Delivery',
        action: 'response.emit',
        detail: `Final payload delivered · ${ctx.ctaCount ?? 0} CTA endpoint(s) · orchestration cycle complete`,
      };
    case 'complete':
      return {
        layer: 'Observability',
        action: 'trace.complete',
        detail: 'End-to-end orchestration trace closed · state reset to idle',
      };
    default:
      return {
        layer: 'System',
        action: 'orchestrator.idle',
        detail: 'Orchestration layer standing by',
      };
  }
}

export const FLOW_STEP_MESSAGES: Record<Exclude<FlowStep, 'idle' | 'complete'>, string> = {
  ingesting: 'Reading your message',
  classifying: 'Understanding what you need',
  routing: 'Choosing the right agent',
  delegating: 'Connecting to main agent',
  retrieving: 'Picking a sub-topic',
  synthesizing: 'Preparing your answer',
  delivering: 'Sending reply with links',
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
  'Which live project should I explore?',
  'Who is Dr. SK?',
  'Books for stress and balance',
  'Articles on Medium',
];

export const FALLBACK_REPLY =
  "I'm not sure which area fits best. Try asking about live projects, Dr. SK's portfolio, books, or Medium articles.";

export const WELCOME_MESSAGE =
  'Hi — I can help you find the right place on this site. Ask about live projects, Dr. SK’s portfolio, books, or Medium articles.';

export const SUB_AGENT_ICONS: Partial<Record<SubAgentId, LucideIcon>> = {
  career: Briefcase,
  realestate: Home,
  aviana: ToyBrick,
  medium: Newspaper,
};
