import * as v from "valibot";
import { waitlistSchema, type WaitlistResponse } from "#shared/utils/waitlist";

export type WaitlistStatus = "idle" | "loading" | "joined" | "duplicate" | "invalid" | "error";

/** Shared by every waitlist form on the page so joining once updates all of them. */
export function useWaitlist() {
  const email = useState("waitlist-email", () => "");
  const status = useState<WaitlistStatus>("waitlist-status", () => "idle");

  const done = computed(() => status.value === "joined" || status.value === "duplicate");

  const message = computed(
    () =>
      ({
        idle: "",
        loading: "",
        joined: "You're on the list. We'll email you when your invite is ready.",
        duplicate: "You're already on the list. We'll be in touch.",
        invalid: "That email doesn't look right. Check it and try again.",
        error: "Something went wrong on our side. Try again in a minute.",
      })[status.value],
  );

  async function submit() {
    if (status.value === "loading" || done.value) return;

    const parsed = v.safeParse(waitlistSchema, { email: email.value, locale: "en" });
    if (!parsed.success) {
      status.value = "invalid";
      return;
    }

    status.value = "loading";
    try {
      const response = await $fetch<WaitlistResponse>("/api/submit", {
        method: "POST",
        body: parsed.output,
      });
      status.value = response.status;
    } catch (error) {
      // The server runs the same schema, so a 422 still means the email itself is wrong.
      const code = (error as { statusCode?: number }).statusCode;
      status.value = code === 422 ? "invalid" : "error";
    }
  }

  function clearError() {
    if (status.value === "invalid" || status.value === "error") status.value = "idle";
  }

  return { email, status, done, message, submit, clearError };
}
