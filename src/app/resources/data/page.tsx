import type { Metadata } from 'next';
import AgenticDataResourceContent from '@/component/resources/AgenticDataResourceContent';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/resources/data',
  title: 'Agentic Data Layer',
  description:
    'Enterprise deep dive into the agentic data layer — how data becomes the environment autonomous agents operate in.',
});

export default function AgenticDataResourcePage() {
  return <AgenticDataResourceContent />;
}
