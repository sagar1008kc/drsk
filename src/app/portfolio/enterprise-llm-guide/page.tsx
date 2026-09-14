import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function PortfolioEnterpriseLlmGuideRedirect() {
  redirect(RESOURCE_HREFS.llmGuide);
}
