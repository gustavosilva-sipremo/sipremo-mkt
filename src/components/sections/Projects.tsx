import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Solution = {
  title: string;
  description: string;
  image: string;
};

const solutions: Solution[] = [
  {
    title: "Inteligência Climática Completa",
    description:
      "A única informação climática que abrange de 1 hora até anos. A Sipremo conecta previsões operacionais e planejamento de longo prazo com alertas em tempo real e modelos preditivos baseados em 16 anos de tecnologia validada.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Antecipação de Riscos",
    description:
      "Mais de 70% do PIB global é sensível ao clima. Nossa plataforma ajuda organizações a antecipar riscos, reduzir perdas e proteger ativos com inteligência adaptável para qualquer setor e região.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Resiliência Operacional & ESG",
    description:
      "Combine alertas antecipados, previsões integradas e análise contínua para manter operações estáveis, apoiar metas ESG e tomar decisões mais seguras em ambientes voláteis.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  },
];

function TiltCard({ image, title }: { image: string; title: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [style, setStyle] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setStyle({ rotateX, rotateY });
  }

  function handleMouseLeave() {
    setStyle({ rotateX: 0, rotateY: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: style.rotateX,
        rotateY: style.rotateY,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="rounded-xl border border-border bg-background shadow-2xl overflow-hidden transform-gpu"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/40">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>

      {/* Image */}
      <img src={image} alt={title} className="w-full h-[300px] object-cover" />
    </motion.div>
  );
}

export default function Solutions() {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate
  useEffect(() => {
    if (isHovering) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % solutions.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  return (
    <section id="projects" className="relative py-28 max-w-7xl mx-auto px-6">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/20 to-background" />

      {/* HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-5">Nossas Soluções</h2>

        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A Sipremo preenche a lacuna entre previsões operacionais e
          planejamento climático de longo prazo, permitindo decisões em todos os
          horizontes temporais com inteligência preditiva.
        </p>
      </div>

      {/* NAV TABS */}
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {solutions.map((item, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={cn(
              "px-5 py-2 cursor-pointer rounded-full text-sm border transition-all duration-300 backdrop-blur-md",
              active === index
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                : "bg-background/60 hover:bg-muted border-border text-muted-foreground",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {/* TEXT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Sipremo Platform
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
              {solutions[active].title}
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              {solutions[active].description}
            </p>

            <p className="text-sm text-muted-foreground">
              Antecipe riscos. Reduza perdas. Desenvolva resiliência.
            </p>
          </motion.div>
        </AnimatePresence>

        {/* DEVICE FRAME */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <div
              className="relative w-full max-w-[520px]"
              style={{ perspective: "1200px" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <TiltCard
                image={solutions[active].image}
                title={solutions[active].title}
              />

              {/* Glow */}
              <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-full -z-10" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
