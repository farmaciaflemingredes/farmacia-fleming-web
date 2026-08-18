import type { Metadata } from "next";
import { site } from "@/lib/site";
import MarcasSection from "@/components/MarcasSection";

export const metadata: Metadata = {
  title: "Marcas de dermocosmética en Salta",
  description:
    "Aveeno, Avène, Bagóvit, Bioderma, CeraVe, Cetaphil, Dermaglós, Eucerin, Gata Flora, ISDIN, La Roche-Posay, Neutrogena, Nivea, Pond's, Vichy, Valuge y Garnier: las marcas de dermocosmética y cuidado personal que encontrás en Farmacia Fleming, Salta.",
  alternates: { canonical: "/marcas" },
  openGraph: {
    url: `${site.url}/marcas`,
    title: `Marcas de dermocosmética en Farmacia Fleming, Salta`,
    description:
      "Las principales marcas de dermocosmética y cuidado personal disponibles en Farmacia Fleming, Salta.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function MarcasPage() {
  return (
    <>
      <header className="border-b border-linea bg-verde-pale/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
            Dermocosmética en Salta
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
            En Farmacia Fleming trabajamos con las marcas de dermocosmética y
            cuidado personal más reconocidas del mercado. Consultá
            disponibilidad y precios en tu sucursal más cercana por
            WhatsApp.
          </p>
        </div>
      </header>
      <MarcasSection variant="full" />
    </>
  );
}
