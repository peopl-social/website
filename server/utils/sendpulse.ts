const API_URL = "https://api.sendpulse.com";

interface SendPulseConfig {
  apiKey: string;
  addressBookId: string;
}

/** Read at request time so the key never gets baked into the build output. */
export function getSendPulseConfig(): SendPulseConfig | undefined {
  const apiKey = process.env.SENDPULSE_API_KEY?.trim();
  const addressBookId = process.env.SENDPULSE_ADDRESS_BOOK_ID?.trim();
  if (!apiKey || !addressBookId) return undefined;
  return { apiKey, addressBookId };
}

/**
 * Adds one email to a SendPulse mailing list (single opt-in).
 * https://sendpulse.com/integrations/api/bulk-email
 */
export async function addToSendPulseList(config: SendPulseConfig, email: string): Promise<void> {
  const response = await $fetch<{ result?: boolean }>(
    `/addressbooks/${encodeURIComponent(config.addressBookId)}/emails`,
    {
      baseURL: API_URL,
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}` },
      body: { emails: [email] },
      timeout: 10_000,
      retry: 1,
    },
  );

  if (response?.result !== true) {
    throw new Error(`SendPulse rejected the signup: ${JSON.stringify(response)}`);
  }
}
