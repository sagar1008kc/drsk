import { describe, expect, it } from 'vitest';
import { safeInternalRedirectPath } from '@/lib/auth/redirect';

describe('safeInternalRedirectPath', () => {
  it('allows relative app paths with query strings', () => {
    expect(safeInternalRedirectPath('/dashboard?purchase=success')).toBe(
      '/dashboard?purchase=success'
    );
  });

  it('rejects protocol-relative and absolute URLs', () => {
    expect(safeInternalRedirectPath('//evil.example/path')).toBe('/dashboard');
    expect(safeInternalRedirectPath('https://evil.example/path')).toBe('/dashboard');
  });

  it('falls back on missing or malformed input', () => {
    expect(safeInternalRedirectPath(undefined)).toBe('/dashboard');
    expect(safeInternalRedirectPath('%E0%A4%A')).toBe('/dashboard');
  });
});
