import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Desplegado en Netlify vía Git (Next.js Runtime): no hace falta
     exportación estática. Netlify optimiza imágenes automáticamente. */
  async redirects() {
    return [
      {
        // Sucursal San Luis: baja definitiva (cerró). Redirect permanente
        // para no perder gente que llegue por links/bookmarks/buscadores viejos.
        source: "/sucursales/san-luis",
        destination: "/sucursales",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
