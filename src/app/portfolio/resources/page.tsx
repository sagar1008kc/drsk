import type { Metadata } from 'next';
import AiEngineeringSection from '@/component/home/AiEngineeringSection';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/resources',
  title: 'AI-Native & Agentic Engineering',
  description:
    'Enterprise AI agents, RAG systems, LLM-powered applications, and multi-agent platforms — AI-native and agentic engineering resources.',
  openGraphTitle: 'AI-Native & Agentic Engineering | Dr. SK',
});

export default function PortfolioResourcesPage() {
  return (
    <main className="min-h-screen bg-[#06060f] text-white">
      <AiEngineeringSection firstSection />
    </main>
  );
}
