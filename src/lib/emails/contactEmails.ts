import {
  buildEmailTemplate,
  escapeHtml,
  sanitizeEmailHeader,
} from '@/lib/emails/template';

/** Public site URLs for customer-facing transactional emails */
const CUSTOMER_SERVICES_URL = 'https://www.skcreation.org/services';
const CUSTOMER_CONTACT_URL = 'https://www.skcreation.org/contact';

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
    ? sanitizeEmailHeader(`New SK Creation service request from ${input.name}`)
    : sanitizeEmailHeader(`New Contact Form Message from ${input.name}`);

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
      ? 'New SK Creation Service Request'
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
  const subject = 'We received your SK Creation service request';
  const greetingName = escapeHtml(input.name.trim().split(/\s+/)[0] || input.name.trim());
  const serviceLine =
    input.serviceType === 'Other / Not Sure' && input.otherServiceType?.trim()
      ? `${input.serviceType} (${input.otherServiceType.trim()})`
      : input.serviceType || '—';

  const linksSection = `
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Browse our services:</strong><br />
        <a href="${CUSTOMER_SERVICES_URL}" style="color:#2563eb;text-decoration:none;">${escapeHtml(CUSTOMER_SERVICES_URL)}</a>
      </p>
      <p style="margin:0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Contact us:</strong><br />
        <a href="${CUSTOMER_CONTACT_URL}" style="color:#2563eb;text-decoration:none;">${escapeHtml(CUSTOMER_CONTACT_URL)}</a>
      </p>`;

  const html = buildEmailTemplate({
    title: 'Thank you for your quote request',
    subtitle:
      'We received your details and will follow up by email with the best next step.',
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
