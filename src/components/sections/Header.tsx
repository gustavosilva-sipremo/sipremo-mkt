import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrolled = scrollY > 40;
  const progress = Math.min(scrollY / 120, 1);

  const navItems = [
    { label: "Soluções", href: "#projects" },
    { label: "Valores", href: "#values" },
    { label: "Sobre nós", href: "#about" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <a href="/" className="flex items-center cursor-pointer">
              <img
                src="/images/sipremo_logo.svg"
                alt="Sipremo"
                className="h-14 select-none sm:h-16 md:h-20 w-auto transition-all duration-500"
                style={{ filter: `invert(${1 - progress})` }}
              />
            </a>

            {/* NAV */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative group font-medium transition-colors duration-300 cursor-pointer",
                    scrolled
                      ? "text-foreground/80 hover:text-primary"
                      : "text-white/80 hover:text-white",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute left-1/2 -bottom-1 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full",
                      scrolled ? "bg-primary" : "bg-white",
                    )}
                  />
                </a>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* LANGUAGE DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setLangOpen((prev) => !prev)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all border cursor-pointer",
                    scrolled
                      ? "bg-background hover:bg-muted border-border"
                      : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur",
                  )}
                >
                  <span>{lang === "pt" ? "🇧🇷" : "🇺🇸"}</span>
                  <ChevronDown size={16} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 rounded-md border bg-background/80 backdrop-blur-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setLang("pt");
                          setLangOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                      >
                        🇧🇷 Português
                      </button>

                      <button
                        onClick={() => {
                          setLang("en");
                          setLangOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                      >
                        🇺🇸 English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <a href="#contact" className="hidden md:block">
                <Button
                  className={cn(
                    "text-md px-4 py-6 font-semibold tracking-wide",
                    "bg-primary text-primary-foreground",
                    "rounded-lg",
                    "shadow-md shadow-primary/20",

                    // hover / interaction
                    "hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
                    "active:scale-95 active:shadow-sm",

                    // focus accessibility
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",

                    // smooth transitions
                    "transition-all duration-200 ease-in-out",

                    // layout
                    "inline-flex items-center justify-center gap-2",
                    "cursor-pointer",
                  )}
                >
                  Entre em Contato
                </Button>
              </a>

              {/* MOBILE BUTTON */}
              <button
                onClick={() => setMobileOpen(true)}
                className={cn(
                  "md:hidden p-2 rounded-md transition cursor-pointer",
                  scrolled ? "text-foreground" : "text-white",
                )}
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* overlay */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* panel */}
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "fixed right-0 top-0 z-50 h-full w-80 sm:w-96",
                "bg-background/70 backdrop-blur-xl border-l border-border/40",
                "shadow-2xl p-6 flex flex-col gap-6",
              )}
            >
              {/* header */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">Menu</span>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md hover:bg-muted transition cursor-pointer"
                >
                  <X />
                </button>
              </div>

              {/* nav */}
              <nav className="flex flex-col gap-3 mt-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-3 py-3 rounded-md font-medium transition",
                      "hover:bg-muted hover:text-primary cursor-pointer",
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* divider */}
              <div className="border-t border-border/40 my-2" />

              {/* CTA */}
              <a href="#contact">
                <Button
                  className={cn(
                    "text-lg w-full md:text-xl px-8 py-6 font-semibold tracking-wide",
                    "bg-primary text-primary-foreground",
                    "rounded-lg",
                    "shadow-md shadow-primary/20",

                    // hover / interaction
                    "hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
                    "active:scale-95 active:shadow-sm",

                    // focus accessibility
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",

                    // smooth transitions
                    "transition-all duration-200 ease-in-out",

                    // layout
                    "inline-flex items-center justify-center gap-2",
                    "cursor-pointer",
                  )}
                >
                  Entre em Contato
                </Button>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
