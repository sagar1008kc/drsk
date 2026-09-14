import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function HomeAiCommerceOrchestrationRedirect() {
  redirect(RESOURCE_HREFS.workflowMap);
}
