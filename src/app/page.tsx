'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const certifications = [
  { name: 'Google Cloud Architect', icon: '/googleIcon.png' },
  { name: 'Azure Developer', icon: '/developerIcon.png' },
  { name: 'Azure DevOps Engineer', icon: '/devOpsIcon.jpg' },
  { name: 'CompTIA Security+', icon: '/securityIcon.png' },
  { name: 'CompTIA CySA+', icon: '/cysaIcon.png' },
  { name: 'CompTIA Security Analyst Professional', icon: '/csapIcon.png' },
  { name: 'Certified AI Scientist', icon: '/CAIS.png' },
];

// ✅ Full https:// links
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
  { label: 'YouTube', href: 'https://www.youtube.com/@drskcreation', note: 'Video content' },
];

const sections = [
  { id: 'links', label: 'Links' },
  { id: 'certifications', label: 'Education' },
  { id: 'books', label: 'Books' },
  { id: 'contact', label: 'Contact' },
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
      {/* Clean Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#070B14] via-[#0B1020] to-[#070B14]" />
      <div className="fixed inset-0 -z-10 opacity-[0.06] pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.6),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.5),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.35),transparent_45%)]" />

      {/* Sticky Navbar (desktop nav only) */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollToId('about')}
            className="flex items-center gap-3 hover:opacity-90 transition"
            aria-label="Go to top"
          >
            <div className="h-11 w-11 rounded-full overflow-hidden border border-white/15 bg-white/5">
              <Image src="/drsk.png" alt="Dr. SK" width={42} height={42} className="object-cover" />
            </div>
            <div className="text-left leading-tight">
              <div className="font-semibold">Dr. SK</div>
              <div className="text-xs text-gray-300">Author • Technologist</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToId(s.id)}
                className={[
                  'px-3 py-2 rounded-full text-sm transition border',
                  active === s.id
                    ? 'bg-white/10 border-white/15 text-white'
                    : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5',
                ].join(' ')}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToId('links')}
              className="hidden sm:inline-flex px-3 py-2 rounded-full text-sm bg-white/10 hover:bg-white/15 border border-white/10 transition"
            >
              Official Links
            </button>
            <a
              href={safeExternalHref('https://medium.com/@drsk0')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-full text-sm bg-indigo-600/90 hover:bg-indigo-600 transition shadow-sm"
            >
              Read Articles
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pt-14">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="flex flex-col items-center text-center">
              {/* ✅ Profile Image (1:1, pb-0.5rem) */}
              <div className="flex justify-center pb-2">
                <div className="relative w-40 h-40 aspect-square rounded-full overflow-hidden border border-white/15 bg-white/5 shadow-sm">
                  <Image
                    src="/drsk.png"
                    alt="Dr. SK profile photo"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">Dr. SK</h1>

              <h5 className="mt-3 text-lg md:text-xl text-gray-200">Author & Technologist</h5>

              <div className="mt-5 text-gray-300 leading-relaxed space-y-4">
              <p>
                I am <span className="text-white font-semibold">Dr. SK</span>—an author and technology professional with a
                Doctorate in Business Administration (DBA). I publish books and public articles focused on stress,
                productivity, self-growth, and modern life. Software Engineer by profession, writer by passion. 
              </p>
            </div>

              {/* ✅ Mobile-only quick nav (hide on desktop to avoid duplication) */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:hidden">
                <button
                  onClick={() => scrollToId('links')}
                  className="px-2 py-1 rounded-full bg-indigo-600/90 hover:bg-indigo-600 transition"
                >
                  Links
                </button>
                <button
                  onClick={() => scrollToId('certifications')}
                  className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition"
                >
                  Education
                </button>
                <button
                  onClick={() => scrollToId('books')}
                  className="px-2 py-1 rounded-full bg-amber-500/90 hover:bg-amber-500 transition text-black font-semibold"
                >
                  Books
                </button>
                <button
                  onClick={() => scrollToId('contact')}
                  className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition"
                >
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Links */}
      <section id="links" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 md:p-10"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Links</h2>
              <p className="mt-2 text-gray-300">Official links to published writing, author page, and profiles.</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
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
      <section id="certifications" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Education & Certifications</h2>

            {/* Education */}
            <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-6">
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Published Books</h2>

            <div className="mt-8 flex flex-col items-center">
              <a
                href="https://www.amazon.com/author/drsk1"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-2xl rounded-xl overflow-hidden border border-white/10 bg-black/20 hover:bg-black/30 transition"
              >
                <img
                  src="/drskBooks.png"
                  alt="Published Books by Dr. SK"
                  className="object-contain w-full h-80 bg-transparent"
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
                View Author Profile ↗
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 md:p-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Get In Touch</h2>
            <p className="mt-4 text-gray-300">For collaborations, interviews, or writing opportunities, feel free to reach out.</p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:info.drsk0@gmail.com"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition"
              >
                Email
              </a>

              <a
                href="https://www.linkedin.com/in/drskofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-indigo-600/90 hover:bg-indigo-600 transition"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        Official website of Dr. SK • © {new Date().getFullYear()} • All rights reserved.
      </footer>
    </main>
  );
}
