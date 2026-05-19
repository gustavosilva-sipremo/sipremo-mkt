export type SiteLang = "pt" | "en";

/** pt* → português; qualquer outro idioma do browser/sistema → inglês */
export function detectBrowserSiteLang(): SiteLang {
  if (typeof navigator === "undefined") return "pt";

  const candidates = [
    ...(navigator.languages?.length ? [...navigator.languages] : []),
    navigator.language,
  ].filter((tag): tag is string => Boolean(tag));

  const isPortuguese = candidates.some((tag) =>
    tag.toLowerCase().startsWith("pt"),
  );

  return isPortuguese ? "pt" : "en";
}

export function normalizeSiteLang(lng?: string | null): SiteLang {
  if (!lng) return "pt";
  const code = lng.toLowerCase().split("-")[0];
  return code === "en" ? "en" : code === "pt" ? "pt" : "en";
}

export function siteLangToHtmlLang(lang: SiteLang): string {
  return lang === "en" ? "en" : "pt-BR";
}

export const siteLangFlag: Record<SiteLang, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
};
