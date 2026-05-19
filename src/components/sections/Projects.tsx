import { solutions } from "@/content/solutions";
import { useIsMobile, usePointerFine } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function SolutionImage({ image, title }: { image: string; title: string }) {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
      </div>
      <img
        src={image}
        alt={title}
        width={520}
        height={300}
        loading="lazy"
        decoding="async"
        className="h-[300px] w-full select-none object-cover"
      />
    </>
  );
}

function TiltCard({ image, title }: { image: string; title: string }) {
  const canTilt = usePointerFine();
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setTransform({
        rotateX: ((y - centerY) / centerY) * -10,
        rotateY: ((x - centerX) / centerX) * 10,
      });
    });
  }

  function handleMouseLeave() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTransform({ rotateX: 0, rotateY: 0 });
  }

  if (!canTilt) {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
        <SolutionImage image={image} title={title} />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="transform-gpu overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      <SolutionImage image={image} title={title} />
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation("projects");
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = solutions[active];

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
    <section id="solutions" className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/20 to-background" />

      <div className="mb-16 text-center">
        <h2 className="mb-5 text-2xl font-bold sm:text-3xl md:text-5xl">{t("title")}</h2>
        <p className="mx-auto max-w-3xl leading-relaxed text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mb-14 flex flex-wrap justify-center gap-3">
        {solutions.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "cursor-pointer rounded-full border px-5 py-2 text-sm backdrop-blur-md transition-all duration-300",
              active === index
                ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                : "border-border bg-background/60 text-muted-foreground hover:bg-muted",
            )}
          >
            {t(`solutions.${item.id}.title`)}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-14 md:grid-cols-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={isMobile ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={isMobile ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {t("platformBadge")}
            </div>
            <h3 className="text-2xl leading-tight font-semibold md:text-3xl">
              {t(`solutions.${current.id}.title`)}
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              {t(`solutions.${current.id}.description`)}
            </p>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={isMobile ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={isMobile ? undefined : { opacity: 0, scale: 0.96 }}
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
                image={current.image}
                title={t(`solutions.${current.id}.title`)}
              />
              <div className="absolute -inset-4 -z-10 rounded-full bg-primary/10 blur-3xl sm:-inset-8" aria-hidden />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
