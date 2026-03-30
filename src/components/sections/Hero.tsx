import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wobbly: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-svh w-full flex items-center justify-center text-center overflow-hidden px-safe">
      {/* 🎥 VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/video_bg.mp4" type="video/mp4" />
      </video>

      {/* 🧊 OVERLAY (melhora contraste) */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* 🚀 CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 px-4"
      >
        <motion.h1
          variants={wobbly}
          className="text-5xl md:text-6xl font-bold max-w-4xl mx-auto text-white text-balance"
        >
          Alertas antecipados que protegem recursos, operações e vidas.
        </motion.h1>

        <motion.p
          variants={wobbly}
          className="mt-6 text-white/80 max-w-2xl mx-auto"
        >
          Nossa IA analisa milhares de variáveis climáticas em tempo real para
          gerar alertas precoces e mitigar impactos financeiros, operacionais e
          ambientais.
        </motion.p>

        <motion.div
          variants={wobbly}
          className="mt-8 flex justify-center gap-4"
        >
          <Button size="lg" className="hover-scale">
            Entre em contato
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="hover-scale bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Saiba mais
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
