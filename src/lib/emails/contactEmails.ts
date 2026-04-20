import { buildEmailTemplate, escapeHtml } from '@/lib/emails/template';

/** Public site URLs for customer-facing transactional emails */
const CUSTOMER_PORTAL_LOGIN_URL = 'https://www.skcreation.org/login';
const CUSTOMER_SERVICES_URL = 'https://www.skcreation.org/services';

export type ContactEmailInput = {
  requestType: string;
  name: string;
  email: string;
  phone?: string;
  serviceType?: string;
  otherServiceType?: string;
  projectDetails?: string;
  message: string;
};

export function buildContactNotificationEmail(input: ContactEmailInput): {
  subject: string;
  html: string;
} {
  const isWebsiteQuote = input.requestType === 'website_quote';

  const subject = isWebsiteQuote
    ? `New Digital solutions quote request from ${input.name}`
    : `New Contact Form Message from ${input.name}`;

  const details = isWebsiteQuote
    ? [
        { label: 'Name', value: input.name },
        { label: 'Email', value: input.email },
        { label: 'Phone', value: input.phone || '—' },
        { label: 'Service Type', value: input.serviceType || '—' },
        {
          label: 'Other Service',
          value: input.otherServiceType || '—',
        },
      ]
    : [
        { label: 'Name', value: input.name },
        { label: 'Email', value: input.email },
      ];

  const html = buildEmailTemplate({
    title: isWebsiteQuote
      ? 'New Digital Solutions Quote Request'
      : 'New Contact Form Message',
    subtitle: isWebsiteQuote
      ? 'A website/service request was submitted'
      : 'A contact inquiry was submitted',
    sections: [
      { title: 'Sender Details', details },
      {
        title: isWebsiteQuote ? 'Project Details' : 'Message',
        bodyHtml: `<div style="margin:0 0 10px 0;padding:12px;background:#f8fafc;border-radius:8px;color:#111827;font-size:14px;line-height:22px;white-space:pre-wrap;">${
          escapeHtml(isWebsiteQuote ? input.projectDetails || '—' : input.message)
        }</div>`,
      },
    ],
  });

  return { subject, html };
}

export function buildWebsiteQuoteCustomerConfirmationEmail(input: {
  name: string;
  serviceType?: string;
  otherServiceType?: string;
}): { subject: string; html: string } {
  const subject = 'We received your digital solutions quote request';
  const greetingName = escapeHtml(input.name.trim().split(/\s+/)[0] || input.name.trim());
  const serviceLine =
    input.serviceType === 'Other' && input.otherServiceType?.trim()
      ? `${input.serviceType} (${input.otherServiceType.trim()})`
      : input.serviceType || '—';

  const linksSection = `
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Sign in to your account:</strong><br />
        <a href="${CUSTOMER_PORTAL_LOGIN_URL}" style="color:#2563eb;text-decoration:none;">${escapeHtml(CUSTOMER_PORTAL_LOGIN_URL)}</a>
      </p>
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Browse our services:</strong><br />
        <a href="${CUSTOMER_SERVICES_URL}" style="color:#2563eb;text-decoration:none;">${escapeHtml(CUSTOMER_SERVICES_URL)}</a>
      </p>
      <p style="margin:0;color:#64748b;font-size:13px;line-height:20px;">
        If you have an account, signing in helps you track messages and updates in one place.
      </p>`;

  const html = buildEmailTemplate({
    title: 'Thank you for your quote request',
    subtitle:
      'We received your details and will follow up by email about your digital solutions project.',
    sections: [
      {
        title: 'Hello',
        bodyHtml: `
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        Hi ${greetingName},
      </p>
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        Thank you for requesting a quote. We have your submission and will review it shortly.
      </p>
      <p style="margin:0 0 18px 0;color:#111827;font-size:14px;line-height:22px;">
        Here are quick links you can use anytime:
      </p>
      ${linksSection}`,
      },
      {
        title: 'What you asked about',
        details: [{ label: 'Service type', value: serviceLine }],
      },
    ],
  });

  return { subject, html };
}
