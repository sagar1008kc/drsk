'use client';

import HeroSection from '@/component/HeroSection';
import HomeCollaborationsSection from '@/component/home/HomeCollaborationsSection';
import HomeContactSection from '@/component/home/HomeContactSection';
import HomeExploreSection from '@/component/home/HomeExploreSection';
import { homeBg } from '@/component/home/styles';

export default function Home() {
  return (
    <main className={`min-h-screen ${homeBg}`}>
      <h1 className="sr-only">AI resources, books, and customer services — SK Creation</h1>
      <HeroSection />
      <HomeCollaborationsSection />
      <HomeExploreSection />
      <HomeContactSection />
    </main>
  );
}
