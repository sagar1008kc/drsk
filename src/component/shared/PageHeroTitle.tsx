'use client';

import { motion } from 'framer-motion';

type PageHeroTitleProps = {
  children: string;
  gradientClass: string;
};

export default function PageHeroTitle({ children, gradientClass }: PageHeroTitleProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="font-rubik80s text-[clamp(3.25rem,12vw,6.5rem)] font-normal leading-[0.92] tracking-tight"
    >
      <span
        className={`bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(139,92,246,0.25)] ${gradientClass}`}
      >
        {children}
      </span>
    </motion.h1>
  );
}
