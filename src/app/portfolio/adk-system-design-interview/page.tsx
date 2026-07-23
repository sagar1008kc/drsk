import type { Metadata } from 'next';
import AdkSystemDesignInterview from '@/component/portfolio/AdkSystemDesignInterview';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/adk-system-design-interview',
  title: 'Google ADK Agent System Design Interview',
  description:
    'Interview-ready Google ADK / GCP agent system design mock — playbook, HealthNet HIPAA scenario, regulated finance 120k DAU scenario, and edge-case answers.',
  openGraphTitle: 'Google ADK Agent System Design Interview | Dr. SK',
});

export default function AdkSystemDesignInterviewPage() {
  return <AdkSystemDesignInterview />;
}
