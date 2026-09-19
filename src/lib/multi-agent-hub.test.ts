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
  it('keeps general questions on the page chatbot', () => {
    expect(FALLBACK_REPLY).toMatch(/website knowledge/i);
    expect(FALLBACK_REPLY).toMatch(/chatbot assistant/i);
  });
});

describe('site-grounded routing', () => {
  it('routes resources questions to the resources hub', () => {
    const route = resolveAgent('Where are the AI resources?');
    expect(route?.parent).toBe('rag');
    expect(route?.subAgent).toBe('resources_hub');
  });

  it('routes a bare resources query to the resources hub', () => {
    const route = resolveAgent('resources');
    expect(route?.parent).toBe('rag');
    expect(route?.subAgent).toBe('resources_hub');
  });

  it('routes wellness education to the wellness hub', () => {
    const route = resolveAgent('Where is wellness education?');
    expect(route?.parent).toBe('books');
    expect(route?.subAgent).toBe('wellness_books');
  });

  it('routes services questions to the services hub', () => {
    const route = resolveAgent('What services does SK Creation offer?');
    expect(route?.parent).toBe('rag');
    expect(route?.subAgent).toBe('services_hub');
  });

  it('routes live project questions to the projects agent', () => {
    const route = resolveAgent('Which live projects are on this site?');
    expect(route?.parent).toBe('projects');
  });
});
