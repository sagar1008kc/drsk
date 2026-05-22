import type { Metadata } from 'next';
import ProjectsPageContent from '@/component/project/ProjectsPageContent';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Live AI products and digital platforms — Pilot My Career, Get Auction List, Avianaa, and more by Dr. SK / SK Creation.',
};

export default function ProjectPage() {
  return <ProjectsPageContent />;
}
