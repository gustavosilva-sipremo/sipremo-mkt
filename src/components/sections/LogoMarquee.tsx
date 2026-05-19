import { logoItems } from "@/content/logos";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Building,
  Building2,
  Factory,
  Globe,
  Landmark,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Building,
  Factory,
  Landmark,
  Warehouse,
  Globe,
  Briefcase,
};

export default function LogoMarquee() {
  const { t } = useTranslation("common");
  const items = [...logoItems, ...logoItems];

  return (
    <section
      className="relative z-20 overflow-hidden border-b border-border/50 bg-background"
      aria-label={t("logosMarquee")}
    >
      <div className="logo-marquee-mask py-8 sm:py-10">
        <div className="flex w-max animate-logo-scroll items-center gap-5 sm:gap-8" aria-hidden>
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Building2;
            return (
              <div
                key={`${item.id}-${index}`}
                className={cn(
                  "flex h-14 w-[8.5rem] shrink-0 items-center justify-center rounded-xl",
                  "border border-border/70 bg-background shadow-sm",
                  "transition-shadow duration-300 hover:shadow-md",
                  "sm:h-16 sm:w-40",
                )}
              >
                <Icon
                  className="h-7 w-7 text-foreground/45 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
