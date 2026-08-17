import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Centro24hsBlock from "@/components/Centro24hsBlock";
import InstagramSection from "@/components/InstagramSection";
import SucursalesSection from "@/components/SucursalesSection";
import MarcasSection from "@/components/MarcasSection";
import SobreNosotrosSection from "@/components/SobreNosotrosSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Farmacia en Salta Capital y San Lorenzo",
  description:
    "Farmacia Fleming: 5 sucursales en Salta (Centro, San Lorenzo, Ciudad Judicial, Alto La Loma y San Luis). Encontrá tu farmacia más cercana, mirá cómo llegar y escribinos por WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    url: site.url,
    title: `${site.name} | Farmacia en Salta Capital y San Lorenzo`,
    description:
      "5 sucursales en Salta. Encontrá tu farmacia más cercana, cómo llegar y WhatsApp directo.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Centro24hsBlock />
      <SucursalesSection />
      <MarcasSection />
      <SobreNosotrosSection />
      <InstagramSection />
    </>
  );
}
