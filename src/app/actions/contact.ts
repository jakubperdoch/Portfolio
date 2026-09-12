"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import { getPayload } from "payload";
import config from "@payload-config";
import { contactSchema, type ContactState } from "@/lib/contact";

const subjects = {
  project: "New project",
  opportunity: "Work opportunity",
  other: "General enquiry",
};

export async function sendContact(
  _previous: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", error: "invalid" };
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return { status: "error", error: "unavailable" };

  try {
    const requestHeaders = await headers();
    const ip = requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
    if (process.env.VERCEL && !ip) return { status: "error", error: "unavailable" };
    const bucket = Math.floor(Date.now() / (15 * 60 * 1000));
    const key = createHash("sha256")
      .update(`${ip || "local"}:${bucket}`)
      .digest("hex");
    const payload = await getPayload({ config });
    const db = payload.db.connection.db;
    if (!db) return { status: "error", error: "unavailable" };
    const limits = db.collection<{ _id: string; count: number; expiresAt: Date }>(
      "contact_rate_limits"
    );
    await limits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    const limit = await limits.findOneAndUpdate(
      { _id: key },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(Date.now() + 30 * 60 * 1000) } },
      { upsert: true, returnDocument: "after" }
    );
    if (!limit || limit.count > 5) return { status: "error", error: "rateLimited" };

    const { name, email, topic, message } = parsed.data;
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: "perdochjakub@gmail.com",
      replyTo: email,
      subject: `Portfolio: ${subjects[topic]}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${subjects[topic]}\n\n${message}`,
    });
    if (error) {
      // Resend reports configuration problems here (unverified domain, bad
      // `from`); the message never echoes the submitted body.
      console.error("Contact email rejected:", error.name, "-", error.message);
      return { status: "error", error: "failed" };
    }
    return { status: "success" };
  } catch (error) {
    console.error(
      "Contact delivery failed:",
      error instanceof Error ? error.message : "unknown error"
    );
    return { status: "error", error: "failed" };
  }
}
