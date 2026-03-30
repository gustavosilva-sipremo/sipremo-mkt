import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-20 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Inteligência Climática Completa
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Curto prazo</h3>
            <p className="text-sm text-muted-foreground">
              Alertas em tempo real com precisão hiperlocal para decisões
              imediatas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Médio prazo</h3>
            <p className="text-sm text-muted-foreground">
              Insights que melhoram previsibilidade e operações.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Longo prazo</h3>
            <p className="text-sm text-muted-foreground">
              Modelagem estratégica para resiliência climática.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
