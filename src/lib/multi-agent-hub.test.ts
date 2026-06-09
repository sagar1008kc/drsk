import { describe, expect, it } from 'vitest';
import { FALLBACK_REPLY, resolveAgent } from '@/lib/multi-agent-hub';

describe('resolveAgent confidence routing', () => {
  it('returns null for off-topic math questions', () => {
    expect(resolveAgent('what is 5+5?')).toBeNull();
  });

  it('returns null for DIY house-building guides (no auction context)', () => {
    expect(
      resolveAgent('i want to build a house? can you provide me the step by step guide?')
    ).toBeNull();
  });

  it('routes texas auction queries to the real-estate project', () => {
    const route = resolveAgent('texas foreclosure auction listings by county');
    expect(route?.parent).toBe('projects');
    expect(route?.subAgent).toBe('realestate');
  });

  it('routes clear Dr. SK questions to the RAG agent', () => {
    const route = resolveAgent('who is Dr. SK?');
    expect(route?.parent).toBe('rag');
  });

  it('returns null for vague single-word career advice', () => {
    expect(resolveAgent('I want a new career path')).toBeNull();
  });
});

describe('FALLBACK_REPLY', () => {
  it('guides users toward supported topics', () => {
    expect(FALLBACK_REPLY).toMatch(/not sure/i);
  });
});
