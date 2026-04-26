'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContactForm from '@/component/Contact';
import HandbookSubscribeCTA from '@/component/HandbookSubscribeCTA';
import {
  HANDBOOK_DOWNLOAD_FILENAME,
  MOTIVATIONAL_EBOOK_DOWNLOAD_FILENAME,
  MOTIVATIONAL_EBOOK_PUBLIC_PATH,
  HANDBOOK_PUBLIC_PATH,
} from '@/lib/handbook-public';

export default function Home() {
  const introCardRef = useRef<HTMLDivElement | null>(null);
  const resourcesHeaderRef = useRef<HTMLDivElement | null>(null);
  const customerSlides = ['/customer1.png', '/customer2.png', '/customer3.png', '/customer4.png'];
  const ctaBaseClass =
    'inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition';

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
    <main className="min-h-screen bg-[#F3F4FA] text-zinc-900">
      <h1 className="sr-only">
        AI resources, books, and customer services
      </h1>
      {/* Slim promo strip */}
      {/* AI-led hero — mobile-first */}
      <section className="relative overflow-hidden border-b border-[#D9DCEF] bg-[#EEF0FA]">
        <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
        <div className="relative w-full">
          <Image
            src="/aiMental.png"
            alt="AI and mental wellness visual"
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
            className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-[#D7DBF3] bg-[#F9FAFF]/95 p-6 text-center shadow-[0_20px_45px_-30px_rgba(66,56,135,0.24)] backdrop-blur-md sm:p-7 md:p-8"
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
                      ? 'bg-[#E8F4EF] text-teal-700'
                      : tag === 'Digital Solutions'
                        ? 'bg-[#EAF1FA] text-blue-700'
                        : 'bg-[#F1EAF7] text-violet-700'
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
              Practical AI systems, digital solutions, and wellness-oriented frameworks designed to
              improve performance, increase income potential, and support sustainable growth.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <section className="relative z-[900] border-b border-white/10 bg-gradient-to-b from-[#0A0B12] via-[#0c0d14] to-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-2.5 text-center text-sm font-medium text-zinc-100 sm:text-base">
          Struggling with stress, overthinking, or emotional ups and downs? Start with this practical guide.{' '}
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
              Free handbook PDF (storybook-style mental health awareness). Premium library and
              newsletter after sign-in or subscribe.
            </p>
          </motion.div>

          <div className="grid gap-6 [perspective:1200px] lg:grid-cols-3 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 44, scale: 0.96, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex h-full min-h-0 flex-col rounded-2xl border border-zinc-200 bg-[#F5F6FC] p-6 shadow-sm lg:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Free
              </p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900 lg:text-xl">
                The Mind Matters Handbook
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-emerald-800/80">
                Mental wellness awareness · practical story format
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 lg:text-[15px] lg:leading-7">
                A gentle, story-style PDF that helps you notice stress, overthinking, and emotional
                patterns with clarity. Practical takeaways for everyday life—download the full file
                here with no account and share it freely.
              </p>
              <div className="mt-auto border-t border-zinc-200/80 pt-5">
                <a
                  href={HANDBOOK_PUBLIC_PATH}
                  download={HANDBOOK_DOWNLOAD_FILENAME}
                  className={`${ctaBaseClass} w-full bg-emerald-600 text-white hover:bg-emerald-700`}
                >
                  Download PDF
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 54, scale: 0.96, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex h-full min-h-0 flex-col rounded-2xl border border-zinc-200 bg-zinc-900 p-6 text-zinc-100 shadow-sm lg:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-200/90">
                Premium
              </p>
              <h3 className="mt-2 text-lg font-bold text-white lg:text-xl">Member library</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-amber-100/75">
                Purchases, samples & assigned materials · one dashboard
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400 lg:text-[15px] lg:leading-7">
                Sign in to see everything tied to your account: premium PDFs you have bought,
                guided samples, and assigned program files. New drops land here first, and
                downloads stay private and user-locked for a secure library.
              </p>
              <div className="mt-auto border-t border-zinc-700/80 pt-5">
                <Link
                  href="/login"
                  className={`${ctaBaseClass} w-full border border-amber-400/50 bg-amber-500/15 text-amber-100 hover:bg-amber-500/25`}
                >
                  Sign in to access
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 64, scale: 0.96, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.68, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex h-full min-h-0 flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Free
              </p>
              <h3 className="mt-2 text-lg font-bold text-zinc-900 lg:text-xl">
                Motivation Powerpack eBook
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-blue-800/80">
                Motivation and action prompts · quick reset guide
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 lg:text-[15px] lg:leading-7">
                Get a practical motivation powerpack eBook with focused prompts to restart momentum,
                boost clarity, and take confident action in daily life and work.
              </p>
              <div className="mt-auto border-t border-zinc-200/80 pt-5">
                <a
                  href={MOTIVATIONAL_EBOOK_PUBLIC_PATH}
                  download={MOTIVATIONAL_EBOOK_DOWNLOAD_FILENAME}
                  className={`${ctaBaseClass} w-full bg-blue-600 text-white hover:bg-blue-700`}
                >
                  Download motivation ebook
                </a>
              </div>
            </motion.div>
          </div>

          <div className="mx-auto mt-12 max-w-2xl border-t border-zinc-200 pt-10">
            <HandbookSubscribeCTA
              variant="light"
              flushTop
              heading="Subscribe for email updates"
              description="Get a short welcome message from SK Creation with links to free resources, services, and your member login. We do not attach PDFs to email—the handbook and other downloads stay on this site."
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950 py-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.22),transparent_50%),radial-gradient(circle_at_85%_75%,rgba(99,102,241,0.12),transparent_45%)]" />
          <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-600/15 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962] sm:text-sm">
            Collaborations & clients
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-400 sm:mt-3 sm:text-base">
            Supporting individuals and small businesses through practical guidance, digital
            solutions, and meaningful results.
          </p>
          <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 overflow-hidden sm:mt-8">
            <motion.div
              className="flex w-max gap-4 p-4 sm:gap-6 sm:p-6"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            >
              {[...customerSlides, ...customerSlides].map((src, idx) => (
                <article
                  key={`${src}-${idx}`}
                  className="w-[280px] shrink-0 overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-zinc-800 sm:w-[360px]"
                >
                  <Image
                    src={src}
                    alt={`Customer highlight ${((idx % customerSlides.length) + 1).toString()}`}
                    width={720}
                    height={1280}
                    className="h-auto w-full object-cover object-center"
                    sizes="(max-width: 640px) 280px, 360px"
                  />
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
              Explore
            </span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
              Designed for real outcomes
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
              Explore practical services, real project work, and trusted author resources designed
              to support clarity, growth, and meaningful outcomes.
            </p>
          </div>

          <div className="space-y-4">
            <article className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-[#F8F7FF] via-[#F3F1FF] to-[#EEF0FF] p-6 shadow-[0_14px_34px_rgba(91,75,155,0.12)]">
              <div>
                <h4 className="mt-2 text-xl font-bold text-zinc-900">Services</h4>
                <p className="mt-2 text-sm text-zinc-700">
                  AI, Clarity & Mental Wellness Guidance
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Feeling overwhelmed by stress, uncertainty, or the pace of change in the AI era?
                  Book a private session with Dr. SK for supportive guidance focused on mental
                  wellness awareness, clarity, resilience, and navigating personal or professional
                  pressure.
                </p>
                <p className="mt-3 text-sm font-semibold text-zinc-800">Session may help with:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
                  <li>Stress and overwhelm awareness</li>
                  <li>Mental wellness support conversations</li>
                  <li>Clarity during career or life transitions</li>
                  <li>Healthy balance in an always-on digital world</li>
                  <li>Practical guidance and trusted resource direction</li>
                </ul>
                <p className="mt-3 text-sm text-zinc-600">1:1 private session or Group Session</p>
              </div>
              <Link
                href="/services"
                className={`${ctaBaseClass} mt-5 border border-violet-300 bg-violet-600 text-white shadow-sm hover:bg-violet-700`}
              >
                Book a session
              </Link>
            </article>

            <article className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-[#F8F7FF] via-[#F3F1FF] to-[#EEF0FF] p-6 shadow-[0_14px_34px_rgba(91,75,155,0.12)]">
              <div>
                <h4 className="mt-2 text-xl font-bold text-zinc-900">Projects</h4>
                <p className="mt-2 text-sm text-zinc-700">
                  Helping businesses work smarter with practical AI solutions.
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Business-first AI concepts designed for website assistance, lead capture, booking
                  automation, feedback intelligence, and workflow acceleration for small and
                  mid-sized businesses.
                </p>
                <p className="mt-3 text-sm font-semibold text-zinc-800">Focus Areas</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
                  <li>AI-Powered Workflow Automation</li>
                  <li>Website & Application Development</li>
                  <li>Smart Integrations and Assistants</li>
                  <li>Operational Efficiency Solutions</li>
                </ul>
              </div>
              <Link
                href="/project"
                className={`${ctaBaseClass} mt-5 border border-violet-300 bg-violet-600 text-white shadow-sm hover:bg-violet-700`}
              >
                Checkout projects
              </Link>
            </article>

            <article className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-[#F8F7FF] via-[#F3F1FF] to-[#EEF0FF] p-6 shadow-[0_14px_34px_rgba(91,75,155,0.12)]">
              <div>
                <h4 className="mt-2 text-xl font-bold text-zinc-900">Know about Dr. SK</h4>
                <p className="mt-2 text-sm text-zinc-600">
                  USAII Certified AI scientist, Software Engineering background, Educator, and
                  Mental Health Advocate (MHFA Certified).
                </p>
              </div>
              <Link
                href="/about"
                className={`${ctaBaseClass} mt-5 border border-violet-300 bg-violet-600 text-white shadow-sm hover:bg-violet-700`}
              >
                More about author here
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section
        id="books"
        className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950 py-16"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.22),transparent_50%),radial-gradient(circle_at_85%_75%,rgba(99,102,241,0.12),transparent_45%)]" />
          <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-600/15 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#C9A962]">
              Featured books
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Read the right book for your next breakthrough
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Two focused paths: one for AI and future readiness, one for emotional balance in a
              changing world.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="flex h-full flex-col rounded-2xl border border-zinc-700 bg-white p-5 shadow-sm">
              <a
                href="https://www.amazon.com/author/sagar2025"
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden rounded-xl bg-white transition"
              >
                <Image
                  src="/aibook.png"
                  alt="AI and future-focused books"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-xl object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </a>
              <h3 className="mt-5 text-xl font-bold text-zinc-900">
                Do you want to know how AI is changing and shaping the world?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                Read this practical AI book set to understand what is changing, what skills matter
                now, and how to stay relevant with confidence in your work and life.
              </p>
              <a
                href="https://www.amazon.com/author/sagar2025"
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaBaseClass} mt-5 w-fit self-start bg-indigo-600 text-white hover:bg-indigo-700`}
              >
                Read AI books
              </a>
            </article>

            <article className="flex h-full flex-col rounded-2xl border border-zinc-700 bg-white p-5 shadow-sm">
              <a
                href="https://www.amazon.com/author/drsk1"
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden rounded-xl bg-white transition"
              >
                <Image
                  src="/eb.png"
                  alt="Emotional balance and wellness books"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-xl bg-white object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </a>
              <h3 className="mt-5 text-xl font-bold text-zinc-900">
                Are you struggling with a busy life, AI changes, and emotional overload?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                Learn how to balance emotions, reduce stress, and build a happier daily life even
                in fast-changing times. Start with these emotional wellness books.
              </p>
              <a
                href="https://www.amazon.com/author/drsk1"
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaBaseClass} mt-5 w-fit self-start bg-amber-500 text-white hover:bg-amber-600`}
              >
                Read emotional wellness books
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950 py-16 md:py-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.22),transparent_50%),radial-gradient(circle_at_85%_75%,rgba(99,102,241,0.12),transparent_45%)]" />
          <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-600/15 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Contact
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Get In Touch
            </h2>
            <p className="mt-3 text-base text-zinc-400">
              <a
                href="mailto:info@skcreation.org"
                className="text-violet-300 underline-offset-4 transition hover:text-violet-200 hover:underline"
              >
                info@skcreation.org
              </a>
            </p>
            <ContactForm appearance="dark" />
          </div>
        </div>
      </section>
    </main>
  );
}
