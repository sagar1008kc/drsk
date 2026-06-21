import type { Metadata } from 'next';
import AiCommerceOrchestrationPage from '@/component/portfolio/AiCommerceOrchestrationPage';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/multi-agent-workflow-map',
  title: 'AI Commerce Orchestration Blueprint',
  description:
    'Interactive architecture blueprint for an AI commerce orchestration flow from user intent through agentic workflow, payment, settlement, and observability.',
  openGraphTitle: 'AI Commerce Orchestration Blueprint | Dr. SK',
});

export default function AiCommerceOrchestrationRoute() {
  return <AiCommerceOrchestrationPage />;
}
