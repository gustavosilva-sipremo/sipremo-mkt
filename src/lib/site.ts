export function getSiteUrl(): string {
  const url = import.meta.env.VITE_SITE_URL;
  return url?.replace(/\/$/, "") ?? "https://sipremo.com";
}
