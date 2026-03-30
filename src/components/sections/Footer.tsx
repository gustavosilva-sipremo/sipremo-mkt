import { Separator } from "@/components/ui/separator";
import { Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32 border-t bg-background">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          {/* BRAND */}
          <div className="space-y-4">
            <img
              src="/images/sipremo_logo.svg"
              alt="Sipremo"
              className="h-20 w-auto"
            />

            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Tecnologia prevendo o futuro e garantindo o nosso presente.
            </p>
          </div>

          {/* SOCIAL */}
          <div className="space-y-3 md:text-right">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Redes
            </h4>

            <div className="flex md:justify-end gap-3">
              <a
                href="#"
                className="group flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-primary transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition" />
              </a>

              <a
                href="#"
                className="group flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-primary transition-all duration-300 hover:scale-105"
              >
                <Share2 className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center gap-4 text-xs text-muted-foreground text-center">
          <div>
            <p className="font-medium text-foreground uppercase tracking-wide mb-1">
              Presença
            </p>
            <p>Flórida, EUA • São Paulo, Brasil</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 opacity-80">
            <p>© {new Date().getFullYear()} Sipremo Tecnologia Ltda.</p>
            <span className="hidden md:inline">•</span>
            <p>Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
