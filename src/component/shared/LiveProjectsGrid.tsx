'use client';

import type { ProjectItem } from '@/lib/projects';
import LiveProjectCard, { type LiveProjectCardVariant } from '@/component/shared/LiveProjectCard';

type LiveProjectsGridProps = {
  projects: ProjectItem[];
  variant?: LiveProjectCardVariant;
  className?: string;
  highlightLimit?: number;
};

export default function LiveProjectsGrid({
  projects,
  variant = 'light',
  className = '',
  highlightLimit,
}: LiveProjectsGridProps) {
  return (
    <div className={`mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-3 ${className}`}>
      {projects.map((project, index) => (
        <LiveProjectCard
          key={project.id}
          project={project}
          index={index}
          variant={variant}
          highlightLimit={highlightLimit}
        />
      ))}
    </div>
  );
}
