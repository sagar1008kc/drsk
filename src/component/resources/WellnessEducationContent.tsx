'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BatteryLow,
  BookOpen,
  CheckCircle2,
  FileText,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  Users,
  Wind,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import {
  MENTAL_HEALTH_RESOURCES,
  WELLNESS_GUIDE_PHASES,
  WELLNESS_HUB_PATH,
  WELLNESS_INCLUDED,
  WELLNESS_NOT_INCLUDED,
  type MentalHealthResource,
} from '@/lib/mental-health-resources';
import { ctaPrimaryClass, ctaSecondaryClass } from '@/lib/site-theme';

const featured = MENTAL_HEALTH_RESOURCES.find((item) => item.featured)!;
const morePdfs = MENTAL_HEALTH_RESOURCES.filter((item) => item.format === 'PDF' && !item.featured);
const books = MENTAL_HEALTH_RESOURCES.filter((item) => item.format === 'Book');

const GUIDE_ICONS: Record<string, LucideIcon> = {
  'breathing-reset': Wind,
  'job-search-burnout': BatteryLow,
  'rejection-recovery': RotateCcw,
};

const PATH_ICONS = [FileText, BookOpen, Users] as const;

function ResourceActions({ item, featuredCard }: { item: MentalHealthResource; featuredCard?: boolean }) {
  const className = featuredCard ? ctaPrimaryClass : ctaSecondaryClass;
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {item.cta}
    </a>
  );
}

export default function WellnessEducationContent() {
  return (
    <main className="min-h-screen bg-[#F8F7FF] text-zinc-900">
      <section className="relative overflow-hidden border-b border-teal-200/60 bg-gradient-to-b from-white via-[#f0fdfa] to-emerald-50/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_-10%,rgba(13,148,136,0.14),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <Link
            href="/resources"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Resources
          </Link>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-800">
            Wellness Education
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-zinc-900 sm:text-5xl">
            Resources for clarity, calm, and healthier technology use
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-7">
            SK Creation’s Support path lives here. AI and digital work can create opportunity — and
            also pressure, overthinking, and information overload. This hub collects practical
            education so people can start with something useful, not another endless search.
          </p>

          <ol className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4" aria-label="How this hub is organized">
            {WELLNESS_HUB_PATH.map((item, index) => {
              const Icon = PATH_ICONS[index];
              return (
                <li
                  key={item.step}
                  className="relative flex h-full flex-col rounded-2xl border border-teal-200/80 bg-white/90 p-4 shadow-[0_8px_24px_rgba(13,148,136,0.06)] sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/10 text-teal-700">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-[0.18em] text-teal-700/80">
                      {item.step}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-bold text-zinc-900">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.body}</p>
                  {index < WELLNESS_HUB_PATH.length - 1 ? (
                    <ArrowRight
                      className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-teal-400 sm:block"
                      aria-hidden
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>

          <p className="mt-6 max-w-2xl rounded-xl border border-teal-200/80 bg-white/80 px-4 py-3 text-xs leading-relaxed text-zinc-600">
            Education and awareness only — not therapy, diagnosis, or emergency care. If you are in
            crisis, contact local emergency services. See the{' '}
            <Link href="/disclaimer" className="font-semibold text-teal-800 underline-offset-2 hover:underline">
              session disclaimer
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        aria-labelledby="wellness-scope-heading"
        className="border-y border-teal-200/60 bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-800">Clear scope</p>
          <h2 id="wellness-scope-heading" className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            What this is — and what it is not
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-teal-200/80 bg-[#f8fffd] p-5 sm:p-6">
              <div className="flex items-center gap-2 text-teal-800">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                <h3 className="text-lg font-bold">Included</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {WELLNESS_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-zinc-700">
                <ShieldAlert className="h-5 w-5" aria-hidden />
                <h3 className="text-lg font-bold">Not included</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {WELLNESS_NOT_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="start-with-a-guide-heading"
        className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-800">Guides</p>
        <h2 id="start-with-a-guide-heading" className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Start with a guide
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-7">
          Open a PDF if looping thoughts, interview stress, or job-search pressure are getting in
          the way. Education only — download and use what you need.
        </p>

        <article className="mt-8 grid overflow-hidden rounded-3xl border border-teal-200/80 bg-white shadow-[0_16px_40px_rgba(13,148,136,0.08)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative aspect-[4/5] bg-black sm:aspect-square md:aspect-auto md:min-h-[22rem]">
            {featured.cover ? (
              <Image
                src={featured.cover}
                alt={featured.coverAlt ?? featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-contain"
              />
            ) : null}
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800">
              {featured.tag} · {featured.format}
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-[0.95rem] sm:leading-7">
              {featured.summary}
            </p>
            <div className="mt-6">
              <ResourceActions item={featured} featuredCard />
            </div>
          </div>
        </article>

        {morePdfs.length > 0 ? (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {morePdfs.map((item) => {
              const Icon = GUIDE_ICONS[item.id] ?? FileText;
              return (
                <li
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-teal-200/70 bg-white p-5 sm:p-6"
                >
                  {item.cover ? (
                    <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-white ring-1 ring-teal-200/70">
                      <Image
                        src={item.cover}
                        alt={item.coverAlt ?? item.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0fdfa] text-teal-700 ring-1 ring-teal-200/80">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  )}
                  <p
                    className={`text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800 ${
                      item.cover ? '' : 'mt-4'
                    }`}
                  >
                    {item.tag} · {item.format}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-zinc-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{item.summary}</p>
                  <div className="mt-4">
                    <ResourceActions item={item} />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <figure className="rounded-3xl border border-teal-200/80 bg-white p-5 shadow-[0_12px_32px_rgba(13,148,136,0.07)] sm:p-6">
            <figcaption className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800">
              The loop the 30-day guide interrupts
            </figcaption>
            <div className="mt-6 flex flex-col items-center gap-3">
              {['A thought shows up', 'Worry adds more thoughts', 'The loop takes the day'].map((label, index) => (
                <div key={label} className="flex w-full max-w-xs flex-col items-center">
                  <div className="w-full rounded-xl border border-teal-200 bg-[#f0fdfa] px-4 py-3 text-center text-sm font-semibold text-zinc-800">
                    {label}
                  </div>
                  {index < 2 ? (
                    <span className="my-1 text-teal-400" aria-hidden>
                      ↓
                    </span>
                  ) : (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700">
                      <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                      Repeats
                    </span>
                  )}
                </div>
              ))}
            </div>
          </figure>

          <figure className="rounded-3xl border border-teal-200/80 bg-white p-5 shadow-[0_12px_32px_rgba(13,148,136,0.07)] sm:p-6">
            <figcaption className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800">
              A clearer 30-day path
            </figcaption>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {WELLNESS_GUIDE_PHASES.map((phase, index) => (
                <li key={phase.label} className="relative flex flex-col rounded-2xl bg-[#f8fffd] p-4 ring-1 ring-teal-200/70">
                  <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-teal-700">
                    {String(index + 1).padStart(2, '0')} · {phase.label}
                  </span>
                  <p className="mt-3 text-sm font-bold text-zinc-900">{phase.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{phase.body}</p>
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        {books.length > 0 ? (
          <div>
            <h2 className="text-lg font-bold text-zinc-900 sm:text-xl">Go deeper with books</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
              After the guides, these titles cover emotional balance, stress, and staying well while
              work and AI keep changing.
            </p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {books.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-teal-200/70 bg-white p-5 sm:p-6"
                >
                  {item.cover ? (
                    <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-[#f0fdfa]">
                      <Image
                        src={item.cover}
                        alt={item.coverAlt ?? item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-contain p-3"
                      />
                    </div>
                  ) : (
                    <FileText className="mb-4 h-8 w-8 text-teal-700" aria-hidden />
                  )}
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800">
                    {item.tag} · {item.format}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-zinc-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{item.summary}</p>
                  <div className="mt-4">
                    <ResourceActions item={item} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12 rounded-2xl border border-teal-200/70 bg-white p-6 text-center sm:p-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-teal-700">
            <Users className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-4 text-sm font-semibold text-zinc-900">Want a session or a custom resource?</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Wellness education is available as group or quoted sessions. Community and awareness
            programs are welcome to reach out.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className={ctaPrimaryClass}>
              Contact SK Creation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
