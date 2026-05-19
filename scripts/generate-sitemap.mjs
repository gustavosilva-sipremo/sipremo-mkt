import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const siteUrl = (process.env.VITE_SITE_URL ?? "https://sipremo.com").replace(
  /\/$/,
  "",
);
const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

writeFileSync(resolve("public/sitemap.xml"), xml);
writeFileSync(
  resolve("public/robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
console.log(`Generated sitemap for ${siteUrl}`);
