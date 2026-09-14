import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function PortfolioAgenticToolsHubRedirect() {
  redirect(RESOURCE_HREFS.toolsHub);
}
