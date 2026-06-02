'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectsHeroSection from '@/component/project/ProjectsHeroSection';
import FeaturedProjectCard from '@/component/project/FeaturedProjectCard';
import LiveProductShowcase from '@/component/project/LiveProductShowcase';
import ProjectScreensShowcase from '@/component/project/ProjectScreensShowcase';
import { sitePageMain } from '@/lib/site-theme';
import { FEATURED_PROJECTS, MORE_PROJECTS } from '@/lib/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* Neural network graph — positions as % of section width/height */
const NET_NODES = [
  { id: 0,  x: 5,  y: 15, r: 3,   delay: 0 },
  { id: 1,  x: 18, y: 55, r: 2,   delay: 0.7 },
  { id: 2,  x: 28, y: 22, r: 2.5, delay: 1.3 },
  { id: 3,  x: 38, y: 78, r: 2,   delay: 0.4 },
  { id: 4,  x: 48, y: 38, r: 3.5, delay: 0.9 },   // hub
  { id: 5,  x: 58, y: 68, r: 2,   delay: 1.6 },
  { id: 6,  x: 68, y: 20, r: 2.5, delay: 0.2 },
  { id: 7,  x: 78, y: 55, r: 3,   delay: 1.1 },
  { id: 8,  x: 88, y: 30, r: 2,   delay: 0.5 },
  { id: 9,  x: 94, y: 72, r: 2,   delay: 1.8 },
  { id: 10, x: 12, y: 85, r: 2,   delay: 0.3 },
  { id: 11, x: 55, y: 90, r: 2,   delay: 1.4 },
];

const NET_EDGES = [
  [0, 2], [0, 1], [1, 4], [2, 4], [2, 6],
  [3, 4], [3, 10],[4, 5], [4, 6], [4, 7],
  [5, 11],[6, 8], [7, 8], [7, 9], [8, 9],
  [10, 3],[11, 9],[1, 10],[5, 7],
];

/* Packets that travel along specific edges */
const PACKETS = [
  { edge: [0, 2] as [number, number], delay: 0,   dur: 3.2 },
  { edge: [2, 4] as [number, number], delay: 0.8, dur: 2.8 },
  { edge: [4, 7] as [number, number], delay: 1.5, dur: 3.5 },
  { edge: [4, 5] as [number, number], delay: 0.3, dur: 2.6 },
  { edge: [6, 8] as [number, number], delay: 1.1, dur: 3.0 },
  { edge: [1, 4] as [number, number], delay: 2.0, dur: 2.9 },
];

const sectionPad = 'px-5 sm:px-8 md:px-10 lg:px-12';

export default function ProjectsPageContent() {
  return (
    <main className={sitePageMain}>
      <ProjectsHeroSection />

      <section
        id="live-projects"
        className={`relative scroll-mt-20 overflow-hidden bg-[#04040a] py-12 sm:py-16 lg:py-20 ${sectionPad}`}
      >
        {/* Radial glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_0%,rgba(139,92,246,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_90%_85%,rgba(99,102,241,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_5%_75%,rgba(167,139,250,0.09),transparent_55%)]" />
        </div>

        {/* Neural network SVG */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <filter id="node-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {NET_EDGES.map(([a, b], i) => {
            const na = NET_NODES[a], nb = NET_NODES[b];
            return (
              <line
                key={i}
                x1={`${na.x}%`} y1={`${na.y}%`}
                x2={`${nb.x}%`} y2={`${nb.y}%`}
                stroke="url(#edge-grad)"
                strokeWidth="0.8"
                opacity="0.45"
              />
            );
          })}

          {/* Nodes */}
          {NET_NODES.map((n) => (
            <g key={n.id} filter="url(#node-glow)">
              <circle cx={`${n.x}%`} cy={`${n.y}%`} r={n.r + 3} fill="rgba(139,92,246,0.08)" />
              <circle cx={`${n.x}%`} cy={`${n.y}%`} r={n.r} fill="#a78bfa" opacity="0.9" />
            </g>
          ))}
        </svg>

        {/* Pulsing rings on hub nodes */}
        {NET_NODES.filter((n) => n.r >= 3).map((n) => (
          <motion.span
            key={n.id}
            className="pointer-events-none absolute rounded-full border border-violet-400/50"
            style={{ left: `${n.x}%`, top: `${n.y}%`, translateX: '-50%', translateY: '-50%' }}
            animate={{ width: [n.r * 4, n.r * 14], height: [n.r * 4, n.r * 14], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: n.delay, ease: 'easeOut' }}
            aria-hidden
          />
        ))}

        {/* Data packets travelling along edges */}
        {PACKETS.map((pkt, i) => {
          const na = NET_NODES[pkt.edge[0]];
          const nb = NET_NODES[pkt.edge[1]];
          return (
            <motion.span
              key={i}
              className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_6px_rgba(167,139,250,0.9)]"
              style={{ translateX: '-50%', translateY: '-50%' }}
              animate={{
                left: [`${na.x}%`, `${nb.x}%`],
                top:  [`${na.y}%`, `${nb.y}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: pkt.dur, repeat: Infinity, delay: pkt.delay, ease: 'easeInOut' }}
              aria-hidden
            />
          );
        })}

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-violet-300 sm:text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" aria-hidden />
              Live launches
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Product showcase
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Production experiences across AI career navigation, investor data, and family
              learning — each with a direct link to explore.
            </p>
          </motion.div>

          <LiveProductShowcase />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
            {FEATURED_PROJECTS.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/[0.08] px-4 py-2 text-xs font-medium text-violet-300 transition hover:border-violet-400/60 hover:bg-violet-500/20 hover:text-violet-200 sm:text-sm"
              >
                <span
                  className={`h-2 w-2 rounded-full ${p.accent === 'violet' ? 'bg-violet-400' : p.accent === 'emerald' ? 'bg-emerald-400' : 'bg-rose-400'}`}
                />
                {p.domain}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`relative overflow-hidden border-t border-violet-200/60 bg-gradient-to-b from-violet-50/40 to-white py-12 sm:py-16 lg:py-20 ${sectionPad}`}
      >
        <div className="dot-pattern pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-800">
              More builds
            </span>
            <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl">
              Blueprints, apps &amp; interfaces
            </h2>
            <p className="mt-3 text-sm text-zinc-600 sm:text-base">
              AI strategy POCs, Streamlit tools, and UI concepts from client and internal work.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2"
          >
            {MORE_PROJECTS.map((project, i) => (
              <FeaturedProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>

          <ProjectScreensShowcase />
        </div>
      </section>

      <section className={`border-t border-violet-200/60 bg-white py-10 sm:py-12 ${sectionPad}`}>
        <div className="relative mx-auto max-w-6xl">
          <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-5 py-6 text-center shadow-sm sm:rounded-3xl sm:px-8 sm:py-8">
            <p className="text-sm font-medium text-zinc-800 sm:text-base">
              Want to go deeper on practical AI development workflows?
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Explore <span className="font-semibold text-zinc-900">AI Powered Software Engineer</span>{' '}
              for implementation strategies and hands-on guidance.
            </p>
            <a
              href="https://a.co/d/06z7LV25"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              View on Amazon
            </a>
          </div>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-violet-200 bg-white px-5 py-6 text-center shadow-sm">
            <p className="text-sm font-medium text-zinc-800">
              Want to level up AI skills or emotional balance?
            </p>
            <a
              href="https://www.amazon.com/author/drsk1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Read books on Amazon
            </a>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-600">
            Interested in something similar?{' '}
            <Link
              href="/services"
              className="font-semibold text-violet-700 hover:text-violet-600 hover:underline"
            >
              View services
            </Link>{' '}
            or{' '}
            <Link
              href="/#contact"
              className="font-semibold text-violet-700 hover:text-violet-600 hover:underline"
            >
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
