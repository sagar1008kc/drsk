import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function HomeAgenticOperationsRedirect() {
  redirect(RESOURCE_HREFS.operations);
}
