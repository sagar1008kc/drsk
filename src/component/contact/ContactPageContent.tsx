'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';
import ContactForm from '@/component/Contact';
import AiHeroDiagram from '@/component/shared/AiHeroDiagram';
import { badgeClass, container, sectionDesc, sectionTitle } from '@/component/home/styles';

const CONTACT_EMAIL = 'info@skcreation.org';

export default function ContactPageContent() {
  return (
    <main className="min-h-screen bg-[#F8F7FF] text-zinc-900">
      <section className="relative -mt-14 overflow-hidden border-b border-violet-200/60 pt-20 pb-12 sm:pb-16 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.4]">
          <AiHeroDiagram theme="light" />
        </div>
        <div className="dot-pattern pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_20%,rgba(139,92,246,0.12),transparent_60%)]" />

        <div className={`${container} relative px-5 sm:px-8 lg:px-12`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className={badgeClass}>
              <MessageSquare className="mr-1.5 inline h-3.5 w-3.5" aria-hidden />
              Contact
            </span>
            <h1 className={`${sectionTitle} mt-3`}>Get in touch</h1>
            <p className={sectionDesc}>
              Questions about services, projects, or resources? Send a message below or email us
              directly.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-600"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {CONTACT_EMAIL}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-8 max-w-xl sm:mt-10"
          >
            <ContactForm appearance="light" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
