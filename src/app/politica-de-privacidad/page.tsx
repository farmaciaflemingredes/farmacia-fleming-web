import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad del sitio web de Farmacia Fleming, Salta.",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: { index: false, follow: true },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
        Política de privacidad
      </h1>
      <p className="mt-2 text-sm text-gris">
        Última actualización: {new Date().toLocaleDateString("es-AR", {
          year: "numeric",
          month: "long",
        })}
      </p>

      <div className="prose prose-neutral mt-8 max-w-none text-ink/85 [&_h2]:font-heading [&_h2]:font-semibold [&_p]:leading-relaxed">
        <h2>Información que recopilamos</h2>
        <p>
          Este sitio es institucional e informativo. No solicitamos datos
          personales a través de formularios. Los botones de contacto abren
          WhatsApp o Google Maps directamente en tu dispositivo; cualquier
          dato que compartas por esos medios queda sujeto a las políticas de
          privacidad de WhatsApp y de Google respectivamente.
        </p>

        <h2>Cookies y analítica</h2>
        <p>
          Podemos usar herramientas de analítica web para entender de forma
          agregada y anónima cómo se usa el sitio (por ejemplo, qué páginas
          se visitan más) y así mejorar la experiencia. Esta información no
          se utiliza para identificarte individualmente.
        </p>

        <h2>Enlaces a terceros</h2>
        <p>
          El sitio enlaza a Google Maps, WhatsApp, Instagram y Facebook.
          {" "}{site.name} no es responsable de las prácticas de privacidad de
          esos servicios externos.
        </p>

        <h2>Contacto</h2>
        <p>
          Ante cualquier consulta sobre esta política, podés escribirnos por
          WhatsApp a la sucursal de {site.name} más cercana.
        </p>
      </div>
    </div>
  );
}
