import { FEATURED_PROJECTS, MORE_PROJECTS } from '@/lib/projects';
import { RESOURCE_HREFS } from '@/lib/resource-hrefs';

export { RESOURCE_HREFS } from '@/lib/resource-hrefs';

export type ResourceItem = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

export type ResourceGroup = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: ResourceItem[];
};

export const HOME_RESOURCE_TOPICS = [
  { title: 'Agentic system design', href: RESOURCE_HREFS.systemDesign },
  { title: 'RAG & retrieval', href: RESOURCE_HREFS.rag },
  { title: 'Multi-agent workflows', href: RESOURCE_HREFS.workflowMap },
  { title: 'Agent operations', href: RESOURCE_HREFS.operations },
  { title: 'Enterprise LLM patterns', href: RESOURCE_HREFS.llmGuide },
  { title: 'AI tools hub', href: RESOURCE_HREFS.toolsHub },
] as const;

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    id: 'agentic-systems',
    eyebrow: 'Build',
    title: 'Agentic systems',
    description:
      'Production multi-agent design, orchestration, tools, and operations for real-world AI workflows.',
    items: [
      {
        title: 'Enterprise Multi-Agent AI System Design',
        description:
          'A production-ready design for web and mobile AI assistants using multi-agent orchestration, RAG, MCP tool execution, guardrails, human approval, observability, and evaluation.',
        href: RESOURCE_HREFS.systemDesign,
      },
      {
        title: 'Multi-Agent AI Platform',
        description:
          'LangChain and LangGraph platform with specialized agents, tool integration, RAG, workflow state, HITL, and an interactive visual workflow demo.',
        href: RESOURCE_HREFS.workflowMap,
      },
      {
        title: 'Enterprise AI Agents',
        description:
          'Live Smart Agent demo plus enterprise AI agent architecture — design layers, reasoning loop, use cases, and production best practices.',
        href: RESOURCE_HREFS.smartAgent,
      },
      {
        title: 'Agentic Tools Hub',
        description:
          'Interactive hub explaining tools in agentic AI workflows, tool execution loops, and sandboxed tool-call simulation.',
        href: RESOURCE_HREFS.toolsHub,
      },
      {
        title: 'Agentic Data Layer',
        description:
          'Enterprise deep dive into how data becomes the environment autonomous agents operate in.',
        href: RESOURCE_HREFS.data,
      },
      {
        title: 'HITL Knowledge Base',
        description:
          'Human-in-the-loop patterns for secure, aligned AI — action approval, risk boundaries, and production control.',
        href: RESOURCE_HREFS.hitl,
      },
      {
        title: 'Agentic Operations',
        description:
          'Production control plane for agentic workflows — observability, tracing, evaluation, monitoring, alerts, and cost management.',
        href: RESOURCE_HREFS.operations,
      },
    ],
  },
  {
    id: 'rag-llm',
    eyebrow: 'Share',
    title: 'RAG & LLM applications',
    description:
      'Retrieval systems and enterprise LLM patterns for accurate, grounded, production-ready applications.',
    items: [
      {
        title: 'RAG & Retrieval Systems',
        description:
          'Interactive enterprise RAG pipeline — hybrid retrieval, permission filtering, reranking, grounding validation, and production query simulation.',
        href: RESOURCE_HREFS.rag,
      },
      {
        title: 'Enterprise LLM Guide',
        description:
          'LLM architecture, agentic patterns, RAG, fine-tuning, governance, security, structured outputs, tool calling, streaming, and HITL.',
        href: RESOURCE_HREFS.llmGuide,
      },
    ],
  },
  {
    id: 'architecture',
    eyebrow: 'Practice',
    title: 'Architecture & interviews',
    description:
      'Real production architectures and interview-ready system-design playbooks from shipped systems.',
    items: [
      {
        title: 'AI Front Door — Get Auction List',
        description:
          'Enterprise architecture for getauctionlist.com: Next.js BFF, LangGraph control plane, hybrid policy RAG, auction SQL, and allowlisted county tools.',
        href: RESOURCE_HREFS.frontDoor,
      },
      {
        title: 'Google ADK Agent System Design Interview',
        description:
          'Interview-ready Google ADK / GCP agent system design mock — playbook, HealthNet HIPAA scenario, regulated finance scenario, and edge-case answers.',
        href: RESOURCE_HREFS.adkInterview,
      },
    ],
  },
  {
    id: 'products',
    eyebrow: 'Work',
    title: 'Live products & builds',
    description:
      'Shipped products and practical blueprints — career technology, data platforms, family experiences, and AI integration concepts.',
    items: [...FEATURED_PROJECTS, ...MORE_PROJECTS].map((project) => ({
      title: project.title,
      description: project.description,
      href: project.href,
      external: project.external,
    })),
  },
];
