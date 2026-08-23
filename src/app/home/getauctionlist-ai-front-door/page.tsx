import type { Metadata } from 'next';
import AiFrontDoorPage from '@/component/portfolio/AiFrontDoorPage';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/home/getauctionlist-ai-front-door',
  title: 'AI Front Door — Get Auction List',
  description:
    'Enterprise architecture for getauctionlist.com AI Front Door: Next.js BFF, LangGraph control plane, hybrid policy RAG, auction SQL, and allowlisted county tools.',
  openGraphTitle: 'AI Front Door · Get Auction List | Dr. SK',
});

export default function GetAuctionListAiFrontDoorRoute() {
  return <AiFrontDoorPage />;
}
