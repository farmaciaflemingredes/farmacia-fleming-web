import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import BottomNav from "@/components/BottomNav";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { branches } from "@/lib/branches";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Farmacia en Salta Capital y San Lorenzo`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Farmacia en Salta Capital y San Lorenzo`,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Farmacia en Salta`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icons/icon-512.png`,
    sameAs: [site.instagram, site.facebook],
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salta",
      addressRegion: "Salta",
      addressCountry: "AR",
    },
  };

  return (
    <html lang="es-AR" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <JsonLd data={organizationJsonLd} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": branches.map((b) => ({
              "@type": "Pharmacy",
              name: b.fullName,
              url: `${site.url}/sucursales/${b.slug}`,
              telephone: b.whatsappDisplay,
              address: {
                "@type": "PostalAddress",
                streetAddress: b.street,
                addressLocality: b.city,
                postalCode: b.postalCode,
                addressCountry: "AR",
              },
            })),
          }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-verde focus:px-4 focus:py-2 focus:text-blanco"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1 pb-[4.75rem] sm:pb-0">
          {children}
        </main>
        <Footer />
        <WhatsAppFloating />
        <BottomNav />
      </body>
    </html>
  );
}
