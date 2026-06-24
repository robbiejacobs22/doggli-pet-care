"use server";

import { Resend } from "resend";
import {
  bookingSchema,
  contactSchema,
  serviceLabel,
  sizeLabel,
  type BookingInput,
  type SubmitResult,
} from "@/lib/booking-schema";
import { site } from "@/lib/site";

/**
 * Submissions are delivered two ways:
 *   1. Formspree — the system of record. Notifies the owner and logs every
 *      submission to a dashboard you can export to a spreadsheet. Works with
 *      zero config (uses the existing endpoint below; override with env).
 *   2. Resend — sends the customer a branded confirmation email. Best-effort:
 *      requires RESEND_API_KEY and a verified sending domain. If it isn't
 *      configured (or can't email a customer yet), the submission still
 *      succeeds via Formspree — there is never a fallback popup.
 */
const FORMSPREE =
  process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xbdapwvq";

// OWNER TODO: verify a domain in Resend, then set BOOKING_FROM_EMAIL to e.g.
// "Doggli Pet Care <hello@doggli.com>" so branded customer emails send.
const FROM =
  process.env.BOOKING_FROM_EMAIL || "Doggli Pet Care <onboarding@resend.dev>";

async function postToFormspree(payload: Record<string, unknown>): Promise<boolean> {
  if (!FORMSPREE) return false;
  try {
    const res = await fetch(FORMSPREE, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    console.error("[formspree] error", err);
    return false;
  }
}

async function sendCustomerConfirmation({
  to,
  name,
  intro,
  rows,
}: {
  to: string;
  name: string;
  intro: string;
  rows: [string, string][];
}) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to,
      subject: `We got your message, ${name}! 🐾 — ${site.name}`,
      html: confirmationHtml({ name, intro, rows }),
    });
  } catch (err) {
    // Non-fatal: customer email needs a verified domain. Formspree already
    // delivered the submission, so we never surface this as a failure.
    console.error("[resend] customer confirmation skipped", err);
  }
}

/** Multi-step booking inquiry. */
export async function sendBooking(raw: unknown): Promise<SubmitResult> {
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }
  const d = parsed.data;
  if (d.company) return { ok: true }; // honeypot

  const rows = bookingRows(d);
  const delivered = await postToFormspree({
    _subject: `New booking inquiry — ${serviceLabel(d.service)} for ${d.dogName}`,
    name: d.ownerName,
    email: d.email,
    phone: d.phone,
    preferred_contact: d.preferredContact,
    service: serviceLabel(d.service),
    dates: `${d.startDate}${d.endDate ? ` to ${d.endDate}` : ""}`,
    dogs: d.dogCount,
    dog_name: d.dogName,
    breed: d.breed || "—",
    size: sizeLabel(d.size),
    vaccinations_confirmed: d.vaccinated ? "Yes" : "To confirm",
    notes: d.notes || "—",
  });

  await sendCustomerConfirmation({
    to: d.email,
    name: d.ownerName,
    intro: `Thanks for reaching out about ${serviceLabel(
      d.service,
    ).toLowerCase()} for ${d.dogName}! We received your request and we'll be in touch very soon.`,
    rows,
  });

  if (delivered) return { ok: true };
  return {
    ok: false,
    error: "We couldn't send that just now. Please call or text us instead.",
  };
}

/** Simpler standalone contact message. */
export async function sendContact(raw: unknown): Promise<SubmitResult> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }
  const d = parsed.data;
  if (d.company) return { ok: true };

  const delivered = await postToFormspree({
    _subject: `New message from ${d.name} — ${site.name}`,
    name: d.name,
    email: d.email,
    message: d.message,
  });

  await sendCustomerConfirmation({
    to: d.email,
    name: d.name,
    intro: "Thanks for reaching out! We received your message and we'll reply as soon as we can.",
    rows: [["Your message", d.message]],
  });

  if (delivered) return { ok: true };
  return {
    ok: false,
    error: "We couldn't send that just now. Please call or text us instead.",
  };
}

function bookingRows(d: BookingInput): [string, string][] {
  return [
    ["Service", serviceLabel(d.service)],
    ["Dates", `${d.startDate}${d.endDate ? ` → ${d.endDate}` : ""}`],
    ["Number of dogs", String(d.dogCount)],
    ["Dog", `${d.dogName}${d.breed ? ` (${d.breed})` : ""}`],
    ["Size", sizeLabel(d.size)],
    ["Vaccinations", d.vaccinated ? "Up to date" : "To confirm at meet & greet"],
    ...(d.notes ? ([["Notes", d.notes]] as [string, string][]) : []),
  ];
}

/** Warm, branded HTML confirmation email (email-client-safe inline styles). */
function confirmationHtml({
  name,
  intro,
  rows,
}: {
  name: string;
  intro: string;
  rows: [string, string][];
}) {
  const rowsHtml = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eadfca;color:#5b5040;font-size:14px;vertical-align:top;width:42%">${k}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eadfca;color:#27331f;font-size:14px;font-weight:600;vertical-align:top">${v}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en"><body style="margin:0;background:#fbf8f0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf8f0;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #eadfca;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="background:#2f5e43;padding:28px 32px;">
            <div style="font-size:24px;font-weight:700;color:#f4d58a;letter-spacing:-0.01em;">${site.shortName}</div>
            <div style="margin-top:4px;color:#cfe0d3;font-size:13px;">Give your dog the best day, every day.</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 12px;font-size:22px;color:#1f3a2b;">Hi ${name}, we got it! 🐾</h1>
            <p style="margin:0 0 20px;color:#5b5040;font-size:15px;line-height:1.6;">${intro}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eadfca;">
              ${rowsHtml}
            </table>
            <div style="margin-top:28px;text-align:center;">
              <a href="tel:${site.phoneRaw}" style="display:inline-block;background:#f4d58a;color:#1f3a2b;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;">Call us: ${site.phone}</a>
            </div>
            <p style="margin:24px 0 0;color:#8a7c64;font-size:13px;line-height:1.6;text-align:center;">
              ${site.address.full}<br/>${site.hours}
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#27331f;padding:18px 32px;color:#cfe0d3;font-size:12px;text-align:center;">
            With tail wags, the ${site.name} team
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
