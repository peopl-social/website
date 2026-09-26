import { createError, readBody } from "h3";
import * as v from "valibot";
import { waitlistSchema, type WaitlistResponse } from "#shared/utils/waitlist";
import { addToSendPulseList, getSendPulseConfig } from "../utils/sendpulse";

interface WaitlistEntry {
  email: string;
  locale: string;
  joinedAt: string;
}

export default defineEventHandler(async (event): Promise<WaitlistResponse> => {
  // Never trust the client check: validate again with the same schema.
  const parsed = v.safeParse(waitlistSchema, await readBody(event).catch(() => undefined));
  if (!parsed.success) {
    throw createError({ statusCode: 422, statusMessage: "invalid_email" });
  }
  const { email, locale } = parsed.output;

  // Local record is only for spotting repeat signups. It's best effort: on hosts
  // without a writable disk it fails, and SendPulse stays the source of truth.
  const storage = useStorage("waitlist");
  const key = `entry:${email}`;
  if (await storage.hasItem(key).catch(() => false)) {
    return { status: "duplicate" };
  }

  const sendpulse = getSendPulseConfig();
  if (sendpulse) {
    try {
      await addToSendPulseList(sendpulse, email);
    } catch (error) {
      console.error("[submit] SendPulse request failed", error);
      throw createError({ statusCode: 502, statusMessage: "subscribe_failed" });
    }
  } else if (import.meta.dev) {
    console.warn(
      "[submit] SENDPULSE_API_KEY or SENDPULSE_ADDRESS_BOOK_ID missing, saved locally only",
    );
  } else {
    console.error("[submit] SENDPULSE_API_KEY or SENDPULSE_ADDRESS_BOOK_ID is not set");
    throw createError({ statusCode: 500, statusMessage: "subscribe_unavailable" });
  }

  // Only recorded once SendPulse has it, so a failed call can be retried.
  const entry: WaitlistEntry = { email, locale, joinedAt: new Date().toISOString() };
  await storage.setItem(key, entry).catch((error: unknown) => {
    console.warn("[submit] Could not save local waitlist entry", error);
  });

  return { status: "joined" };
});
