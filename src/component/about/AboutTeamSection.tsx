'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { container, sectionPad } from '@/component/home/styles';

const FOUNDER = {
  name: 'Dr. SK',
  role: 'Founding Engineer',
  contribution:
    'Shapes the vision, leads enterprise AI strategy, and turns complex workflows into production-ready AI systems.',
  photo: '/agent0.png',
};

const AGENTS = [
  {
    name: 'Maya',
    role: 'Solution Architect',
    contribution:
      'Designs AI agents, RAG pipelines, tool integrations, and reliable multi-agent workflows for real production systems.',
    photo: '/agent2.png',
  },
  {
    name: 'Ayan',
    role: 'AI Advisor',
    contribution:
      'Guides practical AI adoption — where agents belong, what to automate, and how to keep systems useful, safe, and grounded.',
    photo: '/agent1.png',
  },
  {
    name: 'Aria',
    role: 'Creator',
    contribution:
      'Creates AI resources, books, community content, and wellness-focused learning experiences people can actually use.',
    photo: '/agent3.png',
  },
] as const;

function Portrait({ src, alt, featured = false }: { src: string; alt: string; featured?: boolean }) {
  return (
    <div
      className={`relative mx-auto aspect-square w-full ${
        featured ? 'max-w-[18rem] sm:max-w-[20rem]' : 'max-w-[15.5rem]'
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 70vw, 320px"
      />
    </div>
  );
}

export default function AboutTeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className={`relative scroll-mt-20 overflow-hidden border-b border-teal-900/40 bg-[#05080c] text-white ${sectionPad}`}
    >
      <div className={`relative ${container}`}>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="team-heading"
            className="text-[1.65rem] font-extrabold leading-tight tracking-tight sm:text-4xl md:text-[2.5rem]"
          >
            Our Team
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            Build with AI. Learn. Adapt. Lead.
          </p>
        </div>

        <motion.article
          id="founder"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-10 max-w-md p-4 text-center sm:mt-12 sm:p-5"
        >
          <Portrait src={FOUNDER.photo} alt={FOUNDER.name} featured />
          <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">{FOUNDER.name}</h3>
          <p className="mt-1 text-sm font-semibold text-teal-300">{FOUNDER.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{FOUNDER.contribution}</p>
        </motion.article>

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent, index) => (
            <motion.li
              key={agent.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex h-full flex-col p-3 text-center sm:p-4"
            >
              <Portrait src={agent.photo} alt={`${agent.name}, ${agent.role}`} />
              <h3 className="mt-4 text-xl font-bold text-white">{agent.name}</h3>
              <p className="mt-1 text-sm font-semibold text-teal-300">{agent.role}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{agent.contribution}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
