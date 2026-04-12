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
    <div className="flex min-h-0 items-center justify-center py-8">
      <div className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-8 shadow-sm md:px-10 md:py-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
            Send a Message
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500 md:text-base">
            Share your name, email, and message. We typically reply within a
            few business days.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-zinc-700"
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
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-zinc-700"
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
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-semibold text-zinc-700"
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
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 resize-none"
            />
            <div
              className={`mt-1.5 text-xs ${
                isNearLimit ? 'text-amber-600' : 'text-zinc-400'
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
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {status.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!isFormReady || loading}
            className="w-full rounded-full bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
