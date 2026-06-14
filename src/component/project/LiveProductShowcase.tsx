import { FEATURED_PROJECTS } from '@/lib/projects';
import LiveProjectsGrid from '@/component/shared/LiveProjectsGrid';

export default function LiveProductShowcase() {
  return <LiveProjectsGrid projects={FEATURED_PROJECTS} variant="light" />;
}
