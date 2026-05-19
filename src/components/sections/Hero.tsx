import { LearnCta } from "@/components/ui/ContactCta";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Cpu } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const VIDEO_SRC = `${import.meta.env.BASE_URL}videos/video_bg.mp4`;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const wobbly: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 14 },
  },
};

const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

function Hex({
  className,
  float = 10,
  delay = 0,
  parallaxY,
}: {
  className?: string;
  float?: number;
  delay?: number;
  parallaxY: MotionValue<number>;
}) {
  return (
    <m.div
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
        aria-hidden
      >
        <path
          d="M2.2 26.15L43.5 2.3L84.8 26.15V73.84L43.5 97.69L2.2 73.84V26.15Z"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    </m.div>
  );
}

export default function Hero() {
  const { t } = useTranslation("hero");
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const flashTriggeredRef = useRef(false);
  const [flash, setFlash] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollY } = useScroll();
  const parallax40 = useTransform(scrollY, [0, 1000], [0, 40]);
  const parallax25 = useTransform(scrollY, [0, 1000], [0, 25]);
  const parallax30 = useTransform(scrollY, [0, 1000], [0, 30]);
  const parallax35 = useTransform(scrollY, [0, 1000], [0, 35]);
  const parallax20 = useTransform(scrollY, [0, 1000], [0, 20]);
  const parallax45 = useTransform(scrollY, [0, 1000], [0, 45]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => {
        /* autoplay blocked */
      });
    };

    const onCanPlay = () => {
      setVideoReady(true);
      if (!reducedMotion) tryPlay();
    };

    video.addEventListener("canplay", onCanPlay);
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      onCanPlay();
    }

    if (reducedMotion) {
      return () => video.removeEventListener("canplay", onCanPlay);
    }

    const onTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining < 0.4 && !flashTriggeredRef.current) {
        flashTriggeredRef.current = true;
        setFlash(true);
        window.setTimeout(() => {
          setFlash(false);
          flashTriggeredRef.current = false;
        }, 250);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [reducedMotion]);

  const motionVariants = reducedMotion ? staticVariants : wobbly;

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh w-full items-center overflow-hidden bg-slate-950"
    >
      {/* Dark fallback — always visible until video paints */}
      <div
        className="absolute inset-0 z-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800"
        aria-hidden
      />

      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        style={{
          filter: "brightness(0.6) contrast(1.2) saturate(1.1)",
        }}
      />

      {flash && (
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-white/20"
          aria-hidden
        />
      )}

      <div className="absolute inset-0 z-[3] bg-black/60" aria-hidden />

      <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden>
        <div className="absolute top-[15%] left-[10%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden>
          <Hex className="top-[10%] left-[8%]" float={14} parallaxY={parallax40} />
          <Hex className="top-[35%] left-[6%] scale-75" float={10} delay={0.4} parallaxY={parallax25} />
          <Hex className="bottom-[20%] left-[12%] scale-90" float={12} delay={0.8} parallaxY={parallax30} />
          <Hex className="top-[15%] right-[10%]" float={12} delay={0.2} parallaxY={parallax35} />
          <Hex className="top-[45%] right-[6%] scale-75" float={8} delay={0.6} parallaxY={parallax20} />
          <Hex className="bottom-[15%] right-[12%] scale-110" float={16} delay={1} parallaxY={parallax45} />
        </div>
      )}

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 md:px-12">
        <LazyMotion features={domAnimation}>
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <m.div
              variants={motionVariants}
              className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/80"
            >
              <Cpu className="mr-2 h-4 w-4 text-white/80" aria-hidden />
              {t("badge")}
            </m.div>

            <m.h1
              variants={motionVariants}
              className="text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              {t("title")}
            </m.h1>

            <m.p
              variants={motionVariants}
              className="mt-6 text-lg leading-relaxed text-white/80"
            >
              {t("subtitle")}
            </m.p>

            <m.p
              variants={motionVariants}
              className="mt-4 max-w-xl text-sm text-white/60"
            >
              {t("description")}
            </m.p>

            <m.div
              variants={motionVariants}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a href="#solutions" className="inline-flex cursor-pointer">
                <LearnCta />
              </a>
            </m.div>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
