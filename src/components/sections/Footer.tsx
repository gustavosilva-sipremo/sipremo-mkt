import { Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-18 bg-linear-to-b from-background to-secondary-foreground/90 overflow-hidden pt-32">
      <div className="relative max-w-7xl mx-auto px-6 py-18">
        <div className="grid gap-14 md:grid-cols-2 items-start">
          {/* BRAND */}
          <div className="space-y-5">
            <img
              src="/images/sipremo_logo.svg"
              alt="Sipremo"
              className="h-20 w-auto brightness-0 invert"
            />

            <p className="text-sm text-secondary max-w-xs leading-relaxed">
              Tecnologia prevendo o futuro e garantindo o nosso presente.
            </p>
          </div>

          {/* SOCIAL */}
          <div className="space-y-4 md:text-right">
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide">
              Redes
            </h4>

            <div className="flex md:justify-end gap-3">
              <a
                href="#"
                className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-primary transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-5 h-5 text-secondary/70 group-hover:text-primary-foreground transition" />
              </a>

              <a
                href="#"
                className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-primary transition-all duration-300 hover:scale-105"
              >
                <Share2 className="w-5 h-5 text-secondary/70 group-hover:text-primary-foreground transition" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center gap-5 text-xs text-secondary text-center mt-12 sm:mt-2">
          <div>
            <p className="font-medium text-secondary uppercase tracking-wide mb-1">
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
