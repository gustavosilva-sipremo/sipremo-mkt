import type { TFunction } from "i18next";
import type { ContactFormPayload } from "@/lib/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormPayload, string>
>;

export function validateContactForm(
  data: ContactFormPayload,
  t: TFunction<"contact">,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!data.name.trim()) {
    errors.name = t("validation.nameRequired");
  }

  if (!data.email.trim()) {
    errors.email = t("validation.emailRequired");
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = t("validation.emailInvalid");
  }

  if (!data.message.trim()) {
    errors.message = t("validation.messageRequired");
  } else if (data.message.trim().length < 10) {
    errors.message = t("validation.messageMin");
  } else if (data.message.trim().length > 2000) {
    errors.message = t("validation.messageMax");
  }

  return errors;
}
