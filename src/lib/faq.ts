import type { Branch } from "./branches";

export type FaqItem = {
  question: string;
  answer: string;
};

// FAQ general del home. Borrador armado solo con datos ya verificados del
// sitio (horarios, envío, WhatsApp, marcas, sucursales) — sin afirmaciones
// sobre obras sociales, recetas o medios de pago que no están confirmadas.
// A revisar/ajustar por Farmacia Fleming antes de darlo por definitivo.
export const homeFaqs: FaqItem[] = [
  {
    question: "¿Farmacia Fleming tiene envío a domicilio?",
    answer:
      "Sí, todas nuestras sucursales hacen envío a domicilio sin cargo. Pedís directo por WhatsApp eligiendo la sucursal más cercana.",
  },
  {
    question: "¿Hay alguna sucursal de Fleming abierta las 24 horas?",
    answer:
      "Sí, la sucursal Centro (Av. Belgrano 674, microcentro de Salta) atiende las 24 horas, los 365 días del año.",
  },
  {
    question: "¿Cuántas sucursales tiene Farmacia Fleming en Salta?",
    answer:
      "Tenemos 5 sucursales: Centro, San Lorenzo, Ciudad Judicial, Alto La Loma y San Luis, todas en Salta Capital y Villa San Lorenzo.",
  },
  {
    question: "¿Cómo hago un pedido por WhatsApp?",
    answer:
      "Elegí tu sucursal más cercana desde la sección Sucursales y escribinos directo por WhatsApp: te confirmamos disponibilidad y coordinamos el envío o el retiro en el local.",
  },
  {
    question: "¿Cómo sé si mi sucursal más cercana está abierta ahora?",
    answer:
      "En la sección Sucursales, cada farmacia muestra en vivo si está abierta o cerrada, y a qué hora abre o cierra.",
  },
  {
    question: "¿Qué marcas de dermocosmética puedo encontrar en Fleming?",
    answer:
      "Trabajamos con marcas como CeraVe, La Roche-Posay, Eucerin, ISDIN, Avène, Bioderma, Vichy, Nivea, Cetaphil y Neutrogena, entre otras. Podés ver el catálogo completo en la sección Marcas.",
  },
  {
    question: "¿Puedo saber qué producto usar según mi tipo de piel?",
    answer:
      "Sí, podés hacer nuestro quiz de rutina ideal: respondés 3 preguntas rápidas y te sugerimos qué línea dermocosmética puede servirte, disponible en tu Farmacia Fleming.",
  },
];

// FAQ corta por sucursal, para /sucursales/[slug]. El horario cambia según
// la sucursal, así que cada página tiene su propio set + su propio schema.
export function branchFaqs(branch: Branch): FaqItem[] {
  const horario = branch.is24h
    ? "Está abierta las 24 horas, los 365 días del año."
    : `Abre todos los días de ${branch.opensAt} a ${branch.closesAt}.`;

  return [
    {
      question: `¿A qué hora abre y cierra Farmacia Fleming ${branch.name}?`,
      answer: horario,
    },
    {
      question: `¿Farmacia Fleming ${branch.name} tiene envío a domicilio?`,
      answer:
        "Sí, esta sucursal hace envío a domicilio sin cargo. Escribinos por WhatsApp para coordinarlo.",
    },
    {
      question: `¿Cómo pido por WhatsApp en la sucursal ${branch.name}?`,
      answer: `Escribinos al ${branch.whatsappDisplay} o tocá el botón de WhatsApp de esta página: te confirmamos disponibilidad y coordinamos el envío o el retiro.`,
    },
  ];
}
