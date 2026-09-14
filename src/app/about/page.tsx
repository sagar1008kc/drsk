import type { Metadata } from 'next';
import AboutOrganizationContent from '@/component/about/AboutOrganizationContent';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/about',
  title: 'About SK Creation',
  description:
    'SK Creation is a mission-driven AI and digital innovation organization focused on building practical technology, sharing useful knowledge, and helping people navigate an increasingly AI-powered world.',
});

export default function AboutPage() {
  return <AboutOrganizationContent />;
}
