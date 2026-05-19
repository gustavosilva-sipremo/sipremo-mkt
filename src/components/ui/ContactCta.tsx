import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

type CtaAppearance = "hero" | "header" | "headerOnDark";

const appearanceStyles: Record<CtaAppearance, string> = {
  hero: cn(
    "px-4 py-2.5 text-sm md:px-5 md:py-3 md:text-[0.9375rem]",
    "bg-white text-slate-900",
    "hover:bg-white/95",
  ),
  header: cn(
    "px-3.5 py-2 text-sm",
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90",
  ),
  headerOnDark: cn(
    "px-3.5 py-2 text-sm",
    "border border-white/30 bg-white/10 text-white backdrop-blur-md",
    "hover:border-white/45 hover:bg-white hover:text-slate-900",
  ),
};

type CtaButtonProps = {
  label: string;
  appearance: CtaAppearance;
  fullWidth?: boolean;
  className?: string;
};

function CtaButton({ label, appearance, fullWidth, className }: CtaButtonProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <span
      className={cn(
        "group/cta inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-medium",
        "transition-[transform,background-color,border-color,gap] duration-300",
        reducedMotion ? "" : "ease-out hover:gap-2.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        reducedMotion ? "" : "active:scale-[0.98]",
        appearanceStyles[appearance],
        fullWidth && "w-full",
        className,
      )}
    >
      <span className="leading-none">{label}</span>
      <span
        aria-hidden
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-lg",
          "transition-all duration-300",
          reducedMotion ? "" : "ease-out",
          appearance === "hero" && "bg-slate-900/10 group-hover/cta:bg-slate-900/15",
          appearance === "header" &&
            "bg-primary-foreground/15 group-hover/cta:bg-primary-foreground/25",
          appearance === "headerOnDark" &&
            "bg-white/15 group-hover/cta:bg-slate-900/10",
          !reducedMotion && "group-hover/cta:translate-x-px",
        )}
      >
        <ArrowRight className="size-3.5 stroke-[2.5]" />
      </span>
    </span>
  );
}

type ContactCtaProps = {
  className?: string;
  fullWidth?: boolean;
  appearance?: CtaAppearance;
};

export function ContactCta({
  className,
  fullWidth,
  appearance = "header",
}: ContactCtaProps) {
  const { t } = useTranslation("common");

  return (
    <CtaButton
      label={t("cta.contact")}
      appearance={appearance}
      fullWidth={fullWidth}
      className={className}
    />
  );
}

export function LearnCta({ className }: { className?: string }) {
  const { t } = useTranslation("common");

  return (
    <CtaButton
      label={t("cta.hero")}
      appearance="hero"
      className={className}
    />
  );
}
