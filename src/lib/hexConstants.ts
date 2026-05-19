export const HEX_PATH =
  "M2.2 26.15L43.5 2.3L84.8 26.15V73.84L43.5 97.69L2.2 73.84V26.15Z";

export const HEX_VIEWBOX = "0 0 87 100";

const sizeMap = {
  sm: 40,
  md: 70,
  lg: 90,
  xl: 120,
} as const;

export type HexSize = keyof typeof sizeMap | number;

export function resolveHexSize(size: HexSize = "lg"): number {
  return typeof size === "number" ? size : sizeMap[size];
}
