// Marcas de dermocosmética y cuidado personal disponibles en Farmacia Fleming.
// El archivo de logo debe existir en /public/logos/<file>. Formato SVG preferido.

export type Brand = {
  name: string;
  slug: string;
  file: string; // nombre de archivo dentro de /public/logos
};

export const brands: Brand[] = [
  { name: "Aveeno", slug: "aveeno", file: "aveeno.svg" },
  { name: "Avène", slug: "avene", file: "avene.png" },
  { name: "Bagóvit", slug: "bagovit", file: "bagovit.png" },
  { name: "Bioderma", slug: "bioderma", file: "bioderma.svg" },
  { name: "CeraVe", slug: "cerave", file: "cerave.png" },
  { name: "Cetaphil", slug: "cetaphil", file: "cetaphil.png" },
  { name: "Dermaglós", slug: "dermaglos", file: "dermaglos.png" },
  { name: "Eucerin", slug: "eucerin", file: "eucerin.svg" },
  { name: "Gata Flora", slug: "gata-flora", file: "gata-flora.webp" },
  { name: "ISDIN", slug: "isdin", file: "isdin.svg" },
  { name: "La Roche-Posay", slug: "la-roche-posay", file: "la-roche-posay.png" },
  { name: "Neutrogena", slug: "neutrogena", file: "neutrogena.svg" },
  { name: "Nivea", slug: "nivea", file: "nivea.svg" },
  { name: "Pond's", slug: "ponds", file: "ponds.svg" },
  { name: "Vichy", slug: "vichy", file: "vichy.svg" },
  { name: "Valuge", slug: "valuge", file: "valuge.svg" },
  { name: "Garnier", slug: "garnier", file: "garnier.svg" },
];
