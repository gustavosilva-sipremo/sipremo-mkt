import type { HexPlacement } from "@/components/others/HexField";

/** ~55–70% do hex visível na borda; evita cortar demais fora da section */
export const heroHexes: Omit<HexPlacement, "parallaxY">[] = [
  { className: "top-[8%] left-[2%] md:left-[4%]", size: "xl", float: 14, delay: 0, strokeWidth: 3.5 },
  { className: "top-[10%] right-[2%] md:right-[4%]", size: "xl", float: 12, delay: 0.25, strokeWidth: 3.5 },
  { className: "bottom-[10%] left-[3%] md:left-[5%]", size: "xl", float: 11, delay: 0.5, strokeWidth: 3.5 },
  { className: "bottom-[8%] right-[3%] md:right-[5%]", size: "xl", float: 13, delay: 0.75, strokeWidth: 3.5 },
];

export const aboutHexes: HexPlacement[] = [
  { className: "top-2 left-2 sm:top-4 sm:left-4", size: "xl", strokeWidth: 3 },
  { className: "bottom-4 right-2 sm:bottom-6 sm:right-6", size: "xl", strokeWidth: 3 },
  { className: "top-1/2 -translate-y-1/2 right-0 sm:right-4", size: "lg", strokeWidth: 2.5 },
];

/** Só cantos fora da área dos cards (título e bloco inferior) */
export const valuesCornerHexes: HexPlacement[] = [
  { className: "top-0 -left-4 sm:top-2 sm:left-0", size: "xl", strokeWidth: 3 },
  { className: "bottom-0 -right-4 sm:bottom-4 sm:right-0", size: "lg", strokeWidth: 2.5 },
];

/** Laterais em largura total da section (margens escuras) */
export const testimonialsSideHexes: HexPlacement[] = [
  {
    className:
      "left-2 top-[22%] scale-90 sm:left-4 sm:scale-100 lg:left-8",
    size: "xl",
    animated: "pulse",
    delay: 0.3,
    strokeWidth: 3,
  },
  {
    className:
      "right-2 bottom-[24%] scale-90 sm:right-4 sm:scale-100 lg:right-8",
    size: "xl",
    strokeWidth: 3,
  },
];

export const contactHexes: HexPlacement[] = [
  { className: "top-4 right-4 sm:top-8 sm:right-8", size: "xl", strokeWidth: 2.5 },
  { className: "bottom-6 left-4 sm:bottom-10 sm:left-10", size: "lg", strokeWidth: 2.5 },
];
