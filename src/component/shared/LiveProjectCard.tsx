'use client';

import Link from 'next/link';
import { motion, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/lib/projects';
import { accentDarkMap, accentMap } from '@/component/project/project-styles';
import { usePointerTilt } from '@/component/project/usePointerTilt';
import ThreeProjectCardCanvas from '@/component/portfolio/ThreeProjectCardCanvas';

export type LiveProjectCardVariant = 'light' | 'dark';

type LiveProjectCardProps = {
  project: ProjectItem;
  index?: number;
  variant?: LiveProjectCardVariant;
  highlightLimit?: number;
};

function parseTagParts(tag: string) {
  return tag.split('·').map((part) => part.trim()).filter(Boolean);
}

function indexLabel(index: number) {
  return String(index + 1).padStart(2, '0');
}

function LivePulse({ className = '' }: { className?: string }) {
  return (
    <span className={`flex shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-500 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Live
    </span>
  );
}

function BrowserChrome({
  domain,
  dark = false,
  showLive = true,
}: {
  domain: string;
  dark?: boolean;
  showLive?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-2 border-b px-4 py-2.5 sm:px-5 ${
        dark ? 'border-white/10 bg-black/20' : 'border-zinc-100/80 bg-gradient-to-r from-zinc-50/90 to-white'
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-rose-500/90 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-amber-500/90 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/90 sm:h-2.5 sm:w-2.5" />
        </span>
        <span className={`truncate font-mono text-[11px] sm:text-xs ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {domain}
        </span>
      </div>
      {showLive ? <LivePulse className={dark ? 'text-emerald-400' : ''} /> : null}
    </div>
  );
}

function TagRow({ parts, tagClass }: { parts: string[]; tagClass: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {parts.map((part) => (
        <span
          key={part}
          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 sm:text-[11px] ${tagClass}`}
        >
          {part}
        </span>
      ))}
    </div>
  );
}

function CardBody({
  project,
  style,
  darkStyle,
  variant,
  highlightLimit,
  index,
}: {
  project: ProjectItem;
  style: (typeof accentMap)[keyof typeof accentMap];
  darkStyle: (typeof accentDarkMap)[keyof typeof accentDarkMap];
  variant: LiveProjectCardVariant;
  highlightLimit?: number;
  index: number;
}) {
  const isDark = variant === 'dark';
  const tagParts = parseTagParts(project.tag);
  const highlights = highlightLimit ? project.highlights.slice(0, highlightLimit) : project.highlights;
  const ctaLabel = project.external ? 'Visit live site' : 'View blueprint';

  return (
    <>
      {isDark ? (
        <div className="relative h-40 overflow-hidden sm:h-44">
          <ThreeProjectCardCanvas accent={project.accent} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${darkStyle.gradient} opacity-30`} />
          <div className="relative z-10">
            <BrowserChrome domain={project.domain} dark />
            <div className="px-4 pt-3 sm:px-5">
              <TagRow parts={tagParts} tagClass={darkStyle.tag} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <BrowserChrome domain={project.domain} />
          <div className="relative px-5 pt-4 sm:px-6">
            <TagRow parts={tagParts} tagClass={style.tag} />
          </div>
        </>
      )}

      <div className={`relative flex flex-1 flex-col ${isDark ? 'p-5 pt-4' : 'px-5 pb-5 pt-3 sm:px-6 sm:pb-6'}`}>
        {!isDark ? (
          <span
            className="pointer-events-none absolute bottom-4 right-4 select-none font-mono text-5xl font-bold text-zinc-100 sm:text-6xl"
            aria-hidden
          >
            {indexLabel(index)}
          </span>
        ) : null}

        <h3
          className={`relative text-lg font-bold tracking-tight sm:text-xl ${
            isDark ? 'text-white sm:text-[1.35rem]' : 'text-zinc-900'
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`relative mt-2 flex-1 text-sm leading-relaxed ${
            isDark ? 'line-clamp-3 text-zinc-400' : 'text-zinc-600'
          }`}
        >
          {project.description}
        </p>

        <ul className={`relative mt-4 space-y-2 ${isDark ? 'sm:mt-3' : ''}`}>
          {highlights.map((item) => (
            <li
              key={item}
              className={`flex items-start gap-2 text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}
            >
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? darkStyle.dot : style.dot}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <dl
          className={`relative mt-5 flex flex-wrap gap-4 border-t pt-4 ${
            isDark ? 'border-white/10' : 'border-zinc-100'
          }`}
        >
          {project.meta.map((m) => (
            <div key={m.label}>
              <dt className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                {m.label}
              </dt>
              <dd className={`mt-0.5 text-sm font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        {isDark ? (
          <span
            className={`mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition group-hover:brightness-110 ${darkStyle.btn}`}
          >
            {ctaLabel}
            <ExternalLink className="h-4 w-4" aria-hidden />
          </span>
        ) : (
          <span className={`relative mt-5 inline-flex items-center gap-2 text-sm font-semibold ${style.link} group-hover:gap-2.5`}>
            {ctaLabel}
            {project.external ? (
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            ) : null}
          </span>
        )}
      </div>
    </>
  );
}

export default function LiveProjectCard({
  project,
  index = 0,
  variant = 'light',
  highlightLimit,
}: LiveProjectCardProps) {
  const isDark = variant === 'dark';
  const style = accentMap[project.accent];
  const darkStyle = accentDarkMap[project.accent];
  const tilt = usePointerTilt(12);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.16), transparent 58%)`;

  const linkProps = project.external
    ? { href: project.href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href: project.href };

  const cardInner = (
    <Link
      {...linkProps}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
        isDark
          ? `border-white/10 bg-[#0a0a12]/90 shadow-[0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-xl hover:border-white/20 ${darkStyle.border} ${darkStyle.glow}`
          : `bg-white shadow-sm hover:-translate-y-1 hover:shadow-md ${style.border} ${style.glow}`
      }`}
    >
      {!isDark ? (
        <>
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.gradient}`} />
          <div className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${style.preview} opacity-80`} />
        </>
      ) : (
        <>
          <div className={`pointer-events-none absolute inset-0 ${darkStyle.mesh}`} />
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glareBackground }}
          />
        </>
      )}

      <CardBody
        project={project}
        style={style}
        darkStyle={darkStyle}
        variant={variant}
        highlightLimit={highlightLimit}
        index={index}
      />
    </Link>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: isDark ? 36 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={isDark ? 'h-full [perspective:1400px]' : 'h-full'}
    >
      {isDark ? (
        <motion.div
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
          onPointerMove={tilt.onPointerMove}
          onPointerLeave={tilt.onPointerLeave}
          className="h-full"
        >
          {cardInner}
        </motion.div>
      ) : (
        cardInner
      )}
    </motion.div>
  );
}
