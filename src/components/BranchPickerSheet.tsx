"use client";

import { useEffect, useRef } from "react";
import { X, MapPin, MessageCircle } from "lucide-react";
import {
  branches,
  mapsDirectionsUrl,
  whatsappUrl,
  type Branch,
} from "@/lib/branches";

export type PickerMode = "whatsapp" | "maps";

export default function BranchPickerSheet({
  mode,
  open,
  onClose,
}: {
  mode: PickerMode;
  open: boolean;
  onClose: () => void;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const title =
    mode === "whatsapp"
      ? "¿Con qué sucursal querés hablar?"
      : "¿A qué sucursal querés ir?";

  function linkFor(b: Branch) {
    return mode === "whatsapp" ? whatsappUrl(b) : mapsDirectionsUrl(b);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 backdrop-blur-[2px] sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        className="card-radius w-full max-w-md rounded-b-none bg-blanco p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-brand-md sm:rounded-b-[20px] sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-heading text-base font-semibold text-ink">
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-9 w-9 place-items-center rounded-full text-gris hover:bg-bg"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
          {branches.map((b) => (
            <li key={b.slug}>
              <a
                href={linkFor(b)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl border border-linea px-4 py-3.5 transition-colors hover:border-verde hover:bg-verde-pale"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-verde-pale text-verde-deep">
                  {mode === "whatsapp" ? (
                    <MessageCircle size={18} aria-hidden="true" />
                  ) : (
                    <MapPin size={18} aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {b.name}
                  </span>
                  <span className="block truncate text-xs text-gris">
                    {b.zone}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
