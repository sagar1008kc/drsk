'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionShell from './SectionShell';
import {
  badgeClass,
  container,
  ctaPrimary,
  ctaSecondary,
  glassCard,
  sectionDesc,
  sectionTitle,
} from './styles';

const exploreCards = [
  {
    title: 'Services',
    subtitle: 'AI, Clarity & Mental Wellness Guidance',
    body: 'Book a private session with Dr. SK for mental wellness awareness, clarity, resilience, and navigating personal or professional pressure in the AI era.',
    listLabel: 'Session may help with:',
    items: [
      'Stress and overwhelm awareness',
      'Mental wellness support conversations',
      'Clarity during career or life transitions',
      'Healthy balance in an always-on digital world',
      'Practical guidance and trusted resource direction',
    ],
    footer: '1:1 private session or Group Session',
    href: '/services',
    cta: 'Book a session',
    primary: true,
    delay: 0,
  },
  {
    title: 'Projects',
    subtitle: 'Practical AI for small and mid-sized businesses',
    body: 'Business-first AI for website assistance, lead capture, booking automation, feedback intelligence, and workflow acceleration.',
    listLabel: 'Focus areas',
    items: [
      'AI-Powered Workflow Automation',
      'Website & Application Development',
      'Smart Integrations and Assistants',
      'Operational Efficiency Solutions',
    ],
    href: '/project',
    cta: 'Explore projects',
    primary: true,
    delay: 0.08,
  },
  {
    title: 'Know about Dr. SK',
    subtitle: 'Software Engineer · AI Integration',
    body: 'Fortune 500 software engineer — enterprise AI integration, production systems, USAII Certified AI Scientist, MHFA Certified.',
    href: '/about',
    cta: 'More about Dr. SK',
    primary: false,
    delay: 0.16,
  },
] as const;

export default function HomeExploreSection() {
  return (
    <SectionShell ariaLabelledBy="explore-heading">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Explore</span>
          <h2 id="explore-heading" className={`${sectionTitle} mt-3`}>
            Designed for real outcomes
          </h2>
          <p className={sectionDesc}>
            Services, project work, and author resources to support clarity, growth, and meaningful
            outcomes.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:gap-5 lg:grid lg:grid-cols-3 lg:gap-6">
          {exploreCards.map((card) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: card.delay }}
              className={glassCard}
            >
              <h3 className="text-xl font-bold text-white">{card.title}</h3>
              <p className="mt-2 text-sm font-medium text-violet-200/90">{card.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.body}</p>
              {'items' in card && card.items ? (
                <>
                  <p className="mt-4 text-sm font-semibold text-zinc-200">{card.listLabel}</p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-zinc-400">
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {'footer' in card && card.footer ? (
                <p className="mt-3 text-sm text-zinc-500">{card.footer}</p>
              ) : null}
              <Link
                href={card.href}
                className={`mt-6 ${card.primary ? ctaPrimary : ctaSecondary}`}
              >
                {card.cta}
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
