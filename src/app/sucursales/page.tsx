import type { Metadata } from "next";
import { branches } from "@/lib/branches";
import { site } from "@/lib/site";
import BranchCard from "@/components/BranchCard";

export const metadata: Metadata = {
  title: "Sucursales en Salta",
  description:
    "Las 5 sucursales de Farmacia Fleming en Salta: Centro, San Lorenzo, Ciudad Judicial, Alto La Loma y San Luis. Direcciones, horarios, cómo llegar y WhatsApp de cada una.",
  alternates: { canonical: "/sucursales" },
  openGraph: {
    url: `${site.url}/sucursales`,
    title: `Sucursales de ${site.name} en Salta`,
    description:
      "Direcciones, horarios, Google Maps y WhatsApp de cada sucursal de Farmacia Fleming en Salta.",
  },
};

export default function SucursalesPage() {
  return (
    <>
      <header className="border-b border-linea bg-verde-pale/50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
            Sucursales de Farmacia Fleming en Salta
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
            Tenemos 5 farmacias distribuidas en Salta Capital y San Lorenzo.
            Elegí la que te quede más cerca: mirá la dirección, el horario,
            abrí Google Maps o escribinos directo por WhatsApp.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <BranchCard key={branch.slug} branch={branch} />
          ))}
        </div>
      </section>
    </>
  );
}
