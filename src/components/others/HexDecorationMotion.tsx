import { m, type MotionValue } from "framer-motion";
import HexSvg from "@/components/others/HexSvg";
import type { HexSize } from "@/lib/hexConstants";
import { cn } from "@/lib/utils";

import { hexVariantClass, type HexVariant } from "@/lib/hexVariants";

export type { HexVariant };
export type HexAnimation = "none" | "float" | "pulse";

type HexDecorationMotionProps = {
  variant?: HexVariant;
  size?: HexSize;
  animated?: HexAnimation;
  float?: number;
  delay?: number;
  parallaxY?: MotionValue<number>;
  className?: string;
  strokeWidth?: number;
};

export default function HexDecorationMotion({
  variant = "onDark",
  size = "lg",
  animated = "none",
  float = 10,
  delay = 0,
  parallaxY,
  className,
  strokeWidth = 3,
}: HexDecorationMotionProps) {
  const baseClass = cn(
    "pointer-events-none absolute select-none",
    hexVariantClass[variant],
    className,
  );

  if (animated === "float") {
    return (
      <m.div
        style={parallaxY ? { y: parallaxY } : undefined}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
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
        className={baseClass}
        aria-hidden
      >
        <HexSvg size={size} strokeWidth={strokeWidth} />
      </m.div>
    );
  }

  if (animated === "pulse") {
    return (
      <m.div
        initial={{ opacity: 0.85 }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{
          duration: 9,
          ease: "easeInOut",
          repeat: Infinity,
          delay,
        }}
        className={baseClass}
        aria-hidden
      >
        <HexSvg size={size} strokeWidth={strokeWidth} />
      </m.div>
    );
  }

  return (
    <div className={baseClass} aria-hidden>
      <HexSvg size={size} strokeWidth={strokeWidth} />
    </div>
  );
}
