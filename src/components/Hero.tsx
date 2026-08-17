import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-verde-pale/50">
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-20">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-blanco px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-verde-deep shadow-brand">
          5 sucursales en Salta
        </span>

        <h1 className="font-heading text-3xl font-bold leading-[1.15] text-ink sm:text-5xl sm:leading-[1.1]">
          Farmacia Fleming
          <br />
          siempre cerca tuyo
        </h1>

        <div className="mt-7">
          <Link
            href="/sucursales"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ink px-7 text-base font-semibold text-blanco shadow-brand transition-transform hover:scale-[1.02]"
          >
            <MapPin size={18} aria-hidden="true" />
            Encontrá tu sucursal
          </Link>
        </div>

        <p className="mt-6 text-sm font-medium text-ink/60">
          24&nbsp;hs Centro <span aria-hidden="true">·</span> Envíos gratis{" "}
          <span aria-hidden="true">·</span> Horarios extendidos
        </p>
      </div>
    </section>
  );
}
