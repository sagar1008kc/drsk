export type AgentSecurityRisk = {
  id: string;
  risk: string;
  plainTerms: string;
};

/** Agent-specific failure modes the input/output guardrail layer is designed to contain. */
export const AGENT_SECURITY_RISKS: AgentSecurityRisk[] = [
  {
    id: 'ASI01',
    risk: 'Agent Goal Hijack',
    plainTerms:
      'An attacker redirects the agent’s objective through poisoned input — a document, email, or tool result containing hidden instructions the agent treats as legitimate.',
  },
  {
    id: 'ASI02',
    risk: 'Tool Misuse & Exploitation',
    plainTerms:
      'The agent uses a tool it’s legitimately allowed to use in a harmful way — a destructive shell command, an over-broad API call, an unintended data export.',
  },
  {
    id: 'ASI03',
    risk: 'Identity & Privilege Abuse',
    plainTerms:
      'The agent acts under ambient, shared, or over-scoped credentials, so actions can’t be attributed to a specific task and least privilege can’t be enforced.',
  },
  {
    id: 'ASI04',
    risk: 'Agentic Supply Chain Vulnerabilities',
    plainTerms:
      'Compromise arrives through a dependency: a poisoned tool/plugin, a malicious MCP server, a tampered “skill” the agent downloads at runtime.',
  },
  {
    id: 'ASI05',
    risk: 'Unexpected Code Execution',
    plainTerms:
      'A sandbox boundary fails, or natural-language-driven execution paths are turned into arbitrary code execution.',
  },
  {
    id: 'ASI06',
    risk: 'Memory & Context Poisoning',
    plainTerms:
      'Persistent memory, retrieval indexes, or long-running context are shaped by an attacker to mislead the agent’s future decisions.',
  },
  {
    id: 'ASI07',
    risk: 'Insecure Inter-Agent Communication',
    plainTerms:
      'Messages between agents are spoofed, replayed, or unauthenticated, letting one agent impersonate another.',
  },
  {
    id: 'ASI08',
    risk: 'Cascading Failures',
    plainTerms:
      'An error or compromise in one agent propagates through the workflow instead of being contained.',
  },
  {
    id: 'ASI09',
    risk: 'Human-Agent Trust Exploitation',
    plainTerms:
      'Humans over-trust agent output and rubber-stamp actions that a moment’s scrutiny would have caught.',
  },
  {
    id: 'ASI10',
    risk: 'Rogue Agents',
    plainTerms:
      'An agent whose behavior has drifted from its intended function — an authorized, trusted “insider” that is nonetheless misaligned.',
  },
];
