import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  HANDBOOK_DOWNLOAD_FILENAME,
  HANDBOOK_PUBLIC_PATH,
  MOTIVATIONAL_EBOOK_DOWNLOAD_FILENAME,
  MOTIVATIONAL_EBOOK_PUBLIC_PATH,
} from '@/lib/handbook-public';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Professional background of Dr. SK: links, experience, education, and certifications.',
};

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
const publicationCards = [
  {
    title: 'Dr. SK Publications',
    image: '/drsk_books.png',
    href: 'https://www.amazon.com/author/sagar2025',
    description: 'Explore emotional wellness and motivational titles.',
  },
  {
    title: 'Additional Publications',
    image: '/drskBooks.png',
    href: 'https://www.amazon.com/author/drsk1',
    description: 'Explore AI, technology, and future-focused books.',
  },
];

function safeExternalHref(href: string) {
  if (!href) return '#';
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  return `https://${href}`;
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] text-zinc-900">
      <section className="border-b border-zinc-200 bg-white/90 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
              About Dr. SK
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              Author, technologist, and applied AI educator
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
              Dr. SK blends enterprise software engineering, practical AI systems, and mental
              wellness education to help people perform at a high level without burning out.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm">
            <Image
              src="/drsk.png"
              alt="Dr. SK profile and publications"
              width={1200}
              height={700}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online Presence
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-zinc-900">Official links</h2>
            <p className="mt-2 text-zinc-500 max-w-xl mx-auto">
              Published writing, author pages, and primary platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {publicLinks.map((item, i) => (
              <a
                key={`${item.label}-${i}`}
                href={safeExternalHref(item.href)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm transition hover:-translate-y-0.5 hover:border-green-500 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50 text-xl">
                  {item.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-base font-semibold text-zinc-900">{item.label}</h3>
                    <span className="shrink-0 text-sm text-zinc-400 transition group-hover:text-zinc-700">↗</span>
                  </div>
                  <p className="mt-0.5 text-sm text-zinc-500">{item.note}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 space-y-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center rounded-full bg-zinc-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Professional Background
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-[#F8F7F4] p-6 md:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-zinc-900">
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
                  className="flex flex-col gap-1 border-l-2 border-zinc-200 pl-4 transition-colors hover:border-indigo-400 md:flex-row md:items-start md:justify-between"
                >
                  <div>
                    <div className="font-semibold text-zinc-900">{item.role}</div>
                    <div className="text-sm text-zinc-500">{item.org}</div>
                    <div className="mt-0.5 text-xs text-zinc-400">{item.loc}</div>
                  </div>
                  <div className="shrink-0 text-sm text-zinc-400">{item.dates}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-[#F8F7F4] p-6 md:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span className="inline-block h-5 w-1 rounded-full bg-sky-500" />
              Education
            </h3>
            <div className="space-y-5">
              {[
                { degree: 'DBA - Information Systems & Enterprise Resource Management', school: 'California Intercontinental University', label: 'Doctorate in Business Administration' },
                { degree: "Master's in Management", school: 'Tribhuvan University, Nepal', label: "Master's Degree" },
                { degree: "Bachelor's in Mathematics", school: 'Tribhuvan University, Nepal', label: "Bachelor's Degree" },
                { degree: 'Associate of Science in Computer Science', school: 'Houston Community College, Houston, TX', label: 'Associate Degree' },
              ].map((item) => (
                <div
                  key={item.degree}
                  className="flex flex-col gap-1 border-l-2 border-zinc-200 pl-4 transition-colors hover:border-sky-400 md:flex-row md:items-start md:justify-between"
                >
                  <div>
                    <div className="font-semibold text-zinc-900">{item.degree}</div>
                    <div className="text-sm text-zinc-500">{item.school}</div>
                  </div>
                  <div className="shrink-0 text-sm text-zinc-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span className="inline-block h-5 w-1 rounded-full bg-amber-500" />
              Certifications
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert) => (
                <article
                  key={cert.name}
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50">
                    <Image src={cert.icon} alt={cert.name} width={40} height={40} className="object-contain" />
                  </div>
                  <div className="text-sm font-medium leading-snug text-zinc-800">{cert.name}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700">
              Publications
            </span>
            <h2 className="mt-3 text-2xl font-bold text-zinc-900 md:text-3xl">
              Featured author pages
            </h2>
            <p className="mt-2 text-sm text-zinc-600 md:text-base">
              Visit both official author pages to browse the full collection.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {publicationCards.map((card) => (
              <a
                key={card.title}
                href={safeExternalHref(card.href)}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="overflow-hidden rounded-xl bg-zinc-50">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={1400}
                    height={900}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-zinc-900">{card.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{card.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-indigo-700 group-hover:text-indigo-800">
                  Open author page →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm">
            <Image
              src="/profile.png"
              alt="Dr. SK profile photo"
              width={1200}
              height={1400}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
          <div>
            <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
              Quick Navigation
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
              Contact and key pages
            </h2>
            <p className="mt-2 text-sm text-zinc-600 md:text-base">
              Short links to contact, services, projects, and premium dashboard access.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
              >
                Contact Us
              </Link>
              <Link
                href="/service"
                className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
              >
                Service
              </Link>
              <Link
                href="/project"
                className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
              >
                Look at Project
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-violet-300 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800 transition hover:bg-violet-100"
              >
                Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-[#F8F7F4] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700">
              Free Downloads
            </span>
            <h2 className="mt-3 text-2xl font-bold text-zinc-900 md:text-3xl">
              Story-based and motivation resources
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Story-Based</p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">Mental health awareness handbook</h3>
              <p className="mt-2 text-sm text-zinc-600">
                A practical story-style guide to better understand stress, overthinking, and
                emotional patterns.
              </p>
              <a
                href={HANDBOOK_PUBLIC_PATH}
                download={HANDBOOK_DOWNLOAD_FILENAME}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Download handbook
              </a>
            </article>

            <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-700">Powerpack</p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900">Motivation powerpack eBook</h3>
              <p className="mt-2 text-sm text-zinc-600">
                A focused motivational eBook with prompts and momentum builders for personal and
                career growth.
              </p>
              <a
                href={MOTIVATIONAL_EBOOK_PUBLIC_PATH}
                download={MOTIVATIONAL_EBOOK_DOWNLOAD_FILENAME}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Download motivation ebook
              </a>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
