import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type ContactCtaProps = {
  className?: string;
  fullWidth?: boolean;
};

export function ContactCta({ className, fullWidth }: ContactCtaProps) {
  const { t } = useTranslation("common");

  return (
    <Button variant="cta" className={fullWidth ? `w-full ${className ?? ""}` : className}>
      {t("cta.contact")}
    </Button>
  );
}

export function LearnCta({ className }: { className?: string }) {
  const { t } = useTranslation("common");

  return (
    <Button variant="cta" className={className}>
      {t("cta.learnMore")}
    </Button>
  );
}
