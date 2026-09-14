import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function HomeAgenticAiSystemDesignRedirect() {
  redirect(RESOURCE_HREFS.systemDesign);
}
