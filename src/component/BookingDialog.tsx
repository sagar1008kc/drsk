'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import {
  totalCentsForBooking,
  VIRTUAL_SESSION_FOCUS_OPTIONS,
  type Service,
} from '@/lib/services';
import {
  CENTRAL_TZ,
  getTimeSlotsForChicagoDate,
  isChicagoWeekend,
  todayYmdChicago,
} from '@/lib/availability';

type BookingDialogProps = {
  visible: boolean;
  service: Service | null;
  onHide: () => void;
};

type FieldErrors = Record<string, string>;

function formatDateForInput(date: Date | null) {
  if (!date) return '';
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function BookingDialog({
  visible,
  service,
  onHide,
}: BookingDialogProps) {
  const titleId = useId();
  const companyFieldId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('');
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);
  const [preferredTime, setPreferredTime] = useState('');
  const [sessionFocus, setSessionFocus] = useState('');
  const [attendeeCount, setAttendeeCount] = useState(2);
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState('');

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverFieldErrors, setServerFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible || !service?.groupPricing) return;
    setAttendeeCount(service.groupPricing.min);
  }, [visible, service?.id]);

  const timeSlotOptions = useMemo(() => {
    if (!preferredDate) return [];
    const ymd = formatDateForInput(preferredDate);
    return getTimeSlotsForChicagoDate(ymd);
  }, [preferredDate]);

  useEffect(() => {
    if (!preferredTime) return;
    if (timeSlotOptions.length === 0) return;
    if (!timeSlotOptions.includes(preferredTime as (typeof timeSlotOptions)[number])) {
      setPreferredTime('');
    }
  }, [timeSlotOptions, preferredTime]);

  useEffect(() => {
    if (!preferredDate) setPreferredTime('');
  }, [preferredDate]);

  const resetForm = useCallback(() => {
    setFullName('');
    setEmail('');
    setPhone('');
    setLanguage('');
    setPreferredDate(null);
    setPreferredTime('');
    setSessionFocus('');
    setAttendeeCount(2);
    setNotes('');
    setConsent(false);
    setCompany('');
    setTouched({});
    setSubmitting(false);
    setServerError('');
    setServerFieldErrors({});
  }, []);

  const handleHide = useCallback(() => {
    resetForm();
    onHide();
  }, [onHide, resetForm]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleHide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, handleHide]);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [visible]);

  const validation: FieldErrors = useMemo(() => {
    const errors: FieldErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    if (!email.trim()) errors.email = 'Email is required.';
    else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
    if (!language) errors.language = 'Select a language.';
    if (!preferredDate) errors.preferredDate = 'Choose a preferred date.';
    if (!preferredTime) errors.preferredTime = 'Choose a preferred time.';
    else if (
      preferredDate &&
      timeSlotOptions.length > 0 &&
      !timeSlotOptions.includes(preferredTime as (typeof timeSlotOptions)[number])
    ) {
      errors.preferredTime = 'Choose a time that matches the selected day (weekday vs weekend).';
    }
    if (service?.id === 'business-career-session' && !sessionFocus.trim()) {
      errors.sessionFocus = 'Select what you want to focus on in this session.';
    }
    if (service?.groupPricing) {
      const { min, max } = service.groupPricing;
      if (
        !Number.isInteger(attendeeCount) ||
        attendeeCount < min ||
        attendeeCount > max
      ) {
        errors.attendeeCount = `Enter how many people will join (${min}–${max}).`;
      }
    }
    if (!consent) {
      const paidFlow = service?.requiresPayment ?? true;
      errors.consent = paidFlow
        ? 'Please confirm you understand this is a paid session and that confirmation is sent after payment.'
        : 'Please confirm you understand this is a complimentary session and that confirmation will be sent by email.';
    }
    if (notes.length > 1000) {
      errors.notes = 'Notes must be 1000 characters or fewer.';
    }
    return errors;
  }, [
    fullName,
    email,
    language,
    preferredDate,
    preferredTime,
    sessionFocus,
    timeSlotOptions,
    attendeeCount,
    consent,
    notes,
    service,
  ]);

  const estimatedTotalCents = useMemo(() => {
    if (!service) return 0;
    const n = service.groupPricing ? attendeeCount : 1;
    return totalCentsForBooking(service, n);
  }, [service, attendeeCount]);

  const formattedEstimate = useMemo(() => {
    if (estimatedTotalCents <= 0) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(estimatedTotalCents / 100);
  }, [estimatedTotalCents]);

  const canContinue =
    Object.keys(validation).length === 0 && Boolean(service) && !company.trim();

  const markTouched = (key: string) => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const fieldMessage = (key: string) =>
    serverFieldErrors[key] || validation[key];

  const showErr = (key: string) =>
    Boolean(
      (touched[key] || touched._submit || serverFieldErrors[key]) &&
        fieldMessage(key)
    );

  const handleContinueToPayment = async () => {
    if (!service) return;
    setTouched((t) => ({ ...t, _submit: true }));
    setServerError('');
    setServerFieldErrors({});

    if (company.trim()) {
      return;
    }

    if (Object.keys(validation).length > 0) {
      toast.error('Please fix the highlighted fields.');
      return;
    }

    setSubmitting(true);
    try {
      const createRes = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: service.id,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          language,
          preferredDate: formatDateForInput(preferredDate),
          preferredTime,
          timezone: CENTRAL_TZ,
          attendeeCount: service.groupPricing ? attendeeCount : 1,
          notes: notes.trim() || undefined,
          sessionFocus:
            service.id === 'business-career-session'
              ? sessionFocus.trim()
              : undefined,
          consent: true,
          company: company.trim() || undefined,
        }),
      });

      const createData = (await createRes.json()) as {
        bookingId?: string;
        flow?: 'checkout' | 'complimentary';
        errors?: FieldErrors;
        error?: string;
        ok?: boolean;
      };

      if (createRes.ok && createData.ok && !createData.bookingId) {
        handleHide();
        return;
      }

      if (!createRes.ok) {
        if (createData.errors) {
          setServerFieldErrors(createData.errors);
          setTouched((t) => {
            const next: Record<string, boolean> = { ...t, _submit: true };
            for (const k of Object.keys(createData.errors!)) next[k] = true;
            return next;
          });
          toast.error('Some fields need attention.');
          return;
        }
        throw new Error(createData.error || 'Could not create booking.');
      }

      const bookingId = createData.bookingId;
      if (!bookingId) {
        throw new Error('Missing booking reference.');
      }

      if (createData.flow === 'complimentary') {
        const confirmRes = await fetch('/api/booking/confirm-complimentary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId }),
        });
        const confirmData = (await confirmRes.json()) as {
          ok?: boolean;
          error?: string;
        };
        if (!confirmRes.ok || !confirmData.ok) {
          throw new Error(
            confirmData.error || 'Could not complete complimentary booking.'
          );
        }
        window.location.href = '/booking/success?complimentary=1';
        return;
      }

      const checkoutRes = await fetch('/api/booking/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });

      const checkoutData = (await checkoutRes.json()) as {
        url?: string;
        error?: string;
      };

      if (!checkoutRes.ok || !checkoutData.url) {
        throw new Error(checkoutData.error || 'Could not start checkout.');
      }

      window.location.href = checkoutData.url;
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : 'Something went wrong. Try again.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!service || !mounted || !visible) return null;

  const inputClass =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10';
  const inputErrorClass = ' border-red-400 focus:border-red-500 focus:ring-red-200';

  const modal = (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close booking dialog"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleHide}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-[1] max-h-[min(92vh,880px)] w-full max-w-[720px] overflow-y-auto rounded-[24px] border border-white/10 bg-white text-black shadow-2xl outline-none"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur-sm md:px-6">
          <div className="min-w-0 pr-2">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Book session
            </div>
            <h2 id={titleId} className="mt-2 text-xl font-bold md:text-2xl">
              {service.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {service.requiresPayment
                ? 'Complete the form, then pay securely with Stripe. Confirmation and your meeting link are sent after payment succeeds.'
                : 'Complete the form to request a complimentary session. Confirmation and meeting details are sent by email — there is no payment step.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleHide}
            className="shrink-0 rounded-full border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50 hover:text-black"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 md:px-6 md:py-6">
          <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Selected session
                </p>
                <p className="mt-1 text-lg font-bold text-black">{service.title}</p>
              </div>
              <div className="text-right">
                {service.oldPriceDisplay ? (
                  <p className="text-sm text-gray-500 line-through">
                    {service.oldPriceDisplay}
                  </p>
                ) : null}
                {service.groupPricing && formattedEstimate ? (
                  <>
                    <p className="text-3xl font-bold text-green-600">
                      {formattedEstimate}
                    </p>
                    <p className="text-sm text-gray-600">
                      {service.groupPricing.perPersonCents / 100} USD ×{' '}
                      {attendeeCount} people
                    </p>
                  </>
                ) : (
                  <p
                    className={`text-3xl font-bold ${
                      service.requiresPayment
                        ? 'text-green-600'
                        : 'text-violet-700'
                    }`}
                  >
                    {service.priceDisplay}
                  </p>
                )}
                <p className="text-sm text-gray-600">/ {service.durationLabel}</p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-500">
              {service.requiresPayment
                ? 'Total is calculated from the session rate (and group size if applicable). You pay only after Stripe checkout.'
                : 'This session has no charge. Times below are US Central Time (Chicago).'}
            </p>
            <p className="mt-2 text-xs leading-5 text-gray-500">
              Video calls use <span className="font-semibold">Google Meet</span>{' '}
              — the join link is added to your calendar invite after your booking
              is confirmed.
            </p>
            {service.requiresPayment && !service.groupPricing ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Availability is in US Central Time (CT): weekdays 6–8 PM; weekends
                9 AM–5 PM (hourly). Final time is confirmed by email after payment.
              </p>
            ) : null}

            {/* Honeypot — hidden from users */}
            <div
              className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              aria-hidden="true"
            >
              <label htmlFor={companyFieldId}>Company</label>
              <input
                id={companyFieldId}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {service.id === 'business-career-session' ? (
              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Session focus <span className="text-red-500">*</span>
                </label>
                <p className="mb-2 text-xs leading-5 text-gray-500">
                  Choose one area for this session. You can add more detail in
                  Notes below.
                </p>
                <select
                  value={sessionFocus}
                  onBlur={() => markTouched('sessionFocus')}
                  onChange={(e) => setSessionFocus(e.target.value)}
                  className={`${inputClass}${showErr('sessionFocus') ? inputErrorClass : ''}`}
                >
                  <option value="">Select a focus</option>
                  {VIRTUAL_SESSION_FOCUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {showErr('sessionFocus') ? (
                  <p className="mt-1.5 text-sm text-red-600">
                    {fieldMessage('sessionFocus')}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {service.groupPricing ? (
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Number of participants{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={service.groupPricing.min}
                    max={service.groupPricing.max}
                    value={attendeeCount}
                    onBlur={() => markTouched('attendeeCount')}
                    onChange={(e) =>
                      setAttendeeCount(parseInt(e.target.value, 10) || 0)
                    }
                    className={`${inputClass}${showErr('attendeeCount') ? inputErrorClass : ''}`}
                  />
                  {showErr('attendeeCount') ? (
                    <p className="mt-1.5 text-sm text-red-600">
                      {fieldMessage('attendeeCount')}
                    </p>
                  ) : (
                    <p className="mt-1.5 text-xs text-gray-500">
                      One payment covers everyone in your group ({service.groupPricing.min}–
                      {service.groupPricing.max} people).
                    </p>
                  )}
                </div>
              ) : null}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onBlur={() => markTouched('fullName')}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`${inputClass}${showErr('fullName') ? inputErrorClass : ''}`}
                  placeholder="Your full name"
                  autoComplete="name"
                />
                {showErr('fullName') ? (
                  <p className="mt-1.5 text-sm text-red-600">{fieldMessage('fullName')}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onBlur={() => markTouched('email')}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass}${showErr('email') ? inputErrorClass : ''}`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {showErr('email') ? (
                  <p className="mt-1.5 text-sm text-red-600">{fieldMessage('email')}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="Optional"
                  autoComplete="tel"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Language <span className="text-red-500">*</span>
                </label>
                <select
                  value={language}
                  onBlur={() => markTouched('language')}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`${inputClass}${showErr('language') ? inputErrorClass : ''}`}
                >
                  <option value="">Choose language</option>
                  <option value="English">English</option>
                  <option value="Nepali">Nepali</option>
                  <option value="Hindi">Hindi</option>
                </select>
                {showErr('language') ? (
                  <p className="mt-1.5 text-sm text-red-600">{fieldMessage('language')}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Preferred date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={preferredDate ? formatDateForInput(preferredDate) : ''}
                  onBlur={() => markTouched('preferredDate')}
                  onChange={(e) =>
                    setPreferredDate(
                      e.target.value
                        ? new Date(`${e.target.value}T12:00:00`)
                        : null
                    )
                  }
                  min={todayYmdChicago()}
                  className={`${inputClass}${showErr('preferredDate') ? inputErrorClass : ''}`}
                />
                {showErr('preferredDate') ? (
                  <p className="mt-1.5 text-sm text-red-600">
                    {fieldMessage('preferredDate')}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-gray-500">
                    Pick a date first. To only offer your own blocked dates later,
                    tools like{' '}
                    <span className="font-medium">Cal.com</span> (free tier) or{' '}
                    <span className="font-medium">Google Calendar</span>{' '}
                    appointment schedules work well.
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Preferred time <span className="text-red-500">*</span>
                </label>
                <select
                  value={preferredTime}
                  onBlur={() => markTouched('preferredTime')}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  disabled={!preferredDate}
                  className={`${inputClass}${showErr('preferredTime') ? inputErrorClass : ''}${!preferredDate ? ' cursor-not-allowed opacity-70' : ''}`}
                >
                  <option value="">
                    {preferredDate ? 'Choose time' : 'Choose a date first'}
                  </option>
                  {timeSlotOptions.map((t) => (
                    <option key={t} value={t}>
                      {t} CT
                    </option>
                  ))}
                </select>
                {showErr('preferredTime') ? (
                  <p className="mt-1.5 text-sm text-red-600">
                    {fieldMessage('preferredTime')}
                  </p>
                ) : preferredDate ? (
                  <p className="mt-1.5 text-xs text-gray-500">
                    {isChicagoWeekend(formatDateForInput(preferredDate))
                      ? 'Weekend: choose an hour between 9 AM and 5 PM (Central Time).'
                      : 'Weekday: 6 PM, 7 PM, or 8 PM only (Central Time).'}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-gray-500">
                    Times shown match the day you pick (weekday vs weekend).
                  </p>
                )}
              </div>

              <div className="md:col-span-2 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-gray-800">
                <span className="font-semibold text-sky-900">Google Meet</span>{' '}
                is used for all virtual sessions so you get one reliable join link
                in email and on your calendar. If you need something different,
                mention it in notes — we&apos;ll follow up by email.
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Notes <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onBlur={() => markTouched('notes')}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  maxLength={1000}
                  className={`${inputClass} resize-none${showErr('notes') ? inputErrorClass : ''}`}
                  placeholder="Anything you want to share before we meet?"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>
                    {showErr('notes') ? (
                      <span className="text-red-600">{fieldMessage('notes')}</span>
                    ) : null}
                  </span>
                  <span>{notes.length}/1000</span>
                </div>
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-sm leading-6 text-gray-800">
              <input
                type="checkbox"
                checked={consent}
                onBlur={() => markTouched('consent')}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  markTouched('consent');
                }}
                className={`mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-black focus:ring-black${showErr('consent') ? ' border-red-400' : ''}`}
              />
              <span>
                {service.requiresPayment
                  ? 'I understand this is a paid virtual session and that final scheduling confirmation will be sent after payment.'
                  : 'I understand this is a complimentary virtual session and that confirmation and scheduling details will be sent by email.'}
              </span>
            </label>
            {showErr('consent') ? (
              <p className="mt-2 text-sm text-red-600">{fieldMessage('consent')}</p>
            ) : null}
          </div>

          {service.note ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-gray-800">
              {service.note}
            </div>
          ) : null}

          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  {service.requiresPayment ? 'Checkout' : 'Submit request'}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {service.requiresPayment
                    ? 'You will be redirected to Stripe to pay securely.'
                    : 'We will confirm by email. No payment is required.'}
                </p>
              </div>
              <button
                type="button"
                disabled={!canContinue || submitting}
                onClick={() => void handleContinueToPayment()}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {service.requiresPayment
                      ? 'Preparing checkout…'
                      : 'Submitting…'}
                  </>
                ) : (
                  <>
                    {service.requiresPayment
                      ? 'Continue to payment'
                      : 'Submit booking request'}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
            {!canContinue && !submitting ? (
              <p className="mt-3 text-sm text-gray-500">
                Complete all required fields and the consent checkbox to continue.
              </p>
            ) : null}
            {serverError ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
