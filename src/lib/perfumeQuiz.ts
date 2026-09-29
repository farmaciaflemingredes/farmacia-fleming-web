// Lógica del "Quiz de perfumes" — portada 1:1 desde el archivo entregado por
// Santi (quiz_perfumes_fleming_2.html: mismo árbol de decisión, mismo
// catálogo y mismos tips) para integrarla nativamente al sitio principal.
//
// El catálogo son 108 productos reales de las 4 sucursales (listas del
// 29/09/2026) + el relevamiento de fotos de vidriera anterior (24/09/2026,
// sin sucursal confirmada -> sucursales: []). La familia olfativa y la
// intensidad son una clasificación ORIENTATIVA por reputación de
// marca/línea, no una ficha de notas verificada frasco por frasco.

export type Genero = "mujer" | "hombre" | "unisex";
export type Familia = "fresca" | "floral" | "oriental" | "amaderada";
export type Intensidad = "ligera" | "intensa";

// Códigos de stock tal como los mandó Santi. Mapeo confirmado con Santi:
// bg (Belgrano) = Centro (Av. Belgrano 674), gb (Grand Bourg) = Alto La Loma,
// sl = San Lorenzo, cj = Ciudad Judicial (ver STOCK_CODE_TO_SLUG más abajo).
export type StockCode = "gb" | "sl" | "bg" | "cj";

export type PersonalidadKey =
  | "energica"
  | "romantica"
  | "misteriosa"
  | "segura";
export type OcasionKey = "diario" | "noche" | "todos" | "especial";
export type NotasKey = "citricos" | "blancas" | "ambar" | "maderas";

export type PerfumeItem = {
  nombre: string;
  marca: string;
  genero: Genero;
  familia: Familia;
  intensidad: Intensidad;
  sucursales: StockCode[];
  // Foto oficial verificada (sitio de la marca o retailer oficial), en
  // /public/perfumes/. Si no está, el resultado muestra un ícono de frasco
  // genérico coloreado según la familia (ver ProductVisual en PerfumeQuiz.tsx).
  imagen?: string;
};

export const CATALOGO: PerfumeItem[] = [
  { nombre: "Azahar", marca: "Adolfo Domínguez", genero: "mujer", familia: "fresca", intensidad: "ligera", sucursales: ["gb", "sl", "bg"] },
  { nombre: "Rosas Blancas", marca: "Adolfo Domínguez", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb", "sl", "bg"] },
  { nombre: "Agua de Bambú", marca: "Adolfo Domínguez", genero: "unisex", familia: "fresca", intensidad: "ligera", sucursales: ["gb", "bg"] },
  { nombre: "Bambú", marca: "Adolfo Domínguez", genero: "unisex", familia: "amaderada", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "Look Fun", marca: "Agatha Ruiz de la Prada", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "The Icon Femme", marca: "Antonio Banderas", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Her Secret Desire", marca: "Antonio Banderas", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "The Icon", marca: "Antonio Banderas", genero: "hombre", familia: "amaderada", intensidad: "ligera", sucursales: ["gb", "sl"] },
  { nombre: "The Secret", marca: "Antonio Banderas", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["gb", "sl"] },
  { nombre: "The Golden Secret", marca: "Antonio Banderas", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "Power of Seduction", marca: "Antonio Banderas", genero: "hombre", familia: "oriental", intensidad: "ligera", sucursales: ["sl"] },
  { nombre: "King of Seduction", marca: "Antonio Banderas", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "Blue Seduction", marca: "Antonio Banderas", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["sl"] },
  { nombre: "Green Pop / United Dreams", marca: "Benetton", genero: "unisex", familia: "fresca", intensidad: "ligera", sucursales: ["sl"] },
  { nombre: "Bold Privé", marca: "Bensimon", genero: "unisex", familia: "oriental", intensidad: "intensa", sucursales: ["gb", "sl"] },
  { nombre: "Fragancia Masculina (frasco verde / cilindro)", marca: "Bensimon", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["gb", "sl"] },
  { nombre: "Hugo Man", marca: "Hugo Boss", genero: "hombre", familia: "floral", intensidad: "ligera", sucursales: ["gb", "sl"] },
  { nombre: "Boss Bottled", marca: "Hugo Boss", genero: "hombre", familia: "amaderada", intensidad: "intensa", sucursales: ["gb", "sl"] },
  { nombre: "Intense Blue", marca: "Hugo Boss", genero: "hombre", familia: "fresca", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "Hero", marca: "Burberry", genero: "hombre", familia: "amaderada", intensidad: "intensa", sucursales: ["gb", "sl"] },
  { nombre: "Defy", marca: "Calvin Klein", genero: "hombre", familia: "fresca", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "Tierra", marca: "Cardon", genero: "hombre", familia: "amaderada", intensidad: "ligera", sucursales: ["sl", "bg"] },
  { nombre: "Mar", marca: "Cardon", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["sl", "bg"] },
  { nombre: "Alondra / Línea Femenina", marca: "Cardon", genero: "mujer", familia: "amaderada", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "212 VIP Rosé", marca: "Carolina Herrera", genero: "mujer", familia: "floral", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "212 Men", marca: "Carolina Herrera", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "212 VIP Black", marca: "Carolina Herrera", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "212 Men NYC", marca: "Carolina Herrera", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["sl"] },
  { nombre: "Dieciocho (18) / Cher Signature", marca: "Cher.", genero: "mujer", familia: "floral", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "Onyx Rouge", marca: "Cher.", genero: "mujer", familia: "amaderada", intensidad: "intensa", sucursales: ["bg"] },
  { nombre: "Diecisiete (17)", marca: "Cher.", genero: "mujer", familia: "fresca", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "Dieciocho (18) Elixir", marca: "Cher.", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["bg"] },
  { nombre: "Mix / We Matter", marca: "Cher.", genero: "unisex", familia: "fresca", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "D'Or", marca: "Ciel", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "Nuit", marca: "Ciel", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "Magic", marca: "Ciel", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Crystal", marca: "Ciel", genero: "mujer", familia: "fresca", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Paradise", marca: "Ciel", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Bleu", marca: "Ciel", genero: "unisex", familia: "fresca", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Love", marca: "Ciel", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Acqua di Colbert", marca: "Colbert", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["cj"] },
  { nombre: "Colbert US", marca: "Colbert", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["cj"] },
  { nombre: "Colbert Noir / Clásico", marca: "Colbert", genero: "hombre", familia: "amaderada", intensidad: "intensa", sucursales: ["cj"] },
  { nombre: "Code Bold", marca: "Colbert", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "Code", marca: "Colbert", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["sl"] },
  { nombre: "Classic", marca: "David Beckham", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "Sauvage", marca: "Dior", genero: "hombre", familia: "fresca", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "The One For Men", marca: "Dolce & Gabbana", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "Tout Bleu (Pour Homme)", marca: "Gino Bogani", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "Pour Homme (caja bordó)", marca: "Gino Bogani", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["bg"] },
  { nombre: "Gentleman Réserve Privée", marca: "Givenchy", genero: "hombre", familia: "amaderada", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "L'Interdit", marca: "Givenchy", genero: "mujer", familia: "floral", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "My Wish", marca: "Halloween", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["sl"] },
  { nombre: "Halloween Clásico", marca: "Halloween", genero: "mujer", familia: "floral", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "Spark", marca: "Head", genero: "unisex", familia: "floral", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Fire", marca: "Head", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "Motion", marca: "Head", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["cj"] },
  { nombre: "L'Eau d'Issey", marca: "Issey Miyake", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["gb", "sl"] },
  { nombre: "Spirit", marca: "Kevin", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["cj"] },
  { nombre: "Park", marca: "Kevin", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["cj"] },
  { nombre: "Ice", marca: "Kevin", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["cj"] },
  { nombre: "Freedom", marca: "Kevin", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["cj"] },
  { nombre: "Absolute", marca: "Kevin", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["cj"] },
  { nombre: "Metal", marca: "Kevin", genero: "hombre", familia: "amaderada", intensidad: "intensa", sucursales: ["cj"] },
  { nombre: "Black", marca: "Kevin", genero: "hombre", familia: "amaderada", intensidad: "intensa", sucursales: ["cj"] },
  { nombre: "La Bomba", marca: "La Bomba", genero: "mujer", familia: "floral", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "Hera", marca: "Las Pepas", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["gb", "bg"] },
  { nombre: "Mito", marca: "Las Pepas", genero: "mujer", familia: "floral", intensidad: "intensa", sucursales: ["gb", "bg"] },
  { nombre: "Ninfa", marca: "Las Pepas", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb", "bg"] },
  { nombre: "Body Mist", marca: "Las Pepas", genero: "mujer", familia: "fresca", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Yara Candy / Rosa", marca: "Lattafa", genero: "mujer", familia: "oriental", intensidad: "ligera", sucursales: ["gb", "sl"] },
  { nombre: "I Am White - Rouge (Ana Abiyedh)", marca: "Lattafa", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["gb", "sl"] },
  { nombre: "Mayar", marca: "Lattafa", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "Khamrah / Khamrah Qahwa", marca: "Lattafa", genero: "unisex", familia: "oriental", intensidad: "intensa", sucursales: ["sl", "bg"] },
  { nombre: "Oud for Glory (Bade'e Al Oud)", marca: "Lattafa", genero: "unisex", familia: "oriental", intensidad: "intensa", sucursales: ["sl"] },
  { nombre: "Quizás, Quizás, Quizás", marca: "Loewe", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "Homme", marca: "Lolita Lempicka", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "Daisy", marca: "Marc Jacobs", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb", "sl"] },
  { nombre: "Loción Clásica", marca: "Mary Stuart", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "For Women / Woman Floral", marca: "Mercedes-Benz", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb", "sl", "bg"] },
  { nombre: "Floral Fantasy", marca: "Mercedes-Benz", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["sl", "bg"] },
  { nombre: "For Men", marca: "Mercedes-Benz", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["gb", "sl", "bg", "cj"] },
  { nombre: "Man", marca: "Mercedes-Benz", genero: "hombre", familia: "amaderada", intensidad: "intensa", sucursales: ["gb", "sl", "bg", "cj"] },
  { nombre: "Messi EDP", marca: "Messi Fragrances", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["gb", "sl"] },
  { nombre: "Narciso Rouge", marca: "Narciso Rodriguez", genero: "mujer", familia: "floral", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "Poudrée", marca: "Narciso Rodriguez", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "For Him Bleu Noir", marca: "Narciso Rodriguez", genero: "hombre", familia: "amaderada", intensidad: "intensa", sucursales: ["gb"] },
  { nombre: "Indigo (Join Our History)", marca: "NASA", genero: "unisex", familia: "fresca", intensidad: "ligera", sucursales: ["sl"] },
  { nombre: "So Bold", marca: "Pepe Jeans", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["sl"] },
  { nombre: "Amor", marca: "Paula Cahen D'Anvers", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["gb", "bg"] },
  { nombre: "Luz", marca: "Paula Cahen D'Anvers", genero: "mujer", familia: "fresca", intensidad: "ligera", sucursales: ["gb", "bg"] },
  { nombre: "Paula Clásica", marca: "Paula Cahen D'Anvers", genero: "mujer", familia: "floral", intensidad: "intensa", sucursales: ["bg"] },
  { nombre: "Alma", marca: "Paula Cahen D'Anvers", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "Amore", marca: "CaroCuore", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Prüne I / II", marca: "Prüne", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb"] },
  { nombre: "Icon", marca: "Prüne", genero: "mujer", familia: "oriental", intensidad: "intensa", sucursales: ["gb", "bg"] },
  { nombre: "Mío", marca: "Prüne", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["gb", "bg", "cj"] },
  { nombre: "Polo Blue", marca: "Ralph Lauren", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["gb", "sl"] },
  { nombre: "L'Aventure / Amber Oud", marca: "Al Haramain", genero: "unisex", familia: "oriental", intensidad: "intensa", sucursales: ["cj"] },
  { nombre: "Blue", marca: "Nautica", genero: "hombre", familia: "fresca", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "Valeria", marca: "Valeria Mazza", genero: "mujer", familia: "floral", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "Vibes EDP", marca: "Adidas", genero: "unisex", familia: "fresca", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "Energy Drive", marca: "Adidas", genero: "unisex", familia: "fresca", intensidad: "intensa", sucursales: [] },
  { nombre: "Velvet", marca: "Las Pepas", genero: "mujer", familia: "fresca", intensidad: "intensa", sucursales: [] },
  { nombre: "Rosas & Musk (Colección Privada)", marca: "Guillermina Valdés", genero: "mujer", familia: "amaderada", intensidad: "ligera", sucursales: [] },
  { nombre: "L'ilas & Narciso (Colección Privada)", marca: "Guillermina Valdés", genero: "unisex", familia: "floral", intensidad: "intensa", sucursales: [] },
  { nombre: "Khamrah Qahwa", marca: "Lattafa", genero: "hombre", familia: "oriental", intensidad: "ligera", sucursales: ["bg"] },
  { nombre: "The One for Men", marca: "Dolce & Gabbana", genero: "hombre", familia: "oriental", intensidad: "intensa", sucursales: ["sl"] },
];

export const FAMILIAS: Familia[] = ["fresca", "floral", "oriental", "amaderada"];

export const FAMILIA_COLOR: Record<Familia, string> = {
  fresca: "#00A720",
  floral: "#E0559D",
  oriental: "#C98A12",
  amaderada: "#7A5A3A",
};

export const GENERO_LABEL: Record<Genero, string> = {
  mujer: "Para mujer",
  hombre: "Para hombre",
  unisex: "Unisex",
};

export function familiaLabel(fam: Familia, genero: Genero): string {
  if (fam === "floral") {
    return genero === "hombre" ? "Aromática y cítrica" : "Floral";
  }
  const labels: Record<Exclude<Familia, "floral">, string> = {
    fresca: "Fresca y cítrica",
    oriental: "Oriental y ámbar",
    amaderada: "Amaderada",
  };
  return labels[fam];
}

export const FAMILIA_DESC: Record<Familia, string> = {
  fresca:
    "Cítricos, notas verdes y un toque acuático: perfumes livianos que se sienten limpios y energizantes.",
  floral:
    "Flores, pétalos y un fondo suave: perfumes delicados, cálidos y fáciles de llevar todos los días.",
  oriental:
    "Vainilla, ámbar, especias y maderas cálidas: perfumes envolventes, con mucha proyección y carácter.",
  amaderada:
    "Maderas, cuero y musgo: perfumes profundos y elegantes, ideales para dejar una firma personal.",
};

export const OCASION_LABEL: Record<OcasionKey, string> = {
  diario: "Uso diario",
  noche: "Salidas y eventos",
  todos: "Para todos los días",
  especial: "Ocasión especial",
};

export const TIP_APLICACION: Record<Familia, string> = {
  fresca:
    "Los perfumes frescos se evaporan más rápido: aplicá sobre piel hidratada y, si tenés un rato largo por delante, retocá en las muñecas a media tarde.",
  floral:
    "Las notas florales se lucen sobre piel limpia e hidratada: aplicá en el cuello y las muñecas, sin frotar, para no romper la fragancia.",
  oriental:
    "Los orientales y ambarados tienen mucha proyección: con 2 o 3 aplicaciones alcanza. Son ideales para la noche, donde el calor del cuerpo potencia las especias.",
  amaderada:
    "Las maderas se van revelando con las horas: no te alarmes si al principio se sienten distintas, dales unos minutos para asentarse en tu piel.",
};

export type QuizOption<T extends string> = {
  value: T;
  label: string;
  desc?: string;
  icon?: "spark" | "flor" | "luna" | "gema" | "mix";
};

export const QUESTIONS = [
  {
    key: "genero" as const,
    eyebrow: "Paso 1 de 4",
    title: "¿Para quién es el perfume?",
    sub: "Así te mostramos opciones que realmente tenemos en el local",
    options: [
      { value: "mujer", label: "Para mujer", icon: "flor" },
      { value: "hombre", label: "Para hombre", icon: "gema" },
      { value: "unisex", label: "No importa, quiero ver de todo", icon: "mix" },
    ] as QuizOption<Genero>[],
  },
  {
    key: "personalidad" as const,
    eyebrow: "Paso 2 de 4",
    title: "Tu personalidad en una palabra",
    sub: "Elegí la que más se parece a vos",
    // Se completa en runtime con PERSONALIDAD_OPTIONS según el género del paso 1.
    options: [] as QuizOption<PersonalidadKey>[],
  },
  {
    key: "ocasion" as const,
    eyebrow: "Paso 3 de 4",
    title: "¿Para qué ocasión lo buscás?",
    sub: "Esto nos ayuda a elegir la intensidad ideal",
    options: [
      { value: "diario", label: "Uso diario / oficina", desc: "Algo liviano que se sienta fresco todo el día" },
      { value: "noche", label: "Salidas de noche o eventos", desc: "Algo que se note y se recuerde" },
      { value: "todos", label: "Todos los días, mañana y noche", desc: "Un aroma versátil para cualquier momento" },
      { value: "especial", label: "Una ocasión especial", desc: "Cita, casamiento, cumpleaños" },
    ] as QuizOption<OcasionKey>[],
  },
  {
    key: "notas" as const,
    eyebrow: "Paso 4 de 4",
    title: "Una última pregunta",
    sub: "¿Qué notas te atraen más cuando olés un perfume?",
    options: [
      { value: "citricos", label: "Cítricos y frutas frescas", desc: "Pomelo, bergamota, mandarina" },
      { value: "blancas", label: "Flores blancas y notas dulces", desc: "Jazmín, azahar, vainilla suave" },
      { value: "ambar", label: "Vainilla, ámbar y especias cálidas", desc: "Canela, incienso, café" },
      { value: "maderas", label: "Maderas, cuero y notas terrosas", desc: "Sándalo, vetiver, musgo" },
    ] as QuizOption<NotasKey>[],
  },
];

// Mismo mapeo de valores (energica/romantica/misteriosa/segura -> familia),
// pero con copy adaptado según el género elegido en el paso 1, para que no
// suene orientado a mujeres cuando el que responde es varón.
export const PERSONALIDAD_OPTIONS: Record<Genero, QuizOption<PersonalidadKey>[]> = {
  mujer: [
    { value: "energica", label: "Enérgica y espontánea", desc: "Siempre activa, te gusta el aire libre", icon: "spark" },
    { value: "romantica", label: "Romántica y soñadora", desc: "Te encantan los detalles y lo delicado", icon: "flor" },
    { value: "misteriosa", label: "Misteriosa y magnética", desc: "Seducís sin esfuerzo, te gusta la noche", icon: "luna" },
    { value: "segura", label: "Segura y con carácter", desc: "Decidida, elegante, no pasás desapercibida", icon: "gema" },
  ],
  hombre: [
    { value: "energica", label: "Activo y deportivo", desc: "Siempre en movimiento, te gusta el aire libre", icon: "spark" },
    { value: "romantica", label: "Prolijo y clásico", desc: "Cuidás los detalles, te gusta lo elegante y sobrio", icon: "flor" },
    { value: "misteriosa", label: "Audaz y con onda", desc: "Te gusta destacar, sos de salir de noche", icon: "luna" },
    { value: "segura", label: "Seguro y con carácter", desc: "Decidido, con personalidad propia, no pasás desapercibido", icon: "gema" },
  ],
  unisex: [
    { value: "energica", label: "Enérgico/a y espontáneo/a", desc: "Siempre activo/a, te gusta el aire libre", icon: "spark" },
    { value: "romantica", label: "Sensible y detallista", desc: "Te importan los detalles, te gusta lo delicado", icon: "flor" },
    { value: "misteriosa", label: "Misterioso/a y magnético/a", desc: "Tenés tu propio magnetismo, te gusta la noche", icon: "luna" },
    { value: "segura", label: "Seguro/a y con carácter", desc: "Decidido/a, con personalidad propia", icon: "gema" },
  ],
};

export type PerfumeAnswers = {
  genero?: Genero;
  personalidad?: PersonalidadKey;
  ocasion?: OcasionKey;
  notas?: NotasKey;
};

function computeFamilia(answers: Required<PerfumeAnswers>): { principalFam: Familia; altFam: Familia } {
  const scores: Record<Familia, number> = { fresca: 0, floral: 0, oriental: 0, amaderada: 0 };
  const P: Record<PersonalidadKey, Familia> = {
    energica: "fresca",
    romantica: "floral",
    misteriosa: "oriental",
    segura: "amaderada",
  };
  scores[P[answers.personalidad]] += 3;

  const OC: Record<OcasionKey, Familia[]> = {
    diario: ["fresca", "floral"],
    noche: ["oriental", "amaderada"],
    todos: ["floral", "amaderada"],
    especial: ["oriental", "floral"],
  };
  OC[answers.ocasion].forEach((f) => (scores[f] += 1));

  const N: Record<NotasKey, Familia> = {
    citricos: "fresca",
    blancas: "floral",
    ambar: "oriental",
    maderas: "amaderada",
  };
  scores[N[answers.notas]] += 3;

  const order: Familia[] = ["fresca", "floral", "oriental", "amaderada"];
  const sorted = order
    .slice()
    .sort((a, b) => scores[b] - scores[a] || order.indexOf(a) - order.indexOf(b));
  return { principalFam: sorted[0], altFam: sorted[1] };
}

function computeIntensidad(answers: Required<PerfumeAnswers>): Intensidad {
  let score = 0;
  if (answers.ocasion === "noche" || answers.ocasion === "especial") score += 1;
  if (answers.ocasion === "diario") score -= 1;
  return score >= 1 ? "intensa" : "ligera";
}

function generoCompatible(item: PerfumeItem, genero: Genero): boolean {
  if (genero === "unisex") return true; // quien no eligió género ve de todo el catálogo
  return item.genero === genero || item.genero === "unisex";
}

function poolPara(genero: Genero, familia: Familia): PerfumeItem[] {
  return CATALOGO.filter((p) => p.familia === familia && generoCompatible(p, genero));
}

function elegirAlAzar(pool: PerfumeItem[]): PerfumeItem | null {
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export type PerfumeResultado = {
  genero: Genero;
  principalFam: Familia;
  altFam: Familia;
  intensidad: Intensidad;
  principal: PerfumeItem;
  alternativa: PerfumeItem;
  otrasOpciones: number;
  tip: string;
};

export function getResultado(answers: Required<PerfumeAnswers>): PerfumeResultado {
  const genero = answers.genero;
  const { principalFam, altFam } = computeFamilia(answers);
  const intensidad = computeIntensidad(answers);

  // Pool de la familia principal para ese género; si por algún cruce quedara
  // vacío (no debería, todas las celdas género×familia tienen al menos 1
  // producto), se cae a la familia alternativa antes de fallar.
  let familiaUsada = principalFam;
  let pool = poolPara(genero, familiaUsada);
  if (pool.length === 0) {
    familiaUsada = altFam;
    pool = poolPara(genero, familiaUsada);
  }

  const preferidoPorIntensidad = pool.filter((p) => p.intensidad === intensidad);
  const principal = elegirAlAzar(preferidoPorIntensidad.length ? preferidoPorIntensidad : pool)!;

  const restoPool = pool.filter((p) => p.nombre !== principal.nombre || p.marca !== principal.marca);
  const otraIntensidad = restoPool.filter((p) => p.intensidad !== principal.intensidad);
  const alternativa = elegirAlAzar(otraIntensidad.length ? otraIntensidad : restoPool) ?? principal;

  const otrasOpciones = Math.max(
    0,
    pool.length -
      (alternativa.nombre === principal.nombre && alternativa.marca === principal.marca ? 1 : 2)
  );

  return {
    genero,
    principalFam: familiaUsada,
    altFam,
    intensidad,
    principal,
    alternativa,
    otrasOpciones,
    tip: TIP_APLICACION[familiaUsada],
  };
}

// Mapeo confirmado con Santi (2026-09-29): bg (Belgrano) = Centro,
// gb (Grand Bourg) = Alto La Loma, sl = San Lorenzo, cj = Ciudad Judicial.
// El nombre a mostrar sale siempre de branches.ts (una sola fuente de verdad).
const STOCK_CODE_TO_SLUG: Record<StockCode, string> = {
  bg: "centro",
  sl: "san-lorenzo",
  cj: "ciudad-judicial",
  gb: "alto-la-loma",
};

// Orden de las chips de disponibilidad, igual al orden de sucursales del sitio.
export const ORDEN_SUCURSALES: StockCode[] = ["bg", "sl", "cj", "gb"];

export function stockCodeToSlug(code: StockCode): string {
  return STOCK_CODE_TO_SLUG[code];
}
