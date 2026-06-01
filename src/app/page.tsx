import HeroSection from '@/component/HeroSection';
import AiEngineeringSection from '@/component/home/AiEngineeringSection';
import HomeCollaborationsSection from '@/component/home/HomeCollaborationsSection';
import HomeContactSection from '@/component/home/HomeContactSection';
import HomeExploreSection from '@/component/home/HomeExploreSection';
import { homeBg } from '@/component/home/styles';

export default function Home() {
  return (
    <main className={`min-h-screen ${homeBg}`}>
      <h1 className="sr-only">AI resources, books, and customer services — SK Creation</h1>
      <AiEngineeringSection firstSection />
      <HeroSection />
      <HomeExploreSection />
      <HomeCollaborationsSection />
      <HomeContactSection />
    </main>
  );
}
