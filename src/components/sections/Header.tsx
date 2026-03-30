import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolled = scrollY > 40;

  // 🔥 controla o invert progressivo (0 → 100)
  const invertValue = Math.max(0, 1 - scrollY / 120);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img
            src="/images/sipremo_logo.svg"
            alt="Sipremo"
            className="h-28 absolute w-auto transition-all duration-500"
            style={{
              filter: `invert(${invertValue})`,
              opacity: scrolled ? 0.8 : 0.9,
            }}
          />
          <img alt="Sipremo" className="h-10 w-auto opacity-0" />
        </a>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {["Sobre", "Impacto", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "relative group transition-colors duration-300 font-bold",
                scrolled
                  ? "text-foreground/80 hover:text-primary"
                  : "text-white/80 hover:text-white",
              )}
            >
              {item}

              {/* underline animado CORRIGIDO */}
              <span
                className={cn(
                  "absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover:w-full",
                  scrolled ? "bg-primary" : "bg-white",
                )}
              />
            </a>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {/* BOTÃO */}
          <Button
            size="sm"
            className={cn(
              "transition-all duration-300 border font-bold",
              scrolled
                ? "bg-primary text-primary-foreground border-transparent hover:opacity-90"
                : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur",
            )}
          >
            Contato
          </Button>

          {/* MENU MOBILE */}
          <Menu
            className={cn(
              "md:hidden transition-colors duration-300",
              scrolled ? "text-foreground" : "text-white",
            )}
          />
        </div>
      </div>
    </header>
  );
}
