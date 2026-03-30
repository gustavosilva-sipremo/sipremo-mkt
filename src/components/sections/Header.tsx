import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolled = scrollY > 40;

  // 🔥 progressivo (0 → 1)
  const progress = Math.min(scrollY / 120, 1);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* GRID REAL (3 COLUNAS IGUAIS) */}
        <div className="grid grid-cols-3 items-center h-20">
          {/* LEFT - LOGO */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/images/sipremo_logo.svg"
                alt="Sipremo"
                className="h-20 w-auto transition-all duration-500"
                style={{
                  filter: `invert(${1 - progress})`,
                }}
              />
            </a>
          </div>

          {/* CENTER - NAV */}
          <nav className="hidden md:flex justify-center items-center gap-10 text-sm">
            {["Sobre", "Impacto", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={cn(
                  "relative group font-medium transition-colors duration-300",
                  scrolled
                    ? "text-foreground/80 hover:text-primary"
                    : "text-white/80 hover:text-white",
                )}
              >
                {item}

                {/* underline elegante */}
                <span
                  className={cn(
                    "absolute left-1/2 -bottom-1 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full",
                    scrolled ? "bg-primary" : "bg-white",
                  )}
                />
              </a>
            ))}
          </nav>

          {/* RIGHT - ACTIONS */}
          <div className="flex items-center justify-end gap-3">
            <Button
              size="sm"
              className={cn(
                "transition-all duration-300 border font-medium",
                scrolled
                  ? "bg-primary text-primary-foreground border-transparent hover:opacity-90"
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur",
              )}
            >
              Contato
            </Button>

            <Menu
              className={cn(
                "md:hidden transition-colors duration-300",
                scrolled ? "text-foreground" : "text-white",
              )}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
