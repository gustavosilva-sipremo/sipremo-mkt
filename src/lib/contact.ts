export type ContactFormPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

/**
 * Future API contract:
 * POST /api/contact
 * Body: ContactFormPayload
 * Headers: Content-Type: application/json
 * Response: 204 or { ok: true }
 */
export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<void> {
  void payload;
  // API integration pending — reject so UI can show "coming soon" state
  return Promise.reject(new Error("CONTACT_API_NOT_CONFIGURED"));
}
