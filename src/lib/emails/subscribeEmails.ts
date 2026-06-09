import {
  buildEmailTemplate,
  escapeHtml,
  sanitizeEmailHeader,
} from '@/lib/emails/template';

/**
 * @param siteOrigin e.g. https://www.skcreation.org — no trailing slash
 */
export function buildHandbookThankYouEmail(input: { siteOrigin: string }): {
  subject: string;
  html: string;
} {
  const subject = "You're subscribed — SK Creation updates";
  const servicesUrl = `${input.siteOrigin}/services`;
  const contactUrl = `${input.siteOrigin}/contact`;

  const linksSection = `
      <p style="margin:0 0 12px 0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Services</strong> (sessions, programs &amp; more)<br />
        <a href="${escapeHtml(servicesUrl)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(servicesUrl)}</a>
      </p>
      <p style="margin:0 0 0 0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Contact or custom quote</strong><br />
        <a href="${escapeHtml(contactUrl)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(contactUrl)}</a>
      </p>`;

  const html = buildEmailTemplate({
    title: "You're on the list",
    subtitle:
      'Occasional updates from SK Creation: resources, services, and announcements — no spam.',
    footerSignoff: {
      name: 'SK Creation',
      title: 'Part of SMIND BUSINESS LLC',
    },
    sections: [
      {
        title: 'What happens next',
        bodyHtml: `
      <p style="margin:0 0 16px 0;color:#111827;font-size:14px;line-height:22px;">
        Thanks for subscribing. You’ll hear from us when there’s something useful to share
        (session openings, service updates, or site news). Here are quick links if you want to explore now:
      </p>
      ${linksSection}`,
      },
    ],
  });

  return { subject, html };
}

/** Short internal notice when a new row is saved to handbook_subscribers */
export function buildHandbookSubscribeAdminEmail(input: { subscriberEmail: string }): {
  subject: string;
  html: string;
} {
  const subject = sanitizeEmailHeader(`New subscriber: ${input.subscriberEmail}`);
  const html = buildEmailTemplate({
    title: 'New handbook subscriber',
    subtitle: 'Saved to Supabase table handbook_subscribers.',
    footerSignoff: {
      name: 'SK Creation',
      title: 'Automated notification',
    },
    sections: [
      {
        title: 'Subscriber email',
        bodyHtml: `<p style="margin:0;color:#111827;font-size:14px;line-height:22px;"><strong>${escapeHtml(
          input.subscriberEmail
        )}</strong></p>`,
      },
    ],
  });

  return { subject, html };
}
