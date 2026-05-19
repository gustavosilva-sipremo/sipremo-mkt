import HexField from "@/components/others/HexField";
import { Watermark } from "@/components/others/Watermark";
import { contactHexes } from "@/content/hexLayouts";
import { submitContactForm, type ContactFormPayload } from "@/lib/contact";
import { validateContactForm } from "@/lib/validateContact";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

type FormState = ContactFormPayload;

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function Contact() {
  const { t } = useTranslation("contact");
  const isMobile = useIsMobile();
  const [form, setForm] = useState<FormState>(initialForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "pending" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) return;

    const validation = validateContactForm(form, t);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("loading");
    try {
      await submitContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company?.trim() || undefined,
        message: form.message.trim(),
      });
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("pending");
    }
  }

  return (
    <section id="contact" className="relative w-full overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-30 bg-linear-to-b from-background via-muted/20 to-background" />
      <HexField variant="muted" hexes={contactHexes} className="-z-10" />

      {!isMobile && (
        <RevealOnScroll
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute inset-0 -z-20"
        >
          <Watermark />
        </RevealOnScroll>
      )}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:gap-16 sm:px-6 md:grid-cols-2">
        <RevealOnScroll className="space-y-6">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {t("badge")}
          </div>
          <h2 className="text-2xl leading-tight font-bold sm:text-3xl md:text-5xl">{t("title")}</h2>
          <p className="max-w-md leading-relaxed text-muted-foreground">{t("description")}</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>✔ {t("benefit1")}</li>
            <li>✔ {t("benefit2")}</li>
            <li>✔ {t("benefit3")}</li>
          </ul>
        </RevealOnScroll>

        <RevealOnScroll className="relative rounded-xl border border-border bg-background p-5 shadow-xl backdrop-blur-sm sm:p-8">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            noValidate
          >
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="sr-only"
            />

            <div>
              <label htmlFor="contact-name" className="mb-1 block text-sm">
                {t("form.name")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder={t("form.namePlaceholder")}
                className="w-full cursor-text rounded-lg border border-border bg-muted/40 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1 block text-sm">
                {t("form.email")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder={t("form.emailPlaceholder")}
                className="w-full cursor-text rounded-lg border border-border bg-muted/40 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-company" className="mb-1 block text-sm">
                {t("form.company")}
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                placeholder={t("form.companyPlaceholder")}
                className="w-full cursor-text rounded-lg border border-border bg-muted/40 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1 block text-sm">
                {t("form.message")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder={t("form.messagePlaceholder")}
                className="w-full resize-none cursor-text rounded-lg border border-border bg-muted/40 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full cursor-pointer rounded-lg bg-primary py-2 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? t("form.submitting") : t("form.submit")}
            </button>

            {status === "success" && (
              <p className="text-center text-sm text-primary" role="status">
                {t("form.success")}
              </p>
            )}
            {status === "pending" && (
              <p className="text-center text-sm text-muted-foreground" role="status">
                {t("form.pendingApi")}
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-destructive" role="alert">
                {t("form.error")}
              </p>
            )}

            <p className="text-center text-xs text-muted-foreground">{t("form.privacy")}</p>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
