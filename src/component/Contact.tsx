'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type StatusType = 'idle' | 'success' | 'error';

type StatusState = {
  type: StatusType;
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

  const [captchaToken, setCaptchaToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    type: 'idle',
    message: '',
  });

  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const renderWidget = () => {
      const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

      if (
        !mounted ||
        !siteKey ||
        !turnstileRef.current ||
        !window.turnstile ||
        widgetIdRef.current
      ) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        theme: 'light',
        callback: (token: string) => {
          setCaptchaToken(token);
        },
        'expired-callback': () => {
          setCaptchaToken('');
        },
        'error-callback': () => {
          setCaptchaToken('');
          setStatus({
            type: 'error',
            message: 'Captcha failed to load. Please refresh and try again.',
          });
        },
      });
    };

    renderWidget();

    if (!widgetIdRef.current) {
      intervalId = setInterval(() => {
        renderWidget();

        if (widgetIdRef.current && intervalId) {
          clearInterval(intervalId);
        }
      }, 300);
    }

    return () => {
      mounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const resetCaptcha = () => {
    setCaptchaToken('');

    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  const clearFormFields = () => {
    setForm({
      name: '',
      email: '',
      message: '',
      company: '',
    });
  };

  const resetForm = () => {
    clearFormFields();
    setStatus({
      type: 'idle',
      message: '',
    });
    resetCaptcha();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'message') {
      setForm((prev) => ({
        ...prev,
        message: value.slice(0, MESSAGE_LIMIT),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        throw new Error('Please fill in all required fields.');
      }

      if (form.message.trim().length > MESSAGE_LIMIT) {
        throw new Error(`Message cannot exceed ${MESSAGE_LIMIT} characters.`);
      }

      if (!captchaToken) {
        throw new Error('Please complete the captcha.');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          token: captchaToken,
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

      clearFormFields();
      resetCaptcha();

      setStatus({
        type: 'success',
        message:
          'Thank you for sending your message. Your inquiry has been received successfully. We will get back to you within 24 hours.',
      });

      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });

      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const messageLength = form.message.length;
  const isNearLimit = messageLength >= 900;

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-lg md:p-8">
      <p className="text-center text-x text-black">
          Thank you so much for reaching out! I truly appreciate you taking the time to connect. I will personally review your message and get back to you as soon as possible. Your inquiry is important to me, and I look forward to assisting you.
        </p>
        {status.type === 'success' ? (
          <div className="text-center">
            <p className="text-sm leading-6 text-gray-700">{status.message}</p>

            {!onClose && (
              <button
                type="button"
                onClick={resetForm}
                className="mt-5 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Send Another Message
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6 px-5">
             <h2 className="text-center text-2xl font-bold text-black">
          Contact Us
        </h2>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-black"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-black"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
              <p className="mt-1 text-xs text-gray-500">
                Please provide a valid email address so we can respond to your inquiry.
              </p>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-black"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                autoComplete="off"
                required
                rows={5}
                maxLength={MESSAGE_LIMIT}
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
              <div
                className={`mt-2 text-right text-xs ${
                  isNearLimit ? 'text-red-600' : 'text-gray-500'
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

            <div>
              <div ref={turnstileRef} />
            </div>

            {status.type === 'error' && status.message ? (
              <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {status.message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 rounded-full bg-black py-3 px-4 mt-2 text-sm font-bold text-white transition hover:text-sky-400"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}