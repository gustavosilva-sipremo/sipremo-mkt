import HexDecoration from "@/components/others/HexDecoration";
import type { HexAnimation, HexVariant } from "@/components/others/HexDecoration";
import type { HexSize } from "@/lib/hexConstants";
import { cn } from "@/lib/utils";
import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";

export type HexPlacement = {
  className: string;
  size?: HexSize;
  animated?: HexAnimation;
  float?: number;
  delay?: number;
  parallaxY?: MotionValue<number>;
  strokeWidth?: number;
};

type HexFieldProps = {
  variant?: HexVariant;
  hexes: HexPlacement[];
  /** `behind` = atrás do conteúdo da section; `above-background` = sobre o fundo, atrás dos cards (z-10) */
  layer?: "behind" | "above-background";
  className?: string;
  children?: ReactNode;
};

export default function HexField({
  variant = "onLight",
  hexes,
  layer = "behind",
  className,
  children,
}: HexFieldProps) {
  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          layer === "above-background" ? "z-[1]" : "-z-10",
          className,
        )}
        aria-hidden
      >
        {hexes.map((hex, index) => (
          <HexDecoration
            key={`${hex.className}-${index}`}
            variant={variant}
            size={hex.size}
            animated={hex.animated ?? "none"}
            float={hex.float}
            delay={hex.delay}
            parallaxY={hex.parallaxY}
            className={hex.className}
            strokeWidth={hex.strokeWidth}
          />
        ))}
      </div>
      {children}
    </>
  );
}
