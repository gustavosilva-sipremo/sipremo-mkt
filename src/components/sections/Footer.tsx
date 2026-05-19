import { Globe, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className="relative mt-18 overflow-hidden bg-linear-to-b from-background to-secondary-foreground/90 pt-32">
      <div className="relative mx-auto max-w-7xl px-6 py-18">
        <div className="grid items-start gap-14 md:grid-cols-2">
          <div className="space-y-5">
            <img
              src="/images/sipremo_logo.svg"
              alt="Sipremo"
              className="h-20 w-auto select-none brightness-0 invert"
            />
            <p className="max-w-xs text-sm leading-relaxed text-secondary">{t("tagline")}</p>
          </div>

          <div className="space-y-4 md:text-right">
            <h2 className="text-sm font-semibold tracking-wide text-secondary uppercase">
              {t("social")}
            </h2>
            <div className="flex gap-3 md:justify-end">
              <a
                href="https://sipremo.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("socialWebsite")}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-primary"
              >
                <Globe className="h-5 w-5 text-secondary/70 transition group-hover:text-primary-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/company/sipremo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("socialShare")}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-primary"
              >
                <Share2 className="h-5 w-5 text-secondary/70 transition group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 text-center text-xs text-secondary sm:mt-2">
          <div>
            <p className="mb-1 font-medium tracking-wide text-secondary uppercase">
              {t("presence")}
            </p>
            <p>{t("locations")}</p>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-80 md:flex-row">
            <p>
              © {new Date().getFullYear()} {t("copyright")}
            </p>
            <span className="hidden md:inline" aria-hidden>
              •
            </span>
            <p>{t("rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
