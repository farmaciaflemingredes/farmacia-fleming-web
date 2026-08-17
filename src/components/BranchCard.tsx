"use client";

import Link from "next/link";
import { MapPin, MessageCircle, ArrowRight, Navigation } from "lucide-react";
import { type Branch, mapsDirectionsUrl, whatsappUrl } from "@/lib/branches";
import OpenStatusBadge, { useOpenStatus } from "./OpenStatusBadge";

export default function BranchCard({
  branch,
  distanceKm,
}: {
  branch: Branch;
  distanceKm?: number;
}) {
  const status = useOpenStatus(branch);

  return (
    <article className="card-radius flex h-full flex-col border border-linea bg-blanco p-5 shadow-brand">
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold text-ink">
          <Link
            href={`/sucursales/${branch.slug}`}
            className="hover:text-verde-deep"
          >
            {branch.name}
          </Link>
        </h3>
        {typeof distanceKm === "number" && (
          <span className="shrink-0 rounded-full bg-bg px-2.5 py-1 text-[0.7rem] font-medium text-gris">
            {distanceKm < 1
              ? `${Math.round(distanceKm * 1000)} m`
              : `${distanceKm.toFixed(1)} km`}
          </span>
        )}
      </div>

      <p className="mb-3 text-sm text-gris">{branch.zone}</p>

      <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <OpenStatusBadge branch={branch} />
        {status && <span className="text-xs text-gris">{status.detail}</span>}
      </div>

      <div className="mb-5 flex items-start gap-2 text-sm text-ink/80">
        <MapPin
          size={16}
          className="mt-0.5 shrink-0 text-verde"
          aria-hidden="true"
        />
        <span>{branch.street}</span>
      </div>

      <div className="mt-auto flex flex-col gap-2.5 sm:flex-row">
        <a
          href={mapsDirectionsUrl(branch)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-ink px-4 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-blanco"
        >
          <Navigation size={16} aria-hidden="true" />
          Cómo llegar
        </a>
        <a
          href={whatsappUrl(branch)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-verde px-4 text-sm font-semibold text-blanco transition-colors hover:bg-verde-deep"
        >
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp
        </a>
      </div>

      <Link
        href={`/sucursales/${branch.slug}`}
        className="mt-3 inline-flex items-center gap-1 self-start text-sm font-medium text-verde-deep hover:underline"
      >
        Ver sucursal
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </article>
  );
}
