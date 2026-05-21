import type { ReactNode } from 'react';
import { glowBg, sectionBorder, sectionPad } from './styles';

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
      className={`relative overflow-hidden scroll-mt-20 ${sectionBorder} ${sectionPad} ${className}`}
    >
      <div className={glowBg} />
      <div className="dot-pattern-dark pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative">{children}</div>
    </section>
  );
}
