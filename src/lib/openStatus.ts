import type { Branch } from "./branches";

export type OpenStatus = {
  isOpen: boolean;
  label: string;
  detail: string;
};

const ARGENTINA_TZ = "America/Argentina/Salta";

function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// Argentina no tiene horario de verano (siempre GMT-3), así que esto da la
// hora de Salta sin importar en qué huso horario esté el navegador de quien
// visita el sitio (turistas, gente afuera del país, relojes mal
// configurados, etc.) — el horario de las farmacias es siempre local a Salta.
function minutesInArgentina(now: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ARGENTINA_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0") % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return hour * 60 + minute;
}

/**
 * Calcula si una sucursal está abierta ahora mismo, según sus horarios
 * (mismo horario los 7 días, verificado en Google Business Profile),
 * siempre en base a la hora de Salta, Argentina — no la del dispositivo de
 * quien visita el sitio.
 * Debe llamarse siempre con la hora real (nunca en build time: el sitio es
 * estático, así que este cálculo tiene que hacerse en el cliente para no
 * quedar "congelado" en la hora del build).
 */
export function getOpenStatus(
  branch: Branch,
  now: Date = new Date()
): OpenStatus {
  if (branch.is24h) {
    return {
      isOpen: true,
      label: "Abierto ahora",
      detail: "Abierta las 24 horas",
    };
  }

  const minutesNow = minutesInArgentina(now);
  const open = toMinutes(branch.opensAt);
  const closeRaw = toMinutes(branch.closesAt);
  const close = branch.closesNextDay ? closeRaw + 24 * 60 : closeRaw;

  const isOpen = branch.closesNextDay
    ? minutesNow >= open || minutesNow < close - 24 * 60
    : minutesNow >= open && minutesNow < close;

  if (isOpen) {
    return {
      isOpen: true,
      label: "Abierto ahora",
      detail: `Cierra a las ${branch.closesAt}`,
    };
  }

  return {
    isOpen: false,
    label: "Cerrado",
    detail: `Abre a las ${branch.opensAt}`,
  };
}
