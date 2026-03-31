import { Gauge, Activity, BarChart3, ShieldCheck } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";

const team = [
  {
    name: "Gabriel Sávio",
    role: "CEO",
    desc: "Indicado para o prêmio MIT Under 35, palestrante da UNESCO, Empreendedor e Inovador de Destaque na Climate iArea.",
    img: "/images/gabriel.webp",
  },
  {
    name: "Bruce Ford",
    role: "Diretor de Operações (CSO)",
    desc: "22 anos como Presidente da CliDaaS, ex-meteorologista da Marinha dos EUA e líder em clima e previsões de longo prazo.",
    img: "/images/bruce.webp",
  },
  {
    name: "Jefferson Oliveira",
    role: "CKO",
    desc: "Mais de 20 anos de experiência no Corpo de Bombeiros de SP e avaliador de qualidade de projetos para o governo de SP.",
    img: "/images/jefferson.webp",
  },
  {
    name: "Renato Paes",
    role: "CTO",
    desc: "Mestre em Estatística pela UFSCar, ele já economizou mais de 20 milhões de dólares por meio de projetos implementados.",
    img: "/images/renato.webp",
  },
  {
    name: "Kaushal Chokshi",
    role: "Conselheiro",
    desc: "Líder global, empreendedor serial, lançou IPO, estrategista em tecnologia, sustentabilidade e inovação.",
    img: "/images/kau.webp",
  },
];

function TeamCard({ member }: any) {
  return (
    <div className="w-full max-w-sm h-full bg-background/60 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
      <div className="flex flex-col items-center text-center space-y-4 h-full">
        <img
          src={member.img}
          alt={member.name}
          className="w-24 select-none h-24 rounded-full object-cover border border-border/50"
        />

        <div>
          <h4 className="font-semibold text-lg">{member.name}</h4>
          <p className="text-sm text-primary">{member.role}</p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {member.desc}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative pb-20 pt-48 max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[20px_20px]" />

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-3xl rounded-full -z-10" />

      {/* INTRO */}
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-5">Somos Sipremo</h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Tecnologia que prevê o futuro para garantir nosso presente.
        </p>
      </div>

      {/* DESCRIPTION */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-20 md:mb-24 items-start">
        <div className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
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

        <div className="bg-background/60 backdrop-blur-md border border-border/50 rounded-2xl p-6 md:p-7 space-y-5 shadow-sm">
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

      {/* TEAM */}
      <div className="mb-10">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-3">
          Nossa Liderança
        </h3>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-sm md:text-base">
          Um time experiente e multidisciplinar focado em inovação, ciência e
          impacto real.
        </p>

        {/* PIRÂMIDE RESPONSIVA */}
        <div className="flex flex-col items-center gap-10">
          {/* TOP (CEO + 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center w-full max-w-3xl">
            {team.slice(0, 2).map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>

          {/* BOTTOM (3 membros) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
            {team.slice(2).map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
