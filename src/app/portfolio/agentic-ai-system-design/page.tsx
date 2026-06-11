import type { Metadata } from 'next';
import AgenticWorkflowPage from '@/component/agentic-workflow/AgenticWorkflowPage';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/portfolio/agentic-ai-system-design',
  title: 'Enterprise Multi-Agent AI System Design',
  description:
    'A production-ready design for web/mobile AI assistants using multi-agent orchestration, RAG, MCP tool execution, guardrails, human approval, observability, and evaluation.',
  openGraphTitle: 'Enterprise Multi-Agent AI System Design | Dr. SK',
});

export default function AgenticAiSystemDesignPage() {
  return <AgenticWorkflowPage />;
}
