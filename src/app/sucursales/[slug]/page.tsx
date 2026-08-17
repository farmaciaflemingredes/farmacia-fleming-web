import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Clock, ChevronLeft, Navigation } from "lucide-react";
import {
  branches,
  getBranchBySlug,
  mapsDirectionsUrl,
  mapsEmbedSrc,
  whatsappUrl,
} from "@/lib/branches";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import OpenStatusBadge from "@/components/OpenStatusBadge";

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch) return {};

  const title = `Farmacia en ${branch.name}, Salta`;
  const description = `Farmacia Fleming ${branch.name}: ${branch.street}, ${branch.city}. ${branch.description} Mirá cómo llegar en Google Maps o escribinos por WhatsApp.`;

  return {
    title,
    description,
    alternates: { canonical: `/sucursales/${branch.slug}` },
    openGraph: {
      url: `${site.url}/sucursales/${branch.slug}`,
      title: `${branch.fullName} | ${site.name}`,
      description,
    },
  };
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch) notFound();

  const otherBranches = branches.filter((b) => b.slug !== branch.slug);

  const pharmacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: branch.fullName,
    url: `${site.url}/sucursales/${branch.slug}`,
    telephone: branch.whatsappDisplay,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.street,
      addressLocality: branch.city,
      addressRegion: "Salta",
      postalCode: branch.postalCode,
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.lat,
      longitude: branch.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: branch.is24h ? "00:00" : branch.opensAt,
        closes: branch.is24h ? "23:59" : branch.closesAt,
      },
    ],
    hasMap: branch.mapsUrl,
    parentOrganization: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sucursales",
        item: `${site.url}/sucursales`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: branch.fullName,
        item: `${site.url}/sucursales/${branch.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={pharmacyJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <header className="border-b border-linea bg-verde-pale/50">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            href="/sucursales"
            className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-verde-deep hover:underline"
          >
            <ChevronLeft size={15} aria-hidden="true" />
            Todas las sucursales
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
              Farmacia en {branch.name}, Salta
            </h1>
            <OpenStatusBadge branch={branch} />
          </div>
          <p className="mt-2 text-sm font-medium text-verde-deep">
            {branch.fullName} · {branch.zone}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/75">
            {branch.description}
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-4xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="card-radius overflow-hidden border border-linea shadow-brand">
            <iframe
              title={`Mapa de Farmacia Fleming ${branch.name}`}
              src={mapsEmbedSrc(branch)}
              width="100%"
              height="320"
              loading="lazy"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <dl className="card-radius mt-6 grid gap-4 border border-linea bg-blanco p-5">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-verde" aria-hidden="true" />
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-gris">
                  Dirección
                </dt>
                <dd className="text-sm text-ink">
                  {branch.street}, {branch.city} ({branch.postalCode})
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-verde" aria-hidden="true" />
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-gris">
                  Horario
                </dt>
                <dd className="text-sm text-ink">
                  {branch.is24h
                    ? "Abierta las 24 horas, los 365 días del año"
                    : `Todos los días de ${branch.opensAt} a ${branch.closesAt}`}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle size={18} className="mt-0.5 shrink-0 text-verde" aria-hidden="true" />
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-gris">
                  WhatsApp / Teléfono
                </dt>
                <dd className="text-sm text-ink">{branch.whatsappDisplay}</dd>
              </div>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={mapsDirectionsUrl(branch)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-blanco"
            >
              <Navigation size={17} aria-hidden="true" />
              Cómo llegar
            </a>
            <a
              href={whatsappUrl(branch)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-verde px-5 text-sm font-semibold text-blanco transition-colors hover:bg-verde-deep"
            >
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

        <aside aria-labelledby="otras-sucursales-heading">
          <h2
            id="otras-sucursales-heading"
            className="font-heading text-lg font-semibold text-ink"
          >
            Otras sucursales
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {otherBranches.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/sucursales/${b.slug}`}
                  className="flex items-center justify-between rounded-xl border border-linea bg-blanco px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-verde hover:bg-verde-pale"
                >
                  {b.name}
                  <span className="text-xs font-normal text-gris">
                    {b.zone}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
