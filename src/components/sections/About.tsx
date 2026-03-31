import { Gauge, Activity, BarChart3, ShieldCheck } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 max-w-7xl mx-auto px-6 overflow-hidden"
    >
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[20px_20px]" />

      {/* glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-3xl rounded-full -z-10" />

      {/* INTRO */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-5">Somos Sipremo</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Tecnologia que prevê o futuro para garantir nosso presente.
        </p>
      </div>

      {/* DESCRIPTION */}
      <div className="grid md:grid-cols-2 gap-14 mb-24 items-start">
        <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base">
          <p>
            A Sipremo é a primeira plataforma completa de inteligência climática
            do mundo. Integramos previsões de curto, médio e longo prazo em uma
            única solução, permitindo decisões estratégicas em diferentes
            horizontes.
          </p>

          <p>
            Nossa tecnologia combina experiência operacional com modelos
            climáticos avançados, transformando dados complexos em insights
            acionáveis.
          </p>

          <p>
            Auxiliamos organizações a operar com mais segurança, eficiência e
            previsibilidade diante de cenários climáticos dinâmicos.
          </p>
        </div>

        <div className="bg-background/60 backdrop-blur-md border border-border/50 rounded-2xl p-7 space-y-5 shadow-sm">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <BarChart3 size={18} />
            Capacidades da plataforma
          </h3>

          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3 items-start">
              <Activity size={16} className="mt-1 text-primary" />
              Redução de perdas operacionais com previsões de curto prazo
            </li>
            <li className="flex gap-3 items-start">
              <Gauge size={16} className="mt-1 text-primary" />
              Maior previsibilidade em cadeias produtivas
            </li>
            <li className="flex gap-3 items-start">
              <ShieldCheck size={16} className="mt-1 text-primary" />
              Planejamento estratégico e mitigação de riscos climáticos
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
