'use client';

import Link from 'next/link';
import { motion, useMotionTemplate } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/lib/projects';
import { accentMap } from '@/component/project/project-styles';
import { usePointerTilt } from '@/component/project/usePointerTilt';
import ThreeProjectCardCanvas from '@/component/portfolio/ThreeProjectCardCanvas';

type ProjectThreeDCardProps = {
  project: ProjectItem;
  index: number;
};

export default function ProjectThreeDCard({ project, index }: ProjectThreeDCardProps) {
  const style = accentMap[project.accent];
  const { rotateX, rotateY, glareX, glareY, onPointerMove, onPointerLeave } = usePointerTilt(14);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18), transparent 58%)`;

  const linkProps = project.external
    ? { href: project.href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href: project.href };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="h-full [perspective:1400px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="group relative h-full"
      >
        <div
          className={`pointer-events-none absolute -inset-1 rounded-[1.4rem] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50 ${style.glow}`}
          aria-hidden
        />

        <Link
          {...linkProps}
          className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]/90 shadow-[0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_32px_80px_rgba(139,92,246,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${style.glow}`}
        >
          <div className="relative h-44 overflow-hidden sm:h-48">
            <ThreeProjectCardCanvas accent={project.accent} />
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/40 to-transparent`} />
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-20`} />
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: glareBackground }}
            />

            <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex gap-1" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-rose-500/90" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/90" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/90" />
                </span>
                <span className="truncate font-mono text-[11px] text-zinc-400 sm:text-xs">
                  {project.domain}
                </span>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Live
              </span>
            </div>

            <div className="relative z-10 px-4 pt-3">
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${style.tag}`}>
                {project.tag.split('·')[0]?.trim() ?? project.tag}
              </span>
            </div>
          </div>

          <div className="relative z-10 flex flex-1 flex-col p-5 pt-4">
            <h3 className="text-xl font-bold tracking-tight text-white sm:text-[1.35rem]">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
              {project.description}
            </p>

            <ul className="mt-4 space-y-2">
              {project.highlights.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <span
              className={`mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition group-hover:brightness-110 ${style.btn}`}
            >
              Visit live site
              <ExternalLink className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
