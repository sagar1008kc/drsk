'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { phonePayloadFromInternational } from '@/lib/phone';
import PhoneInputField from '@/component/PhoneInputField';

type WebsiteQuoteDialogProps = {
  visible: boolean;
  onHide: () => void;
};

type QuoteServiceType =
  | 'AI Integration Solutions'
  | 'Website Development'
  | 'Workflow Automation'
  | 'Digital Productivity Consulting'
  | 'Small Business Tech Solutions'
  | 'Custom Solution Request'
  | 'Other';

type FieldErrors = Record<string, string>;

const SERVICE_OPTIONS: QuoteServiceType[] = [
  'AI Integration Solutions',
  'Website Development',
  'Workflow Automation',
  'Digital Productivity Consulting',
  'Small Business Tech Solutions',
  'Custom Solution Request',
  'Other',
];

const SERVICE_TYPE_HIGHLIGHTS = SERVICE_OPTIONS.filter(
  (o): o is Exclude<QuoteServiceType, 'Other'> => o !== 'Other'
);

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function WebsiteQuoteDialog({
  visible,
  onHide,
}: WebsiteQuoteDialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const companyFieldId = useId();
  const phoneFieldId = useId();
  const [mounted, setMounted] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<QuoteServiceType | ''>('');
  const [otherServiceType, setOtherServiceType] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [company, setCompany] = useState('');

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetForm = useCallback(() => {
    setFullName('');
    setEmail('');
    setPhone('');
    setServiceType('');
    setOtherServiceType('');
    setProjectDetails('');
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

    if (phone && !isValidPhoneNumber(phone)) {
      errors.phone =
        'If provided, enter a valid international phone number.';
    }

    if (!serviceType) {
      errors.serviceType = 'Please select a service type.';
    }

    if (serviceType === 'Other' && !otherServiceType.trim()) {
      errors.otherServiceType = 'Please tell us what service you need.';
    }

    if (!projectDetails.trim() || projectDetails.trim().length < 10) {
      errors.projectDetails = 'Please share a few project details.';
    }
    if (projectDetails.length > 1000) {
      errors.projectDetails = 'Project details must be 1000 characters or fewer.';
    }

    return errors;
  }, [
    email,
    fullName,
    otherServiceType,
    phone,
    projectDetails,
    serviceType,
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
            serviceType === 'Other' ? otherServiceType.trim() : undefined,
          message: projectDetails.trim(),
          projectDetails: projectDetails.trim(),
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
              Digital solutions
            </div>
            <h2 id={titleId} className="mt-2 text-xl font-bold md:text-2xl">
              Request a quote
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Share your project scope and we will reply with a tailored quote.
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
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onBlur={() => markTouched('fullName')}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    placeholder="Your full name"
                    className={`${inputClass}${showError('fullName') ? inputErrorClass : ''}`}
                  />
                  {showError('fullName') ? (
                    <p className="mt-1.5 text-sm text-red-600">{validation.fullName}</p>
                  ) : null}
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onBlur={() => markTouched('email')}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
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
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <ul className="mb-3 space-y-1 text-xs leading-snug text-gray-600 sm:columns-2 sm:gap-x-6">
                    {SERVICE_TYPE_HIGHLIGHTS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <select
                    value={serviceType}
                    onBlur={() => markTouched('serviceType')}
                    onChange={(e) => setServiceType(e.target.value as QuoteServiceType)}
                    className={`${inputClass}${showError('serviceType') ? inputErrorClass : ''}`}
                  >
                    <option value="">Select service type</option>
                    {SERVICE_OPTIONS.map((option) => (
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
                  {serviceType === 'Other' ? (
                    <motion.div
                      key="other-service-type"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden md:col-span-2"
                    >
                      <label className="mb-2 block text-sm font-semibold text-gray-800">
                        Please specify <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={otherServiceType}
                        onBlur={() => markTouched('otherServiceType')}
                        onChange={(e) => setOtherServiceType(e.target.value)}
                        placeholder="Tell us what you need"
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
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    maxLength={1000}
                    value={projectDetails}
                    onBlur={() => markTouched('projectDetails')}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    placeholder="Describe goals, timeline, required pages/features, and any references."
                    className={`${inputClass} resize-none${showError('projectDetails') ? inputErrorClass : ''}`}
                  />
                  <div className="mt-1.5 flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-700">Quotes start from $199</p>
                    <p className="text-xs text-gray-500">{projectDetails.length}/1000</p>
                  </div>
                  {showError('projectDetails') ? (
                    <p className="mt-1.5 text-sm text-red-600">
                      {validation.projectDetails}
                    </p>
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
                    We will review your project and reply by email.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!canSubmit || submitting}
                  onClick={() => void handleSubmit()}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-black bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500 sm:w-auto"
                >
                  {submitting ? 'Sending…' : 'Send for Quote'}
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
