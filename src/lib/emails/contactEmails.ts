import { buildEmailTemplate, escapeHtml } from '@/lib/emails/template';

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
