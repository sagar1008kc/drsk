import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalProse } from '@/component/LegalProse';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for drsk website and services.',
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: April 10, 2026. This policy describes how we collect, use,
          and share information when you use this website or our services.
        </p>

        <LegalProse>
          <h2>1. Who we are</h2>
          <p>
            This site (<strong>skcreation.org</strong>) is operated by Dr. SK in connection with
            professional and creative services and is part of <strong>SMIND BUSINESS LLC</strong>.
            Contact: <strong>info@skcreation.org</strong> (or the email listed in the contact
            section).
          </p>

          <h2>2. Information we collect</h2>
          <ul>
            <li>
              <strong>Contact and quote forms:</strong> name, email, phone (if
              provided), and message content.
            </li>
            <li>
              <strong>Bookings:</strong> name, email, phone, language, scheduling
              preferences, session notes, and payment-related identifiers processed
              by our payment provider.
            </li>
            <li>
              <strong>Technical data:</strong> IP address, browser type, and similar
              data logged by hosting or analytics tools if enabled.
            </li>
          </ul>

          <h2>3. How we use information</h2>
          <p>We use information to:</p>
          <ul>
            <li>Respond to inquiries and deliver booked services;</li>
            <li>Process payments and prevent fraud;</li>
            <li>Send confirmations and service-related messages;</li>
            <li>Improve the site and comply with law.</li>
          </ul>

          <h2>4. Legal bases (where applicable)</h2>
          <p>
            If GDPR or similar laws apply, we rely on contract (services you
            request), legitimate interests (operating and securing the site), and
            consent where required (e.g. certain cookies or marketing).
          </p>

          <h2>5. Sharing</h2>
          <p>
            We share data with service providers who help us run the site and
            business, including hosting, email, payments (e.g. Stripe), calendar or
            video tools, and databases — only as needed for those purposes. We may
            disclose information if required by law or to protect rights and
            safety.
          </p>

          <h2>6. Retention</h2>
          <p>
            We keep information as long as needed for the purposes above, including
            legal, tax, and dispute resolution, then delete or anonymize it in line
            with our practices and applicable law.
          </p>

          <h2>7. Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect
            information. No method of transmission over the Internet is 100% secure.
          </p>

          <h2>8. Your rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct,
            delete, or restrict processing of your personal data, or to object or
            port data. Contact us to exercise these rights. You may lodge a complaint
            with a supervisory authority where applicable.
          </p>

          <h2>9. Children</h2>
          <p>
            The site is not directed at children under 13 (or 16 where required). We
            do not knowingly collect their personal information.
          </p>

          <h2>10. International transfers</h2>
          <p>
            If you access the site from outside the United States, your information
            may be processed in the U.S. or other countries where we or our
            providers operate.
          </p>

          <h2>11. Changes</h2>
          <p>
            We may update this policy by posting a new “Last updated” date. Material
            changes may be highlighted on the site or by email where appropriate.
          </p>

          <p className="text-sm text-zinc-500">
            For specific privacy requests, email us with “Privacy request” in the
            subject line.
          </p>
        </LegalProse>
      </div>
    </main>
  );
}
