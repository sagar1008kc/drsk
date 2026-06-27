import type { Metadata } from 'next';
import AgenticToolsHub from '@/component/portfolio/AgenticToolsHub';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/agentic-tools-hub',
  title: 'Agentic Tools Hub',
  description:
    'Interactive educational hub explaining tools in agentic AI workflows, tool execution loops, and sandboxed tool-call simulation.',
  openGraphTitle: 'Agentic Tools Hub | Dr. SK',
});

export default function AgenticToolsHubRoute() {
  return <AgenticToolsHub />;
}
