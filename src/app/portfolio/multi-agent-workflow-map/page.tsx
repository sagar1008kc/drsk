import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function PortfolioMultiAgentWorkflowMapRedirect() {
  redirect(RESOURCE_HREFS.workflowMap);
}
