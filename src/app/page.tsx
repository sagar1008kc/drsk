import HashScrollOnLoad from '@/component/home/HashScrollOnLoad';
import HeroSection from '@/component/HeroSection';
import SpaceForGrowth from '@/component/about/SpaceForGrowth';
import HomeCollaborationsSection from '@/component/home/HomeCollaborationsSection';
import HomeContactSection from '@/component/home/HomeContactSection';
import HomeExploreSection from '@/component/home/HomeExploreSection';
import PortfolioFeaturedSystemDesignHero from '@/component/portfolio/PortfolioFeaturedSystemDesignHero';
import MultiAgentChatbotSection from '@/component/home/MultiAgentChatbotSection';
import { homeBg } from '@/component/home/styles';
import { createPageMetadata } from '@/lib/site-url';

export const metadata = createPageMetadata({
  path: '/',
  title: 'Dr. SK | AI Engineer',
  description:
    'Official website of Dr. SK (also known as Dr SK and Dr. SK Author) - author, AI engineer, and founder of SK Creation.',
});

export default function Home() {
  return (
    <main className={`min-h-screen ${homeBg}`}>
      <HashScrollOnLoad />
      <h1 className="sr-only">AI resources, books, and customer services — SK Creation</h1>
      <MultiAgentChatbotSection />
      <PortfolioFeaturedSystemDesignHero />
      <HeroSection />
      <SpaceForGrowth />
      <HomeExploreSection />
      <HomeContactSection />
      <HomeCollaborationsSection />
    </main>
  );
}
