import HeroSection from '@/component/HeroSection';
import SpaceForGrowth from '@/component/about/SpaceForGrowth';
import HomeCollaborationsSection from '@/component/home/HomeCollaborationsSection';
import HomeContactSection from '@/component/home/HomeContactSection';
import HomeExploreSection from '@/component/home/HomeExploreSection';
import MultiAgentChatbotSection from '@/component/home/MultiAgentChatbotSection';
import { homeBg } from '@/component/home/styles';

export default function Home() {
  return (
    <main className={`min-h-screen ${homeBg}`}>
      <h1 className="sr-only">AI resources, books, and customer services — SK Creation</h1>
      <MultiAgentChatbotSection />
      <HeroSection />
      <SpaceForGrowth />
      <HomeExploreSection />
      <HomeContactSection />
      <HomeCollaborationsSection />
    </main>
  );
}
