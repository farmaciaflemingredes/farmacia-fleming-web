import type { Metadata } from "next";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import DermaQuiz from "@/components/DermaQuiz";

export const metadata: Metadata = {
  title: "Descubrí tu rutina ideal | Quiz de dermocosmética",
  description:
    "Respondé 3 preguntas rápidas sobre tu piel y te recomendamos qué línea dermocosmética elegir, disponible en tu Farmacia Fleming más cercana en Salta.",
  alternates: { canonical: "/rutina-ideal" },
  openGraph: {
    url: `${site.url}/rutina-ideal`,
    title: `Descubrí tu rutina ideal | ${site.name}`,
    description:
      "Un quiz de 1 minuto para saber qué línea dermocosmética es para tu piel, con productos disponibles en Farmacia Fleming, Salta.",
  },
};

export default function RutinaIdealPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Descubrí tu rutina ideal",
        item: `${site.url}/rutina-ideal`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <section className="bg-verde-pale/40 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto mb-8 max-w-md text-center sm:mb-10">
          <h1 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Descubrí tu rutina ideal
          </h1>
          <p className="mt-2 text-sm text-ink/70">
            Un quiz de 1 minuto para saber qué línea de dermocosmética es
            para tu piel, disponible en Farmacia Fleming.
          </p>
        </div>
        <DermaQuiz />
      </section>
    </>
  );
}
