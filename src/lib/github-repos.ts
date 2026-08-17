import type { FdeStackId } from '@/lib/fde-stack';

export type GitHubRepoLink = {
  label: string;
  href: string;
  note: string;
  stacks: FdeStackId[];
};

export const GITHUB_REPO_LINKS: GitHubRepoLink[] = [
  {
    label: 'sagar1008kc',
    href: 'https://github.com/sagar1008kc',
    note: 'GitHub profile — AI agent, RAG, MCP, multi-agent workflows & fullstack projects',
    stacks: ['azure', 'gcp', 'xai', 'oss'],
  },
  {
    label: 'sk-beta2.0',
    href: 'https://github.com/sagar1008kc/sk-beta2.0',
    note: 'Secure enterprise hybrid RAG on GCP — DLP, Model Armor, adaptive routing, RRF',
    stacks: ['gcp', 'oss'],
  },
  {
    label: 'pilotmycareer-ai-backend',
    href: 'https://github.com/sagar1008kc/pilotmycareer-ai-backend',
    note: 'FastAPI + LangGraph multi-agent runtime for Pilot My Career',
    stacks: ['oss', 'xai'],
  },
  {
    label: 'get-auction-list-api',
    href: 'https://github.com/sagar1008kc/get-auction-list-api',
    note: 'GetAuctionList AI front door — LangGraph chat, RAG, MCP tools',
    stacks: ['oss', 'azure'],
  },
  {
    label: 'tech-ocean',
    href: 'https://github.com/sagar1008kc/tech-ocean',
    note: 'Streamlit AI learning studio with RAG-lite tutoring and progress tracking',
    stacks: ['oss'],
  },
];
