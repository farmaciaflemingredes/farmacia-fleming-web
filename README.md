# Farmacia Fleming — sitio institucional

Sitio institucional de Farmacia Fleming (Salta), construido con Next.js 16 (App Router) + Tailwind CSS v4.

## Antes de publicar

1. **Dominio real**: `src/lib/site.ts` tiene `url: "https://www.farmaciafleming.com.ar"` como placeholder. Reemplazalo por el dominio definitivo — afecta metadata, canonical, Open Graph, sitemap.xml y robots.txt.
2. **Horarios**: en `src/lib/branches.ts` cada sucursal tiene el horario de cierre confirmado en Google Maps, pero no el de apertura exacto (Maps no lo expuso de forma legible). Confirmá el horario completo con cada sucursal y actualizá `hoursLabel`.
3. **Redes sociales**: los links de Instagram/Facebook en `src/lib/site.ts` están tomados de las cuentas oficiales verificadas (@farmaciaflemingsalta). Confirmá que sigan vigentes.

## Estructura de datos

- `src/lib/branches.ts` — única fuente de verdad para las 5 sucursales (dirección, WhatsApp, Maps, horario). Todo el sitio (home, `/sucursales`, páginas individuales, JSON-LD, footer, selector flotante de WhatsApp) lee de acá.
- `src/lib/brands.ts` — marcas + archivo de logo en `/public/logos`.
- `src/lib/site.ts` — datos globales (nombre, dominio, redes, descripción SEO).

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run start
```

El build genera 100% páginas estáticas (SSG), incluida cada sucursal individual (`/sucursales/[slug]`).

## Deploy

Pensado para Vercel o Netlify sin configuración adicional (`npm run build` + framework Next.js autodetectado).

## SEO técnico incluido

- Metadata (title/description/canonical/OG/Twitter) por página, con template dinámico.
- JSON-LD: `Organization` global + `Pharmacy` por sucursal + `BreadcrumbList` en páginas de sucursal.
- `sitemap.xml` y `robots.txt` generados dinámicamente (`src/app/sitemap.ts`, `src/app/robots.ts`).
- Imagen Open Graph generada dinámicamente (`src/app/opengraph-image.tsx`).
- URLs individuales por sucursal para SEO local: `/sucursales/centro`, `/sucursales/san-lorenzo`, `/sucursales/ciudad-judicial`, `/sucursales/alto-la-loma`, `/sucursales/san-luis`.
