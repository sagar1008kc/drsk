'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import {
  isEmail,
  validatePasswordStrength,
  validateUsername,
} from '@/lib/auth/validation';
import { safeInternalRedirectPath } from '@/lib/auth/redirect';
import {
  useBodyScrollLock,
  useEscapeKey,
  useInitialDialogFocus,
} from '@/component/shared/modal-hooks';

type SignupModalProps = {
  open: boolean;
  onClose: () => void;
  nextPath: string;
};

type SignupFormState = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState: SignupFormState = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignupModal({ open, onClose, nextPath }: SignupModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<SignupFormState>(initialState);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm(initialState);
      setError('');
      setNotice('');
      setLoading(false);
    }
  }, [open]);

  const closeModal = useCallback(() => {
    onClose();
  }, [onClose]);

  useBodyScrollLock(open);
  useEscapeKey(open, closeModal);
  useInitialDialogFocus(open, panelRef);

  const inlineErrors = useMemo(() => {
    const errors: Partial<Record<keyof SignupFormState, string>> = {};
    const usernameError = form.username ? validateUsername(form.username) : null;
    if (usernameError) errors.username = usernameError;
    if (form.email && !isEmail(form.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }
    const passwordError = form.password
      ? validatePasswordStrength(form.password)
      : null;
    if (passwordError) errors.password = passwordError;
    if (form.confirmPassword && form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
  }, [form]);

  if (!open) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        error?: string;
        warning?: string;
        autoLoggedIn?: boolean;
      };

      if (!response.ok) {
        setError(result.error || 'Unable to create account.');
        return;
      }

      if (result.autoLoggedIn) {
        window.location.href = safeInternalRedirectPath(nextPath);
        return;
      }

      setNotice(
        result.warning ||
          'Account created. Please confirm your email if required, then login.'
      );
    } catch {
      setError('Unable to create account right now.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Create account"
    >
      <button
        type="button"
        aria-label="Close create account dialog"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl outline-none sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Create account</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Get access to premium downloadable resources.
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close create account dialog"
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-50"
          >
            Close
          </button>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700" htmlFor="signup-name">
              Full name
            </label>
            <input
              id="signup-name"
              value={form.fullName}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, fullName: event.target.value }))
              }
              required
              className="h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700" htmlFor="signup-username">
              Username
            </label>
            <input
              id="signup-username"
              value={form.username}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, username: event.target.value.toLowerCase() }))
              }
              required
              className="h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
            {inlineErrors.username ? (
              <p className="text-xs text-rose-600">{inlineErrors.username}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700" htmlFor="signup-email">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
              className="h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
            {inlineErrors.email ? (
              <p className="text-xs text-rose-600">{inlineErrors.email}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
                required
                className="h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              />
              {inlineErrors.password ? (
                <p className="text-xs text-rose-600">{inlineErrors.password}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="signup-confirm-password"
              >
                Confirm password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                value={form.confirmPassword}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
                }
                required
                className="h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              />
              {inlineErrors.confirmPassword ? (
                <p className="text-xs text-rose-600">{inlineErrors.confirmPassword}</p>
              ) : null}
            </div>
          </div>

          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          ) : null}
          {notice ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {notice}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-zinc-900 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
