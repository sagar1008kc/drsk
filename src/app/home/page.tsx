import HashScrollOnLoad from '@/component/home/HashScrollOnLoad';
import HomeMissionHero from '@/component/home/HomeMissionHero';
import HomeNarrativeSections, {
  HomePillarsSection,
} from '@/component/home/HomeNarrativeSections';
import HomeCollaborationsSection from '@/component/home/HomeCollaborationsSection';
import HomeContactSection from '@/component/home/HomeContactSection';
import { AgenticWorkflowSystemDesign } from '@/component/home/AgenticWorkflowSystemDesign';
import { homeBg } from '@/component/home/styles';
import { createPageMetadata } from '@/lib/site-url';

export const metadata = createPageMetadata({
  path: '/home',
  title: 'Practical AI, Knowledge & Human Impact',
  description:
    'SK Creation is an AI and digital innovation organization focused on building practical technology, sharing accessible knowledge, and supporting responsible human growth in the AI era.',
});

export default function HomePage() {
  return (
    <main className={`min-h-screen ${homeBg}`}>
      <HashScrollOnLoad />
      <HomeMissionHero />
      <HomePillarsSection />
      <AgenticWorkflowSystemDesign />
      <HomeNarrativeSections />
      <HomeCollaborationsSection />
      <HomeContactSection />
    </main>
  );
}
