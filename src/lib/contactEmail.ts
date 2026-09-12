import type { z } from "zod";

import type { contactSchema } from "@/lib/contact";

type Submission = Pick<z.infer<typeof contactSchema>, "name" | "email" | "topic" | "message">;

export const topicLabels = {
  project: "New project",
  opportunity: "Work opportunity",
  other: "General enquiry",
} as const;

// Outfit and Lora are the site's heading and body faces. Only a few clients
// (Apple Mail, iOS) honour the webfont import, so every rule repeats a stack
// that degrades to system fonts everywhere else.
const heading = "'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif";
const body = "'Lora',Georgia,'Times New Roman',serif";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Keeps the visitor's paragraph breaks without letting their markup through. */
const paragraphs = (message: string) =>
  message
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 16px;font-family:${body};font-size:16px;line-height:28px;color:#27272a;">${escapeHtml(
          block
        ).replace(/\n/g, "<br />")}</p>`
    )
    .join("");

const row = (label: string, value: string) => `
            <tr>
              <td style="padding:0 0 4px;font-family:${heading};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#a1a1aa;">${label}</td>
            </tr>
            <tr>
              <td style="padding:0 0 20px;font-family:${heading};font-size:16px;line-height:24px;color:#18181b;">${value}</td>
            </tr>`;

export function renderContactEmail({ name, email, topic, message }: Submission) {
  const topicLabel = topicLabels[topic];
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const sentAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Bratislava",
  }).format(new Date());

  const text = [
    `${topicLabel} — new message from the portfolio contact form`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Sent: ${sentAt}`,
    "",
    message,
    "",
    `Reply straight to this email to answer ${name}.`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${topicLabel} — ${safeName}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&family=Lora:wght@400&display=swap');
      @media (max-width: 620px) {
        .shell { width: 100% !important; }
        .pad { padding-left: 24px !important; padding-right: 24px !important; }
        .headline { font-size: 28px !important; line-height: 34px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#fafafa;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${topicLabel} from ${safeName} — ${safeEmail}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fafafa;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="shell" style="width:600px;max-width:600px;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:8px;overflow:hidden;">
            <tr>
              <td class="pad" style="padding:36px 40px;background-color:#09090b;">
                <p style="margin:0 0 12px;font-family:${heading};font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#71717a;">Portfolio · Contact form</p>
                <h1 class="headline" style="margin:0;font-family:${heading};font-size:32px;line-height:38px;font-weight:500;letter-spacing:-0.5px;color:#ffffff;">${topicLabel}</h1>
              </td>
            </tr>
            <tr>
              <td class="pad" style="padding:36px 40px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${row("From", safeName)}${row(
                  "Email",
                  `<a href="mailto:${safeEmail}" style="color:#18181b;text-decoration:underline;text-underline-offset:3px;">${safeEmail}</a>`
                )}${row("Received", sentAt)}
                </table>
              </td>
            </tr>
            <tr>
              <td class="pad" style="padding:0 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fafafa;border-left:2px solid #18181b;">
                  <tr>
                    <td style="padding:24px 24px 8px;">${paragraphs(message)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="pad" style="padding:32px 40px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background-color:#18181b;border-radius:999px;">
                      <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(topicLabel)}" style="display:inline-block;padding:14px 28px;font-family:${heading};font-size:14px;color:#ffffff;text-decoration:none;">Reply to ${safeName} &nbsp;&#8599;</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:16px 0 0;font-family:${heading};font-size:13px;line-height:20px;color:#a1a1aa;">Replying to this email reaches ${safeName} directly.</p>
              </td>
            </tr>
            <tr>
              <td class="pad" style="padding:20px 40px;background-color:#fafafa;border-top:1px solid #e4e4e7;">
                <p style="margin:0;font-family:${heading};font-size:12px;line-height:18px;color:#a1a1aa;">Sent from the contact form at <a href="https://perdochjakub.com/contact" style="color:#71717a;text-decoration:underline;">perdochjakub.com</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject: `Portfolio: ${topicLabel} — ${name}`, html, text };
}
