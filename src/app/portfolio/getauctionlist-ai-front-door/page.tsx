import { redirect } from 'next/navigation';
import { RESOURCE_HREFS } from '@/lib/resources';

export default function PortfolioGetAuctionListAiFrontDoorRedirect() {
  redirect(RESOURCE_HREFS.frontDoor);
}
