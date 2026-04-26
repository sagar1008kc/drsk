'use client';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export type PhoneInputFieldProps = {
  id?: string;
  label: React.ReactNode;
  optional?: boolean;
  /** E.164 international string from `react-phone-number-input`, or empty. */
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  onBlur?: () => void;
  error?: string;
  showError?: boolean;
  helperText?: React.ReactNode;
  className?: string;
};

export default function PhoneInputField({
  id,
  label,
  optional,
  value,
  onChange,
  onBlur,
  error,
  showError,
  helperText,
  className = '',
}: PhoneInputFieldProps) {
  const hasError = Boolean(showError && error);
  const rootClass = [
    'flex w-full items-center gap-1 rounded-xl border bg-white px-2 py-0.5 shadow-sm transition focus-within:ring-2',
    hasError
      ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-200'
      : 'border-gray-300 focus-within:border-black focus-within:ring-black/10',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-gray-800">
        {label}{' '}
        {optional ? (
          <span className="font-normal text-gray-500">(optional)</span>
        ) : null}
      </label>

      <PhoneInput
        international
        defaultCountry="US"
        limitMaxLength
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Enter phone number"
        className={rootClass}
        numberInputProps={{
          id,
          className:
            'min-w-0 flex-1 border-0 bg-transparent py-2 pl-1 text-sm text-black outline-none ring-0 placeholder:text-gray-400 focus:ring-0',
        }}
        countrySelectProps={{
          className:
            'shrink-0 rounded-lg border-0 bg-transparent py-2 pr-1 text-sm text-gray-800 outline-none focus:ring-0',
        }}
      />

      {helperText ? (
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{helperText}</p>
      ) : null}

      {showError && error ? (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
