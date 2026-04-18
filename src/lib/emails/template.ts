export type EmailDetailItem = {
  label: string;
  value: string;
};

export type EmailSection = {
  title: string;
  details?: EmailDetailItem[];
  bodyHtml?: string;
};

type EmailTemplateInput = {
  title: string;
  subtitle: string;
  sections: EmailSection[];
  reference?: string;
};

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderDetails(details: EmailDetailItem[]): string {
  return details
    .map(
      (item) =>
        `<p style="margin:0 0 10px 0;color:#111827;font-size:14px;line-height:22px;"><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</p>`
    )
    .join('');
}

function renderSection(section: EmailSection): string {
  const detailsHtml = section.details?.length ? renderDetails(section.details) : '';
  const bodyHtml = section.bodyHtml || '';

  return `
  <tr>
    <td style="padding:0 28px 18px 28px;">
      <div style="border:1px solid #e5e7eb;border-radius:12px;background:#ffffff;padding:18px 18px 6px 18px;">
        <h2 style="margin:0 0 12px 0;color:#0f172a;font-size:16px;line-height:24px;font-weight:700;">
          ${escapeHtml(section.title)}
        </h2>
        ${detailsHtml}
        ${bodyHtml}
      </div>
    </td>
  </tr>`;
}

export function buildEmailTemplate(input: EmailTemplateInput): string {
  const sectionsHtml = input.sections.map((section) => renderSection(section)).join('');
  const referenceHtml = input.reference
    ? `<p style="margin:10px 0 0 0;color:#94a3b8;font-size:12px;line-height:18px;">${escapeHtml(input.reference)}</p>`
    : '';

  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f7fa;margin:0;padding:24px 12px;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:620px;background:#ffffff;border-radius:12px;box-shadow:0 4px 18px rgba(15,23,42,0.08);overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 20px 28px;">
              <h1 style="margin:0;color:#0f172a;font-size:24px;line-height:32px;font-weight:700;">
                ${escapeHtml(input.title)}
              </h1>
              <p style="margin:8px 0 0 0;color:#64748b;font-size:14px;line-height:22px;">
                ${escapeHtml(input.subtitle)}
              </p>
              <div style="margin-top:18px;border-top:1px solid #e2e8f0;line-height:1px;font-size:1px;">&nbsp;</div>
            </td>
          </tr>

          ${sectionsHtml}

          <tr>
            <td style="padding:0 28px 28px 28px;">
              <div style="border-top:1px solid #e2e8f0;padding-top:16px;">
                <p style="margin:0;color:#0f172a;font-size:14px;line-height:22px;font-weight:700;">Dr. SK</p>
                <p style="margin:2px 0 10px 0;color:#475569;font-size:13px;line-height:20px;">Founder, SK Creation</p>
                <p style="margin:0 0 4px 0;color:#334155;font-size:13px;line-height:20px;">
                  &#127760; <a href="https://www.skcreation.org" style="color:#2563eb;text-decoration:none;">www.skcreation.org</a>
                </p>
                <p style="margin:0;color:#334155;font-size:13px;line-height:20px;">
                  &#9993; <a href="mailto:info@skcreation.org" style="color:#2563eb;text-decoration:none;">info@skcreation.org</a>
                </p>
                ${referenceHtml}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}
