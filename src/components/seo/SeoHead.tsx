import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { normalizeSiteLang } from "@/lib/locale";
import { getSiteUrl } from "@/lib/site";

export function SeoHead() {
  const { t, i18n } = useTranslation("common");
  const siteUrl = getSiteUrl();
  const siteLang = normalizeSiteLang(i18n.resolvedLanguage ?? i18n.language);
  const isEn = siteLang === "en";
  const locale = isEn ? "en_US" : "pt_BR";
  const altLocale = isEn ? "pt_BR" : "en_US";
  const langParam = siteLang;

  const title = t("seo.title");
  const description = t("seo.description");
  const pageUrl = `${siteUrl}/?lang=${langParam}`;
  const ogImage = `${siteUrl}/og-image.jpg`;

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sipremo",
    url: siteUrl,
    logo: `${siteUrl}/images/sipremo_logo.svg`,
    description,
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sipremo",
    url: siteUrl,
    inLanguage: [isEn ? "en" : "pt-BR"],
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl,
    isPartOf: { "@id": `${siteUrl}/#website` },
  };

  return (
    <Helmet>
      <html lang={isEn ? "en" : "pt-BR"} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="pt-BR" href={`${siteUrl}/?lang=pt`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={altLocale} />
      <meta property="og:site_name" content="Sipremo" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify([organizationLd, websiteLd, webPageLd])}
      </script>
    </Helmet>
  );
}
