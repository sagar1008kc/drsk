'use client';

import { FormEvent, useMemo, useState } from 'react';
import { toast } from 'sonner';
import ContactConfirmation from '@/component/BookingConfirmation';

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type StatusState = {
  type: 'idle' | 'error';
  message: string;
};

type ContactFormProps = {
  onClose?: () => void;
};

const MESSAGE_LIMIT = 1000;

export default function ContactForm({ onClose }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    company: '',
  });

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    type: 'idle',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'message' ? value.slice(0, MESSAGE_LIMIT) : value,
    }));

    if (status.type === 'error') {
      setStatus({ type: 'idle', message: '' });
    }
  };

  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  }, [form.email]);

  const isFormReady = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      isEmailValid &&
      form.message.trim().length > 0
    );
  }, [form.name, form.email, form.message, isEmailValid]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || !isFormReady) return;

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      let data: { error?: string; message?: string } | null = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            `Failed to send message. Server returned ${response.status}.`
        );
      }

      toast.success('Message sent. We will get back to you soon.', {
        duration: 5000,
      });
      setShowConfirmation(true);

      if (onClose) {
        onClose();
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <ContactConfirmation
        onClose={() => {
          setShowConfirmation(false);
          setForm({
            name: '',
            email: '',
            message: '',
            company: '',
          });
        }}
      />
    );
  }

  const messageLength = form.message.length;
  const isNearLimit = messageLength >= 900;

  return (
    <div className="flex min-h-0 items-center justify-center py-10">
      <div className="w-full rounded-[28px] border border-white/10 bg-zinc-950/80 px-6 py-8 shadow-2xl backdrop-blur-md md:px-10 md:py-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Contact Us
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400 md:text-base">
            Share your name, email, and message. We typically reply within a
            few business days.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-zinc-200"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-400/80 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-zinc-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-400/80 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-semibold text-zinc-200"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              maxLength={MESSAGE_LIMIT}
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-400/80 focus:ring-2 focus:ring-indigo-500/20"
            />
            <div
              className={`mt-2 text-sm ${
                isNearLimit ? 'text-amber-400' : 'text-zinc-500'
              }`}
            >
              {messageLength}/{MESSAGE_LIMIT} characters
            </div>
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          {status.type === 'error' && status.message ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm font-medium text-red-300">
              {status.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!isFormReady || loading}
            className="mb-4 mt-2 w-full rounded-full bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
