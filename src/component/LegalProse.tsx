import type { ReactNode } from 'react';

export function LegalProse({ children }: { children: ReactNode }) {
  return (
    <article className="legal-doc mx-auto max-w-3xl space-y-5 text-[15px] leading-relaxed text-zinc-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:first:mt-0 [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_a]:text-violet-400 [&_a]:underline-offset-2 [&_a]:hover:text-violet-300 [&_strong]:font-semibold [&_strong]:text-white">
      {children}
    </article>
  );
}
