import type { Metadata } from 'next';
import ProjectsPageContent from '@/component/project/ProjectsPageContent';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/project',
  title: 'Projects',
  description:
    'Live AI products and digital platforms — Pilot My Career, Get Auction List, Avianaa, and more by Dr. SK / SK Creation.',
});

export default function ProjectPage() {
  return <ProjectsPageContent />;
}
