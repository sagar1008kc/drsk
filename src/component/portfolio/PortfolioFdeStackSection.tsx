'use client';

import { motion } from 'framer-motion';
import { Cloud, CloudCog, Cpu, FolderGit, Layers } from 'lucide-react';
import {
  FDE_CORE_STACK,
  FDE_EXPERIENCE,
  FDE_MODELS,
  FDE_STACK_CATEGORIES,
  FDE_STACK_LABEL,
  type FdeStackId,
} from '@/lib/fde-stack';
import { GITHUB_REPO_LINKS } from '@/lib/github-repos';

const STACK_ICON = {
  azure: Cloud,
  gcp: CloudCog,
  xai: Cpu,
  oss: Layers,
} as const;

const STACK_TONE: Record<
  FdeStackId,
  { card: string; chip: string; icon: string; accent: string }
> = {
  azure: {
    card: 'border-sky-500/25 bg-sky-500/5 hover:border-sky-400/45',
    chip: 'border-sky-400/25 bg-sky-500/10 text-sky-100',
    icon: 'border-sky-400/30 bg-sky-500/15 text-sky-300',
    accent: 'text-sky-300',
  },
  gcp: {
    card: 'border-blue-500/25 bg-blue-500/5 hover:border-blue-400/45',
    chip: 'border-blue-400/25 bg-blue-500/10 text-blue-100',
    icon: 'border-blue-400/30 bg-blue-500/15 text-blue-300',
    accent: 'text-blue-300',
  },
  xai: {
    card: 'border-zinc-500/35 bg-zinc-500/5 hover:border-zinc-300/50',
    chip: 'border-zinc-400/25 bg-zinc-500/10 text-zinc-100',
    icon: 'border-zinc-400/30 bg-zinc-500/15 text-zinc-200',
    accent: 'text-zinc-200',
  },
  oss: {
    card: 'border-teal-500/30 bg-teal-500/5 hover:border-teal-400/50',
    chip: 'border-teal-400/25 bg-teal-500/10 text-teal-100',
    icon: 'border-teal-400/30 bg-teal-500/15 text-teal-300',
    accent: 'text-teal-300',
  },
};

function safeExternalHref(href: string) {
  if (!href) return '#';
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  return `https://${href}`;
}

export default function PortfolioFdeStackSection() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="fde-stack-heading"
      className="relative scroll-mt-24 overflow-hidden border-b border-teal-500/20 bg-[#070b14] py-14 sm:py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,rgba(13,148,136,0.16),transparent_55%),radial-gradient(ellipse_50%_40%_at_90%_20%,rgba(56,189,248,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-teal-300 sm:text-xs">
            FDE toolkit
          </span>
          <h2
            id="fde-stack-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            Tech stack for{' '}
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              field delivery
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Organized the way Forward Deployed Engineers ship: Azure and GCP for enterprise
            clouds, Grok / xAI for frontier reasoning, and open source so agents stay portable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-[auto_1fr] sm:gap-4"
        >
          <div className="flex items-center justify-center rounded-2xl border border-teal-400/30 bg-teal-500/10 px-5 py-4 sm:justify-start">
            <div>
              <p className="text-3xl font-black tracking-tight text-white">{FDE_EXPERIENCE.years}</p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-teal-200">
                years
              </p>
            </div>
            <p className="ml-4 max-w-[12rem] text-left text-sm font-semibold leading-snug text-zinc-100">
              {FDE_EXPERIENCE.label}
            </p>
          </div>
          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                Core stack
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {FDE_CORE_STACK.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-teal-400/25 bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                Models
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {FDE_MODELS.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:gap-5">
          {FDE_STACK_CATEGORIES.map((category, i) => {
            const Icon = STACK_ICON[category.id];
            const tone = STACK_TONE[category.id];
            return (
              <motion.article
                key={category.id}
                id={`stack-${category.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-2xl border p-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition sm:p-6 ${tone.card}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${tone.icon}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[11px] font-semibold uppercase tracking-widest ${tone.accent}`}>
                      {category.eyebrow}
                    </p>
                    <h3 className="mt-0.5 text-lg font-bold text-white">{category.label}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{category.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${tone.chip}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div id="github-repos" className="scroll-mt-24 mx-auto mt-14 max-w-2xl text-center sm:mt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-500/40 bg-zinc-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-300 sm:text-xs">
            <FolderGit className="h-3.5 w-3.5" aria-hidden />
            Source code
          </span>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">GitHub</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Open repositories mapped to the same FDE stack — GCP RAG, LangGraph runtimes, MCP
            tools, and learning platforms.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {GITHUB_REPO_LINKS.map((item, i) => (
            <motion.a
              key={item.href}
              href={safeExternalHref(item.href)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-sm transition hover:border-teal-400/40 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-lg text-white shadow-sm">
                  {'</>'}
                </div>
                <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  GitHub
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-mono text-sm font-semibold text-white">{item.label}</h4>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">{item.note}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {item.stacks.map((stack) => (
                  <span
                    key={stack}
                    className="rounded-full border border-white/10 bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-300"
                  >
                    {FDE_STACK_LABEL[stack]}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-4 right-4 text-lg text-teal-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
