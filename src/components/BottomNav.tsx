"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, MessageCircle, Navigation } from "lucide-react";
import BranchPickerSheet, { type PickerMode } from "./BranchPickerSheet";

export default function BottomNav() {
  const [sheet, setSheet] = useState<PickerMode | null>(null);

  return (
    <>
      <nav
        aria-label="Accesos rápidos"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-linea bg-blanco/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-blanco/90 sm:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-3 items-stretch gap-1.5 px-2.5 py-2">
          <Link
            href="/sucursales"
            className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-ink transition-colors active:bg-bg"
          >
            <MapPin size={20} aria-hidden="true" />
            <span className="text-[0.68rem] font-medium leading-none">
              Sucursales
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setSheet("whatsapp")}
            className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl bg-verde px-1 py-1.5 text-blanco shadow-sm transition-transform active:scale-95"
          >
            <MessageCircle size={22} aria-hidden="true" />
            <span className="text-[0.68rem] font-semibold leading-none">
              WhatsApp
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSheet("maps")}
            className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-ink transition-colors active:bg-bg"
          >
            <Navigation size={20} aria-hidden="true" />
            <span className="text-[0.68rem] font-medium leading-none">
              Cómo llegar
            </span>
          </button>
        </div>
      </nav>

      <BranchPickerSheet
        mode={sheet ?? "whatsapp"}
        open={sheet !== null}
        onClose={() => setSheet(null)}
      />
    </>
  );
}
