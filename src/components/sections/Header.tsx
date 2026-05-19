import { ContactCta } from "@/components/ui/ContactCta";
import { navItems } from "@/content/nav";
import { useThrottledScroll } from "@/hooks/useThrottledScroll";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation(["nav", "common"]);
  const scrollY = useThrottledScroll();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const lang = i18n.language === "en" ? "en" : "pt";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const firstLink = drawerRef.current?.querySelector("a");
    (firstLink as HTMLElement | null)?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const scrolled = scrollY > 40;
  const progress = Math.min(scrollY / 120, 1);

  const setLanguage = (lng: "pt" | "en") => {
    void i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-background/80 shadow-sm backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between">
            <a href="/" className="flex cursor-pointer items-center">
              <img
                src="/images/sipremo_logo.svg"
                alt="Sipremo"
                className="h-14 w-auto select-none transition-all duration-500 sm:h-16 md:h-20"
                style={{ filter: `invert(${1 - progress})` }}
              />
            </a>

            <nav
              className="hidden items-center gap-6 text-sm md:flex lg:gap-8"
              aria-label={t("nav:main")}
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "group relative cursor-pointer font-medium transition-colors duration-300",
                    scrolled
                      ? "text-foreground/80 hover:text-primary"
                      : "text-white/80 hover:text-white",
                  )}
                >
                  {t(`nav:${item.id}`)}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full",
                      scrolled ? "bg-primary" : "bg-white",
                    )}
                  />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  aria-label={lang === "pt" ? t("common:lang.pt") : t("common:lang.en")}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-all",
                    scrolled
                      ? "border-border bg-background hover:bg-muted"
                      : "border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20",
                  )}
                >
                  <span>{lang === "pt" ? "🇧🇷" : "🇺🇸"}</span>
                  <ChevronDown size={16} aria-hidden />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      role="listbox"
                      className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border bg-background/80 shadow-lg backdrop-blur-xl"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={lang === "pt"}
                        onClick={() => setLanguage("pt")}
                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                      >
                        🇧🇷 {t("common:lang.pt")}
                      </button>
                      <button
                        type="button"
                        role="option"
                        aria-selected={lang === "en"}
                        onClick={() => setLanguage("en")}
                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                      >
                        🇺🇸 {t("common:lang.en")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#contact" className="hidden md:block">
                <ContactCta />
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={t("common:menu")}
                className={cn(
                  "cursor-pointer rounded-md p-2 transition md:hidden",
                  scrolled ? "text-foreground" : "text-white",
                )}
              >
                <Menu aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />

            <motion.div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t("common:menu")}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "fixed top-0 right-0 z-50 flex h-full w-80 flex-col gap-6 border-l border-border/40 bg-background/70 p-6 shadow-2xl backdrop-blur-xl sm:w-96",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{t("common:menu")}</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="cursor-pointer rounded-md p-2 transition hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X aria-hidden />
                </button>
              </div>

              <nav className="mt-2 flex flex-col gap-3" aria-label={t("nav:main")}>
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="cursor-pointer rounded-md px-3 py-3 font-medium transition hover:bg-muted hover:text-primary"
                  >
                    {t(`nav:${item.id}`)}
                  </a>
                ))}
              </nav>

              <div className="my-2 border-t border-border/40" />

              <a href="#contact" onClick={() => setMobileOpen(false)}>
                <ContactCta fullWidth />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
