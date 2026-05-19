import HexSvg from "@/components/others/HexSvg";
import type { HexSize } from "@/lib/hexConstants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import type { MotionValue } from "framer-motion";
import { lazy, Suspense } from "react";

import { hexVariantClass, type HexVariant } from "@/lib/hexVariants";

export type { HexVariant };
export type HexAnimation = "none" | "float" | "pulse";

const HexDecorationMotion = lazy(
  () => import("@/components/others/HexDecorationMotion"),
);

type HexDecorationProps = {
  variant?: HexVariant;
  size?: HexSize;
  animated?: HexAnimation;
  float?: number;
  delay?: number;
  parallaxY?: MotionValue<number>;
  className?: string;
  strokeWidth?: number;
};

export default function HexDecoration({
  variant = "onDark",
  size = "lg",
  animated = "none",
  float = 10,
  delay = 0,
  parallaxY,
  className,
  strokeWidth = 3,
}: HexDecorationProps) {
  const reducedMotion = usePrefersReducedMotion();
  const motion = reducedMotion ? "none" : animated;

  if (motion === "none") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute select-none",
          hexVariantClass[variant],
          className,
        )}
        aria-hidden
      >
        <HexSvg size={size} strokeWidth={strokeWidth} />
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <HexDecorationMotion
        variant={variant}
        size={size}
        animated={motion}
        float={float}
        delay={delay}
        parallaxY={parallaxY}
        className={className}
        strokeWidth={strokeWidth}
      />
    </Suspense>
  );
}
