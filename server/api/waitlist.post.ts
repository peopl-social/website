import { createError, readBody } from "h3";

interface WaitlistEntry {
  email: string;
  locale: string;
  joinedAt: string;
}

interface WaitlistBody {
  email?: unknown;
  locale?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254;

export default defineEventHandler(async (event) => {
  const body = await readBody<WaitlistBody>(event);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const locale = typeof body?.locale === "string" && body.locale ? body.locale : "en";

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    throw createError({ statusCode: 422, statusMessage: "invalid_email" });
  }

  const storage = useStorage("waitlist");
  const key = `entry:${email}`;

  if (await storage.hasItem(key)) {
    return { status: "duplicate" as const };
  }

  const entry: WaitlistEntry = { email, locale, joinedAt: new Date().toISOString() };
  await storage.setItem(key, entry);

  return { status: "joined" as const };
});
