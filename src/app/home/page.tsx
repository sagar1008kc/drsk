import HashScrollOnLoad from '@/component/home/HashScrollOnLoad';
import HeroSection from '@/component/HeroSection';
import SpaceForGrowth from '@/component/about/SpaceForGrowth';
import HomeCollaborationsSection from '@/component/home/HomeCollaborationsSection';
import HomeContactSection from '@/component/home/HomeContactSection';
import { AgenticWorkflowSystemDesign } from '@/component/home/AgenticWorkflowSystemDesign';
import PortfolioAiCareerHubSection from '@/component/portfolio/PortfolioAiCareerHubSection';
import PortfolioFeaturedSystemDesignHero from '@/component/portfolio/PortfolioFeaturedSystemDesignHero';
import { homeBg } from '@/component/home/styles';
import { createPageMetadata } from '@/lib/site-url';

export const metadata = createPageMetadata({
  path: '/home',
  title: 'Dr. SK | AI Engineer',
  description:
    'Official website of Dr. SK (also known as Dr SK and Dr. SK Author) - author, AI engineer, and founder of SK Creation.',
});

export default function HomePage() {
  return (
    <main className={`min-h-screen ${homeBg}`}>
      <HashScrollOnLoad />
      <AgenticWorkflowSystemDesign />
      <PortfolioAiCareerHubSection />
      <HeroSection />
      <PortfolioFeaturedSystemDesignHero />
      <SpaceForGrowth />
      <HomeContactSection />
      <HomeCollaborationsSection />
    </main>
  );
}
