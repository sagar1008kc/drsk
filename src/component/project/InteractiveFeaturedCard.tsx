'use client';

import Link from 'next/link';
import { motion, useMotionTemplate } from 'framer-motion';
import type { ProjectItem } from '@/lib/projects';
import { accentMap } from '@/component/project/project-styles';
import { usePointerTilt } from '@/component/project/usePointerTilt';
import ProjectDemoPreview from '@/component/project/ProjectDemoPreview';

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

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

type Props = {
  project: ProjectItem;
  index: number;
};

export default function InteractiveFeaturedCard({ project, index }: Props) {
  const style = accentMap[project.accent];
  const { rotateX, rotateY, glareX, glareY, onPointerMove, onPointerLeave } =
    usePointerTilt(11);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 55%)`;

  const href = project.href;
  const linkProps = project.external
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href };

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full [perspective:1200px]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        whileTap={{ scale: 0.98 }}
        className="group relative h-full touch-manipulation"
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-[1.35rem] opacity-0 transition-opacity duration-500 group-hover:opacity-80 group-focus-within:opacity-90 sm:rounded-[1.6rem] drsk-showcase-ring"
          aria-hidden
        />

        <Link
          {...linkProps}
          className={`relative flex w-full flex-col overflow-hidden rounded-2xl border bg-zinc-900/80 shadow-xl backdrop-blur-md transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:rounded-3xl ${style.border} ${style.glow}`}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glareBackground }}
          />
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.gradient}`} />

          <div
            className={`relative z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r px-4 py-2.5 sm:px-5 ${style.preview}`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex gap-1" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </span>
              <span className="truncate font-mono text-xs text-zinc-400 sm:text-sm">
                {project.domain}
              </span>
            </div>
            <motion.span
              className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-emerald-300/90"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live
            </motion.span>
          </div>

          <div className="relative z-20 flex w-full flex-col md:flex-row md:items-stretch">
            <div className="w-full shrink-0 md:w-[min(42%,320px)] lg:w-[min(38%,360px)]">
              <ProjectDemoPreview projectId={project.id} accent={project.accent} layout="wide" />
            </div>

            <div className="relative flex min-w-0 flex-1 flex-col p-5 sm:p-6 md:border-l md:border-white/10 md:py-6 lg:p-8">
            <span
              className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 sm:text-xs ${style.tag}`}
            >
              {project.tag}
            </span>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400 sm:text-base sm:line-clamp-none">
              {project.description}
            </p>

            <motion.ul
              className="mt-4 space-y-2 sm:mt-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {project.highlights.map((item) => (
                <motion.li
                  key={item}
                  variants={listItemVariants}
                  className="flex items-start gap-2 text-sm leading-relaxed text-zinc-300"
                >
                  <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <dl className="mt-5 flex flex-wrap gap-4 border-t border-white/10 pt-5">
              {project.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    {m.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-zinc-200">{m.value}</dd>
                </div>
              ))}
            </dl>

            <motion.span
              className={`mt-6 inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white sm:mt-auto md:max-w-xs lg:max-w-sm ${style.btn}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {project.external ? 'Visit live site' : 'View blueprint'}
              {project.external ? <ExternalLinkIcon className="h-4 w-4" /> : null}
            </motion.span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
