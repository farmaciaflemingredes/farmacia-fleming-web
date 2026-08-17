import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { brands } from "@/lib/brands";

function BrandLogo({
  brand,
  className = "",
}: {
  brand: (typeof brands)[number];
  className?: string;
}) {
  return (
    <div
      className={`card-radius flex h-20 items-center justify-center border border-linea bg-blanco p-4 sm:h-24 ${className}`}
    >
      <Image
        src={`/logos/${brand.file}`}
        alt={`Logo de ${brand.name}, marca disponible en Farmacia Fleming Salta`}
        width={140}
        height={60}
        className="h-auto max-h-9 w-auto max-w-full object-contain sm:max-h-11"
        loading="lazy"
      />
    </div>
  );
}

export default function MarcasSection({
  variant = "home",
}: {
  variant?: "home" | "full";
}) {
  return (
    <section
      id="marcas"
      aria-labelledby="marcas-heading"
      className="scroll-mt-20 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="marcas-heading"
            className="font-heading text-2xl font-semibold text-ink sm:text-3xl"
          >
            Las marcas que elegís, cerca tuyo
          </h2>
          <p className="mt-2.5 text-base leading-relaxed text-gris">
            Dermocosmética y cuidado personal disponibles en Farmacia Fleming,
            Salta.
          </p>
        </div>

        {variant === "full" ? (
          <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {brands.map((brand) => (
              <li key={brand.slug}>
                <BrandLogo brand={brand} />
              </li>
            ))}
          </ul>
        ) : (
          <>
            {/* Mobile: carrusel horizontal táctil */}
            <ul className="-mx-4 mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {brands.map((brand) => (
                <li key={brand.slug} className="w-28 shrink-0 snap-start">
                  <BrandLogo brand={brand} />
                </li>
              ))}
              <li className="w-px shrink-0" aria-hidden="true" />
            </ul>

            {/* Desktop: grilla amplia */}
            <ul className="mt-9 hidden gap-4 sm:grid sm:grid-cols-4 lg:grid-cols-6">
              {brands.map((brand) => (
                <li key={brand.slug}>
                  <BrandLogo brand={brand} />
                </li>
              ))}
            </ul>

            <div className="mt-8 text-center">
              <Link
                href="/marcas"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-verde-deep hover:underline"
              >
                Ver todas las marcas
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
