'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AboutHeroSection from '@/component/about/AboutHeroSection';
import { FEATURED_BOOKS } from '@/lib/featured-books';
import {
  aboutBg,
  badgeClass,
  cardClass,
  container,
  ctaPrimary,
  ctaSecondary,
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
  { label: 'Amazon Author Page', href: 'https://www.amazon.com/author/drsk1', note: 'Published books — Dr. SK', emoji: '📚' },
  { label: 'Medium', href: 'https://medium.com/@drskauthor', note: 'Articles & essays', emoji: '✍️' },
  {
    label: 'LinkedIn Articles',
    href: 'https://www.linkedin.com/pulse/how-ai-changing-our-emotional-balance-what-we-must-do-sagar-khatri--n6a5c',
    note: 'Writing & posts',
    emoji: '💡',
  },
  { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/drskofficial', note: 'Background & experience', emoji: '🔗' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@drskauthor', note: 'Short-form content', emoji: '🎬' },
  { label: 'YouTube', href: 'https://www.youtube.com/@drskauthor', note: 'Video content', emoji: '▶️' },
  { label: 'Amazon Author Page', href: 'https://www.amazon.com/author/sagar2025', note: 'Published as Sagar Khatri', emoji: '📖' },
];

const experience = [
  { role: 'Software Engineer', org: 'Fortune500 Company · Full-time', loc: 'USA · On-site', dates: 'May 2019 – Present' },
  { role: 'Founder & CEO', org: 'SK Creation · Self-employed', loc: 'United States · Remote', dates: 'Apr 2023 – Present' },
  { role: 'IT Support Specialist', org: 'Experimax · Full-time', loc: 'USA · On-site', dates: 'Jan 2016 – Apr 2019' },
  { role: 'Section Officer', org: 'Government of Nepal', loc: 'Nepal', dates: 'May 2011 – Jun 2014' },
  { role: 'Lead Trainer | Motivational Speaker', org: 'Self-employed', loc: 'Nepal', dates: 'Jul 2009 – May 2014' },
  { role: 'Guest Lecturer', org: 'Gyan Deep College', loc: 'Nepal', dates: 'Mar 2012 – Sep 2013' },
  { role: 'Mathematics Teacher', org: 'Janata Higher Secondary School', loc: 'Nepal', dates: 'Aug 2008 – Mar 2011' },
];

const education = [
  { degree: 'DBA - Information Systems & Enterprise Resource Management', school: 'California Intercontinental University', label: 'Doctorate in Business Administration' },
  { degree: "Master's in Management", school: 'Tribhuvan University, Nepal', label: "Master's Degree" },
  { degree: "Bachelor's in Mathematics", school: 'Tribhuvan University, Nepal', label: "Bachelor's Degree" },
  { degree: 'Associate of Science in Computer Science', school: 'Houston Community College, Houston, TX', label: 'Associate Degree' },
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

      <AboutSection altBg>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Online presence</span>
          <h2 className={`${sectionTitle} mt-3`}>Official links</h2>
          <p className={sectionDesc}>Published writing, author pages, and primary platforms.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          {publicLinks.map((item, i) => (
            <motion.a
              key={`${item.label}-${i}`}
              href={safeExternalHref(item.href)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className={`${cardClass} group flex flex-row items-center gap-4 !p-4 transition hover:border-violet-300 hover:shadow-[0_12px_36px_rgba(139,92,246,0.12)] sm:!p-5`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50/80 text-xl">
                {item.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate font-semibold text-zinc-900">{item.label}</h3>
                  <span className="shrink-0 text-sm text-violet-500 transition group-hover:text-violet-700">
                    ↗
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-zinc-500">{item.note}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </AboutSection>

      <AboutSection>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Professional background</span>
          <h2 className={`${sectionTitle} mt-3`}>Experience & education</h2>
        </div>

        <div className="mt-8 space-y-6">
          <article className={cardClass}>
            <h3 className="flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span className="inline-block h-5 w-1 rounded-full bg-indigo-500" />
              Experience
            </h3>
            <div className="mt-6 space-y-5">
              {experience.map((item) => (
                <div
                  key={item.role}
                  className="border-l-2 border-violet-200 pl-4 transition-colors hover:border-violet-400 md:flex md:justify-between md:gap-4"
                >
                  <div>
                    <div className="font-semibold text-zinc-900">{item.role}</div>
                    <div className="text-sm text-zinc-600">{item.org}</div>
                    <div className="mt-0.5 text-xs text-zinc-500">{item.loc}</div>
                  </div>
                  <div className="mt-1 shrink-0 text-sm text-zinc-500 md:mt-0">{item.dates}</div>
                </div>
              ))}
            </div>
          </article>

          <article className={cardClass}>
            <h3 className="flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span className="inline-block h-5 w-1 rounded-full bg-sky-500" />
              Education
            </h3>
            <div className="mt-6 space-y-5">
              {education.map((item) => (
                <div
                  key={item.degree}
                  className="border-l-2 border-sky-200 pl-4 transition-colors hover:border-sky-400 md:flex md:justify-between md:gap-4"
                >
                  <div>
                    <div className="font-semibold text-zinc-900">{item.degree}</div>
                    <div className="text-sm text-zinc-600">{item.school}</div>
                  </div>
                  <div className="mt-1 shrink-0 text-sm text-zinc-500 md:mt-0">{item.label}</div>
                </div>
              ))}
            </div>
          </article>

          <div>
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span className="inline-block h-5 w-1 rounded-full bg-amber-500" />
              Certifications
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert) => (
                <article
                  key={cert.name}
                  className="flex items-center gap-3 rounded-xl border border-violet-100 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50">
                    <Image
                      src={cert.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-sm font-medium leading-snug text-zinc-800">{cert.name}</div>
                </article>
              ))}
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

      <AboutSection>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className={`${cardClass} relative overflow-hidden !p-8`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_55%)]" />
            <div className="relative">
              <span className={badgeClass}>Quick navigation</span>
              <h2 className={`${sectionTitle} mt-4`}>Contact and key pages</h2>
              <p className={`${sectionDesc} mt-3`}>
                Short links to contact, services, projects, and dashboard access.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/#contact" className={ctaSecondary}>
                  Contact us
                </Link>
                <Link href="/services" className={ctaSecondary}>
                  Services
                </Link>
                <Link href="/project" className={ctaPrimary}>
                  Projects
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-amber-300 bg-amber-50 px-6 py-2.5 text-sm font-semibold text-amber-900 transition hover:bg-amber-100 sm:w-auto"
                >
                  Premium
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_70%)]" />
              <div className="relative flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                  SK Creation
                </p>
                <p className="text-2xl font-bold text-zinc-900">AI · Digital · Wellness</p>
                <p className="text-sm text-zinc-600">Practical systems for real-world growth</p>
              </div>
            </div>
          </div>
        </div>
      </AboutSection>
    </main>
  );
}
