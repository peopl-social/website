import { createError, readBody } from "h3";
import * as v from "valibot";
import { waitlistSchema, type WaitlistResponse } from "#shared/utils/waitlist";
import { addToSendPulseList, getSendPulseConfig, isOnSendPulseList } from "../utils/sendpulse";

export default defineEventHandler(async (event): Promise<WaitlistResponse> => {
  // Never trust the client check: validate again with the same schema.
  const parsed = v.safeParse(waitlistSchema, await readBody(event).catch(() => undefined));
  if (!parsed.success) {
    throw createError({ statusCode: 422, statusMessage: "invalid_email" });
  }
  const { email } = parsed.output;

  const sendpulse = getSendPulseConfig(event);
  if (!sendpulse) {
    console.error("[submit] SENDPULSE_API_KEY or SENDPULSE_ADDRESS_BOOK_ID is not set");
    throw createError({ statusCode: 500, statusMessage: "subscribe_unavailable" });
  }

  // SendPulse is the only record of who signed up (Workers have no disk).
  if (await isOnSendPulseList(sendpulse, email)) {
    return { status: "duplicate" };
  }

  try {
    await addToSendPulseList(sendpulse, email);
  } catch (error) {
    console.error("[submit] SendPulse request failed", error);
    throw createError({ statusCode: 502, statusMessage: "subscribe_failed" });
  }

  return { status: "joined" };
});
