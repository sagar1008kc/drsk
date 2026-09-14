import type { Metadata } from 'next';
import ResourcesPageContent from '@/component/resources/ResourcesPageContent';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/resources',
  title: 'Resources | SK Creation',
  description:
    'Practical AI engineering resources from SK Creation — agentic systems, RAG, LLM applications, production architecture, and books.',
});

export default function ResourcesPage() {
  return <ResourcesPageContent />;
}
