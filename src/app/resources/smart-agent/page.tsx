import type { Metadata } from 'next';
import SmartAgentExperience from '@/component/portfolio/SmartAgentExperience';
import { RESOURCE_HREFS } from '@/lib/resources';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: RESOURCE_HREFS.smartAgent,
  title: 'Enterprise AI Agents',
  description:
    'Live Smart Agent demo plus enterprise AI agent architecture — design layers, reasoning loop, use cases, and production best practices.',
  openGraphTitle: 'Enterprise AI Agents | Dr. SK',
});

export default function SmartAgentRoute() {
  return <SmartAgentExperience />;
}
