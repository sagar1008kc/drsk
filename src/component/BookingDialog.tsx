'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import type { Service } from '@/lib/services';
import { PAYPAL_PAYMENT_LINK } from '@/lib/services';

const PAYMENT_INCOMPLETE_TOAST =
  'Your PayPal payment is not confirmed yet. In the PayPal tab, complete checkout until PayPal shows that your payment succeeded. Then return here, tick “I completed my PayPal payment successfully”, and tap Confirm booking.';

type BookingDialogProps = {
  visible: boolean;
  service: Service | null;
  onHide: () => void;
  onBookingSuccess?: (message: string) => void;
};

type BookingApiResponse = {
  message?: string;
  error?: string;
};

function formatDateForInput(date: Date | null) {
  if (!date) return '';
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function BookingDialog({
  visible,
  service,
  onHide,
  onBookingSuccess,
}: BookingDialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('');
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentStage, setPaymentStage] = useState<
    'initial' | 'payment-opened' | 'confirmed'
  >('initial');
  const [payPalCheckoutStarted, setPayPalCheckoutStarted] = useState(false);
  const [paymentSuccessConfirmed, setPaymentSuccessConfirmed] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setPhone('');
    setLanguage('');
    setPreferredDate(null);
    setSelectedTime('');
    setNotes('');
    setPayPalCheckoutStarted(false);
    setPaymentSuccessConfirmed(false);
    setIsSubmittingBooking(false);
    setBookingError('');
    setPaymentStage('initial');
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

  if (!service || !mounted || !visible) return null;

  const isFormValid = Boolean(name.trim() && email.trim());

  const handlePayNow = () => {
    if (!isFormValid) {
      setBookingError(
        'Please enter your name and email before continuing to payment.'
      );
      return;
    }

    setBookingError('');
    setPaymentSuccessConfirmed(false);
    setPayPalCheckoutStarted(true);
    setPaymentStage('payment-opened');

    window.open(PAYPAL_PAYMENT_LINK, '_blank', 'noopener,noreferrer');
  };

  const handleOpenPayPalAgain = () => {
    setPaymentSuccessConfirmed(false);
    setPayPalCheckoutStarted(true);
    setPaymentStage('payment-opened');
    window.open(PAYPAL_PAYMENT_LINK, '_blank', 'noopener,noreferrer');
  };

  const handleSendBookingRequest = async () => {
    if (!service) return;

    if (!name.trim() || !email.trim()) {
      setBookingError('Please enter your name and email.');
      return;
    }

    if (!payPalCheckoutStarted || paymentStage !== 'payment-opened') {
      const msg =
        'Please tap Pay with PayPal first, complete payment in PayPal, then confirm below.';
      setBookingError(msg);
      toast.error(msg);
      return;
    }

    if (!paymentSuccessConfirmed) {
      setBookingError(PAYMENT_INCOMPLETE_TOAST);
      toast.error(PAYMENT_INCOMPLETE_TOAST, { duration: 8000 });
      return;
    }

    setBookingError('');
    setIsSubmittingBooking(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          language: language.trim(),
          preferredDate: preferredDate ? formatDateForInput(preferredDate) : '',
          selectedTime: selectedTime.trim(),
          notes: notes.trim(),
          serviceTitle: service.title,
          serviceTag: service.tag,
          serviceKey: service.key,
          price: service.newPrice,
          duration: service.duration,
          paymentLink: PAYPAL_PAYMENT_LINK,
          paymentMethod: 'PayPal',
          paymentStatus:
            'Customer confirmed PayPal payment completed before booking request',
        }),
      });

      const data = (await response.json()) as BookingApiResponse;

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send booking request.');
      }

      setPaymentStage('confirmed');

      const successMessage =
        'Thank you! Your booking request was sent. We will contact you within 24 hours.';

      onBookingSuccess?.(successMessage);
      resetForm();
      onHide();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';
      setBookingError(message);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

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
        className="relative z-[1] max-h-[min(92vh,840px)] w-full max-w-[720px] overflow-y-auto rounded-[24px] border border-white/10 bg-white text-black shadow-2xl outline-none"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur-sm md:px-6">
          <div className="min-w-0 pr-2">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Book Session
            </div>
            <h2 id={titleId} className="mt-2 text-xl font-bold md:text-2xl">
              {service.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Fill out your details, pay securely with PayPal, then confirm your
              booking. You can book another session anytime from the Services
              page.
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
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6">
            <p className="text-xs leading-5 text-gray-500">
              Provide a valid email address. After you submit the booking
              request, I will contact you using this email to confirm the
              session.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Provide valid email"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={15}
                  placeholder="Optional phone number"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                >
                  <option value="">Choose language</option>
                  <option value="English">English</option>
                  <option value="Nepali">Nepali</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Preferred date
                </label>
                <input
                  type="date"
                  value={
                    preferredDate ? formatDateForInput(preferredDate) : ''
                  }
                  onChange={(e) =>
                    setPreferredDate(
                      e.target.value
                        ? new Date(`${e.target.value}T00:00:00`)
                        : null
                    )
                  }
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Choose time (CT)
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                >
                  <option value="">Choose time</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                  <option value="08:00 PM">08:00 PM</option>
                  <option value="Weekend Anytime">Weekend Anytime</option>
                </select>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              All sessions are scheduled in Central Time. Please select your
              preferred time, and I will do my best to accommodate it.
            </p>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Anything you want me to know before the session?"
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>

          {service.note ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-gray-800">
              {service.note}
            </div>
          ) : null}

          <div className="rounded-3xl border border-black/10 bg-white shadow-sm">
            <div className="p-5 md:p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0 pr-2">
                  <h3 className="text-lg font-bold text-black">
                    Secure payment
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Pay in PayPal until you see PayPal confirm the payment. Then
                    tick the box below — only then can you send your booking
                    request.
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-base font-medium text-gray-500 line-through">
                    {service.oldPrice}
                  </div>
                  <div className="text-4xl font-bold leading-none text-green-600">
                    {service.newPrice}
                  </div>
                </div>
              </div>

              <hr className="my-5 border-gray-200" />

              {!isFormValid ? (
                <div className="rounded-2xl bg-gray-50 p-5">
                  <button
                    type="button"
                    disabled
                    className="w-full rounded-full border border-gray-200 bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-500 md:w-auto"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Enter name and email to continue
                    </span>
                  </button>
                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Name and email are required before payment.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-5">
                  <div className="flex flex-col items-center gap-4">
                    {paymentStage === 'initial' ? (
                      <div className="flex w-full flex-col items-center gap-3">
                        <button
                          type="button"
                          onClick={handlePayNow}
                          className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full border border-black bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                          Pay with PayPal
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
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handleOpenPayPalAgain}
                          className="text-sm font-medium text-sky-700 underline-offset-4 hover:underline"
                        >
                          Open PayPal again
                        </button>
                      </div>
                    ) : (
                      <div className="flex w-full flex-col items-stretch gap-4 sm:items-center">
                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left text-sm leading-6 text-gray-800 sm:max-w-lg">
                          <input
                            type="checkbox"
                            checked={paymentSuccessConfirmed}
                            onChange={(e) => {
                              setPaymentSuccessConfirmed(e.target.checked);
                              if (bookingError) setBookingError('');
                            }}
                            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-black focus:ring-black"
                          />
                          <span>
                            <span className="font-semibold text-black">
                              I completed my PayPal payment successfully.
                            </span>{' '}
                            I finished checkout in PayPal and saw PayPal confirm
                            my payment (or received PayPal&apos;s confirmation
                            email for this charge).
                          </span>
                        </label>

                        <button
                          type="button"
                          disabled={isSubmittingBooking}
                          aria-disabled={!paymentSuccessConfirmed}
                          onClick={() => {
                            if (!paymentSuccessConfirmed) {
                              toast.error(PAYMENT_INCOMPLETE_TOAST, {
                                duration: 8000,
                              });
                              setBookingError(PAYMENT_INCOMPLETE_TOAST);
                              return;
                            }
                            void handleSendBookingRequest();
                          }}
                          className={`inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                            paymentSuccessConfirmed
                              ? 'border-black bg-white text-black hover:bg-black hover:text-white'
                              : 'border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                          }`}
                        >
                          {isSubmittingBooking ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Sending…
                            </>
                          ) : (
                            <>
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
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Confirm booking
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-center text-sm leading-6 text-gray-500">
                    {paymentStage === 'initial'
                      ? 'PayPal opens in a new tab so you can keep this window open.'
                      : 'Confirm booking stays off until you tick the box confirming PayPal showed a successful payment.'}
                  </p>

                  {bookingError ? (
                    <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                      <p className="text-sm font-medium leading-6 text-red-600">
                        {bookingError}
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
