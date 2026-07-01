import type { Metadata } from 'next';
import AiCommerceOrchestrationPage from '@/component/portfolio/AiCommerceOrchestrationPage';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/multi-agent-workflow-map',
  title: 'Multi-Agent AI Platform',
  description:
    'Enterprise multi-agent AI platform with LangChain and LangGraph — specialized agents, tool integration, RAG, workflow state, HITL, and an interactive 7-layer visual workflow demo.',
  openGraphTitle: 'Multi-Agent AI Platform | Dr. SK',
});

export default function AiCommerceOrchestrationRoute() {
  return <AiCommerceOrchestrationPage />;
}
