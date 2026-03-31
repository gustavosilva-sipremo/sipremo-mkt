import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cpu } from "lucide-react";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wobbly: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    },
  },
};

function Hex({
  className,
  speed = 20,
  float = 10,
  delay = 0,
}: {
  className?: string;
  speed?: number;
  float?: number;
  delay?: number;
}) {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, speed]);

  return (
    <motion.div
      style={{ y: parallaxY }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 0.2,
        scale: 1,
        y: [0, -float, -float * 0.6, -float, 0],
      }}
      transition={{
        duration: 6,
        ease: [0.42, 0, 0.58, 1],
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatType: "mirror",
        delay,
      }}
      className={`absolute ${className}`}
    >
      <svg
        width="90"
        height="100"
        viewBox="0 0 87 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path
          d="M2.2 26.15L43.5 2.3L84.8 26.15V73.84L43.5 97.69L2.2 73.84V26.15Z"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [flash, setFlash] = useState(false);

  // 🔥 Flash antes do loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;

      const remaining = video.duration - video.currentTime;

      if (remaining < 0.4 && !flash) {
        setFlash(true);

        setTimeout(() => setFlash(false), 250);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [flash]);

  return (
    <section className="relative min-h-svh w-full flex items-center overflow-hidden">
      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.6) contrast(1.2) saturate(1.1)",
        }}
      >
        <source src="/videos/video_bg.mp4" type="video/mp4" />
      </video>

      {/* FLASH OVERLAY */}
      <motion.div
        animate={{ opacity: flash ? 0.2 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute inset-0 bg-white pointer-events-none z-10"
      />

      {/* OVERLAY ESCURO */}
      <div className="absolute inset-0 bg-black/60" />

      {/* GLOWS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-72 h-72 bg-white/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-white/10 blur-3xl rounded-full" />
      </div>

      {/* HEX BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <Hex className="top-[10%] left-[8%]" speed={40} float={14} />
        <Hex
          className="top-[35%] left-[6%] scale-75"
          speed={25}
          float={10}
          delay={0.4}
        />
        <Hex
          className="bottom-[20%] left-[12%] scale-90"
          speed={30}
          float={12}
          delay={0.8}
        />

        <Hex
          className="top-[15%] right-[10%]"
          speed={35}
          float={12}
          delay={0.2}
        />
        <Hex
          className="top-[45%] right-[6%] scale-75"
          speed={20}
          float={8}
          delay={0.6}
        />
        <Hex
          className="bottom-[15%] right-[12%] scale-110"
          speed={45}
          float={16}
          delay={1}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          {/* BADGE */}
          <motion.div
            variants={wobbly}
            className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6"
          >
            <Cpu className="w-4 h-4 mr-2 text-white/80" />
            Inteligência climática em tempo real
          </motion.div>

          {/* TITLE */}
          <motion.h1
            variants={wobbly}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            Alertas antecipados que protegem recursos, operações e vidas.
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            variants={wobbly}
            className="mt-6 text-lg text-white/80 leading-relaxed"
          >
            Nossa plataforma utiliza IA e dados climáticos em tempo real para
            prever riscos, reduzir impactos operacionais e aumentar a
            resiliência de ativos críticos.
          </motion.p>

          {/* DESCRIPTION */}
          <motion.p
            variants={wobbly}
            className="mt-4 text-white/60 text-sm max-w-xl"
          >
            Monitoramento contínuo, análise preditiva e alertas acionáveis para
            decisões rápidas e seguras.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={wobbly}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              className={cn(
                "text-2xl p-8 tracking-wide font-bold cursor-pointer",
                "bg-linear-to-r from-primary to-indigo-500",
                "text-white shadow-lg shadow-primary/30",
                "hover:scale-[1.02] hover:shadow-xl transition-all",
              )}
            >
              Conheça a Sipremo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
