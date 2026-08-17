"use client";

import { ExternalLink, Play } from "lucide-react";
import { InstagramIcon } from "./icons/SocialIcons";
import { site } from "@/lib/site";

// Publicaciones reales de @farmaciaflemingsalta. Actualizar cada tanto con
// posts nuevos del perfil oficial (ver nota sobre integración automática
// más abajo).
const posts = [
  { url: "https://www.instagram.com/farmaciaflemingsalta/p/DcBagzcFfS8/", isVideo: false },
  { url: "https://www.instagram.com/farmaciaflemingsalta/p/Db8Ly5RFekS/", isVideo: false },
  { url: "https://www.instagram.com/farmaciaflemingsalta/p/Db3ADeoFZis/", isVideo: false },
  { url: "https://www.instagram.com/farmaciaflemingsalta/p/DbqLFrVlRYK/", isVideo: false },
  { url: "https://www.instagram.com/farmaciaflemingsalta/reel/DbtFavtyHQ5/", isVideo: true },
  { url: "https://www.instagram.com/farmaciaflemingsalta/p/DblDArdlYtc/", isVideo: false },
];

function InstagramPost({ url, isVideo }: { url: string; isVideo: boolean }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-radius relative flex aspect-square flex-col items-center justify-center gap-3 border border-linea bg-verde-pale/40 p-6 text-center transition-colors hover:bg-verde-pale"
    >
      {isVideo && (
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-ink/70 text-blanco">
          <Play size={13} fill="currentColor" aria-hidden="true" />
        </span>
      )}
      <span className="grid h-12 w-12 place-items-center rounded-full bg-blanco text-verde-deep shadow-sm">
        <InstagramIcon size={22} />
      </span>
      <span className="font-heading text-sm font-semibold text-ink">
        Ver en Instagram
      </span>
    </a>
  );
}

export default function InstagramSection() {
  return (
    <section
      className="border-t border-linea bg-blanco py-14 sm:py-20"
      aria-labelledby="instagram-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="instagram-heading"
              className="font-heading text-2xl font-semibold text-ink sm:text-3xl"
            >
              Lo último en Instagram
            </h2>
            <p className="mt-2 text-sm text-gris">
              @farmaciaflemingsalta
            </p>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-verde-deep hover:underline"
          >
            Ver perfil en Instagram
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Mobile: carrusel horizontal compacto */}
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {posts.map((p) => (
          <div key={p.url} className="w-32 shrink-0 snap-start">
            <InstagramPost url={p.url} isVideo={p.isVideo} />
          </div>
        ))}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>

      {/* Desktop/tablet: grilla 3x2 */}
      <div className="mx-auto hidden max-w-6xl grid-cols-3 gap-4 px-4 sm:grid sm:px-6">
        {posts.map((p) => (
          <InstagramPost key={p.url} url={p.url} isVideo={p.isVideo} />
        ))}
      </div>
    </section>
  );
}
