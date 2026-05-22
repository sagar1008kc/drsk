import type { ReactNode } from 'react';
import { glowBgLight, sectionBorder, sectionPad } from './styles';

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
};

export default function SectionShell({
  id,
  children,
  className = '',
  ariaLabelledBy,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative scroll-mt-20 bg-white ${sectionBorder} ${sectionPad} overflow-hidden ${className}`}
    >
      <div className={glowBgLight} />
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative">{children}</div>
    </section>
  );
}
