# Sipremo — Site institucional

Landing page da Sipremo em React 19, Vite, TypeScript, Tailwind CSS 4 e shadcn/ui.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | ESLint |
| `node scripts/generate-sitemap.mjs` | Regenera `public/sitemap.xml` e `robots.txt` |

## Variáveis de ambiente

Copie `.env.example` para `.env`:

```bash
VITE_SITE_URL=https://sipremo.com
```

## Vídeo do Hero (somente desktop)

Em viewports &lt; 768px o vídeo **não é carregado** (apenas gradiente). Em desktop, o player usa WebM + MP4 e poster opcional.

Coloque em `public/`:

- `videos/video_bg.mp4`
- `videos/video_bg.webm` (recomendado)
- `images/hero-poster.webp` (primeiro frame, LCP)

Comprima para produção (meta: &lt; 3 MB no MP4). Com ffmpeg:

```bash
ffmpeg -i public/videos/video_bg.mp4 -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -an -movflags +faststart public/videos/video_bg.new.mp4
ffmpeg -i public/videos/video_bg.new.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -an public/videos/video_bg.webm
ffmpeg -ss 1 -i public/videos/video_bg.new.mp4 -vframes 1 public/images/hero-poster.webp
mv public/videos/video_bg.new.mp4 public/videos/video_bg.mp4
```

## Internacionalização

PT/EN via `react-i18next`. Traduções em `src/locales/{pt,en}/*.json`.

## Formulário de contato

Validação no cliente em `src/lib/contact.ts`. A função `submitContactForm` aguarda integração com API (`POST /api/contact`).

## Deploy e segurança

Configure no host (Cloudflare, Nginx, Vercel):

- HTTPS obrigatório
- Headers: `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`
- CSP exemplo (ajuste conforme analytics):

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://tile.openstreetmap.org; connect-src 'self' https://tile.openstreetmap.org; font-src 'self'; media-src 'self';
```

Tiles OSM: respeite a [política de uso](https://operations.osmfoundation.org/policies/tiles/). Em alto tráfego, use tile server próprio.

## SEO

- Metadados dinâmicos: `src/components/seo/SeoHead.tsx`
- `public/robots.txt`, `public/sitemap.xml`, `public/og-image.jpg`
- Valide JSON-LD em [Rich Results Test](https://search.google.com/test/rich-results)
