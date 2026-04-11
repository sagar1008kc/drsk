'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const certifications = [
  {name: 'Certified Mental Health First Aider', icon: '/MHFA.png'},
  { name: 'Google Cloud Architect', icon: '/googleIcon.png' },
  { name: 'Azure Developer', icon: '/developerIcon.png' },
  { name: 'Azure DevOps Engineer', icon: '/devOpsIcon.jpg' },
  { name: 'CompTIA Security+', icon: '/securityIcon.png' },
  { name: 'CompTIA CySA+', icon: '/cysaIcon.png' },
  { name: 'CompTIA Security Analyst Professional', icon: '/csapIcon.png' },
  { name: 'Certified AI Scientist', icon: '/CAIS.png' },
];

// Full https:// links
const publicLinks = [
  { label: 'Amazon Author Page', href: 'https://www.amazon.com/author/drsk1', note: 'Published books' },
  { label: 'Medium', href: 'https://medium.com/@drskauthor', note: 'Articles' },
  {
    label: 'LinkedIn Articles',
    href: 'https://www.linkedin.com/pulse/how-ai-changing-our-emotional-balance-what-we-must-do-sagar-khatri--n6a5c',
    note: 'Writing & posts',
  },
  { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/drskofficial', note: 'Background & experience' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@drskauthor', note: 'Short-form content' },
  { label: 'YouTube', href: 'https://www.youtube.com/@drskauthor', note: 'Video content' },
  { label: 'Amazon Author Page', href: 'https://www.amazon.com/author/sagar2025', note: 'publised as Sagar Khatri' },
];

const sections = [
  { id: 'links', label: 'Links' },
  { id: 'experience', label: 'Experience' },
  { id: 'books', label: 'Books' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
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
    <main className="min-h-screen text-white">
      {/* nav */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pt-14">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="flex flex-col items-center text-center">
              {/* Profile Image (1:1, pb-0.5rem) */}
              <div className="flex justify-center pb-2">
                <div className="relative w-40 h-40 aspect-square rounded-full overflow-hidden border border-white/15 bg-white/5 shadow-sm">
                  <Image
                    src="/drsk.png"
                    alt="Dr. SK"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">Dr. SK</h1>

              <h5 className="mt-3 text-lg md:text-xl text-gray-200">Author & Technologist</h5>
              <p>Certified Mental Health First Aider</p>

              <div className="mt-5 text-gray-300 leading-relaxed space-y-4">
              <p>
                I am <span className="text-white font-semibold">Dr. SK</span>—an author and technology professional with a
                Doctorate in Business Administration (DBA). I publish books and public articles focused on stress,
                productivity, self-growth, and modern life. Also, I am a certified Mental Health Aider. Software Engineer by profession, writer by passion. 
              </p>
            </div>

              {/* Mobile-only quick nav (hide on desktop to avoid duplication) */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:hidden">
                <button
                  onClick={() => scrollToId('links')}
                  className="px-2 py-1 rounded-full bg-indigo-600/90 hover:bg-indigo-600 transition"
                >
                  Links
                </button>
                <button
                  onClick={() => scrollToId('experience')}
                  className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition"
                >
                  Experience
                </button>
                <button
                  onClick={() => scrollToId('books')}
                  className="px-2 py-1 rounded-full bg-amber-500/90 hover:bg-amber-500 transition text-black font-semibold"
                >
                  Books
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Links */}
      <section id="links" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
        <div className='text-center pb-3'>
              <h2 className="text-2xl md:text-3xl font-bold">Links</h2>
              <p className="mt-2 text-gray-300">Official links to published articles, author page, and profiles.</p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:p-10"
          >
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              {publicLinks.map((item) => (
                <a
                  key={item.label}
                  href={safeExternalHref(item.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/10 bg-black/20 hover:bg-black/30 transition p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                    <span className="text-gray-400 group-hover:text-white transition">↗</span>
                  </div>
                  <p className="mt-2 text-gray-300">{item.note}</p>
                  <p className="mt-3 text-xs text-gray-500 break-all">{safeExternalHref(item.href)}</p>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="experience" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center pb-3">Professional Background</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:p-10"
          >
        {/* Experiences */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-6">
            <h3 className="text-xl font-semibold text-white">Experience</h3>

            <div className="mt-6 space-y-6">

              {/* Item */}
              <div className="group flex flex-col md:flex-row md:justify-between gap-2 border-l-2 border-white/10 pl-4 hover:border-blue-500 transition">
                <div>
                  <div className="text-white font-semibold">Software Engineer</div>
                  <div className="text-gray-400 text-sm">General Motors · Full-time</div>
                  <div className="text-gray-500 text-xs mt-1">Austin, TX · On-site</div>
                </div>
                <div className="text-gray-400 text-sm">May 2019 - Present</div>
              </div>

              <div className="group flex flex-col md:flex-row md:justify-between gap-2 border-l-2 border-white/10 pl-4 hover:border-blue-500 transition">
                <div>
                  <div className="text-white font-semibold">Director of Information Technology</div>
                  <div className="text-gray-400 text-sm">SM Business · Self-employed</div>
                  <div className="text-gray-500 text-xs mt-1">United States · Remote</div>
                </div>
                <div className="text-gray-400 text-sm">Apr 2023 - Present</div>
              </div>

              <div className="group flex flex-col md:flex-row md:justify-between gap-2 border-l-2 border-white/10 pl-4 hover:border-blue-500 transition">
                <div>
                  <div className="text-white font-semibold">Frontend Developer</div>
                  <div className="text-gray-400 text-sm">SKcreation · Self-employed</div>
                </div>
                <div className="text-gray-400 text-sm">Feb 2016 - Apr 2019</div>
              </div>

              <div className="group flex flex-col md:flex-row md:justify-between gap-2 border-l-2 border-white/10 pl-4 hover:border-blue-500 transition">
                <div>
                  <div className="text-white font-semibold">IT Support Specialist</div>
                  <div className="text-gray-400 text-sm">Experimax · Full-time</div>
                  <div className="text-gray-500 text-xs mt-1">Houston, TX · On-site</div>
                </div>
                <div className="text-gray-400 text-sm">Jan 2016 - Apr 2019</div>
              </div>

              <div className="group flex flex-col md:flex-row md:justify-between gap-2 border-l-2 border-white/10 pl-4 hover:border-blue-500 transition">
                <div>
                  <div className="text-white font-semibold">Section Officer</div>
                  <div className="text-gray-400 text-sm">Government of Nepal</div>
                  <div className="text-gray-500 text-xs mt-1">Nepal</div>
                </div>
                <div className="text-gray-400 text-sm">May 2011 - Jun 2014</div>
              </div>

              <div className="group flex flex-col md:flex-row md:justify-between gap-2 border-l-2 border-white/10 pl-4 hover:border-blue-500 transition">
                <div>
                  <div className="text-white font-semibold">Lead Trainer | Motivational Speaker</div>
                  <div className="text-gray-400 text-sm">Self-employed</div>
                  <div className="text-gray-500 text-xs mt-1">Nepal</div>
                </div>
                <div className="text-gray-400 text-sm">Jul 2009 - May 2014</div>
              </div>

              <div className="group flex flex-col md:flex-row md:justify-between gap-2 border-l-2 border-white/10 pl-4 hover:border-blue-500 transition">
                <div>
                  <div className="text-white font-semibold">Guest Lecturer</div>
                  <div className="text-gray-400 text-sm">Gyan Deep College</div>
                  <div className="text-gray-500 text-xs mt-1">Nepal</div>
                </div>
                <div className="text-gray-400 text-sm">Mar 2012 - Sep 2013</div>
              </div>

              <div className="group flex flex-col md:flex-row md:justify-between gap-2 border-l-2 border-white/10 pl-4 hover:border-blue-500 transition">
                <div>
                  <div className="text-white font-semibold">Mathematics Teacher</div>
                  <div className="text-gray-400 text-sm">Janata Higher Secondary School</div>
                  <div className="text-gray-500 text-xs mt-1">Jumla, Nepal</div>
                </div>
                <div className="text-gray-400 text-sm">Aug 2008 - Mar 2011</div>
              </div>

            </div>
          </div>

            {/* Education */}
            <div className="mt-2 rounded-xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-xl font-semibold text-white">Academic Background</h3>

              <div className="mt-5 space-y-5 text-gray-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <div className="font-semibold text-white">
                      DBA - Information Systems and Enterprise Resource Management
                    </div>
                    <div className="text-gray-400">California Intercontinental University</div>
                  </div>
                  <div className="text-gray-400">Doctorate in Business Administration</div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <div className="font-semibold text-white">Master's in Management</div>
                    <div className="text-gray-400">Tribhuvan University, Nepal</div>
                  </div>
                  <div className="text-gray-400">Master's Degree</div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <div className="font-semibold text-white">Bachelor's in Mathematics</div>
                    <div className="text-gray-400">Tribhuvan University, Nepal</div>
                  </div>
                  <div className="text-gray-400">Bachelor's Degree</div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <div className="font-semibold text-white">Associate of Science in Computer Science</div>
                    <div className="text-gray-400">Houston Community College, Houston, TX</div>
                  </div>
                  <div className="text-gray-400">Associate Degree</div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <h3 className="mt-10 text-xl font-semibold text-white">Professional Certifications</h3>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="rounded-xl border border-white/10 bg-black/20 p-6 flex items-center gap-4"
                >
                  <div className="h-14 w-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                    <Image src={cert.icon} alt={cert.name} width={44} height={44} className="object-contain" />
                  </div>
                  <div className="font-semibold text-gray-200">{cert.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Books */}
      <section id="books" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
        <h2 className="pb-4 text-center text-2xl font-bold md:text-3xl">
          Published Books
        </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-8 mb-5"
          >
            <div className="mt-2 flex flex-col items-center">
              <a
                href="https://www.amazon.com/author/drsk1"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-2xl rounded-xl overflow-hidden border border-white/10 bg-black/20 hover:bg-black/30 transition"
              >
                <img
                  src="/drskBooks.png"
                  alt="Published Books by Dr. SK"
                  className="object-contain w-full h-120 bg-transparent"
                />
              </a>

              <p className="mt-6 text-gray-300 text-center max-w-2xl">
                Explore published books by Dr. SK focused on self-growth, emotional resilience, and modern life. The Amazon
                author page is the official source for new releases and the full bibliography.
              </p>

              <a
                href="https://www.amazon.com/author/drsk1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-amber-500/90 hover:bg-amber-500 transition text-black font-semibold"
              >
                Author Profile ↗
              </a>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-8"
          >
            <div className="mt-2 flex flex-col items-center">
              <a
                href="https://www.amazon.com/author/drsk1"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-2xl rounded-xl overflow-hidden border border-white/10 bg-black/20 hover:bg-black/30 transition"
              >
                <img
                  src="/drsk_books.png"
                  alt="Published Books by Sagar Khatri"
                  className="object-contain w-full h-120 bg-transparent"
                />
              </a>

              <p className="mt-6 text-gray-300 text-center max-w-2xl">
              Explore three powerful books by Dr. SK published as Sagar Khatri designed to help you grow in the age of artificial intelligence. 
              From mastering AI-driven software development, to cracking cybersecurity interviews, to building income-generating AI skills for beginners 
              — each book delivers practical insights, real-world strategies, and future-ready knowledge for today’s digital world.
              </p>
              <a
                href="https://www.amazon.com/author/sagar2025"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-amber-500/90 hover:bg-amber-500 transition text-black font-semibold"
              >
                Author Profile ↗
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
