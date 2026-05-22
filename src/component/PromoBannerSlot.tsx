'use client';

import { usePathname } from 'next/navigation';
import SitePromoBanner from '@/component/SitePromoBanner';

const PROMO_PATHS = ['/services', '/project'];

export default function PromoBannerSlot() {
  const pathname = usePathname();
  const show = PROMO_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!show) return null;

  return <SitePromoBanner />;
}
