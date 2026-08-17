import { MapPin, MessageCircle } from "lucide-react";
import { branches, mapsDirectionsUrl, whatsappUrl } from "@/lib/branches";
import OpenStatusBadge from "./OpenStatusBadge";

export default function Centro24hsBlock() {
  const centro = branches.find((b) => b.slug === "centro");
  if (!centro) return null;

  return (
    <section aria-labelledby="centro-24hs-heading" className="bg-blanco">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="card-radius flex flex-col gap-5 border border-linea bg-verde-pale/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p
              id="centro-24hs-heading"
              className="text-sm font-medium text-verde-deep"
            >
              ¿Necesitás una farmacia ahora?
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              <h2 className="font-heading text-xl font-semibold text-ink">
                Fleming {centro.name}
              </h2>
              <OpenStatusBadge branch={centro} />
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink/70">
              <MapPin size={15} className="shrink-0 text-verde" aria-hidden="true" />
              {centro.street}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <a
              href={mapsDirectionsUrl(centro)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-ink bg-blanco px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-blanco"
            >
              <MapPin size={17} aria-hidden="true" />
              Cómo llegar
            </a>
            <a
              href={whatsappUrl(centro)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-verde px-5 text-sm font-semibold text-blanco transition-colors hover:bg-verde-deep"
            >
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
