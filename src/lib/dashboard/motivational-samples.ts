import { HANDBOOK_PUBLIC_PATH } from '@/lib/handbook-public';

/** Static sample PDFs under /public/samples — swap files or add rows as the library grows. */

export type MotivationalSampleCategory =
  | 'motivation'
  | 'habits'
  | 'mindfulness'
  | 'resilience';

export type MotivationalSample = {
  id: string;
  title: string;
  description: string;
  /** Public path under /public */
  href: string;
  /** Suggested download filename */
  fileName: string;
  category: MotivationalSampleCategory;
};

export const motivationalSampleCategories: {
  id: MotivationalSampleCategory | 'all';
  label: string;
}[] = [
  { id: 'all', label: 'All' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'habits', label: 'Habits' },
  { id: 'mindfulness', label: 'Mindfulness' },
  { id: 'resilience', label: 'Resilience' },
];

export const motivationalSamples: MotivationalSample[] = [
  {
    id: 'handbook',
    title: 'The Mind Matters Handbook',
    description:
      'A full free guide — mind, habits, and practical steps. Download below or get it by email when you subscribe.',
    href: HANDBOOK_PUBLIC_PATH,
    fileName: 'The-Mind-Matters-Handbook-by-Dr-SK.pdf',
    category: 'mindfulness',
  },
  {
    id: '1',
    title: 'Morning Mindset Reset',
    description: 'Short prompts to start the day with intention — placeholder preview pages.',
    href: '/samples/Placeholder_Motivational_Book_01.pdf',
    fileName: 'Placeholder_Motivational_Book_01.pdf',
    category: 'motivation',
  },
  {
    id: '2',
    title: 'Momentum in 10 Minutes',
    description: 'A compact exercise to break procrastination loops (sample).',
    href: '/samples/Placeholder_Motivational_Book_02.pdf',
    fileName: 'Placeholder_Motivational_Book_02.pdf',
    category: 'habits',
  },
  {
    id: '3',
    title: 'Breathing Through Stress',
    description: 'Grounding cues you can use before meetings or tough conversations.',
    href: '/samples/Placeholder_Motivational_Book_03.pdf',
    fileName: 'Placeholder_Motivational_Book_03.pdf',
    category: 'mindfulness',
  },
  {
    id: '4',
    title: 'Bounce Back Basics',
    description: 'Reframe setbacks into next steps — introductory sample pages.',
    href: '/samples/Placeholder_Motivational_Book_04.pdf',
    fileName: 'Placeholder_Motivational_Book_04.pdf',
    category: 'resilience',
  },
];
