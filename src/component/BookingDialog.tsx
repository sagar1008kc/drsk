'use client';

import { useMemo, useState } from 'react';
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
  paymentPriceId: string;
  accent: 'emerald' | 'sky';
  note?: string;
};

type BookingDialogProps = {
  visible: boolean;
  service: Service | null;
  onHide: () => void;
};

const languageOptions = [
  { label: 'English', value: 'English' },
  { label: 'Nepali', value: 'Nepali' },
  { label: 'Hindi', value: 'Hindi' },
];

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
  const [language, setLanguage] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useMemo(() => new Date(), []);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setLanguage('');
    setPreferredDate(null);
    setNotes('');
    setLoading(false);
  };

  const handleHide = () => {
    resetForm();
    onHide();
  };

  const handleContinueToPayment = async () => {
    if (!service) return;

    if (!name.trim() || !email.trim()) {
      alert('Name and email are required.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceKey: service.key,
          serviceTitle: service.title,
          paymentPriceId: service.paymentPriceId,
          name,
          email,
          phone,
          language,
          preferredDate: formatDateForInput(preferredDate),
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || 'Unable to start checkout.');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert('Something went wrong while starting payment. Please try again.');
      setLoading(false);
    }
  };

  if (!service) return null;

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
      contentClassName="bg-white text-black rounded-[24px]"
      header={
        <div className="pr-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Book Session
          </div>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            {service.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Fill out your details and continue to secure payment.
          </p>
        </div>
      }
    >
      <div className="mt-4">
        {/*input fields*/}
        <div className="form-section">
<div className="space-y-5 rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6">
  <div>     <p className="mt-2 text-xs leading-5 text-gray-500">
  Provide a valid email address. After payment, the session invite will be sent to this email.
</p></div>
  <div className="grid gap-5 md:grid-cols-2">
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

  <div className="grid gap-5 md:grid-cols-2">
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        Phone
      </label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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

  <div className="grid gap-5 md:grid-cols-2">
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        Preferred date
      </label>
      <input
        type="date"
        value={preferredDate ? preferredDate.toISOString().split('T')[0] : ''}
        onChange={(e) =>
          setPreferredDate(e.target.value ? new Date(e.target.value) : null)
        }
        min={new Date().toISOString().split('T')[0]}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        Choose time
      </label>
      <select
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
      >
        <option value="">Choose time</option>
        <option value="09:00 AM">09:00 AM</option>
        <option value="04:00 PM">05:00 PM</option>
        <option value="05:00 PM">06:00 PM</option>
        <option value="03:00 PM">07:00 PM</option>
      </select>
    </div>
  </div>

  <div>
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
      </div>
        {service.note ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-gray-800">
            {service.note}
          </div>
        ) : null}

        <div className="pt-2">
          <Button
            type="button"
            label={loading ? 'Redirecting...' : 'Continue to Secure Payment'}
            icon="pi pi-arrow-right"
            rounded
            severity="contrast"
            disabled={loading}
            onClick={handleContinueToPayment}
            pt={{
              root: {
                className: 'px-5 py-3 font-semibold',
              },
            }}
          />
        </div>

        <p className="text-xs leading-6 text-gray-500">
          You will be redirected to Stripe’s secure hosted checkout page. Your
          session request should be considered confirmed only after successful payment.
        </p>
      </div>
    </Dialog>
  );
}