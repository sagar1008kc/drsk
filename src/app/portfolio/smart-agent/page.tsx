import type { Metadata } from 'next';
import SmartAgentExperience from '@/component/portfolio/SmartAgentExperience';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/smart-agent',
  title: 'Smart Agent Demo',
  description:
    'Interactive Smart Agent demo with terminal chat, agent identity generation, and workflow bounty concept generation.',
  openGraphTitle: 'Smart Agent Demo | Dr. SK',
});

export default function SmartAgentRoute() {
  return <SmartAgentExperience />;
}
