import type { Metadata } from 'next';
import Services from '@/component/Services';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/services',
  title: 'Services',
  description:
    'Explore Dr. SK services in AI solutions, software projects, and practical digital transformation support.',
});

export default function ServicesPage() {
  return <Services />;
}
