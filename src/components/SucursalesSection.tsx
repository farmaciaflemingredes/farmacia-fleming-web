"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, LocateFixed, Loader2 } from "lucide-react";
import { branches, distanceKm } from "@/lib/branches";
import { useGeolocation } from "@/lib/useGeolocation";
import BranchCard from "./BranchCard";

export default function SucursalesSection() {
  const { state, request } = useGeolocation();

  const sorted = useMemo(() => {
    if (state.status !== "success") return branches.map((b) => ({ branch: b, distance: undefined as number | undefined }));
    const withDistance = branches.map((b) => ({
      branch: b,
      distance: distanceKm({ lat: state.lat, lng: state.lng }, b),
    }));
    return withDistance.sort((a, b) => a.distance - b.distance);
  }, [state]);

  return (
    <section
      id="sucursales"
      aria-labelledby="sucursales-heading"
      className="scroll-mt-20 bg-bg"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2
              id="sucursales-heading"
              className="font-heading text-2xl font-semibold text-ink sm:text-3xl"
            >
              Nuestras sucursales
            </h2>
            <p className="mt-2.5 text-base leading-relaxed text-gris">
              5 farmacias en Salta Capital y San Lorenzo. Elegí la más
              cercana.
            </p>
          </div>
          <Link
            href="/sucursales"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-verde-deep hover:underline"
          >
            Ver todas
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6">
          {state.status === "success" ? (
            <p className="inline-flex items-center gap-2 rounded-full bg-verde-pale px-4 py-2 text-sm font-medium text-verde-deep">
              <LocateFixed size={16} aria-hidden="true" />
              Ordenado por cercanía a tu ubicación
            </p>
          ) : (
            <button
              type="button"
              onClick={request}
              disabled={state.status === "loading"}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-blanco disabled:opacity-60"
            >
              {state.status === "loading" ? (
                <Loader2 size={17} className="animate-spin" aria-hidden="true" />
              ) : (
                <LocateFixed size={17} aria-hidden="true" />
              )}
              {state.status === "loading"
                ? "Buscando tu ubicación…"
                : "Usar mi ubicación"}
            </button>
          )}
          {state.status === "error" && (
            <p className="mt-2 text-sm text-rojo-deep">{state.message}</p>
          )}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map(({ branch, distance }) => (
            <BranchCard key={branch.slug} branch={branch} distanceKm={distance} />
          ))}
        </div>
      </div>
    </section>
  );
}
