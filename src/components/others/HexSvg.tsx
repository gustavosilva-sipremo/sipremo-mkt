import {
  HEX_PATH,
  HEX_VIEWBOX,
  resolveHexSize,
  type HexSize,
} from "@/lib/hexConstants";
import { cn } from "@/lib/utils";

export type { HexSize };

type HexSvgProps = {
  size?: HexSize;
  className?: string;
  strokeWidth?: number;
};

export default function HexSvg({
  size = "lg",
  className,
  strokeWidth = 3,
}: HexSvgProps) {
  const px = resolveHexSize(size);

  return (
    <svg
      width={px}
      height={Math.round(px * (100 / 87))}
      viewBox={HEX_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path d={HEX_PATH} stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}
