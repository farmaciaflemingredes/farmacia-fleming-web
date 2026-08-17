import type { Branch } from "./branches";

export type OpenStatus = {
  isOpen: boolean;
  label: string;
  detail: string;
};

function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Calcula si una sucursal está abierta ahora mismo, según sus horarios
 * (mismo horario los 7 días, verificado en Google Business Profile).
 * Debe llamarse siempre con la hora real del navegador del visitante
 * (nunca en build time: el sitio es estático, así que este cálculo tiene
 * que hacerse en el cliente para no quedar "congelado" en la hora del build).
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

  const minutesNow = now.getHours() * 60 + now.getMinutes();
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
