export const hexVariantClass = {
  onDark: "text-white/32",
  onLight: "text-primary/22",
  muted: "text-primary/14",
} as const;

export type HexVariant = keyof typeof hexVariantClass;
