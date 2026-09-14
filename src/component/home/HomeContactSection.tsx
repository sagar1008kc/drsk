'use client';

import ContactForm from '@/component/Contact';
import { badgeTeal, container, sectionDesc, sectionPad, sectionTitle } from './styles';

export default function HomeContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`relative scroll-mt-20 overflow-hidden bg-white ${sectionPad}`}
    >
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeTeal}>Let&apos;s create</span>
          <h2 id="contact-heading" className={`${sectionTitle} mt-3`}>
            Let&apos;s Create Something Useful
          </h2>
          <p className={sectionDesc}>
            Looking for help with an AI initiative, digital product, collaboration, educational
            session, or community program? Tell us what you are trying to accomplish.
          </p>
          <p className={`${sectionDesc} mt-3`}>
            Or email{' '}
            <a
              href="mailto:info@skcreation.org"
              className="font-medium text-teal-800 underline-offset-4 transition hover:text-teal-700 hover:underline"
            >
              info@skcreation.org
            </a>
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-xl sm:mt-10">
          <p className="mb-4 text-center text-sm font-semibold text-zinc-800">
            Start a conversation
          </p>
          <ContactForm appearance="light" />
        </div>
      </div>
    </section>
  );
}
