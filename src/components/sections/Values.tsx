import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Leaf } from "lucide-react";
import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";

export default function Values() {
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
      // Ativa o modo globo
      map.setProjection({ type: "globe" });

      // Centralização visual do globo
      map.setBearing(0);
      map.setPitch(0);

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
    <section id="values" className="relative py-12 max-w-7xl mx-auto px-6">
      {/* HEADER */}
      <div className="text-center mb-14">
        <h3 className="text-2xl md:text-3xl font-semibold">Nossos valores</h3>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Decisões inteligentes, proativas e resilientes baseadas em dados climáticos.
        </p>
      </div>

      {/* VALUES GRID */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <Card className="border-border/50 bg-background/60 backdrop-blur-md hover:shadow-xl transition-all duration-300">
          <CardContent className="p-7 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp size={18} />
              <h4 className="font-semibold">Impacto operacional</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              A Sipremo permite decisões mais rápidas e precisas com monitoramento contínuo e alertas antecipados.
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
              Redução de custos operacionais e melhor alocação de recursos com maior previsibilidade.
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
              Apoio à sustentabilidade, redução de emissões e uso eficiente de recursos naturais.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* TEXT + MAP */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* TEXT */}
        <div className="space-y-5 max-w-2xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Em um cenário onde as mudanças climáticas impactam diretamente operações e mercados, a Sipremo conecta dados complexos a decisões estratégicas.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Nossa plataforma ajuda organizações a antecipar riscos e reduzir incertezas com inteligência climática aplicada.
          </p>

          <p className="text-lg font-medium text-foreground leading-relaxed">
            Convidamos você a conhecer nossa tecnologia e descobrir como transformar dados em vantagem competitiva.
          </p>
        </div>

        {/* MAP */}
        <div className="h-[420px] hidden md:block rounded-2xl overflow-hidden border border-border/50 shadow-lg">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}