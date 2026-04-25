import { buildEmailTemplate, escapeHtml } from '@/lib/emails/template';

/**
 * @param siteOrigin e.g. https://www.skcreation.org — no trailing slash
 */
export function buildHandbookThankYouEmail(input: { siteOrigin: string }): {
  subject: string;
  html: string;
} {
  const subject = 'Thank you for subscribing to Dr. SK updates';
  const resourcesUrl = `${input.siteOrigin}/#resources`;
  const servicesUrl = `${input.siteOrigin}/services`;
  const contactUrl = `${input.siteOrigin}/#contact`;
  const loginUrl = `${input.siteOrigin}/login`;

  const linksSection = `
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Explore free resources (including the handbook PDF):</strong><br />
        <a href="${escapeHtml(
          resourcesUrl
        )}" style="color:#2563eb;text-decoration:none;">${escapeHtml(resourcesUrl)}</a>
      </p>
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Our services (sessions, programs &amp; more):</strong><br />
        <a href="${escapeHtml(
          servicesUrl
        )}" style="color:#2563eb;text-decoration:none;">${escapeHtml(servicesUrl)}</a>
      </p>
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Access premium resources:</strong><br />
        <a href="${escapeHtml(loginUrl)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(
    loginUrl
  )}</a>
      </p>
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        <strong>Request a custom quote or ask a question:</strong><br />
        <a href="${escapeHtml(contactUrl)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(
    contactUrl
  )}</a>
      </p>
      <p style="margin:16px 0 0 0;color:#64748b;font-size:13px;line-height:20px;">
        Thank you for subscribing. We will share relevant updates, resources, and announcements from Dr. SK.
      </p>`;

  const html = buildEmailTemplate({
    title: 'Thank you for subscribing',
    subtitle: 'We appreciate your subscription to Dr. SK updates.',
    sections: [
      {
        title: 'Hello',
        bodyHtml: `
      <p style="margin:0 0 14px 0;color:#111827;font-size:14px;line-height:22px;">
        Thank you for subscribing.
      </p>
      <p style="margin:0 0 18px 0;color:#111827;font-size:14px;line-height:22px;">
        You are now subscribed to receive updates from Dr. SK, including resources,
        services, and important announcements.
      </p>
      ${linksSection}`,
      },
    ],
  });

  return { subject, html };
}
