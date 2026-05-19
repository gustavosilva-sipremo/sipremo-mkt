import HexDecoration from "@/components/others/HexDecoration";
import { heroHexes } from "@/content/hexLayouts";
import { LearnCta } from "@/components/ui/ContactCta";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Cpu } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const HeroVideo = lazy(() => import("@/components/sections/HeroVideo"));

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

export default function Hero() {
  const { t } = useTranslation("hero");
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const loadVideo = !isMobile && !reducedMotion;

  const { scrollY } = useScroll();
  const parallaxStrong = useTransform(scrollY, [0, 1000], [0, 40]);
  const parallaxLight = useTransform(scrollY, [0, 1000], [0, 25]);
  const parallaxOffsets = loadVideo
    ? [parallaxStrong, parallaxLight, parallaxLight, parallaxStrong]
    : [undefined, undefined, undefined, undefined];

  const motionVariants =
    reducedMotion || isMobile ? staticVariants : wobbly;

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh w-full items-center overflow-hidden bg-slate-950"
    >
      <div
        className="absolute inset-0 z-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800"
        aria-hidden
      />

      {isMobile && (
        <div
          className="absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_30%_20%,rgba(56,189,248,0.12),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(99,102,241,0.1),transparent_45%)]"
          aria-hidden
        />
      )}

      {loadVideo && (
        <Suspense fallback={null}>
          <HeroVideo />
        </Suspense>
      )}

      <div
        className="absolute inset-0 z-3 bg-linear-to-b from-black/50 via-black/55 to-black/70"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-4" aria-hidden>
        {!isMobile && (
          <>
            <div className="absolute top-[15%] left-[10%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[10%] right-[10%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          </>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-4" aria-hidden>
        {heroHexes.map((hex, index) => (
          <HexDecoration
            key={hex.className}
            variant="onDark"
            size={hex.size}
            animated={reducedMotion || isMobile ? "none" : "float"}
            float={hex.float}
            delay={hex.delay}
            parallaxY={parallaxOffsets[index]}
            className={hex.className}
          />
        ))}
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12">
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
              className="text-3xl font-bold leading-tight text-balance text-white sm:text-4xl md:text-6xl"
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
