export type MotivationalEbookCategory =
  | 'motivation'
  | 'habits'
  | 'mindfulness'
  | 'resilience';

export type MotivationalEbook = {
  id: string;
  slug: string;
  title: string;
  description: string;
  storageKey: string;
  fileName: string;
  category: MotivationalEbookCategory;
  isFree: boolean;
  priceCents: number | null;
  thumbnailUrl: string;
};

export const motivationalEbookCategories: {
  id: MotivationalEbookCategory | 'all';
  label: string;
}[] = [
  { id: 'all', label: 'All' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'habits', label: 'Habits' },
  { id: 'mindfulness', label: 'Mindfulness' },
  { id: 'resilience', label: 'Resilience' },
];

export const motivationalEbooks: MotivationalEbook[] = [
  {
    id: '01',
    slug: 'motivational-ebook-01',
    title: 'Motivational eBook 01',
    description:
      'Free starter guide with practical prompts to reset your mindset and move forward with clarity.',
    storageKey: 'ebook/motivational_ebook_01.pdf',
    fileName: 'motivational_ebook_01.pdf',
    category: 'motivation',
    isFree: true,
    priceCents: null,
    thumbnailUrl: '/relationship.png',
  },
  {
    id: '02',
    slug: 'motivational-ebook-02',
    title: 'Motivational eBook 02',
    description:
      'Premium workbook for building better daily habits with structured exercises and reflection templates.',
    storageKey: 'ebook/motivational_ebook_02.pdf',
    fileName: 'motivational_ebook_02.pdf',
    category: 'habits',
    isFree: false,
    priceCents: 399,
    thumbnailUrl: '/stop-overthinking.png',
  },
  {
    id: '03',
    slug: 'motivational-ebook-03',
    title: 'Motivational eBook 03',
    description:
      'Premium calming toolkit focused on overthinking, stress loops, and practical emotional grounding.',
    storageKey: 'ebook/motivational_ebook_03.pdf',
    fileName: 'motivational_ebook_03.pdf',
    category: 'mindfulness',
    isFree: false,
    priceCents: 399,
    thumbnailUrl: '/stop-overthinking.png',
  },
  {
    id: '04',
    slug: 'motivational-ebook-04',
    title: 'Motivational eBook 04',
    description:
      'Premium resilience playbook to recover from setbacks and turn uncertain moments into clear action.',
    storageKey: 'ebook/motivational_ebook_04.pdf',
    fileName: 'motivational_ebook_04.pdf',
    category: 'resilience',
    isFree: false,
    priceCents: 399,
    thumbnailUrl: '/stop-overthinking.png',
  },
  {
    id: '05',
    slug: 'motivational-ebook-05',
    title: 'Motivational eBook 05',
    description:
      'Premium growth edition with deeper routines and planning frameworks for long-term transformation.',
    storageKey: 'ebook/motivational_ebook_05.pdf',
    fileName: 'motivational_ebook_05.pdf',
    category: 'motivation',
    isFree: false,
    priceCents: 399,
    thumbnailUrl: '/stop-overthinking.png',
  },
];

export const motivationalPaidEbooks = motivationalEbooks.filter((book) => !book.isFree);
