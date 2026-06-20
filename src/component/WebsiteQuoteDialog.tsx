'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { SERVICE_QUOTE_OPTIONS, type ServiceQuoteType } from '@/lib/service-areas';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { isEmail } from '@/lib/email';
import { phonePayloadFromInternational } from '@/lib/phone';
import PhoneInputField from '@/component/PhoneInputField';
import {
  useBodyScrollLock,
  useClientMounted,
  useEscapeKey,
  useInitialDialogFocus,
} from '@/component/shared/modal-hooks';

type WebsiteQuoteDialogProps = {
  visible: boolean;
  onHide: () => void;
  initialService?: ServiceQuoteType | '';
};

type FieldErrors = Record<string, string>;

export default function WebsiteQuoteDialog({
  visible,
  onHide,
  initialService = '',
}: WebsiteQuoteDialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const fullNameFieldId = useId();
  const emailFieldId = useId();
  const companyFieldId = useId();
  const phoneFieldId = useId();
  const serviceFieldId = useId();
  const timelineFieldId = useId();
  const detailsFieldId = useId();
  const mounted = useClientMounted();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<ServiceQuoteType | ''>('');
  const [otherServiceType, setOtherServiceType] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [timeline, setTimeline] = useState('');
  const [company, setCompany] = useState('');

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const resetForm = useCallback(() => {
    setFullName('');
    setEmail('');
    setPhone('');
    setServiceType('');
    setOtherServiceType('');
    setProjectDetails('');
    setTimeline('');
    setCompany('');
    setTouched({});
    setSubmitting(false);
    setSubmitError('');
    setSubmitted(false);
  }, []);

  const handleHide = useCallback(() => {
    resetForm();
    onHide();
  }, [onHide, resetForm]);

  useBodyScrollLock(visible);
  useEscapeKey(visible, handleHide);
  useInitialDialogFocus(visible, panelRef);

  useEffect(() => {
    if (visible) {
      setServiceType(initialService || '');
    }
  }, [visible, initialService]);

  const validation: FieldErrors = useMemo(() => {
    const errors: FieldErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }

    if (!email.trim()) errors.email = 'Email is required.';
    else if (!isEmail(email.trim())) errors.email = 'Enter a valid email address.';

    if (phone && !isValidPhoneNumber(phone)) {
      errors.phone =
        'If provided, enter a valid international phone number.';
    }

    if (!serviceType) {
      errors.serviceType = 'Please select a service type.';
    }

    if (!projectDetails.trim() || projectDetails.trim().length < 10) {
      errors.projectDetails = 'Please share your message or goals.';
    }
    if (projectDetails.length > 1000) {
      errors.projectDetails = 'Message must be 1000 characters or fewer.';
    }

    if (timeline.length > 200) {
      errors.timeline = 'Timeline or urgency must be 200 characters or fewer.';
    }

    return errors;
  }, [
    email,
    fullName,
    phone,
    projectDetails,
    serviceType,
    timeline,
  ]);

  const canSubmit = Object.keys(validation).length === 0 && !company.trim();

  const markTouched = (key: string) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const showError = (key: string) => Boolean((touched[key] || touched._submit) && validation[key]);

  const inputClass =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10';
  const inputErrorClass = ' border-red-400 focus:border-red-500 focus:ring-red-200';

  const handleSubmit = async () => {
    setTouched((prev) => ({ ...prev, _submit: true }));
    setSubmitError('');

    if (company.trim()) return;
    if (Object.keys(validation).length > 0) {
      toast.error('Please fix the highlighted fields.');
      return;
    }

    setSubmitting(true);
    try {
      const requestDetails = timeline.trim()
        ? `${projectDetails.trim()}\n\nTimeline or urgency: ${timeline.trim()}`
        : projectDetails.trim();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'website_quote',
          name: fullName.trim(),
          email: email.trim(),
          phone: phonePayloadFromInternational(phone),
          serviceType,
          otherServiceType:
            serviceType === 'Other / Not Sure' ? otherServiceType.trim() : undefined,
          message: requestDetails,
          projectDetails: requestDetails,
          company: company.trim() || undefined,
        }),
      });

      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Could not send quote request.');
      }

      toast.success('Quote request sent successfully.');
      setSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';
      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || !visible) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[1150] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close website quote dialog"
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
              SK Creation services
            </div>
            <h2 id={titleId} className="mt-2 text-xl font-bold md:text-2xl">
              Request a Quote
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Select a service area and share your goals. We&apos;ll reply with the best next step.
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
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
            >
              <h3 className="text-lg font-semibold text-emerald-900">
                Quote Request Sent
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Thank you. We received your details and will follow up shortly at{' '}
                <span className="font-semibold text-gray-900">{email}</span>.
              </p>
              <button
                type="button"
                onClick={handleHide}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6">
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

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor={fullNameFieldId} className="mb-2 block text-sm font-semibold text-gray-800">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={fullNameFieldId}
                    type="text"
                    value={fullName}
                    onBlur={() => markTouched('fullName')}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-invalid={showError('fullName')}
                    className={`${inputClass}${showError('fullName') ? inputErrorClass : ''}`}
                  />
                  {showError('fullName') ? (
                    <p className="mt-1.5 text-sm text-red-600">{validation.fullName}</p>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor={emailFieldId} className="mb-2 block text-sm font-semibold text-gray-800">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={emailFieldId}
                    type="email"
                    value={email}
                    onBlur={() => markTouched('email')}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={showError('email')}
                    className={`${inputClass}${showError('email') ? inputErrorClass : ''}`}
                  />
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                    Provide a valid email address — we use it for replies and
                    confirmations.
                  </p>
                  {showError('email') ? (
                    <p className="mt-1.5 text-sm text-red-600">{validation.email}</p>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <PhoneInputField
                    id={phoneFieldId}
                    label="Phone number"
                    optional
                    value={phone || undefined}
                    onChange={(v) => setPhone(v ?? '')}
                    onBlur={() => markTouched('phone')}
                    showError={showError('phone')}
                    error={validation.phone}
                    helperText="Optional. Include country code. Used only for quote-related communication."
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor={serviceFieldId} className="mb-2 block text-sm font-semibold text-gray-800">
                    Service <span className="text-red-500">*</span>
                  </label>
                  <p className="mb-3 text-xs leading-relaxed text-gray-600">
                    Choose the closest area. Select Other / Not Sure if you need help deciding.
                  </p>
                  <select
                    id={serviceFieldId}
                    value={serviceType}
                    onBlur={() => markTouched('serviceType')}
                    onChange={(e) => setServiceType(e.target.value as ServiceQuoteType)}
                    aria-invalid={showError('serviceType')}
                    className={`${inputClass}${showError('serviceType') ? inputErrorClass : ''}`}
                  >
                    <option value="">Select a service</option>
                    {SERVICE_QUOTE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {showError('serviceType') ? (
                    <p className="mt-1.5 text-sm text-red-600">{validation.serviceType}</p>
                  ) : null}
                </div>

                <AnimatePresence initial={false}>
                  {serviceType === 'Other / Not Sure' ? (
                    <motion.div
                      key="other-service-type"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden md:col-span-2"
                    >
                      <label htmlFor="other-service-type" className="mb-2 block text-sm font-semibold text-gray-800">
                        Optional service note
                      </label>
                      <input
                        id="other-service-type"
                        type="text"
                        value={otherServiceType}
                        onBlur={() => markTouched('otherServiceType')}
                        onChange={(e) => setOtherServiceType(e.target.value)}
                        placeholder="Tell us what you may need"
                        className={`${inputClass}${showError('otherServiceType') ? inputErrorClass : ''}`}
                      />
                      {showError('otherServiceType') ? (
                        <p className="mt-1.5 text-sm text-red-600">
                          {validation.otherServiceType}
                        </p>
                      ) : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="md:col-span-2">
                  <label htmlFor={detailsFieldId} className="mb-2 block text-sm font-semibold text-gray-800">
                    Message / goals <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id={detailsFieldId}
                    rows={5}
                    maxLength={1000}
                    value={projectDetails}
                    onBlur={() => markTouched('projectDetails')}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    placeholder="Share your goals, current challenge, project scope, or session focus."
                    aria-invalid={showError('projectDetails')}
                    className={`${inputClass} resize-none${showError('projectDetails') ? inputErrorClass : ''}`}
                  />
                  <div className="mt-1.5 flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-700">
                      We&apos;ll review your request and reply by email with the best next step.
                    </p>
                    <p className="text-xs text-gray-500">{projectDetails.length}/1000</p>
                  </div>
                  {showError('projectDetails') ? (
                    <p className="mt-1.5 text-sm text-red-600">
                      {validation.projectDetails}
                    </p>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor={timelineFieldId} className="mb-2 block text-sm font-semibold text-gray-800">
                    Timeline or urgency <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    id={timelineFieldId}
                    type="text"
                    value={timeline}
                    maxLength={200}
                    onBlur={() => markTouched('timeline')}
                    onChange={(e) => setTimeline(e.target.value)}
                    placeholder="Example: within 2 weeks, flexible, urgent, or planning for next month"
                    aria-invalid={showError('timeline')}
                    className={`${inputClass}${showError('timeline') ? inputErrorClass : ''}`}
                  />
                  {showError('timeline') ? (
                    <p className="mt-1.5 text-sm text-red-600">{validation.timeline}</p>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {!submitted ? (
            <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Submit request</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    We&apos;ll review your request and reply by email with the best next step.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!canSubmit || submitting}
                  onClick={() => void handleSubmit()}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-black bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500 sm:w-auto"
                >
                  {submitting ? 'Sending...' : 'Send Request'}
                </button>
              </div>
              {!canSubmit && !submitting ? (
                <p className="mt-3 text-sm text-gray-500">
                  Complete all required fields to send your quote request.
                </p>
              ) : null}
              {submitError ? (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
