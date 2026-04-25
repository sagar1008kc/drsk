import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalProse } from '@/component/LegalProse';

export const metadata: Metadata = {
  title: 'Session disclaimer',
  description:
    'Important limitations for virtual sessions, awareness discussions, and digital services.',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#0A0B12] px-4 pb-20 pt-0 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          <Link href="/" className="text-violet-400 hover:text-violet-300">
            Home
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          Legal
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Session &amp; services disclaimer
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: April 10, 2026. Please read this carefully before booking
          or engaging digital services.
        </p>

        <LegalProse>
          <h2>1. Nature of virtual sessions</h2>
          <p>
            Virtual sessions may include career, technology, branding, writing, and
            general wellness <strong>awareness</strong> topics. They are educational
            and conversational in nature. They are{' '}
            <strong>not</strong> a substitute for medical care, psychotherapy,
            counseling, or emergency services. If you are in crisis or may harm
            yourself or others, contact local emergency services or a crisis line
            immediately.
          </p>

          <h2>2. No therapist–patient or similar relationship</h2>
          <p>
            Booking or attending a session does not create a therapist–patient,
            doctor–patient, or other regulated professional relationship. We do not
            diagnose, treat, or cure medical or mental health conditions.
          </p>

          <h2>3. Results</h2>
          <p>
            Outcomes depend on many factors outside our control. We do not guarantee
            specific results (e.g. job offers, income, health outcomes, or business
            performance).
          </p>

          <h2>4. Digital services</h2>
          <p>
            Websites, integrations, and related work are provided under agreed scope
            and timelines. You are responsible for your content, compliance with laws
            (including accessibility and industry rules), and use of third-party
            services. We are not liable for downtime or changes made by vendors,
            hosting providers, or platforms.
          </p>

          <h2>5. Third parties</h2>
          <p>
            Video, payment, email, and analytics tools are provided by third parties
            under their terms. Your use of those services may be subject to separate
            policies.
          </p>

          <h2>6. Agreement</h2>
          <p>
            By using this site, booking, or requesting services, you acknowledge this
            disclaimer and our{' '}
            <Link href="/terms">Terms of Service</Link> and{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <p className="text-sm text-zinc-500">
            This disclaimer supports clear expectations and risk allocation; it is
            not a substitute for legal advice tailored to your business.
          </p>
        </LegalProse>
      </div>
    </main>
  );
}
