import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Tools & Integration Services POC',
  description:
    'Professional demo blueprint for an AI tools and AI integration services platform.',
};

const inScope = [
  'AI-powered website assistant',
  'Lead capture and qualification',
  'Feedback collection and summarization',
  'Booking request assistant',
  'Knowledge-based business Q&A',
  'Human handoff and escalation',
  'Dashboard for leads, conversations, and insights',
  'Integrations with email and webhooks',
  'Configurable automation rules',
];

const outOfScope = [
  'Fully autonomous enterprise agents',
  'Regulated medical or legal decision automation',
  'Voice-first experience as primary channel',
  'Deep ERP orchestration in phase one',
  'Mobile apps as the first delivery channel',
];

const modules = [
  'Organization setup',
  'Knowledge management',
  'AI chat and escalation',
  'Lead management',
  'Booking requests',
  'Feedback and sentiment trends',
  'Integrations and connectors',
  'Automation rules',
  'Reporting and activity logs',
];

const phases = [
  {
    name: 'Phase 1: POC',
    goal: 'Validate a complete but focused end-to-end flow.',
    points: [
      'Organization setup and knowledge input',
      'Chat widget with grounded FAQ answers',
      'Lead capture, booking request, and feedback submission',
    ],
  },
  {
    name: 'Phase 2: MVP',
    goal: 'Make the product usable by real customers.',
    points: [
      'Admin dashboard and conversation history',
      'Lead and knowledge management improvements',
      'Email notifications, integrations, and activity logs',
    ],
  },
  {
    name: 'Phase 3: Production Platform',
    goal: 'Scale reliably across multiple businesses.',
    points: [
      'Role-based access and stronger multi-tenant controls',
      'Subscription billing and advanced integrations',
      'Monitoring, analytics, and prompt/version operations',
    ],
  },
];

export default function AiPocPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] pb-16 pt-3 text-zinc-100 sm:pb-20 sm:pt-4 md:pt-8">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A962]">
          AI POC
        </p>
        <h1 className="mt-2 max-w-4xl font-display text-2xl font-bold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl">
          Design Guide: AI Tools and AI Integration Services Platform
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:mt-5 md:text-base">
          Practical AI solutions for smarter business operations. This demo focuses
          on measurable outcomes: faster customer responses, reduced repetitive
          work, improved lead capture, and stronger decision support.
        </p>

        <section className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-3 md:p-4">
          <div className="border-b border-white/10 px-2 pb-3 pt-1 md:px-3">
            <h2 className="text-lg font-semibold">POC Demo Preview</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Snapshot of the AI tools and integration services experience designed
              for business stakeholders and pilot discussions.
            </p>
          </div>
          <div className="mt-3">
            <Image
              src="/demoAI.png"
              alt="AI tools and integration services demo preview"
              width={1600}
              height={1000}
              className="h-auto w-full rounded-2xl object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
            <p className="text-xs uppercase tracking-widest text-[#C9A962]">
              Direction 01
            </p>
            <h2 className="mt-2 text-lg font-semibold">AI Tools</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Reusable products like website assistants, feedback analyzers, lead
              capture workflows, and internal copilots.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
            <p className="text-xs uppercase tracking-widest text-[#C9A962]">
              Direction 02
            </p>
            <h2 className="mt-2 text-lg font-semibold">Integration Services</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Tailored implementation across websites, communication channels,
              business workflows, and operational systems.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
            <p className="text-xs uppercase tracking-widest text-[#C9A962]">
              Outcome
            </p>
            <h2 className="mt-2 text-lg font-semibold">Revenue Model</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Recurring product subscriptions combined with project-based
              integration revenue and managed support.
            </p>
          </article>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-semibold">Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Help businesses work smarter, respond faster, and grow more
              efficiently by applying AI in practical, reliable, and
              business-focused ways.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-semibold">Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Become a trusted provider of practical AI solutions through product
              modules, implementation services, and long-term operational support.
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 p-6 md:p-8">
          <h3 className="text-xl font-semibold">Problem Statement</h3>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Many businesses want AI but lack a clear starting point, internal
            expertise, and operational integration support. Generic tools often
            miss real business workflows. This platform closes that gap with
            focused, outcome-driven AI solutions.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
                In scope
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                {inScope.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300">
                Out of scope (initial phase)
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                {outOfScope.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-semibold">Target Users</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Small and medium businesses, agencies, consultants, local service
              providers, and teams in support, operations, and sales that need AI
              without enterprise complexity.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-semibold">Business Objectives</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Drive recurring revenue, convert service projects into subscriptions,
              accelerate client acquisition with demos, and build a scalable SaaS
              foundation.
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 md:p-8">
          <h3 className="text-xl font-semibold">Core Modules</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <div
                key={module}
                className="rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300"
              >
                {module}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 md:p-8">
          <h3 className="text-xl font-semibold">High-Level Architecture</h3>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 p-3">
            <Image
              src="/architecture.png"
              alt="High-level architecture diagram for the AI platform"
              width={1400}
              height={1600}
              className="h-auto w-full rounded-xl object-contain"
              sizes="(max-width: 1024px) 100vw, 1100px"
            />
          </div>
          <div className="mt-4 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
            <p>1. Presentation: website widget, admin dashboard</p>
            <p>2. API/Application: chat, leads, booking, admin operations</p>
            <p>3. AI Orchestration: prompting, retrieval, safety, tool calls</p>
            <p>4. Business Logic: notifications, reporting, rule execution</p>
            <p>5. Data Layer: organizations, messages, leads, settings</p>
            <p>6. External Services: AI provider, email, webhook, CRM</p>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-zinc-500">
            Recommended stack: Next.js + React + TypeScript on frontend, API routes
            or Node.js service layer, PostgreSQL/Supabase data layer, and Vercel
            deployment with analytics and error monitoring.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 md:p-8">
          <h3 className="text-xl font-semibold">Implementation Roadmap</h3>
          <div className="mt-5 space-y-4">
            {phases.map((phase) => (
              <article
                key={phase.name}
                className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5"
              >
                <h4 className="text-base font-semibold">{phase.name}</h4>
                <p className="mt-1 text-sm text-zinc-400">{phase.goal}</p>
                <ul className="mt-3 space-y-1 text-sm text-zinc-300">
                  {phase.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-semibold">Initial API Surface</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              `POST /api/chat/start`, `POST /api/chat/message`, `POST /api/leads`,
              `POST /api/booking-request`, `POST /api/feedback`,
              `GET /api/admin/leads`, `GET /api/admin/conversations`,
              `POST /api/knowledge`.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-semibold">Success Metrics</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Measure chat engagement, lead capture, booking conversion, unresolved
              question rate, notification reliability, and service-to-subscription
              conversion.
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-500/5 p-6 md:p-8">
          <h3 className="text-xl font-semibold">Positioning</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300 md:text-base">
            We build AI tools and AI integration services that help businesses solve
            problems, automate work, improve customer response, and grow faster.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20 hover:text-cyan-100"
            >
              Explore services
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white"
            >
              Contact for pilot
            </Link>
            <Link
              href="/project"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white"
            >
              Back to projects
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
