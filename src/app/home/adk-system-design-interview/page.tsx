import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function HomeAdkSystemDesignInterviewRedirect() {
  redirect(RESOURCE_HREFS.adkInterview);
}
