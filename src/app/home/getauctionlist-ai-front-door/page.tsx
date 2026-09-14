import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function HomeGetAuctionListAiFrontDoorRedirect() {
  redirect(RESOURCE_HREFS.frontDoor);
}
