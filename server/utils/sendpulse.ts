import type { H3Event } from "h3";

const API_URL = "https://api.sendpulse.com";

interface SendPulseConfig {
  apiKey: string;
  addressBookId: string;
}

/** Vars and secrets from wrangler: `wrangler secret put` in production, .dev.vars locally. */
interface CloudflareEnv {
  SENDPULSE_API_KEY?: string;
  SENDPULSE_ADDRESS_BOOK_ID?: string;
}

/**
 * Workers have no process.env: secrets arrive per request on the Cloudflare env,
 * which Nitro puts on event.context.cloudflare (also in `nuxt dev`, via wrangler).
 */
export function getSendPulseConfig(event: H3Event): SendPulseConfig | undefined {
  const env = (event.context.cloudflare as { env?: CloudflareEnv } | undefined)?.env;
  const apiKey = env?.SENDPULSE_API_KEY?.trim();
  const addressBookId = env?.SENDPULSE_ADDRESS_BOOK_ID?.trim();
  if (!apiKey || !addressBookId) return undefined;
  return { apiKey, addressBookId };
}

function listPath(config: SendPulseConfig) {
  return `/addressbooks/${encodeURIComponent(config.addressBookId)}/emails`;
}

/**
 * Whether the email is already on the list. Any failure other than a clear
 * "found" counts as no, since adding an existing contact again is harmless.
 */
export async function isOnSendPulseList(config: SendPulseConfig, email: string): Promise<boolean> {
  try {
    const contact = await $fetch<{ email?: string } | { email?: string }[]>(
      `${listPath(config)}/${encodeURIComponent(email)}`,
      {
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${config.apiKey}` },
        timeout: 5_000,
        retry: 0,
      },
    );
    const found = Array.isArray(contact) ? contact[0] : contact;
    return found?.email?.toLowerCase() === email;
  } catch {
    return false;
  }
}

/**
 * Adds one email to a SendPulse mailing list (single opt-in).
 * https://sendpulse.com/integrations/api/bulk-email
 */
export async function addToSendPulseList(config: SendPulseConfig, email: string): Promise<void> {
  const response = await $fetch<{ result?: boolean }>(listPath(config), {
    baseURL: API_URL,
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}` },
    body: { emails: [email] },
    timeout: 10_000,
    retry: 1,
  });

  if (response?.result !== true) {
    throw new Error(`SendPulse rejected the signup: ${JSON.stringify(response)}`);
  }
}
