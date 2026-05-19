import { useThrottledScroll } from "@/hooks/useThrottledScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const SHOW_AFTER_PX = 400;

export default function ScrollToTop() {
  const { t } = useTranslation("common");
  const scrollY = useThrottledScroll();
  const reducedMotion = usePrefersReducedMotion();
  const visible = scrollY > SHOW_AFTER_PX;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("scrollToTop")}
      title={t("scrollToTop")}
      className={cn(
        "fixed right-6 bottom-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full",
        "border border-border/60 bg-background/90 text-primary shadow-lg backdrop-blur-md",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
