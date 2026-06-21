import type { Metadata } from 'next';
import AiCommerceOrchestrationPage from '@/component/portfolio/AiCommerceOrchestrationPage';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/multi-agent-workflow-map',
  title: 'Multi-Agent Workflow Map',
  description:
    'Interactive multi-agent workflow map showing user intent, trust boundary, AI chat service, orchestration, payment, settlement, and observability layers.',
  openGraphTitle: 'Multi-Agent Workflow Map | Dr. SK',
});

export default function MultiAgentWorkflowMapRoute() {
  return <AiCommerceOrchestrationPage />;
}
