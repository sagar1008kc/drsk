import type { Metadata } from 'next';
import EnterpriseLlmGuide from '@/component/portfolio/EnterpriseLlmGuide';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/enterprise-llm-guide',
  title: 'Enterprise LLM Guide',
  description:
    'Enterprise guide to LLM architecture, agentic patterns, RAG, fine-tuning, governance, security, and LLM-powered applications with structured outputs, tool calling, streaming, and HITL.',
  openGraphTitle: 'Enterprise LLM Guide | Dr. SK',
});

export default function EnterpriseLlmGuideRoute() {
  return <EnterpriseLlmGuide />;
}
