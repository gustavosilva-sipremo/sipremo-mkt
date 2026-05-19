/// <reference types="vite/client" />

declare module "@fontsource-variable/inter";

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
