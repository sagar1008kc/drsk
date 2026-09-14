import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function PortfolioRagSystemsRedirect() {
  redirect(RESOURCE_HREFS.rag);
}
