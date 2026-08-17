// Datos de sucursales verificados en Google Maps / Google Business Profile y
// contra los números de WhatsApp oficiales publicados en
// linktr.ee/farmacia.fleming e Instagram @farmaciaflemingsalta.
// No modificar direcciones/teléfonos/horarios sin re-verificar contra esas fuentes.

export type Branch = {
  slug: string;
  name: string; // Nombre corto de la sucursal
  fullName: string; // Nombre completo tal como figura en Google
  street: string;
  postalCode: string;
  city: string;
  zone: string; // Barrio / zona, para SEO local
  phoneDisplay: string; // Formato local para mostrar
  whatsapp: string; // Solo dígitos, formato internacional, para wa.me
  whatsappDisplay: string;
  mapsUrl: string; // Link corto oficial de Google Maps (pin exacto)
  lat: number;
  lng: number;
  is24h: boolean;
  // Horario diario en formato 24h "HH:MM" (mismo todos los días, según
  // Google Business Profile). closesNextDay=true cuando el cierre cae
  // después de medianoche (ej. cierra a la 1:00 o 2:00).
  opensAt: string;
  closesAt: string;
  closesNextDay: boolean;
  description: string; // Copy corto único para meta description / H1 intro
};

export const branches: Branch[] = [
  {
    slug: "centro",
    name: "Centro",
    fullName: "Farmacia Fleming - Centro",
    street: "Av. Belgrano 674 (Edificio Los Lapachos)",
    postalCode: "A4400AWR",
    city: "Salta",
    zone: "Microcentro, Salta Capital",
    phoneDisplay: "0387 479-3656",
    whatsapp: "5493874793656",
    whatsappDisplay: "+54 9 387 479-3656",
    mapsUrl: "https://maps.app.goo.gl/dijaY9R44D6rUaEc7",
    lat: -24.7873269,
    lng: -65.411762,
    is24h: true,
    opensAt: "00:00",
    closesAt: "23:59",
    closesNextDay: false,
    description:
      "Nuestra sucursal insignia en pleno microcentro de Salta Capital, abierta las 24 horas todos los días del año.",
  },
  {
    slug: "san-lorenzo",
    name: "San Lorenzo",
    fullName: "Farmacia Fleming - San Lorenzo",
    street: "Ernesto Sabato 300",
    postalCode: "A4401",
    city: "Villa San Lorenzo, Salta",
    zone: "Zona Parada Uno, Villa San Lorenzo",
    phoneDisplay: "0387 271-4444",
    whatsapp: "5493872714444",
    whatsappDisplay: "+54 9 387 271-4444",
    mapsUrl: "https://maps.app.goo.gl/F2Po7nDtDgqbEvCN6",
    lat: -24.7483267,
    lng: -65.4834127,
    is24h: false,
    opensAt: "07:30",
    closesAt: "00:00",
    closesNextDay: true,
    description:
      "La farmacia de confianza de Villa San Lorenzo, en la zona comercial de Parada Uno, con horario extendido todos los días.",
  },
  {
    slug: "ciudad-judicial",
    name: "Ciudad Judicial",
    fullName: "Farmacia Fleming - Ciudad Judicial",
    street: "Av. Bernardo A. Houssay s/n, medidor 17",
    postalCode: "A4400AAA",
    city: "Salta",
    zone: "Ciudad Judicial, Salta Capital",
    phoneDisplay: "0387 588-5959",
    whatsapp: "5493875885959",
    whatsappDisplay: "+54 9 387 588-5959",
    mapsUrl: "https://maps.app.goo.gl/2UNKe6z1cxxN6vyK9",
    lat: -24.7299758,
    lng: -65.4137403,
    is24h: false,
    opensAt: "07:00",
    closesAt: "01:00",
    closesNextDay: true,
    description:
      "Ubicada sobre Av. Houssay, en el corazón de Ciudad Judicial, con estacionamiento fácil y despacho ágil de recetas.",
  },
  {
    slug: "alto-la-loma",
    name: "Alto La Loma",
    fullName: "Farmacia Fleming - Alto La Loma",
    street: "Av. Juan Domingo Perón (Estación Shell)",
    postalCode: "A4400AAA",
    city: "Salta",
    zone: "Alto La Loma, Salta Capital",
    phoneDisplay: "0387 15-588-5427",
    whatsapp: "5493875885427",
    whatsappDisplay: "+54 9 387 588-5427",
    mapsUrl: "https://maps.app.goo.gl/KSu3snhBGU7ioUiaA",
    lat: -24.7698668,
    lng: -65.4414521,
    is24h: false,
    opensAt: "07:00",
    closesAt: "02:00",
    closesNextDay: true,
    description:
      "Sobre Av. Juan Domingo Perón, en la estación Shell de Alto La Loma, ideal para quienes se mueven en auto por la zona sur.",
  },
  {
    slug: "san-luis",
    name: "San Luis",
    fullName: "Farmacia Fleming - San Luis",
    street: "Cerro Los Zorritos esq. Cuesta del Obispo, local 4 y 5 (Estación Shell)",
    postalCode: "A4400AAA",
    city: "Salta",
    zone: "Barrio San Luis, Salta Capital",
    phoneDisplay: "0387 267-5555",
    whatsapp: "5493872675555",
    whatsappDisplay: "+54 9 387 267-5555",
    mapsUrl: "https://maps.app.goo.gl/sYcmziJSdfjg4wEb7",
    lat: -24.8470928,
    lng: -65.5061877,
    is24h: false,
    opensAt: "07:00",
    closesAt: "00:00",
    closesNextDay: true,
    description:
      "En la estación Shell de Cuesta del Obispo, atendiendo al barrio San Luis con envíos a domicilio gratis y buena disponibilidad de stock.",
  },
];

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

export function mapsDirectionsUrl(branch: Branch): string {
  return branch.mapsUrl;
}

export function whatsappUrl(branch: Branch, message?: string): string {
  const text = encodeURIComponent(
    message ?? `Hola Farmacia Fleming (${branch.name}), quería consultarles...`
  );
  return `https://wa.me/${branch.whatsapp}?text=${text}`;
}

export function mapsEmbedSrc(branch: Branch): string {
  const query = encodeURIComponent(
    `Farmacia Fleming, ${branch.street}, ${branch.city}`
  );
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

// Distancia entre dos puntos geográficos (fórmula de Haversine), en km.
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
