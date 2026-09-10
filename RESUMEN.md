# Baja de sucursal San Luis — Checklist de verificación

Todo lo siguiente se verificó localmente (`npm run build` + navegador) antes
de subir los cambios.

## Build
- [x] `npm run build` compila sin errores ni warnings de TypeScript.
- [x] Genera exactamente 4 páginas de sucursal (antes 5):
      `centro`, `san-lorenzo`, `ciudad-judicial`, `alto-la-loma`.
- [x] Sin imports huérfanos ni referencias rotas a `san-luis` en `src/`
      ni en `public/` (grep completo, cero resultados).

## Rutas / links
- [x] `/sucursales/san-luis` ya no se genera como página propia.
- [x] `/sucursales/san-luis` redirige (308 permanente) a `/sucursales`,
      verificado con `curl` y navegando en el browser real.
- [x] `sitemap.xml` pasó de 9 a 8 URLs; ya no incluye
      `/sucursales/san-luis`.
- [x] `robots.txt` sin cambios necesarios (no tenía reglas por sucursal).

## Contenido y datos
- [x] `branches.ts`: la entrada de San Luis fue eliminada por completo
      (no comentada, no con flag `activo: false`).
- [x] Selector de sucursal (WhatsApp / Cómo llegar): muestra exactamente
      4 opciones — Centro, San Lorenzo, Ciudad Judicial, Alto La Loma.
- [x] Cards de la sección Sucursales (home y `/sucursales`): 4 tarjetas.
- [x] Footer: listado de sucursales con 4 links; bajada de texto sin
      mención a San Luis.
- [x] Todos los textos que decían "5 sucursales" / "5 farmacias" /
      "Cinco sucursales" actualizados a 4 (Hero, sección Sucursales,
      Sobre Nosotros, home, `/sucursales`, imagen Open Graph).
- [x] FAQ del home: la respuesta sobre cantidad de sucursales actualizada
      a 4, sin mencionar San Luis.

## JSON-LD (schema.org)
- [x] `@graph` de `Pharmacy` en el layout: 4 entidades (antes 5),
      verificado por consola en el navegador.
- [x] Ninguna página emite ya `Pharmacy`/`BreadcrumbList`/`FAQPage` para
      San Luis (la página no existe más).

## WhatsApp
- [x] El deep-link directo de San Luis (`wa.me/5493872675555...`) no se
      genera en ningún componente porque la sucursal no está en el array.
- [x] Botón flotante desktop y barra inferior mobile: en el resto de
      páginas, el selector ya no ofrece San Luis como opción.

## Assets
- [x] Revisado `public/` completo: San Luis no tenía ninguna imagen o
      archivo exclusivo, no hubo nada que borrar.

## Pendiente de tu parte
- Cuando confirmes que está todo OK, subo (`git commit` + `push`) para que
  se despliegue en Netlify, y vuelvo a verificar en producción real
  (no solo local) antes de cerrar, como hicimos en los cambios anteriores.
