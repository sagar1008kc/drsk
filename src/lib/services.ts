export type Service = {
  key: 'business' | 'support';
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  oldPrice: string;
  newPrice: string;
  duration: string;
  accent: 'emerald' | 'sky';
  note?: string;
};

export const PAYPAL_PAYMENT_LINK =
  'https://www.paypal.com/ncp/payment/3PTTLHVCCS6FW';

export const SESSION_SERVICES: Service[] = [
  {
    key: 'business',
    tag: 'Business / Career',
    title: 'Business & Career Advancement',
    description:
      'Focused virtual guidance for professionals, job seekers, and creators who want clearer direction, stronger positioning, and practical next steps.',
    bullets: [
      'Career development and job search strategy',
      'Book writing and publishing support',
      'AI integration and strategy for businesses and creators',
      'Digital business and personal brand development',
    ],
    oldPrice: '$250',
    newPrice: '$99',
    duration: '1 hour',
    accent: 'emerald',
  },
  {
    key: 'support',
    tag: 'Support / Awareness',
    title: 'Mental Health Support Session',
    description:
      'Supportive non-clinical conversations focused on awareness, emotional check-ins, encouragement, and practical guidance.',
    bullets: [
      'Stress and emotional awareness',
      'Supportive listening',
      'Burnout and life-balance discussion',
      'Resource and help-seeking guidance',
    ],
    oldPrice: '$250',
    newPrice: '$99',
    duration: '1 hour',
    accent: 'sky',
    note:
      'Support sessions are educational and supportive only. No therapy, diagnosis, or medical treatment is provided.',
  },
];
