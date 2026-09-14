import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function HomeEnterpriseLlmGuideRedirect() {
  redirect(RESOURCE_HREFS.llmGuide);
}
