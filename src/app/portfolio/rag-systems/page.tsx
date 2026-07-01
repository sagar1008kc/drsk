import type { Metadata } from 'next';
import EnterpriseRagPipelinePage from '@/component/portfolio/EnterpriseRagPipelinePage';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/rag-systems',
  title: 'RAG & Retrieval Systems',
  description:
    'Interactive enterprise RAG pipeline — hybrid retrieval, permission filtering, reranking, grounding validation, and production query simulation.',
  openGraphTitle: 'RAG & Retrieval Systems | Dr. SK',
});

export default function RagSystemsRoute() {
  return <EnterpriseRagPipelinePage />;
}
