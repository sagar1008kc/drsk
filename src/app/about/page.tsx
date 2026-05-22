import type { Metadata } from 'next';
import AboutPageContent from '@/component/about/AboutPageContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Professional background of Dr. SK: links, experience, education, and certifications.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
