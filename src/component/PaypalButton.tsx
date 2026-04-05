'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    paypal?: any;
  }
}

type PaypalButtonProps = {
  clientId: string;
  hostedButtonId: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  preferredDate: string;
  selectedTime: string;
  notes: string;
  serviceTitle: string;
};

export default function PaypalButton({
  clientId,
  hostedButtonId,
  name,
  email,
  phone,
  language,
  preferredDate,
  selectedTime,
  notes,
  serviceTitle,
}: PaypalButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[data-paypal-sdk="true"]'
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.paypal) {
        setSdkReady(true);
      } else {
        existingScript.addEventListener('load', () => setSdkReady(true));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=hosted-buttons`;
    script.async = true;
    script.setAttribute('data-paypal-sdk', 'true');
    script.onload = () => setSdkReady(true);

    document.body.appendChild(script);
  }, [clientId]);

  useEffect(() => {
    if (!sdkReady || !window.paypal || !containerRef.current) return;

    containerRef.current.innerHTML = '';

    try {
      window.paypal
        .HostedButtons({
          hostedButtonId,
        })
        .render(containerRef.current);
    } catch (error) {
      console.error('PayPal render error:', error);
    }
  }, [sdkReady, hostedButtonId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    sessionStorage.setItem(
      'pendingBooking',
      JSON.stringify({
        name,
        email,
        phone,
        language,
        preferredDate,
        selectedTime,
        notes,
        serviceTitle,
      })
    );
  }, [
    name,
    email,
    phone,
    language,
    preferredDate,
    selectedTime,
    notes,
    serviceTitle,
  ]);

  return <div ref={containerRef} />;
}