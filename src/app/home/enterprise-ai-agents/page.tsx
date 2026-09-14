import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function HomeEnterpriseAiAgentsRedirect() {
  redirect(RESOURCE_HREFS.smartAgent);
}
