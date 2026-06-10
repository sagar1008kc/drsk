import type { Metadata } from 'next';
import AgenticWorkflowPage from '@/component/agentic-workflow/AgenticWorkflowPage';

export const metadata: Metadata = {
  title: 'Enterprise Multi-Agent AI System Design',
  description:
    'A production-ready design for web/mobile AI assistants using multi-agent orchestration, RAG, MCP tool execution, guardrails, human approval, observability, and evaluation.',
};

export default function AgenticAiSystemDesignPage() {
  return <AgenticWorkflowPage />;
}
