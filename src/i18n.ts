import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  detectBrowserSiteLang,
  normalizeSiteLang,
  siteLangToHtmlLang,
} from "@/lib/locale";

import ptCommon from "@/locales/pt/common.json";
import ptNav from "@/locales/pt/nav.json";
import ptHero from "@/locales/pt/hero.json";
import ptAbout from "@/locales/pt/about.json";
import ptValues from "@/locales/pt/values.json";
import ptProjects from "@/locales/pt/projects.json";
import ptTestimonials from "@/locales/pt/testimonials.json";
import ptContact from "@/locales/pt/contact.json";
import ptFooter from "@/locales/pt/footer.json";

import enCommon from "@/locales/en/common.json";
import enNav from "@/locales/en/nav.json";
import enHero from "@/locales/en/hero.json";
import enAbout from "@/locales/en/about.json";
import enValues from "@/locales/en/values.json";
import enProjects from "@/locales/en/projects.json";
import enTestimonials from "@/locales/en/testimonials.json";
import enContact from "@/locales/en/contact.json";
import enFooter from "@/locales/en/footer.json";

export const defaultNS = "common";

export const resources = {
  pt: {
    common: ptCommon,
    nav: ptNav,
    hero: ptHero,
    about: ptAbout,
    values: ptValues,
    projects: ptProjects,
    testimonials: ptTestimonials,
    contact: ptContact,
    footer: ptFooter,
  },
  en: {
    common: enCommon,
    nav: enNav,
    hero: enHero,
    about: enAbout,
    values: enValues,
    projects: enProjects,
    testimonials: enTestimonials,
    contact: enContact,
    footer: enFooter,
  },
} as const;

const languageDetector = new LanguageDetector();

languageDetector.addDetector({
  name: "sipremoBrowser",
  lookup() {
    return detectBrowserSiteLang();
  },
});

function syncDocumentLang(lng: string) {
  document.documentElement.lang = siteLangToHtmlLang(normalizeSiteLang(lng));
}

void i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ["pt", "en"],
    nonExplicitSupportedLngs: true,
    fallbackLng: "pt",
    defaultNS,
    ns: [
      "common",
      "nav",
      "hero",
      "about",
      "values",
      "projects",
      "testimonials",
      "contact",
      "footer",
    ],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "sipremoBrowser"],
      caches: ["localStorage"],
    },
  })
  .then(() => {
    syncDocumentLang(i18n.resolvedLanguage ?? i18n.language);
  });

i18n.on("languageChanged", syncDocumentLang);

export default i18n;
