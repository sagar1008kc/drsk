export const SERVICE_IDS = [
  'business-career-session',
  'mental-health-support-session',
  'group-session',
  'scheduled-group-session',
  'nonprofit-community-session',
] as const;

export type ServiceTypeId = (typeof SERVICE_IDS)[number];

export type GroupPricing = {
  perPersonCents: number;
  min: number;
  max: number;
};

export type Service = {
  id: ServiceTypeId;
  tag: string;
  title: string;
  shortDescription: string;
  description: string;
  bullets: string[];
  oldPriceDisplay: string;
  priceDisplay: string;
  /** Flat session price (used when groupPricing is not set). */
  priceCents: number;
  currency: string;
  durationMinutes: number;
  durationLabel: string;
  featured: boolean;
  requiresPayment: boolean;
  accent: 'emerald' | 'sky' | 'violet' | 'rose';
  /** When set, total = perPersonCents × attendeeCount (server-validated). */
  groupPricing?: GroupPricing;
  note?: string;
};

export const ALLOWED_LANGUAGES = ['English', 'Nepali', 'Hindi'] as const;

/** Virtual session: pick one focus before checkout (shown in booking dialog). */
export const VIRTUAL_SESSION_FOCUS_OPTIONS = [
  'Career development and strategy',
  'Personal brand guidance',
  'Mental Health Awareness',
  'Book writing and publishing guidance',
  'Other',
] as const;

export type VirtualSessionFocus =
  (typeof VIRTUAL_SESSION_FOCUS_OPTIONS)[number];

/** Nonprofit complimentary session: program type (booking dialog). */
export const NONPROFIT_PROGRAM_OPTIONS = [
  'Mental health awareness program',
  'Career development',
  "Student success program",
  'Website development program',
  'AI education',
  'Community or school initiative (describe in Notes)',
] as const;

export type NonprofitProgramOption =
  (typeof NONPROFIT_PROGRAM_OPTIONS)[number];

/** Fixed-date group cohorts (date + topic locked at registration). */
export type GroupCohortEvent = {
  id: string;
  /** YYYY-MM-DD (US Central calendar day). */
  dateYmd: string;
  focus: string;
  labelDisplay: string;
};

export const GROUP_COHORT_EVENTS: GroupCohortEvent[] = [
  {
    id: 'cohort-2026-05-16',
    dateYmd: '2026-05-16',
    focus: 'Career development and strategy',
    labelDisplay: 'May 16, 2026',
  },
  {
    id: 'cohort-2026-06-20',
    dateYmd: '2026-06-20',
    focus: 'Mental health awareness',
    labelDisplay: 'June 20, 2026',
  },
  {
    id: 'cohort-2026-06-27',
    dateYmd: '2026-06-27',
    focus: 'Book writing and publishing guidance',
    labelDisplay: 'June 27, 2026',
  },
];

export function getCohortEventById(id: string): GroupCohortEvent | null {
  return GROUP_COHORT_EVENTS.find((e) => e.id === id) ?? null;
}

const SERVICES_BY_ID: Record<ServiceTypeId, Service> = {
  'business-career-session': {
    id: 'business-career-session',
    tag: 'Virtual Session',
    title: 'Virtual Session',
    shortDescription:
      'Private 1:1 session — guidance for career growth, AI usage, personal branding, and next steps.',
    description:
      'Private 1:1 (one-on-one) virtual session for career growth, AI usage, personal branding, and next steps.',
    bullets: [
      'Career development and strategy',
      'Personal brand guidance',
      'Mental Health Awareness',
      'Book writing and publishing guidance',
    ],
    oldPriceDisplay: '$250',
    priceDisplay: '$99',
    priceCents: 9900,
    currency: 'usd',
    durationMinutes: 60,
    durationLabel: '1 hour',
    featured: true,
    requiresPayment: true,
    accent: 'emerald',
  },
  'mental-health-support-session': {
    id: 'mental-health-support-session',
    tag: 'Support / Awareness',
    title: 'Mental Health Support Session',
    shortDescription:
      'Supportive non-clinical conversations focused on awareness and practical guidance.',
    description:
      'Supportive non-clinical conversations focused on awareness, emotional check-ins, encouragement, and practical guidance.',
    bullets: [
      'Stress and emotional awareness',
      'Supportive listening',
      'Burnout and life-balance discussion',
      'Resource and help-seeking guidance',
    ],
    oldPriceDisplay: '$250',
    priceDisplay: '$99',
    priceCents: 9900,
    currency: 'usd',
    durationMinutes: 60,
    durationLabel: '1 hour',
    featured: true,
    requiresPayment: true,
    accent: 'sky',
    note:
      'Support sessions are educational and supportive only. No therapy, diagnosis, or medical treatment is provided.',
  },
  'scheduled-group-session': {
    id: 'scheduled-group-session',
    tag: 'Group cohort',
    title: 'Group session',
    shortDescription:
      'Small-group video sessions on fixed dates with set topics. One price per seat.',
    description:
      'Register for a scheduled group session. Date and session focus are fixed for each cohort.',
    bullets: [
      'May 16, 2026 — Career development and strategy',
      'June 20, 2026 — Mental health awareness',
      'June 27, 2026 — Book writing and publishing guidance',
    ],
    oldPriceDisplay: '$150',
    priceDisplay: '$49 / seat',
    priceCents: 4900,
    currency: 'usd',
    durationMinutes: 90,
    durationLabel: '90 minutes',
    featured: true,
    requiresPayment: true,
    accent: 'violet',
  },
  'group-session': {
    id: 'group-session',
    tag: 'Group',
    title: 'Group Session',
    shortDescription:
      'Paid small-group sessions — $49 per participant (billed in one checkout).',
    description:
      'Virtual group sessions for teams, cohorts, or communities. Enter how many people will participate; checkout charges $49 per person in a single payment.',
    bullets: [
      '$49 per person (one payment for the whole group)',
      'Collaborative discussion format',
      'Ideal for small teams or peer groups',
      'Google Meet link after payment',
    ],
    oldPriceDisplay: '$99',
    priceDisplay: '$49 / person',
    priceCents: 4900,
    groupPricing: { perPersonCents: 4900, min: 2, max: 50 },
    currency: 'usd',
    durationMinutes: 90,
    durationLabel: '90 minutes',
    featured: true,
    requiresPayment: true,
    accent: 'violet',
  },
  'nonprofit-community-session': {
    id: 'nonprofit-community-session',
    tag: 'Nonprofit / Volunteer',
    title: 'Nonprofit & Community Session',
    shortDescription:
      'Complimentary sessions for registered nonprofits and volunteer-led community work.',
    description:
      'If you represent a registered nonprofit or lead volunteer community work, you can request a complimentary virtual session. Add a short note about your organization.',
    bullets: [
      'No charge — mission-driven and volunteer contexts',
      'Educational and supportive focus',
      'Subject to availability',
      'Confirmation by email with Google Meet',
    ],
    oldPriceDisplay: '',
    priceDisplay: 'Complimentary',
    priceCents: 0,
    currency: 'usd',
    durationMinutes: 60,
    durationLabel: '1 hour',
    featured: true,
    requiresPayment: false,
    accent: 'rose',
    note:
      'Offered when capacity allows. This is not a grant or formal endorsement — scheduling is confirmed by email.',
  },
};

export const SESSION_SERVICES: Service[] = Object.values(SERVICES_BY_ID);

export function isValidServiceType(id: string): id is ServiceTypeId {
  return SERVICE_IDS.includes(id as ServiceTypeId);
}

export function getServiceByType(id: string): Service | null {
  if (!isValidServiceType(id)) return null;
  return SERVICES_BY_ID[id];
}

/** Total charged in Stripe (server source of truth). */
export function totalCentsForBooking(
  service: Service,
  attendeeCount: number
): number {
  if (service.groupPricing) {
    return service.groupPricing.perPersonCents * attendeeCount;
  }
  return service.priceCents;
}

export function listPublicServices(): Pick<
  Service,
  | 'id'
  | 'tag'
  | 'title'
  | 'shortDescription'
  | 'oldPriceDisplay'
  | 'priceDisplay'
  | 'durationLabel'
  | 'accent'
  | 'note'
  | 'requiresPayment'
  | 'groupPricing'
>[] {
  return SESSION_SERVICES.map(
    ({
      id,
      tag,
      title,
      shortDescription,
      oldPriceDisplay,
      priceDisplay,
      durationLabel,
      accent,
      note,
      requiresPayment,
      groupPricing,
    }) => ({
      id,
      tag,
      title,
      shortDescription,
      oldPriceDisplay,
      priceDisplay,
      durationLabel,
      accent,
      note,
      requiresPayment,
      groupPricing,
    })
  );
}
