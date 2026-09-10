# Baja de sucursal San Luis — Decisiones

Fecha: 2026-09-10

## Aclaración importante antes de empezar

El pedido original nombraba la sucursal como **"F5 San Luis"** y pedía quitar
un flag `ofreceInyectables`. Ninguno de los dos existe en el código:

- La sucursal se llama simplemente **"San Luis"** en todo el proyecto (slug
  `san-luis`), sin prefijo "F5".
- Nunca existió un flag `ofreceInyectables` ni una feature de inyectables en
  este sitio.
- No hay registro de que esta sucursal haya estado "suspendida" antes de
  esta baja.

Antes de tocar nada le confirmé al usuario que se refería a la sucursal San
Luis real (Cerro Los Zorritos esq. Cuesta del Obispo, estación de servicio
Shell, WhatsApp +54 9 387 267-5555) y confirmó que sí. Se procedió con la
baja completa y no reversible de esa sucursal.

## Qué se tocó

### 1. Fuente de verdad
- `src/lib/branches.ts` — se eliminó por completo la entrada de San Luis
  del array `branches` (slug, dirección, teléfono, WhatsApp, coordenadas,
  horarios). No quedó comentada ni con flag `activo: false`: se borró.

Como casi todo el sitio (páginas de sucursal, sitemap, selector de
WhatsApp/Maps, JSON-LD, FAQ por sucursal) se genera dinámicamente a partir
de este array, la mayoría de los puntos del pedido se resolvieron solos al
sacar esta entrada. El resto fueron menciones de texto escritas a mano que
había que editar una por una.

### 2. Página/ruta dedicada
- `/sucursales/san-luis` ya no se genera (`generateStaticParams()` en
  `src/app/sucursales/[slug]/page.tsx` deriva de `branches`, así que dejó de
  incluirla automáticamente).
- Se agregó un **redirect permanente (308)** en `next.config.ts`:
  `/sucursales/san-luis` → `/sucursales`. Se eligió redirect en vez de 404
  desnudo porque hay una página "padre" lógica (el listado de sucursales) y
  es mejor práctica de SEO para no perder gente que llegue por links viejos,
  el mapa guardado en Google, o resultados de búsqueda ya indexados.

### 3. Referencias de texto (editadas a mano, no derivan del array)
Archivos con menciones textuales a "San Luis" o al conteo "5 sucursales /
5 farmacias / Cinco sucursales", corregidos a 4:
- `src/components/Hero.tsx` — badge "5 sucursales en Salta" → "4 sucursales"
- `src/components/SucursalesSection.tsx` — "5 farmacias..." → "4 farmacias..."
- `src/components/SobreNosotrosSection.tsx` — "Cinco sucursales" → "Cuatro sucursales"
- `src/components/Footer.tsx` — quitada la mención a San Luis en la bajada
- `src/lib/site.ts` — descripción global del sitio (afecta meta description
  y Organization JSON-LD)
- `src/lib/faq.ts` — respuesta de "¿Cuántas sucursales tiene Farmacia
  Fleming en Salta?"
- `src/app/page.tsx` — meta description y Open Graph description del home
- `src/app/sucursales/page.tsx` — meta description y texto del header
- `src/app/opengraph-image.tsx` — imagen que se ve al compartir el link
  (contador de sucursales)

### 4. Nav / footer / selector de sucursal / mapa
- El header no lista sucursales por nombre (solo un link genérico a
  "Sucursales"), así que no necesitó cambios.
- `src/components/Footer.tsx` lista sucursales dinámicamente desde
  `branches` → San Luis desapareció solo del listado de links; solo hubo
  que arreglar la bajada de texto suelta (punto 3).
- `src/components/BranchPickerSheet.tsx` (selector de WhatsApp/Cómo llegar,
  usado por la barra inferior mobile y el botón flotante desktop) itera
  `branches` → deja de mostrar San Luis automáticamente. Verificado en
  navegador: quedan exactamente 4 opciones.
- El mapa de cada sucursal es un iframe de Google Maps embebido por
  sucursal dentro de su propia página de detalle — al no existir más la
  página de San Luis, ese mapa deja de renderizarse.

### 5. JSON-LD (schema.org)
- `src/app/layout.tsx` arma un `@graph` de entidades `Pharmacy` iterando
  `branches` → pasó de 5 a 4 entradas automáticamente. Verificado en
  navegador.
- `src/app/sucursales/[slug]/page.tsx` genera su propio `Pharmacy` +
  `BreadcrumbList` + `FAQPage` por sucursal — al no generarse más la
  página de San Luis, ese schema deja de emitirse.

### 6. Botón sticky de WhatsApp
- `src/components/BottomNav.tsx` (barra inferior mobile) y
  `src/components/WhatsAppFloating.tsx` (burbuja flotante desktop) resuelven
  el número de WhatsApp a mostrar según la sucursal actual (si estás en
  `/sucursales/<slug>`) o abren el selector general — ambos usan
  `getBranchBySlug()` / iteran `branches`, así que San Luis desaparece del
  selector general solo, y su deep-link específico
  (`wa.me/5493872675555...`) ya no se genera en ningún lado porque la
  entrada no existe más.

### 7. Sitemap / robots
- `src/app/sitemap.ts` deriva las URLs de sucursal de `branches` → pasó de
  9 a 8 URLs automáticamente (verificado).
- `src/app/robots.ts` nunca tuvo reglas específicas por sucursal, no
  necesitó cambios.

### 8. Imágenes/assets exclusivos
- Se revisó `public/` completo: San Luis nunca tuvo una imagen o asset
  propio (todas las sucursales comparten el mismo set de assets de marca).
  No había nada que borrar.

## Lo que NO se hizo (porque no existe)
- No se tocó ningún flag `ofreceInyectables` — no existe en el código.
- No se revirtió ningún estado "suspendido" — no hay tal estado en el
  historial de este proyecto.
