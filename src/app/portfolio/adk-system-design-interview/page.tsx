import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function PortfolioAdkSystemDesignInterviewRedirect() {
  redirect(RESOURCE_HREFS.adkInterview);
}
