import type { Metadata } from 'next';
import ResourcesPageContent from '@/component/resources/ResourcesPageContent';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/resources',
  title: 'Resources | SK Creation',
  description:
    'SK Creation resources in three paths: AI engineering, books, and mental health awareness — including agentic systems, RAG, architecture, and practical wellness guides.',
});

export default function ResourcesPage() {
  return <ResourcesPageContent />;
}
