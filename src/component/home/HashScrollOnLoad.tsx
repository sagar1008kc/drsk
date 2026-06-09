'use client';

import { useEffect } from 'react';

/**
 * Next.js client navigation to /#section often lands at the top of the page.
 * Scroll to the hash target once the home page has mounted.
 */
export default function HashScrollOnLoad() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    requestAnimationFrame(scrollToTarget);
    const timer = window.setTimeout(scrollToTarget, 120);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
