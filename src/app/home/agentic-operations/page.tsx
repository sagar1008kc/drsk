import type { Metadata } from 'next';
import AgenticOperationsPage from '@/component/home/AgenticOperationsPage';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/home/agentic-operations',
  title: 'Agentic Operations',
  description:
    'Production control plane for agentic workflows — observability, tracing, evaluation, monitoring, alerts, and cost management.',
  openGraphTitle: 'Agentic Operations | Dr. SK',
});

export default function AgenticOperationsRoute() {
  return <AgenticOperationsPage />;
}
