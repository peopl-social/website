import * as v from "valibot";

/**
 * Waitlist signup. Shared by the form (instant feedback) and /api/submit (the check
 * that counts), so both sides accept exactly the same input.
 */
export const waitlistSchema = v.object({
  email: v.pipe(
    v.string(),
    v.trim(),
    v.toLowerCase(),
    v.nonEmpty("invalid_email"),
    v.maxLength(254, "invalid_email"),
    v.email("invalid_email"),
  ),
  locale: v.optional(v.picklist(["en"]), "en"),
});

export type WaitlistInput = v.InferInput<typeof waitlistSchema>;
export type WaitlistSignup = v.InferOutput<typeof waitlistSchema>;

export interface WaitlistResponse {
  status: "joined" | "duplicate";
}
