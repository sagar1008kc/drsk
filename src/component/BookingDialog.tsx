'use client';

import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

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

type BookingDialogProps = {
  visible: boolean;
  service: Service | null;
  onHide: () => void;
};

type BookingApiResponse = {
  message?: string;
  error?: string;
};

const PAYPAL_PAYMENT_LINK = 'https://www.paypal.com/ncp/payment/3PTTLHVCCS6FW';

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
}: BookingDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('');
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const [hasOpenedPayment, setHasOpenedPayment] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setLanguage('');
    setPreferredDate(null);
    setSelectedTime('');
    setNotes('');
    setHasOpenedPayment(false);
    setIsSubmittingBooking(false);
    setBookingSent(false);
    setBookingError('');
  };

  const handleHide = () => {
    resetForm();
    onHide();
  };

  if (!service) return null;

  const isFormValid = Boolean(name.trim() && email.trim());

  const handlePayNow = () => {
    if (!isFormValid) return;
    setBookingError('');
    setHasOpenedPayment(true);
    window.open(PAYPAL_PAYMENT_LINK, '_blank', 'noopener,noreferrer');
  };

  const handleSendBookingRequest = async () => {
    if (!service) return;

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
          serviceKey: service.key,
          paypalPaymentLink: PAYPAL_PAYMENT_LINK,
        }),
      });

      const data = (await response.json()) as BookingApiResponse;

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send booking request.');
      }

      setBookingSent(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to send booking request.';
      setBookingError(message);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      draggable={false}
      resizable={false}
      dismissableMask
      blockScroll
      modal
      style={{ width: '95vw', maxWidth: '720px' }}
      className="rounded-[24px]"
      contentClassName="rounded-[24px] bg-white text-black"
      header={
        <div className="pr-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Book Session
          </div>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            {service.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Fill out your details, pay securely with PayPal, and then send your
            booking request for confirmation.
          </p>
        </div>
      }
    >
      <div className="mt-4 space-y-5">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6">
          <p className="text-xs leading-5 text-gray-500">
            Provide a valid email address. After you submit the booking request,
            I will contact you using this email to confirm the session.
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
                value={preferredDate ? formatDateForInput(preferredDate) : ''}
                onChange={(e) =>
                  setPreferredDate(
                    e.target.value ? new Date(`${e.target.value}T00:00:00`) : null
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

          <div>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              All sessions are scheduled in Central Time. Please select your
              preferred time, and I will do my best to accommodate it.
            </p>
          </div>

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
                <h3 className="text-lg font-bold text-black">Secure payment</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Complete payment first, then send your booking request.
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
                <Button
                  type="button"
                  label="Enter name and email to continue"
                  icon="pi pi-lock"
                  rounded
                  severity="contrast"
                  disabled
                  className="w-full md:w-auto"
                  pt={{
                    root: {
                      className: 'px-5 py-3 font-semibold opacity-70',
                    },
                  }}
                />
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Name and email are required before payment is shown.
                </p>
              </div>
            ) : bookingSent ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
                <p className="text-base font-semibold text-emerald-700">
                  Thank you. Your booking request has been sent successfully.
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-800">
                  I received your details and will contact you by email to confirm
                  the session.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-5">
                <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
                  <Button
                    type="button"
                    label="Pay Now"
                    icon="pi pi-external-link"
                    rounded
                    severity="contrast"
                    onClick={handlePayNow}
                    pt={{
                      root: {
                        className: 'px-5 py-3 font-semibold',
                      },
                    }}
                  />

                  {hasOpenedPayment ? (
                    <Button
                      type="button"
                      label={
                        isSubmittingBooking
                          ? 'Sending Booking Request...'
                          : 'I Completed Payment — Send Booking Request'
                      }
                      icon="pi pi-check-circle"
                      rounded
                      outlined
                      disabled={isSubmittingBooking}
                      onClick={handleSendBookingRequest}
                      pt={{
                        root: {
                          className:
                            'px-5 py-3 font-semibold border-black text-black hover:bg-black hover:text-white',
                        },
                      }}
                    />
                  ) : null}
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-500">
                  Step 1: click Pay Now and complete payment in PayPal. Step 2:
                  return here and click “I Completed Payment — Send Booking
                  Request”.
                </p>

                {bookingError ? (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm leading-6 text-red-600">
                      {bookingError}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}