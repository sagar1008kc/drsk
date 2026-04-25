'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContactForm from '@/component/Contact';
import HandbookSubscribeCTA from '@/component/HandbookSubscribeCTA';
import {
  HANDBOOK_DOWNLOAD_FILENAME,
  HANDBOOK_PUBLIC_PATH,
} from '@/lib/handbook-public';

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

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function safeExternalHref(href: string) {
  if (!href) return '#';
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  return `https://${href}`;
}

export default function Home() {
  const introCardRef = useRef<HTMLDivElement | null>(null);
  const resourcesHeaderRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: introScrollProgress } = useScroll({
    target: introCardRef,
    offset: ['start center', 'end start'],
  });
  const introScale = useTransform(introScrollProgress, [0, 1], [1, 0.92]);
  const introOpacity = useTransform(introScrollProgress, [0, 1], [1, 0.82]);

  const { scrollYProgress: resourcesScrollProgress } = useScroll({
    target: resourcesHeaderRef,
    offset: ['start center', 'end start'],
  });
  const resourcesScale = useTransform(resourcesScrollProgress, [0, 1], [1, 0.93]);
  const resourcesOpacity = useTransform(resourcesScrollProgress, [0, 1], [1, 0.84]);

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-zinc-900">
      <h1 className="sr-only">
        Dr. SK Official Website - Software Engineer, Author, and AI Educator
      </h1>
      {/* Slim promo strip */}
      {/* Profile-led hero — mobile-first */}
      <section className="relative overflow-hidden border-b border-zinc-200/90 bg-[#F8F7F4]">
        <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
        <div className="relative w-full">
          <Image
            src="/profile.png"
            alt="Dr. SK — professional portrait"
            width={2400}
            height={1400}
            priority
            sizes="100vw"
            className="h-auto w-full rounded-none object-cover object-center"
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-6 sm:pb-14 sm:pt-8 md:pb-16 md:pt-10">
          <motion.div
            ref={introCardRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            style={{ scale: introScale, opacity: introOpacity }}
            className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-violet-200/70 bg-white/75 p-6 text-center shadow-[0_20px_45px_-28px_rgba(76,29,149,0.35)] backdrop-blur-md sm:p-7 md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(196,181,253,0.38),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(129,140,248,0.25),transparent_45%)]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-2"
            >
              {['AI', 'Digital Solutions', 'Mental Wellness'].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                  className={`flex min-w-0 items-center justify-center whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.03em] sm:px-3 sm:text-xs sm:tracking-wide ${
                    tag === 'AI'
                      ? 'bg-teal-50/85 text-teal-700'
                      : tag === 'Digital Solutions'
                        ? 'bg-blue-50/85 text-blue-700'
                        : 'bg-violet-50/80 text-violet-700'
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="relative mt-4 text-base leading-relaxed text-zinc-700 md:text-lg"
            >
              Dr. SK leverages AI to build scalable digital solutions that accelerate careers,
              increase income, and maximize productivity. He also provides mental wellness
              sessions to help individuals gain clarity, reduce stress, and sustain long-term
              success.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <section className="relative z-[900] border-b border-white/10 bg-gradient-to-b from-[#0A0B12] via-[#0c0d14] to-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-2.5 text-center text-sm font-medium text-zinc-100 sm:text-base">
          Struggling with stress, overthinking, or emotional ups and downs? This powerful book helps
          you calm your mind and take control of your emotions.{' '}
          <a
            href="https://a.co/d/0b33CrJD"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-violet-300 underline underline-offset-4 transition hover:text-violet-200"
          >
            Read on Amazon
          </a>
        </div>
      </section>

      {/* Free handbook, premium library (login), newsletter — typical placement after hook, before long bio */}
      <section
        id="resources"
        className="scroll-mt-20 border-y border-zinc-200 bg-white py-12 sm:py-14"
        aria-labelledby="resources-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            ref={resourcesHeaderRef}
            style={{ scale: resourcesScale, opacity: resourcesOpacity }}
            className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
          >
            <span className="inline-flex items-center rounded-full bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Resources
            </span>
            <h2
              id="resources-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl"
            >
              Free download, member content, and updates
            </h2>
            <p className="mt-2 text-sm text-zinc-600 sm:text-base">
              Download the handbook with no account. Premium PDFs and your library live behind
              sign-in. Subscribe for more from Dr. SK.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3 [perspective:1200px]">
            <motion.div
              initial={{ opacity: 0, y: 44, scale: 0.96, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-[#F8F7F4] p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Free
              </p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">The Mind Matters Handbook</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                PDF by Dr. SK — no email required. Save or share the file anytime.
              </p>
              <a
                href={HANDBOOK_PUBLIC_PATH}
                download={HANDBOOK_DOWNLOAD_FILENAME}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Download PDF
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 54, scale: 0.96, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-900 p-6 text-zinc-100 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-200/90">
                Premium
              </p>
              <h3 className="mt-2 text-lg font-bold text-white">Member library</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                Purchased PDFs, samples, and session materials are available after you sign in.
              </p>
              <Link
                href="/login"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/15 px-5 py-2.5 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/25"
              >
                Sign in to access
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 64, scale: 0.96, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.68, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm sm:p-8 lg:col-span-1"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-700">
                Newsletter
              </p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">Subscribe for more from Dr. SK</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Subscribe to receive professional updates on resources, services, and new releases.
              </p>
              <div className="mt-6">
                <HandbookSubscribeCTA minimal embedded />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section id="links" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Online Presence
              </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-zinc-900">Links</h2>
            <p className="mt-2 text-zinc-500 max-w-xl mx-auto">
              Official links to published articles, author pages, and profiles.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {publicLinks.map((item, i) => (
              <motion.a
                key={`${item.label}-${i}`}
                href={safeExternalHref(item.href)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-green-500"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100 text-xl">
                  {item.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-zinc-900 truncate">{item.label}</h3>
                    <span className="shrink-0 text-zinc-400 group-hover:text-zinc-700 transition text-sm">↗</span>
                  </div>
                  <p className="mt-0.5 text-sm text-zinc-500">{item.note}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Professional Background */}
      <section id="experience" className="py-16 bg-white border-y border-zinc-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center rounded-full bg-zinc-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Background
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-zinc-900">Professional Background</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            {/* Experience */}
            <div className="rounded-2xl border border-zinc-200 bg-[#F8F7F4] p-6 md:p-8">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <span className="inline-block h-5 w-1 rounded-full bg-indigo-500" />
                Experience
              </h3>

              <div className="space-y-5">
                {[
                  { role: 'Software Engineer', org: 'Fortune500 Company · Full-time', loc: 'USA · On-site', dates: 'May 2019 – Present' },
                  { role: 'Founder & CEO', org: 'SK Creation · Self-employed', loc: 'United States · Remote', dates: 'Apr 2023 – Present' },
                  { role: 'IT Support Specialist', org: 'Experimax · Full-time', loc: 'USA · On-site', dates: 'Jan 2016 – Apr 2019' },
                  { role: 'Section Officer', org: 'Government of Nepal', loc: 'Nepal', dates: 'May 2011 – Jun 2014' },
                  { role: 'Lead Trainer | Motivational Speaker', org: 'Self-employed', loc: 'Nepal', dates: 'Jul 2009 – May 2014' },
                  { role: 'Guest Lecturer', org: 'Gyan Deep College', loc: 'Nepal', dates: 'Mar 2012 – Sep 2013' },
                  { role: 'Mathematics Teacher', org: 'Janata Higher Secondary School', loc: 'Nepal', dates: 'Aug 2008 – Mar 2011' },
                ].map((item) => (
                  <div
                    key={item.role}
                    className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 border-l-2 border-zinc-200 pl-4 hover:border-indigo-400 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-zinc-900">{item.role}</div>
                      <div className="text-sm text-zinc-500">{item.org}</div>
                      {item.loc && <div className="text-xs text-zinc-400 mt-0.5">{item.loc}</div>}
                    </div>
                    <div className="text-sm text-zinc-400 shrink-0">{item.dates}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-zinc-200 bg-[#F8F7F4] p-6 md:p-8">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <span className="inline-block h-5 w-1 rounded-full bg-sky-500" />
                Academic Background
              </h3>

              <div className="space-y-5">
                {[
                  { degree: 'DBA – Information Systems & Enterprise Resource Management', school: 'California Intercontinental University', label: 'Doctorate in Business Administration' },
                  { degree: "Master's in Management", school: 'Tribhuvan University, Nepal', label: "Master's Degree" },
                  { degree: "Bachelor's in Mathematics", school: 'Tribhuvan University, Nepal', label: "Bachelor's Degree" },
                  { degree: 'Associate of Science in Computer Science', school: 'Houston Community College, Houston, TX', label: 'Associate Degree' },
                ].map((item) => (
                  <div
                    key={item.degree}
                    className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 border-l-2 border-zinc-200 pl-4 hover:border-sky-400 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-zinc-900">{item.degree}</div>
                      <div className="text-sm text-zinc-500">{item.school}</div>
                    </div>
                    <div className="text-sm text-zinc-400 shrink-0">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-bold text-zinc-900 mb-5 flex items-center gap-2">
                <span className="inline-block h-5 w-1 rounded-full bg-amber-500" />
                Professional Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                  >
                    <div className="h-12 w-12 shrink-0 rounded-lg border border-zinc-100 bg-zinc-50 flex items-center justify-center overflow-hidden">
                      <Image src={cert.icon} alt={cert.name} width={40} height={40} className="object-contain" />
                    </div>
                    <div className="text-sm font-medium text-zinc-800 leading-snug">{cert.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Books */}
      <section id="books" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center rounded-full bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
              Publications
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-zinc-900">Published Books</h2>
            <p className="mt-2 text-zinc-500 max-w-xl mx-auto">
              Books on self-growth, AI, emotional resilience, and modern professional life.
            </p>
          </div>

          <div className="space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-6 md:p-8"
            >
              <div className="flex flex-col items-center">
                <a
                  href="https://www.amazon.com/author/drsk1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full max-w-2xl rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50 hover:shadow-md transition"
                >
                  <img
                    src="/drskBooks.png"
                    alt="Published Books by Dr. SK"
                    className="object-contain w-full h-auto bg-transparent"
                  />
                </a>

                <p className="mt-6 text-zinc-600 text-center max-w-2xl leading-relaxed">
                  Explore published books by Dr. SK focused on self-growth, emotional resilience, and modern life.
                  The Amazon author page is the official source for new releases and the full bibliography.
                </p>

                <a
                  href="https://www.amazon.com/author/drsk1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 transition text-white font-semibold shadow-sm"
                >
                  View on Amazon ↗
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-6 md:p-8"
            >
              <div className="flex flex-col items-center">
                <a
                  href="https://www.amazon.com/author/sagar2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full max-w-2xl rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50 hover:shadow-md transition"
                >
                  <img
                    src="/drsk_books.png"
                    alt="Published Books by Sagar Khatri"
                    className="object-contain w-full h-auto bg-transparent"
                  />
                </a>

                <p className="mt-6 text-zinc-600 text-center max-w-2xl leading-relaxed">
                  Three powerful books published as Sagar Khatri — designed to help you grow in the age of artificial intelligence.
                  From mastering AI-driven software development, to cracking cybersecurity interviews, to building income-generating AI
                  skills for beginners — each book delivers practical insights, real-world strategies, and future-ready knowledge.
                </p>

                <a
                  href="https://www.amazon.com/author/sagar2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 transition text-white font-semibold shadow-sm"
                >
                  View on Amazon ↗
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-width author visual — placed before contact for a grounded, editorial close */}
      <section
        className="border-t border-zinc-200 bg-zinc-50/90 py-10 md:py-14"
        aria-label="Engineering and author journey"
      >
        <div className="mx-auto mb-6 max-w-5xl px-4 text-center">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-800 sm:text-xl">
            Software Engineering &amp; Author Journey
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 md:text-base">
              Software engineer by profession, author by passion - explore my books and AI journey.
          </p>
        </div>
        <div className="w-full overflow-hidden border-y border-zinc-200/90 bg-zinc-50">
          <Image
            src="/drsk.png"
            alt="Dr. SK with published work — author and educator"
            width={1920}
            height={720}
            sizes="100vw"
            className="h-auto w-full bg-zinc-50"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-[#C9A962]/25 bg-zinc-950 py-16 md:py-20"
      >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#C9A962]/15 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#D4B96A]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full bg-[#C9A962]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4B96A]">
                Contact
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-3 text-base text-zinc-300">
                info@skcreation.org
              </p>
              <ContactForm />
            </div>
          </div>
      </section>
    </main>
  );
}
