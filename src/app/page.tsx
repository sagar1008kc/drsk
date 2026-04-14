'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/component/Contact';

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

const sections = [
  { id: 'links', label: 'Links' },
  { id: 'experience', label: 'Experience' },
  { id: 'books', label: 'Books' },
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

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Home() {
  const [active, setActive] = useState<string>('links');

  const observerOptions = useMemo(
    () => ({ root: null, rootMargin: '-35% 0px -55% 0px', threshold: 0 }),
    []
  );

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

      if (visible?.target?.id) setActive(visible.target.id);
    }, observerOptions);

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [observerOptions]);

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-zinc-900">

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle dot texture */}
        <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-zinc-200">
                <Image
                  src="/drsk.png"
                  alt="Dr. SK"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-zinc-900">
                Dr. SK
              </h1>
              <h5 className="mt-2 text-lg md:text-xl font-medium text-zinc-600">
                Author &amp; Technologist
              </h5>
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-500">
               Certified Mental Health First Aider
            </span>
              <div className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600">
                <p>
                  I am <span className="font-semibold text-zinc-900">Dr. SK</span> — an author and technology
                  professional with a Doctorate in Business Administration (DBA). I publish books and articles
                  focused on stress, productivity, self-growth, and modern life. Software Engineer by profession,
                  writer by passion.
                </p>
              </div>

              {/* Mobile quick-nav */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:hidden">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToId(s.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                      active === s.id
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Links */}
      <section id="links" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
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
            <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
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
                  { role: 'Software Engineer', org: 'GM · Full-time', loc: 'Austin, TX · On-site', dates: 'May 2019 – Present' },
                  { role: 'Founder & CEO', org: 'SK Creation · Self-employed', loc: 'United States · Remote', dates: 'Apr 2023 – Present' },
                  { role: 'IT Support Specialist', org: 'Experimax · Full-time', loc: 'Houston, TX · On-site', dates: 'Jan 2016 – Apr 2019' },
                  { role: 'Section Officer', org: 'Government of Nepal', loc: 'Nepal', dates: 'May 2011 – Jun 2014' },
                  { role: 'Lead Trainer | Motivational Speaker', org: 'Self-employed', loc: 'Nepal', dates: 'Jul 2009 – May 2014' },
                  { role: 'Guest Lecturer', org: 'Gyan Deep College', loc: 'Nepal', dates: 'Mar 2012 – Sep 2013' },
                  { role: 'Mathematics Teacher', org: 'Janata Higher Secondary School', loc: 'Jumla, Nepal', dates: 'Aug 2008 – Mar 2011' },
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
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
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
            {/* Contact Section */}
        <section id="contact" className="border-t border-white/10 bg-gradient-to-b from-[#0A0B12] via-[#0c0d14] to-zinc-950 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-200/90">
                Contact
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-3 text-base text-zinc-400">
                info@skcreation.org
              </p>
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 px-4 pb-16">
          <div className="mx-auto w-full max-w-2xl">
            <ContactForm />
          </div>
        </section>
    </main>
  );
}
