import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Leaf,
  Gauge,
  Activity,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function About() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "raster-tiles",
            paint: {
              "raster-opacity": 0.5,
            },
          },
        ],
      },
      center: [-55, -14],
      zoom: 1.5,
    });

    map.on("style.load", () => {
      map.setProjection({
        type: "globe",
      });

      // fog escuro (globo mais realista)
      (map as any).setFog({
        color: "rgb(5,5,10)",
        "high-color": "rgb(20,20,30)",
        "horizon-blend": 0.15,
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

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
            <li id="values" className="flex gap-3 items-start">
              <ShieldCheck size={16} className="mt-1 text-primary" />
              Planejamento estratégico e mitigação de riscos climáticos
            </li>
          </ul>
        </div>
      </div>

      {/* VALUES */}
      <div className="text-center mb-14">
        <h3 className="text-2xl md:text-3xl font-semibold">Nossos valores</h3>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Decisões inteligentes, proativas e resilientes baseadas em dados
          climáticos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        <Card className="border-border/50 bg-background/60 backdrop-blur-md hover:shadow-xl transition-all duration-300">
          <CardContent className="p-7 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp size={18} />
              <h4 className="font-semibold">Impacto operacional</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              A Sipremo permite decisões mais rápidas e precisas com
              monitoramento contínuo e alertas antecipados.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/60 backdrop-blur-md hover:shadow-xl transition-all duration-300">
          <CardContent className="p-7 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <DollarSign size={18} />
              <h4 className="font-semibold">Impacto financeiro</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Redução de custos operacionais e melhor alocação de recursos com
              maior previsibilidade.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/60 backdrop-blur-md hover:shadow-xl transition-all duration-300">
          <CardContent className="p-7 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Leaf size={18} />
              <h4 className="font-semibold">Impacto ESG</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Apoio à sustentabilidade, redução de emissões e uso eficiente de
              recursos naturais.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FINAL + MAP */}
      <div className="grid md:grid-cols-2 gap-12 items-center mt-10">
        <div className="space-y-5 max-w-2xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Em um cenário onde as mudanças climáticas impactam diretamente
            operações e mercados, a Sipremo conecta dados complexos a decisões
            estratégicas.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Nossa plataforma ajuda organizações a antecipar riscos e reduzir
            incertezas com inteligência climática aplicada.
          </p>

          <p className="text-lg font-medium text-foreground leading-relaxed">
            Convidamos você a conhecer nossa tecnologia e descobrir como
            transformar dados em vantagem competitiva.
          </p>
        </div>

        {/* MAP */}
        <div className="h-[420px] rounded-2xl overflow-hidden border border-border/50 shadow-lg">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}
