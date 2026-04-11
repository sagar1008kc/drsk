import {
  ALLOWED_LANGUAGES,
  ALLOWED_PREFERRED_TIMES,
  getServiceByType,
  isValidServiceType,
  type ServiceTypeId,
} from '@/lib/services';

export type CreateBookingPayload = {
  serviceType: string;
  fullName: string;
  email: string;
  phone?: string;
  language: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  notes?: string;
  consent: boolean;
  company?: string;
  attendeeCount: number;
};

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCreateBookingPayload(
  raw: unknown
):
  | { ok: true; data: CreateBookingPayload & { serviceType: ServiceTypeId } }
  | { ok: false; errors: FieldErrors; honeypot?: boolean } {
  if (!raw || typeof raw !== 'object') {
    return { ok: false, errors: { _form: 'Invalid request body.' } };
  }

  const b = raw as Record<string, unknown>;

  const company =
    typeof b.company === 'string' ? b.company.trim() : '';
  if (company.length > 0) {
    return { ok: false, errors: {}, honeypot: true };
  }

  const serviceType =
    typeof b.serviceType === 'string' ? b.serviceType.trim() : '';
  const fullName =
    typeof b.fullName === 'string' ? b.fullName.trim() : '';
  const email = typeof b.email === 'string' ? b.email.trim() : '';
  const phone =
    typeof b.phone === 'string' ? b.phone.trim() : '';
  const language =
    typeof b.language === 'string' ? b.language.trim() : '';
  const preferredDate =
    typeof b.preferredDate === 'string' ? b.preferredDate.trim() : '';
  const preferredTime =
    typeof b.preferredTime === 'string' ? b.preferredTime.trim() : '';
  const timezone = 'America/Chicago';
  const notes =
    typeof b.notes === 'string' ? b.notes.trim() : '';
  const consent = b.consent === true;

  const errors: FieldErrors = {};

  if (!serviceType || !isValidServiceType(serviceType)) {
    errors.serviceType = 'Please choose a valid session type.';
  }

  const serviceConfig =
    serviceType && isValidServiceType(serviceType)
      ? getServiceByType(serviceType)
      : null;

  let attendeeCount = 1;
  if (serviceConfig?.groupPricing) {
    const rawAtt = b.attendeeCount;
    const n =
      typeof rawAtt === 'number' && Number.isInteger(rawAtt)
        ? rawAtt
        : parseInt(typeof rawAtt === 'string' ? rawAtt : '', 10);
    const { min, max } = serviceConfig.groupPricing;
    if (
      !Number.isFinite(n) ||
      n < min ||
      n > max
    ) {
      errors.attendeeCount = `Enter how many people will join (${min}–${max}).`;
    } else {
      attendeeCount = n;
    }
  }

  if (!fullName || fullName.length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!language || !ALLOWED_LANGUAGES.includes(language as (typeof ALLOWED_LANGUAGES)[number])) {
    errors.language = 'Please select a language.';
  }
  if (!preferredDate) {
    errors.preferredDate = 'Please choose a preferred date.';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    errors.preferredDate = 'Date must be YYYY-MM-DD.';
  }
  if (!preferredTime) {
    errors.preferredTime = 'Please choose a preferred time.';
  } else if (
    !ALLOWED_PREFERRED_TIMES.includes(
      preferredTime as (typeof ALLOWED_PREFERRED_TIMES)[number]
    )
  ) {
    errors.preferredTime = 'Invalid time selection.';
  }
  if (!consent) {
    const paidFlow = serviceConfig?.requiresPayment ?? true;
    errors.consent = paidFlow
      ? 'Please confirm you understand this is a paid session and that confirmation is sent after payment.'
      : 'Please confirm you understand this is a complimentary session and that confirmation will be sent by email.';
  }
  if (notes.length > 1000) {
    errors.notes = 'Notes must be 1000 characters or fewer.';
  }
  if (phone.length > 40) {
    errors.phone = 'Phone number is too long.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      serviceType: serviceType as ServiceTypeId,
      fullName,
      email,
      phone: phone || undefined,
      language,
      preferredDate,
      preferredTime,
      timezone,
      notes: notes || undefined,
      consent: true,
      attendeeCount,
    },
  };
}

export function validateCheckoutPayload(
  raw: unknown
): { ok: true; bookingId: string } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') {
    return { ok: false, error: 'Invalid request body.' };
  }
  const bookingId = (raw as { bookingId?: unknown }).bookingId;
  if (typeof bookingId !== 'string' || !/^[0-9a-f-]{36}$/i.test(bookingId)) {
    return { ok: false, error: 'Invalid booking id.' };
  }
  return { ok: true, bookingId };
}
