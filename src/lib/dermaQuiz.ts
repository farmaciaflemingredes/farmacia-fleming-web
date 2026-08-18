// Lógica del "Derma Quiz" — portada 1:1 desde
// https://dermaquizz-farmaciafleming.netlify.app/ (mismo árbol de decisión,
// mismos productos y tips) para integrarla nativamente al sitio principal.

export type PielKey = "seca" | "grasa" | "mixta" | "sensible";
export type ObjetivoKey =
  | "hidratacion"
  | "acne"
  | "manchas"
  | "arrugas"
  | "rosacea";
export type EdadKey = "joven" | "adulto" | "maduro";

export type QuizOption<T extends string> = {
  value: T;
  label: string;
  desc?: string;
  icon?: "drop" | "shine" | "mix" | "shield";
};

export const QUESTIONS = [
  {
    key: "piel" as const,
    eyebrow: "Paso 1 de 3",
    title: "Empecemos por tu piel",
    sub: "¿Cómo la describirías en el día a día?",
    options: [
      { value: "seca", label: "Seca", desc: "Se siente tirante, a veces se pela", icon: "drop" },
      { value: "grasa", label: "Grasa", desc: "Brillo y poros visibles, sobre todo en frente y nariz", icon: "shine" },
      { value: "mixta", label: "Mixta", desc: "Grasa en la zona T, normal o seca en las mejillas", icon: "mix" },
      { value: "sensible", label: "Sensible", desc: "Se enrojece o pica con facilidad", icon: "shield" },
    ] as QuizOption<PielKey>[],
  },
  {
    key: "objetivo" as const,
    eyebrow: "Paso 2 de 3",
    title: "¿Cuál es tu prioridad hoy?",
    sub: "Elegí lo que más te preocupa en este momento",
    options: [
      { value: "hidratacion", label: "Hidratación", desc: "Recuperar confort, elasticidad y luminosidad" },
      { value: "acne", label: "Acné e imperfecciones", desc: "Granitos, puntos negros, brillo localizado" },
      { value: "manchas", label: "Manchas y luminosidad", desc: "Tono más parejo y uniforme" },
      { value: "arrugas", label: "Líneas finas y firmeza", desc: "Prevenir o tratar signos del tiempo" },
      { value: "rosacea", label: "Rojeces y sensibilidad", desc: "Calmar la piel y fortalecer la barrera" },
    ] as QuizOption<ObjetivoKey>[],
  },
  {
    key: "edad" as const,
    eyebrow: "Paso 3 de 3",
    title: "Una última pregunta",
    sub: "¿En qué rango de edad estás?",
    options: [
      { value: "joven", label: "Menos de 25" },
      { value: "adulto", label: "Entre 25 y 40" },
      { value: "maduro", label: "Más de 40" },
    ] as QuizOption<EdadKey>[],
  },
];

export const PIEL_LABEL: Record<PielKey, string> = {
  seca: "Piel seca",
  grasa: "Piel grasa",
  mixta: "Piel mixta",
  sensible: "Piel sensible",
};

export const OBJ_LABEL: Record<ObjetivoKey, string> = {
  hidratacion: "Hidratación",
  acne: "Anti-imperfecciones",
  manchas: "Manchas y luz",
  arrugas: "Firmeza",
  rosacea: "Calma y barrera",
};

// Mapea la marca recomendada al slug real de /src/lib/brands.ts (para poder
// mostrar el logo oficial). "Caviahue" no forma parte del catálogo de marcas
// verificado de Fleming, así que esas recomendaciones quedan solo en texto.
export const MARCA_SLUG: Record<string, string | undefined> = {
  cerave: "cerave",
  nivea: "nivea",
  lrp: "la-roche-posay",
  eucerin: "eucerin",
  isdin: "isdin",
  avene: "avene",
  bioderma: "bioderma",
  dermaglos: "dermaglos",
  caviahue: undefined,
  valuge: "valuge",
  garnier: "garnier",
  cetaphil: "cetaphil",
  neutrogena: "neutrogena",
  ponds: "ponds",
  vichy: "vichy",
  bagovit: "bagovit",
  aveeno: "aveeno",
};

type Recomendacion = {
  marcaKey: string;
  marcaLabel: string;
  productos?: string[];
  producto?: string;
};

export type QuizResultado = {
  principal: Recomendacion;
  alternativa: Recomendacion;
  tip: string;
};

export function getResultado(
  piel: PielKey,
  objetivo: ObjetivoKey,
  edad: EdadKey
): QuizResultado {
  let principal: Recomendacion;
  let alternativa: Recomendacion;
  let tip: string;
  const grupo = piel === "seca" || piel === "sensible" ? "sec_sens" : "gra_mix";

  switch (objetivo) {
    case "hidratacion":
      if (piel === "seca") {
        principal = { marcaKey: "cerave", marcaLabel: "CeraVe", productos: ["Crema Hidratante CeraVe", "Limpiador Hidratante CeraVe"] };
        alternativa = { marcaKey: "caviahue", marcaLabel: "Caviahue", producto: "Crema Facial Humectante con Agua Termal" };
        tip = "Con piel seca, priorizá texturas en crema rica con ceramidas: ayudan a reparar la barrera cutánea y retener la humedad.";
      } else if (piel === "sensible") {
        principal = { marcaKey: "cetaphil", marcaLabel: "Cetaphil", productos: ["Loción Hidratante Cetaphil", "Limpiador Suave Cetaphil (Gentle Skin Cleanser)"] };
        alternativa = { marcaKey: "aveeno", marcaLabel: "Aveeno", producto: "Crema Hidratante Facial Piel Seca y Sensible" };
        tip = "En piel sensible, menos ingredientes suele ser más: elegí fórmulas mínimas, sin perfume ni alcohol.";
      } else if (piel === "grasa") {
        principal = { marcaKey: "neutrogena", marcaLabel: "Neutrogena", productos: ["Hydro Boost Water Gel", "Hydro Boost Sérum Concentrado"] };
        alternativa = { marcaKey: "garnier", marcaLabel: "Garnier", producto: "Gel Hidratante Ultra Ligero Vitamina C" };
        tip = "Hidratar la piel grasa no es opcional: un gel oil-free con ácido hialurónico evita el efecto rebote de mayor producción de grasa.";
      } else {
        principal = { marcaKey: "vichy", marcaLabel: "Vichy", productos: ["Mineral 89 (sérum fortificante)", "Aqualia Thermal Ligera"] };
        alternativa = { marcaKey: "nivea", marcaLabel: "Nivea", producto: "Crema Hidratante Nivea Soft" };
        tip = "En piel mixta, podés alternar: algo más liviano en la zona T y una crema más rica en las mejillas si lo necesitás.";
      }
      break;

    case "acne":
      if (piel === "seca") {
        principal = { marcaKey: "bioderma", marcaLabel: "Bioderma", productos: ["Sébium Hydra Crema", "Sébium Gel Moussant"] };
        alternativa = { marcaKey: "isdin", marcaLabel: "ISDIN", producto: "Acniben Tratamiento Anti-Imperfecciones" };
        tip = "Si tenés acné y piel seca a la vez, cuidado con productos muy resecantes: tratá las imperfecciones sin descuidar la hidratación.";
      } else if (piel === "sensible") {
        principal = { marcaKey: "avene", marcaLabel: "Avène", productos: ["Cleanance Comedomed", "Cleanance Gel Limpiador"] };
        alternativa = { marcaKey: "bagovit", marcaLabel: "Bagóvit", producto: "Línea Facial Anti-Acné Bagóvit" };
        tip = "Empezá con una frecuencia baja (cada 2-3 días) y subí de a poco para que la piel sensible tolere bien el tratamiento.";
      } else if (piel === "grasa") {
        principal = { marcaKey: "lrp", marcaLabel: "La Roche-Posay", productos: ["Effaclar Duo(+) Unifiant", "Effaclar Gel Espumoso"] };
        alternativa = { marcaKey: "dermaglos", marcaLabel: "Dermaglós", producto: "Crema Gel Hidratante Control Acné" };
        tip = "Usá el limpiador mañana y noche, y el tratamiento puntual solo donde hay imperfecciones, para no resecar el resto del rostro.";
      } else {
        principal = { marcaKey: "dermaglos", marcaLabel: "Dermaglós", productos: ["Crema Gel Hidratante Control Acné", "Espuma Limpiadora Control Acné"] };
        alternativa = { marcaKey: "valuge", marcaLabel: "Valuge", producto: "Ecelón GS Espuma Limpiadora Facial" };
        tip = "El ácido salicílico ayuda a destapar los poros sin ser tan agresivo como otros activos: ideal para piel mixta.";
      }
      break;

    case "manchas":
      if (piel === "seca") {
        principal = { marcaKey: "eucerin", marcaLabel: "Eucerin", productos: ["Anti-Pigment Sérum", "Anti-Pigment Crema FPS30"] };
        alternativa = { marcaKey: "garnier", marcaLabel: "Garnier", producto: "Crema FPS30 Vitamina C" };
        tip = "El antimanchas funciona mejor de noche; de día, el protector solar es el paso que realmente evita que la mancha vuelva.";
      } else if (piel === "sensible") {
        principal = { marcaKey: "bioderma", marcaLabel: "Bioderma", productos: ["Pigmentbio Crema Día", "Pigmentbio Sensitive Areas"] };
        alternativa = { marcaKey: "caviahue", marcaLabel: "Caviahue", producto: "Línea Antimanchas Caviahue" };
        tip = "En piel sensible, elegí antimanchas sin ácidos fuertes: fórmulas pensadas para zonas sensibles se toleran mejor.";
      } else if (piel === "grasa") {
        principal = { marcaKey: "isdin", marcaLabel: "ISDIN", productos: ["Isdinceutics Flavo-C Ultraglican", "Fotoprotector Fusion Water SPF50+"] };
        alternativa = { marcaKey: "valuge", marcaLabel: "Valuge", producto: "Esfumel Plus Crema Despigmentante" };
        tip = "Las texturas en agua o fluido evitan que el tratamiento antimanchas se sienta pesado sobre piel grasa.";
      } else {
        principal = { marcaKey: "garnier", marcaLabel: "Garnier", productos: ["Sérum Vitamina C Noche", "Gel Hidratante Vitamina C"] };
        alternativa = { marcaKey: "valuge", marcaLabel: "Valuge", producto: "Valublock Protector Solar" };
        tip = "Sin protector solar a diario, ningún antimanchas da el resultado esperado: es el paso no negociable.";
      }
      break;

    case "arrugas":
      if (edad === "joven") {
        if (grupo === "sec_sens") {
          principal = { marcaKey: "garnier", marcaLabel: "Garnier", productos: ["Sérum Vitamina C Noche SkinActive", "Crema FPS30 Vitamina C"] };
          alternativa = { marcaKey: "vichy", marcaLabel: "Vichy", producto: "Mineral 89" };
        } else {
          principal = { marcaKey: "nivea", marcaLabel: "Nivea", productos: ["Sérum Facial Q10 Antiarrugas", "Crema Q10 Energy Día FPS15"] };
          alternativa = { marcaKey: "caviahue", marcaLabel: "Caviahue", producto: "Línea Antiage Caviahue" };
        }
        tip = "Antes de los 30, el objetivo es prevenir: antioxidantes como la vitamina C y el protector solar diario son la base.";
      } else if (edad === "adulto") {
        if (grupo === "sec_sens") {
          principal = { marcaKey: "ponds", marcaLabel: "Pond's", productos: ["Rejuveness Crema Día", "Rejuveness Crema Noche"] };
          alternativa = { marcaKey: "bioderma", marcaLabel: "Bioderma", producto: "Hydrabio Hyalu+ Sérum" };
        } else {
          principal = { marcaKey: "eucerin", marcaLabel: "Eucerin", productos: ["Hyaluron-Filler Gel-Crème", "Hyaluron-Filler Sérum"] };
          alternativa = { marcaKey: "neutrogena", marcaLabel: "Neutrogena", producto: "Rapid Wrinkle Repair Antiarrugas Día" };
        }
        tip = "Entre los 25 y 40 es buen momento para sumar tu primer activo (retinol o ácido hialurónico concentrado) de forma gradual.";
      } else {
        if (grupo === "sec_sens") {
          principal = { marcaKey: "bagovit", marcaLabel: "Bagóvit", productos: ["Pro Estructura Crema Día", "Pro Estructura Crema Noche"] };
          alternativa = { marcaKey: "lrp", marcaLabel: "La Roche-Posay", producto: "Hyalu B5 Sérum Reparador" };
        } else {
          principal = { marcaKey: "lrp", marcaLabel: "La Roche-Posay", productos: ["Redermic [R] Anti-Edad", "Hyalu B5 Sérum Reparador"] };
          alternativa = { marcaKey: "vichy", marcaLabel: "Vichy", producto: "Neovadiol" };
        }
        tip = "Después de los 40, combinar hidratación profunda con un activo reparador de noche potencia los resultados.";
      }
      break;

    case "rosacea":
      if (piel === "seca") {
        principal = { marcaKey: "aveeno", marcaLabel: "Aveeno", productos: ["Crema Hidratante Facial Piel Seca y Sensible", "Avena, manzanilla y alantoína"] };
        alternativa = { marcaKey: "bioderma", marcaLabel: "Bioderma", producto: "Atoderm Gel Moussant" };
        tip = "La avena y la manzanilla calman sin agredir: ideales para piel seca con tendencia a irritarse.";
      } else if (piel === "sensible") {
        principal = { marcaKey: "avene", marcaLabel: "Avène", productos: ["Tolérance Extrême", "Agua Termal Avène"] };
        alternativa = { marcaKey: "cetaphil", marcaLabel: "Cetaphil", producto: "Pro Restoraderm Loción Calmante" };
        tip = "Evitá exfoliantes y agua muy caliente: la piel sensible responde mejor a rutinas mínimas y constantes.";
      } else if (piel === "grasa") {
        principal = { marcaKey: "vichy", marcaLabel: "Vichy", productos: ["Eau Thermale Spray Calmante", "Aqualia Thermal Ligera"] };
        alternativa = { marcaKey: "bagovit", marcaLabel: "Bagóvit", producto: "Línea Rosácea Bagóvit" };
        tip = "Un agua termal calmante antes de la crema ayuda a bajar la reactividad sin sumar grasitud.";
      } else {
        principal = { marcaKey: "lrp", marcaLabel: "La Roche-Posay", productos: ["Rosaliac AR Intense", "Toleriane Dermo-Limpiador"] };
        alternativa = { marcaKey: "valuge", marcaLabel: "Valuge", producto: "Línea Acné y Rosácea Valuge" };
        tip = "Las rojeces mejoran con constancia: lo importante es sostener la rutina calmante todos los días, no solo cuando hay brote.";
      }
      break;

    default:
      throw new Error(`Objetivo no reconocido: ${objetivo}`);
  }

  return { principal, alternativa, tip };
}
