"use client";

import { useEffect, useState } from "react";
import type { Branch } from "@/lib/branches";
import { getOpenStatus, type OpenStatus } from "@/lib/openStatus";

/**
 * Estado de apertura en vivo. Devuelve null hasta que se monta en el
 * cliente (el sitio es estático, así que no podemos "hornear" la hora
 * actual en el HTML del build) y se recalcula cada minuto.
 */
export function useOpenStatus(branch: Branch): OpenStatus | null {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(branch));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [branch]);

  return status;
}

export default function OpenStatusBadge({
  branch,
  className = "",
}: {
  branch: Branch;
  className?: string;
}) {
  const status = useOpenStatus(branch);

  if (!status) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 text-xs font-bold text-gris ${className}`}
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gris/40" />
        Horario
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
        status.isOpen
          ? "bg-verde-pale text-verde-deep"
          : "bg-rojo-deep/10 text-rojo-deep"
      } ${className}`}
      role="status"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status.isOpen ? "bg-verde" : "bg-rojo-deep"
        }`}
        aria-hidden="true"
      />
      {status.label}
    </span>
  );
}
