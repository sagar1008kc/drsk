'use client';

import { useMemo, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';

export type Service = {
  key: 'business' | 'support';
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  oldPrice: string;
  newPrice: string;
  duration: string;
  bookingLink: string;
  paymentLink: string;
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
  const [notes, setNotes] = useState('');

  const today = useMemo(() => new Date(), []);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setLanguage('');
    setPreferredDate(null);
    setNotes('');
  };

  const handleHide = () => {
    resetForm();
    onHide();
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
      style={{ width: '95vw', maxWidth: '680px' }}
      header={
        <div className="pr-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">
            Book Session
          </div>
          <div className="mt-1 text-2xl font-bold text-black">
            {service.title}
          </div>
          <div className="mt-2 text-sm leading-6 text-black/70">
            Fill out the details below, then continue to your booking page.
          </div>
        </div>
      }
      className="overflow-hidden rounded-[26px]"
    >
      <form
        action="https://formsubmit.co/info.drsk0@gmail.com"
        method="POST"
        onSubmit={resetForm}
        className="space-y-5"
      >
        <input
          type="hidden"
          name="_subject"
          value={`New booking lead: ${service.title}`}
        />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={service.bookingLink} />
        <input type="hidden" name="service" value={service.title} />
        <input type="hidden" name="language_selected" value={language} />
        <input
          type="hidden"
          name="preferred_date"
          value={formatDateForInput(preferredDate)}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Name</label>
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              name="name"
              placeholder="Your name"
              className="w-full rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Email</label>
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-xl"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Phone</label>
            <InputText
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              placeholder="Optional phone number"
              className="w-full rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">
              Choose language
            </label>
            <Dropdown
              value={language}
              onChange={(e) => setLanguage(e.value)}
              options={languageOptions}
              placeholder="Select language"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-black">
            Preferred date
          </label>
          <Calendar
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.value as Date)}
            minDate={today}
            showIcon
            dateFormat="mm/dd/yy"
            placeholder="Choose your preferred date"
            className="w-full"
            inputClassName="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-black">Notes</label>
          <InputTextarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            name="notes"
            rows={4}
            autoResize
            placeholder="Anything you want me to know before the session?"
            className="w-full rounded-xl"
          />
        </div>

        <div className="rounded-2xl border border-black/8 bg-[#FAF7F2] px-4 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-black">
                {service.title}
              </div>
              <div className="mt-1 text-sm text-black/70">
                Continue to booking after form submission, or pay now securely.
              </div>
            </div>

            <div className="flex items-end gap-2">
              <span className="text-base font-semibold text-red-500 line-through">
                {service.oldPrice}
              </span>
              <span className="text-2xl font-bold text-green-600">
                {service.newPrice}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            type="submit"
            label="Continue to Booking"
            icon="pi pi-arrow-right"
            rounded
            severity="contrast"
            pt={{
              root: {
                className: 'px-4 py-3 font-semibold',
              },
            }}
          />

          <Button
            type="button"
            label="Pay"
            icon="pi pi-credit-card"
            rounded
            outlined
            onClick={() =>
              window.open(
                service.paymentLink,
                '_blank',
                'noopener,noreferrer'
              )
            }
            pt={{
              root: {
                className:
                  'px-4 py-3 font-semibold border-black text-black hover:bg-black hover:text-white',
              },
            }}
          />

          <Button
            type="button"
            label="Close"
            icon="pi pi-times"
            rounded
            text
            severity="secondary"
            onClick={handleHide}
            pt={{
              root: {
                className: 'px-3 py-3 font-semibold',
              },
            }}
          />
        </div>

        <p className="text-xs leading-6 text-black/65">
          After submission, your details are sent to your email and the user is
          redirected to the live booking page.
        </p>
      </form>
    </Dialog>
  );
}