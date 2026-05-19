import { solutions } from "@/content/solutions";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function TiltCard({ image, title }: { image: string; title: string }) {
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
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation("projects");
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
    <section id="solutions" className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/20 to-background" />

      <div className="mb-16 text-center">
        <h2 className="mb-5 text-4xl font-bold md:text-5xl">{t("title")}</h2>
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
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
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
                image={current.image}
                title={t(`solutions.${current.id}.title`)}
              />
              <div className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
