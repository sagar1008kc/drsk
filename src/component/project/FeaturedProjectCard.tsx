'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ProjectItem } from '@/lib/projects';
import { accentMap } from '@/component/project/project-styles';

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

type Props = {
  project: ProjectItem;
  index: number;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturedProjectCard({ project, index }: Props) {
  const style = accentMap[project.accent];

  const content = (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/95 backdrop-blur-sm transition duration-300 hover:-translate-y-1 sm:rounded-3xl ${style.border} ${style.glow}`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.gradient}`} />
      <div
        className={`relative flex items-center justify-between gap-3 border-b border-violet-100 bg-gradient-to-r px-4 py-3 sm:px-5 ${style.preview}`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </span>
          <span className="truncate font-mono text-xs text-zinc-500 sm:text-sm">
            {project.domain}
          </span>
        </div>
        {project.external ? (
          <ExternalLinkIcon className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:text-violet-700" />
        ) : null}
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <span
          className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 sm:text-xs ${style.tag}`}
        >
          {project.tag}
        </span>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
          {project.description}
        </p>

        <ul className="mt-4 space-y-2 sm:mt-5">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-relaxed text-zinc-700"
            >
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-5 flex flex-wrap gap-4 border-t border-violet-100 pt-5 sm:mt-6">
          {project.meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                {m.label}
              </dt>
              <dd className="mt-0.5 text-sm font-medium text-zinc-800">{m.value}</dd>
            </div>
          ))}
        </dl>

        <span className="mt-6 inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 sm:mt-auto">
          {project.external ? 'Visit live site' : 'View blueprint'}
          {project.external ? <ExternalLinkIcon className="h-4 w-4" /> : null}
        </span>
      </div>
    </article>
  );

  const href = project.href;
  const linkProps = project.external
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href };

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.45, delay: index * 0.08 }}

    >
      <Link {...linkProps} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-2xl sm:rounded-3xl">
        {content}
      </Link>
    </motion.div>
  );
}
