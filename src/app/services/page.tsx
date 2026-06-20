import type { Metadata } from 'next';
import Services from '@/component/Services';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/services',
  title: 'Services | SK Creation',
  description:
    'Explore SK Creation services for practical AI integration, career strategy, digital solutions, book publishing support, and wellness education.',
});

export default function ServicesPage() {
  return <Services />;
}
