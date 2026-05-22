'use client';

import ContactForm from '@/component/Contact';
import SectionShell from './SectionShell';
import { badgeClass, container, sectionDesc, sectionTitle } from './styles';

export default function HomeContactSection() {
  return (
    <SectionShell id="contact" ariaLabelledBy="contact-heading" className="!border-b-0">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Contact</span>
          <h2 id="contact-heading" className={`${sectionTitle} mt-3`}>
            Get in touch
          </h2>
          <p className={sectionDesc}>
            Questions about services, projects, or resources? Send a message or email{' '}
            <a
              href="mailto:info@skcreation.org"
              className="font-medium text-violet-700 underline-offset-4 transition hover:text-violet-600 hover:underline"
            >
              info@skcreation.org
            </a>
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-xl sm:mt-10">
          <ContactForm appearance="light" />
        </div>
      </div>
    </SectionShell>
  );
}
