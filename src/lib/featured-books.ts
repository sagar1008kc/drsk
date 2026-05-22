export type FeaturedBook = {
  id: string;
  image: string;
  alt: string;
  shortTitle: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  accent: 'indigo' | 'amber';
  /** PNG has transparency — do not place on a solid cover background */
  transparentImage?: boolean;
};

export const FEATURED_BOOKS: FeaturedBook[] = [
  {
    id: 'ai',
    image: '/aibook.png',
    alt: 'AI and future-focused books by Dr. SK',
    shortTitle: 'AI Books',
    title: 'Do you want to know how AI is changing and shaping the world?',
    body: 'Read this practical AI book set to understand what is changing, what skills matter now, and how to stay relevant with confidence in your work and life.',
    href: 'https://www.amazon.com/author/sagar2025',
    cta: 'View on Amazon',
    accent: 'indigo',
  },
  {
    id: 'wellness',
    image: '/eb.png',
    alt: 'Emotional balance and wellness books by Dr. SK',
    shortTitle: 'Wellness Books',
    title: 'Are you struggling with a busy life, AI changes, and emotional overload?',
    body: 'Learn how to balance emotions, reduce stress, and build a happier daily life even in fast-changing times. Start with these emotional wellness books.',
    href: 'https://www.amazon.com/author/drsk1',
    cta: 'View on Amazon',
    accent: 'amber',
    transparentImage: true,
  },
];
