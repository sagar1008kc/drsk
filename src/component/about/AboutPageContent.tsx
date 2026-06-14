'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AboutHeroSection from '@/component/about/AboutHeroSection';
import AiEngineeringSection from '@/component/home/AiEngineeringSection';
import { AgenticWorkflowSystemDesign } from '@/component/home/AgenticWorkflowSystemDesign';
import LearnAdaptLeadSection from '@/component/portfolio/LearnAdaptLeadSection';
import PortfolioAiCareerHubSection from '@/component/portfolio/PortfolioAiCareerHubSection';
import PortfolioLiveProjectsSection from '@/component/portfolio/PortfolioLiveProjectsSection';
import { FEATURED_BOOKS } from '@/lib/featured-books';
import {
  aboutBg,
  badgeClass,
  cardClass,
  container,
  glowBgLight,
  sectionBorder,
  sectionDesc,
  sectionPad,
  sectionTitle,
} from '@/component/about/styles';

const certifications = [
  { name: 'Certified Mental Health First Aider', icon: '/MHFA.png' },
  { name: 'Google Cloud Architect', icon: '/googleIcon.png' },
  { name: 'Azure Developer', icon: '/developerIcon.png' },
  { name: 'Azure DevOps Engineer', icon: '/devOpsIcon.jpg' },
  { name: 'CompTIA Security+', icon: '/securityIcon.png' },
  { name: 'CompTIA CySA+', icon: '/cysaIcon.png' },
  { name: 'CompTIA Security Analyst Professional', icon: '/csapIcon.png' },
  { name: 'Certified AI Scientist', icon: '/CAIS.png' },
];

const publicLinks = [
  {
    label: 'Amazon Author Page',
    href: 'https://www.amazon.com/author/drsk1',
    note: 'Published books — Dr. SK',
    emoji: '📚',
    color: 'from-orange-500/20 to-amber-500/10 border-orange-200 hover:border-orange-300',
    dot: 'bg-orange-400',
    tag: 'Amazon',
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@drskauthor',
    note: 'Articles & essays',
    emoji: '✍️',
    color: 'from-zinc-100/80 to-white border-zinc-200 hover:border-zinc-400',
    dot: 'bg-zinc-700',
    tag: 'Medium',
  },
  {
    label: 'LinkedIn Articles',
    href: 'https://www.linkedin.com/pulse/how-ai-changing-our-emotional-balance-what-we-must-do-sagar-khatri--n6a5c',
    note: 'Writing & posts',
    emoji: '💡',
    color: 'from-sky-500/15 to-blue-500/5 border-sky-200 hover:border-sky-400',
    dot: 'bg-sky-500',
    tag: 'LinkedIn',
  },
  {
    label: 'LinkedIn Profile',
    href: 'https://www.linkedin.com/in/drskofficial',
    note: 'Background & experience',
    emoji: '🔗',
    color: 'from-blue-500/15 to-indigo-500/5 border-blue-200 hover:border-blue-400',
    dot: 'bg-blue-600',
    tag: 'LinkedIn',
  },
  {
    label: 'Amazon Author Page',
    href: 'https://www.amazon.com/author/sagar2025',
    note: 'Published as Sagar Khatri',
    emoji: '📖',
    color: 'from-amber-500/20 to-yellow-500/5 border-amber-200 hover:border-amber-400',
    dot: 'bg-amber-500',
    tag: 'Amazon',
  },
];

const experience = [
  { role: 'Software Engineer', org: 'Fortune Top 25, Fortune Global 50 Company · Full-time', loc: 'USA · On-site', dates: 'May 2019 – Present', current: true, icon: '💻' },
  { role: 'Founder & CEO', org: 'SK Creation · Self-employed', loc: 'United States · Remote', dates: 'Apr 2023 – Present', current: true, icon: '🚀' },
  { role: 'IT Support Specialist', org: 'Experimax · Full-time', loc: 'USA · On-site', dates: 'Jan 2016 – Apr 2019', current: false, icon: '🛠️' },
  { role: 'Section Officer', org: 'Government of Nepal', loc: 'Nepal', dates: 'May 2011 – Jun 2014', current: false, icon: '🏛️' },
  { role: 'Lead Trainer | Motivational Speaker', org: 'Self-employed', loc: 'Nepal', dates: 'Jul 2009 – May 2014', current: false, icon: '🎤' },
  { role: 'Guest Lecturer', org: 'Gyan Deep College', loc: 'Nepal', dates: 'Mar 2012 – Sep 2013', current: false, icon: '📖' },
  { role: 'Mathematics Teacher', org: 'Janata Higher Secondary School', loc: 'Nepal', dates: 'Aug 2008 – Mar 2011', current: false, icon: '📐' },
];

const education = [
  { degree: 'DBA - Information Systems & Enterprise Resource Management', school: 'California Intercontinental University', label: 'Doctorate in Business Administration', icon: '🎓', color: 'border-violet-300 bg-violet-50/80' },
  { degree: "Master's in Management", school: 'Tribhuvan University, Nepal', label: "Master's Degree", icon: '📜', color: 'border-indigo-200 bg-indigo-50/60' },
  { degree: "Bachelor's in Mathematics", school: 'Tribhuvan University, Nepal', label: "Bachelor's Degree", icon: '📐', color: 'border-sky-200 bg-sky-50/60' },
  { degree: 'Associate of Science in Computer Science', school: 'Houston Community College, Houston, TX', label: 'Associate Degree', icon: '💡', color: 'border-emerald-200 bg-emerald-50/60' },
];

function safeExternalHref(href: string) {
  if (!href) return '#';
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  return `https://${href}`;
}

function AboutSection({
  id,
  children,
  className = '',
  altBg = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  altBg?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden scroll-mt-24 ${sectionBorder} ${sectionPad} ${
        altBg ? 'bg-gradient-to-b from-violet-50/50 to-white' : 'bg-white'
      } ${className}`}
    >
      <div className={glowBgLight} />
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className={`${container} relative`}>{children}</div>
    </section>
  );
}

export default function AboutPageContent() {
  return (
    <main className={`min-h-screen ${aboutBg}`}>
      <AboutHeroSection />
      <AgenticWorkflowSystemDesign />
      <AiEngineeringSection />
      <PortfolioAiCareerHubSection />
      <PortfolioLiveProjectsSection />

      {/* ── Official Links ── */}
      <AboutSection altBg>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Online presence</span>
          <h2 className={`${sectionTitle} mt-3`}>Official links</h2>
          <p className={sectionDesc}>Published writing, author pages, and primary platforms.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {publicLinks.map((item, i) => (
            <motion.a
              key={`${item.label}-${i}`}
              href={safeExternalHref(item.href)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl border bg-gradient-to-br p-5 shadow-sm backdrop-blur-sm transition hover:shadow-[0_12px_36px_rgba(139,92,246,0.13)] ${item.color}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/60 bg-white/80 text-xl shadow-sm">
                  {item.emoji}
                </div>
                <span className="rounded-full border border-white/50 bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {item.tag}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.dot}`} />
                  <h3 className="truncate text-sm font-semibold text-zinc-900">{item.label}</h3>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.note}</p>
              </div>
              <span className="absolute bottom-4 right-4 text-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </AboutSection>

      {/* ── Experience & Education ── */}
      <AboutSection>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Professional background</span>
          <h2 className={`${sectionTitle} mt-3`}>Experience &amp; education</h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Experience timeline */}
          <div>
            <h3 className="mb-6 flex items-center gap-2.5 text-base font-bold uppercase tracking-wider text-zinc-400">
              <span className="h-px flex-1 bg-gradient-to-r from-violet-200 to-transparent" />
              Experience
              <span className="h-px flex-1 bg-gradient-to-l from-violet-200 to-transparent" />
            </h3>
            <ol className="relative space-y-0 border-l-2 border-violet-100 pl-6">
              {experience.map((item, i) => (
                <motion.li
                  key={item.role}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.38, delay: i * 0.06 }}
                  className="group relative pb-7 last:pb-0"
                >
                  {/* timeline dot */}
                  <span
                    className={`absolute -left-[1.5625rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-white shadow-sm text-[11px] transition group-hover:scale-110 ${
                      item.current
                        ? 'bg-violet-500 ring-2 ring-violet-200'
                        : 'bg-white border-violet-200'
                    }`}
                  >
                    <span>{item.icon}</span>
                  </span>
                  <div className={`rounded-xl border p-4 transition ${
                    item.current
                      ? 'border-violet-200 bg-violet-50/60 shadow-[0_4px_20px_rgba(139,92,246,0.1)]'
                      : 'border-zinc-100 bg-white hover:border-violet-200'
                  }`}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-zinc-900 sm:text-[0.9375rem]">{item.role}</div>
                        <div className="mt-0.5 text-sm text-zinc-500">{item.org}</div>
                        <div className="mt-0.5 text-xs text-zinc-400">{item.loc}</div>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        item.current
                          ? 'bg-violet-100 text-violet-700'
                          : 'bg-zinc-100 text-zinc-500'
                      }`}>
                        {item.dates}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="mb-6 flex items-center gap-2.5 text-base font-bold uppercase tracking-wider text-zinc-400">
                <span className="h-px flex-1 bg-gradient-to-r from-sky-200 to-transparent" />
                Education
                <span className="h-px flex-1 bg-gradient-to-l from-sky-200 to-transparent" />
              </h3>
              <div className="space-y-3">
                {education.map((item, i) => (
                  <motion.article
                    key={item.degree}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.38, delay: i * 0.07 }}
                    className={`flex items-start gap-4 rounded-xl border p-4 transition hover:shadow-sm ${item.color}`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/60 bg-white/80 text-lg shadow-sm">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[0.8125rem] font-bold text-zinc-900 leading-snug">{item.degree}</div>
                      <div className="mt-0.5 text-xs text-zinc-500">{item.school}</div>
                      <span className="mt-1.5 inline-block rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 border border-white">
                        {item.label}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="mb-6 flex items-center gap-2.5 text-base font-bold uppercase tracking-wider text-zinc-400">
                <span className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent" />
                Certifications
                <span className="h-px flex-1 bg-gradient-to-l from-amber-200 to-transparent" />
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {certifications.map((cert, i) => (
                  <motion.article
                    key={cert.name}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.32, delay: i * 0.05 }}
                    className="group flex flex-col items-center gap-2.5 rounded-xl border border-violet-100 bg-white p-4 text-center shadow-sm transition hover:border-violet-300 hover:shadow-[0_8px_24px_rgba(139,92,246,0.1)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 shadow-sm transition group-hover:border-violet-200">
                      <Image src={cert.icon} alt="" width={40} height={40} className="object-contain" />
                    </div>
                    <div className="text-[11px] font-medium leading-tight text-zinc-700">{cert.name}</div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AboutSection>

      <AboutSection altBg>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Publications</span>
          <h2 className={`${sectionTitle} mt-3`}>Featured author pages</h2>
          <p className={sectionDesc}>Visit both official author pages to browse the full collection.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {FEATURED_BOOKS.map((book, index) => (
            <motion.a
              key={book.id}
              href={safeExternalHref(book.href)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`${cardClass} flex flex-col transition hover:border-violet-300 hover:shadow-[0_12px_36px_rgba(139,92,246,0.12)] ${
                book.accent === 'indigo' ? 'ring-1 ring-indigo-100' : 'ring-1 ring-amber-100'
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                {book.shortTitle}
              </span>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">{book.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">{book.body}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-violet-700">
                Open author page →
              </span>
            </motion.a>
          ))}
        </div>
      </AboutSection>

      <LearnAdaptLeadSection />
    </main>
  );
}
