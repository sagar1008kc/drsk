import type { Metadata } from 'next';
import WellnessEducationContent from '@/component/resources/WellnessEducationContent';
import { WELLNESS_EDUCATION_HREF } from '@/lib/mental-health-resources';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: WELLNESS_EDUCATION_HREF,
  title: 'Wellness Education Resources',
  description:
    'Wellness Education hub from SK Creation — a clear path through overthinking guides, wellness books, and MHFA-informed awareness sessions. Education only, not therapy.',
  ogImage: '/stop_overthinking.png',
});

export default function WellnessEducationPage() {
  return <WellnessEducationContent />;
}
