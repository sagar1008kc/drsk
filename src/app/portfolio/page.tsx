import type { Metadata } from 'next';
import AboutPageContent from '@/component/about/AboutPageContent';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Professional portfolio of Dr. SK: links, experience, education, and certifications.',
};

export default function PortfolioPage() {
  return <AboutPageContent />;
}
