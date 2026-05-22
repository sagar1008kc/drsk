'use client';

import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '@/lib/projects';
import InteractiveFeaturedCard from '@/component/project/InteractiveFeaturedCard';

export default function LiveProductShowcase() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.06 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className="mt-10 flex w-full flex-col gap-5 sm:mt-12 sm:gap-6 lg:gap-8"
    >
      {FEATURED_PROJECTS.map((project, i) => (
        <div key={project.id} className="w-full min-w-0">
          <InteractiveFeaturedCard project={project} index={i} />
        </div>
      ))}
    </motion.div>
  );
}
