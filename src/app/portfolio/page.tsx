import type { Metadata } from 'next';
import AboutPageContent from '@/component/about/AboutPageContent';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio',
  title: 'Portfolio',
  description:
    'Professional portfolio of Dr. SK: links, experience, education, and certifications.',
});

export default function PortfolioPage() {
  return <AboutPageContent />;
}
