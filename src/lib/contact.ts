export type ContactFormPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

const API_URL = import.meta.env.VITE_CONTACT_API_URL as string | undefined;

/**
 * POST JSON to VITE_CONTACT_API_URL when configured.
 * Otherwise rejects so the UI shows the pending state.
 */
export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<void> {
  if (!API_URL?.trim()) {
    return Promise.reject(new Error("CONTACT_API_NOT_CONFIGURED"));
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`CONTACT_API_ERROR_${response.status}`);
  }
}
