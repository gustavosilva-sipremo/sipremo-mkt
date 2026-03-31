import { ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Jefferson de Paula",
    role: "CEO da ArcelorMittal",
    text: "A Sipremo, startup que usa IA para monitorar nossas florestas, ajudou a reduzir em 40% nossos custos operacionais.",
  },
  {
    name: "Filipe Ferreira",
    role: "Coordenador na MMI",
    text: "A agilidade e a precisão dos alertas são cruciais para permitir que a empresa tome medidas proativas e estratégicas em crises relacionadas à segurança de barragens.",
  },
];

const useCases = [
  {
    title: "Parceria Sipremo & Saltica",
    desc: "A Sipremo e a Saltica anunciam uma parceria para transformar o risco climático em inteligência estratégica. Ao combinar modelos climáticos baseados em IA com análises de risco financeiro, as empresas podem antecipar impactos, aprimorar decisões e fortalecer a resiliência. O clima deixa de ser apenas ambiental e passa a ser um fator econômico determinante.",
    img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Parceria Sipremo & Spacemetriks",
    desc: "Integração de sensores, IoT, drones e dados ambientais com modelos de IA climática. A colaboração combina dados de campo em tempo real com análises preditivas para antecipar riscos, proteger operações e apoiar decisões estratégicas em setores como logística, energia, infraestrutura e cidades.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "InsuranceAware™",
    desc: "Ferramenta avançada para análise preditiva no setor de seguros e resseguros. Vai além de dados históricos, utilizando IA para prever riscos ambientais de 1 a 12 meses, incluindo eventos extremos, permitindo maior precisão na avaliação e gestão de riscos.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cadeias de suprimentos resilientes",
    desc: "A Sipremo auxilia empresas a evitar interrupções operacionais ao fornecer previsões climáticas avançadas. Desde padrões de precipitação até eventos extremos, possibilita planejamento mais eficiente e continuidade operacional em setores críticos.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Saúde pública e clima",
    desc: "A plataforma apoia sistemas de saúde na antecipação de riscos climáticos que impactam comunidades, como doenças, eventos extremos e segurança alimentar, fortalecendo a resiliência e a prevenção.",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "SmartCityWatch™",
    desc: "Tecnologia de previsão voltada para cidades inteligentes. Permite antecipar eventos como enchentes, ondas de calor e tempestades com meses de antecedência, apoiando governos na proteção de infraestrutura e população.",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24">
      {/* FULL WIDTH BACKGROUND */}
      <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 -z-10 bg-[#05060a]" />

      {/* GRID PATTERN */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-size-[22px_22px] opacity-40" />

      {/* GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 blur-3xl rounded-full -z-10" />

      {/* CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 relative overflow-hidden">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-3xl text-secondary md:text-5xl font-bold mb-5">
            Depoimentos & Casos de Uso
          </h2>
          <p className="text-secondary/80 max-w-3xl mx-auto">
            Organizações utilizam a Sipremo para transformar dados climáticos em
            decisões estratégicas, reduzindo riscos e aumentando eficiência
            operacional.
          </p>
        </div>

        {/* TESTIMONIALS */}
        <div className="grid md:grid-cols-2 gap-10 mb-28">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative bg-background backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/5 blur-xl -z-10" />

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
                “{item.text}”
              </p>

              <div className="flex items-center justify-between border-t border-border/50 pt-5">
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-primary">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* USE CASES */}
        <div>
          <h3 className="text-2xl md:text-3xl text-secondary font-semibold text-center mb-14">
            Experiências & Desafios
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {useCases.map((item, index) => (
              <div
                key={index}
                className="group bg-background backdrop-blur-md border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* IMAGE */}
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full select-none h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {item.desc}
                  </p>

                  <button className="flex items-center gap-2 text-sm text-primary cursor-pointer font-medium hover:gap-3 transition-all w-fit">
                    Saber mais
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}