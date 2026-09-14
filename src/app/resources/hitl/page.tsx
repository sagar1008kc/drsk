import type { Metadata } from 'next';
import HitlResourceContent from '@/component/resources/HitlResourceContent';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/resources/hitl',
  title: 'HITL Knowledge Base',
  description:
    'Human-in-the-loop patterns for secure, aligned AI — action approval, risk boundaries, and production control.',
});

export default function HitlResourcePage() {
  return <HitlResourceContent />;
}
