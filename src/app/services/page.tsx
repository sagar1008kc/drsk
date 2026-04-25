import type { Metadata } from 'next';
import Services from '@/component/Services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore Dr. SK services in AI solutions, software projects, and practical digital transformation support.',
};

export default function ServicesPage() {
  return <Services />;
}
