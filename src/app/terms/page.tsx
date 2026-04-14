import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalProse } from '@/component/LegalProse';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Dr. SK website, virtual sessions, and digital services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0B12] px-4 pb-20 pt-10 text-white md:pt-14">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          <Link href="/" className="text-violet-400 hover:text-violet-300">
            Home
          </Link>
          <span className="mx-2 text-zinc-600">/</span>
          Legal
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: April 10, 2026. These terms govern use of this website and
          paid or complimentary services offered by Dr. SK (“we,” “us”). By booking
          a session, requesting a quote, or using the site, you agree to these terms.
        </p>

        <LegalProse>
          <h2>1. Services</h2>
          <p>
            We provide virtual sessions (including career, branding, and educational
            discussions), digital solutions (such as websites and related work),
            and occasional complimentary sessions for qualifying nonprofit or
            community contexts, as described on the Services page. Deliverables,
            timelines, and fees for digital work are agreed in writing (including
            email) unless otherwise stated.
          </p>

          <h2>2. Not professional advice</h2>
          <p>
            Sessions are for general education, coaching-style conversation, and
            practical guidance. They do{' '}
            <strong>not</strong> constitute medical, psychological, legal,
            accounting, or other regulated professional advice, and they do not
            create a clinician–patient or attorney–client relationship. See also our{' '}
            <Link href="/disclaimer">Session disclaimer</Link>.
          </p>

          <h2>3. Booking, payment, and refunds</h2>
          <p>
            Paid sessions are confirmed after successful payment through our
            payment processor (e.g. Stripe). Fees are as listed at checkout unless
            we agree otherwise in writing. Refund and cancellation rules depend on
            what we communicate at booking and applicable law; unless stated
            otherwise, fees for completed or no-show sessions may not be refundable.
            Chargebacks or payment disputes may result in cancellation of future
            bookings.
          </p>

          <h2>4. Scheduling and video meetings</h2>
          <p>
            Preferred times are requests only; final time is confirmed by email.
            Video links (e.g. Google Meet) are provided for convenience. You are
            responsible for a suitable environment and connection. We are not
            liable for failures of third-party platforms.
          </p>

          <h2>5. Digital deliverables</h2>
          <p>
            Quotes are estimates unless fixed in a statement of work. You grant any
            materials and approvals we need to perform work. Upon full payment,
            unless agreed otherwise, you receive a license to use deliverables for
            the scope described. We may reuse non-confidential techniques and
            tools across projects. Either party may terminate a project for material
            breach; remedies are limited as set out below.
          </p>

          <h2>6. Acceptable use</h2>
          <p>
            You will not use the site or sessions for unlawful, harassing, or
            harmful activity, or to transmit malware. We may refuse or end service
            for violations.
          </p>

          <h2>7. Intellectual property</h2>
          <p>
            Site content, branding, and our materials are owned by us or our
            licensors. You may not copy or redistribute them without permission
            except as allowed by law or explicit license.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any
            indirect, incidental, special, consequential, or punitive damages, or
            loss of profits, data, or goodwill. Our total liability for any claim
            arising from these terms or the services is limited to the amount you
            paid us for the specific service in the three (3) months before the
            claim (or fifty U.S. dollars if no payment applies). Some jurisdictions
            do not allow certain limitations; in those cases, our liability is
            limited to the fullest extent allowed.
          </p>

          <h2>9. Indemnity</h2>
          <p>
            You agree to indemnify and hold us harmless from claims arising from
            your use of the services, your content, or your violation of these
            terms, except to the extent caused by our willful misconduct.
          </p>

          <h2>10. Disclaimers</h2>
          <p>
            Services and the site are provided “as is” without warranties of any
            kind, express or implied, including merchantability or fitness for a
            particular purpose, to the fullest extent permitted by law.
          </p>

          <h2>11. Changes</h2>
          <p>
            We may update these terms by posting a new date above. Continued use
            after changes constitutes acceptance of the revised terms for new
            bookings.
          </p>

          <h2>12. Governing law</h2>
          <p>
            These terms are governed by the laws of the United States and the
            State of Texas, without regard to conflict-of-law rules, except where
            mandatory consumer protections apply in your jurisdiction.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions: <strong>info@skcreation.org</strong> (or the contact email
            shown on this site).
          </p>

          <p className="text-sm text-zinc-500">
            This page is provided for clarity and risk reduction; it is not
            individualized legal advice. Consult a qualified attorney for your
            situation.
          </p>
        </LegalProse>
      </div>
    </main>
  );
}
