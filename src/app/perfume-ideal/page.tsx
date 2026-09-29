import type { Metadata } from "next";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PerfumeQuiz from "@/components/PerfumeQuiz";

export const metadata: Metadata = {
  title: "Descubrí tu perfume ideal | Quiz de perfumes",
  description:
    "Respondé 4 preguntas rápidas sobre tu personalidad y tus gustos, y te recomendamos qué perfume elegir, disponible en tu Farmacia Fleming más cercana en Salta.",
  alternates: { canonical: "/perfume-ideal" },
  openGraph: {
    url: `${site.url}/perfume-ideal`,
    title: `Descubrí tu perfume ideal | ${site.name}`,
    description:
      "Un quiz de 1 minuto para saber qué perfume es para vos, con productos disponibles en Farmacia Fleming, Salta.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PerfumeIdealPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Descubrí tu perfume ideal",
        item: `${site.url}/perfume-ideal`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <section className="bg-verde-pale/40 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto mb-8 max-w-md text-center sm:mb-10">
          <h1 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Descubrí tu perfume ideal
          </h1>
          <p className="mt-2 text-sm text-ink/70">
            Un quiz de 1 minuto para saber qué perfume es para vos, disponible
            en Farmacia Fleming.
          </p>
        </div>
        <PerfumeQuiz />
      </section>
    </>
  );
}
