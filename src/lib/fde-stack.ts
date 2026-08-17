export type FdeStackId = 'azure' | 'gcp' | 'xai' | 'oss';

export type FdeStackCategory = {
  id: FdeStackId;
  label: string;
  eyebrow: string;
  summary: string;
  items: string[];
};

export const FDE_EXPERIENCE = {
  years: '7+',
  label: 'Software Engineering & Agentic AI',
} as const;

export const FDE_CORE_STACK = [
  'Python',
  'FastAPI',
  'React',
  'TypeScript',
  'Next.js',
] as const;

export const FDE_MODELS = ['Claude', 'Gemini', 'GPT', 'Grok'] as const;

export const FDE_STACK_CATEGORIES: FdeStackCategory[] = [
  {
    id: 'azure',
    label: 'Azure',
    eyebrow: 'Enterprise cloud',
    summary:
      'Ship governed agents on Microsoft cloud — retrieval, identity, containers, and ops.',
    items: [
      'Azure OpenAI',
      'Azure AI Foundry',
      'Azure AI Search',
      'Container Apps',
      'AKS',
      'Functions',
      'Cosmos DB',
      'Key Vault',
      'Entra ID',
      'Azure DevOps',
      'Monitor / App Insights',
    ],
  },
  {
    id: 'gcp',
    label: 'GCP',
    eyebrow: 'Vertex & ADK',
    summary:
      'Vertex-native agents and RAG for regulated workloads — search, Cloud Run, and controls.',
    items: [
      'Vertex AI',
      'Google ADK',
      'Cloud Run',
      'Vertex AI Search',
      'Vector Search',
      'Model Armor',
      'Document AI',
      'BigQuery',
      'Cloud Trace',
      'IAM / VPC-SC',
    ],
  },
  {
    id: 'xai',
    label: 'Grok · xAI',
    eyebrow: 'Frontier delivery',
    summary:
      'xAI platform for tool-using agents, fast product loops, and field demos.',
    items: [
      'Grok API',
      'xAI platform',
      'Function calling',
      'Streaming chat',
      'Tool use',
      'Realtime reasoning',
    ],
  },
  {
    id: 'oss',
    label: 'Open source',
    eyebrow: 'Portable runtime',
    summary:
      'Vendor-neutral agent stacks so delivery is not locked to one cloud or model provider.',
    items: [
      'LangGraph',
      'LangChain',
      'MCP',
      'Postgres',
      'Redis',
      'Docker',
      'Kubernetes',
      'Streamlit',
    ],
  },
];

export const FDE_STACK_LABEL: Record<FdeStackId, string> = {
  azure: 'Azure',
  gcp: 'GCP',
  xai: 'xAI',
  oss: 'Open source',
};
