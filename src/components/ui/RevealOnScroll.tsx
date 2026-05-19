import { useIsMobile } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealOnScrollProps = MotionProps & {
  children: ReactNode;
  className?: string;
};

/** Framer Motion reveal on desktop; plain wrapper on mobile (less JS work). */
export function RevealOnScroll({
  children,
  className,
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  viewport = { once: true },
  ...rest
}: RevealOnScrollProps) {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  if (isMobile || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
