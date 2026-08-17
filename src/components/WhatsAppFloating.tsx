"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import BranchPickerSheet from "./BranchPickerSheet";

// Solo desktop: en mobile el acceso a WhatsApp vive en la barra inferior fija.
export default function WhatsAppFloating() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-verde text-blanco shadow-brand-md transition-transform hover:scale-105 active:scale-95"
        aria-label="Escribir por WhatsApp a una sucursal de Farmacia Fleming"
      >
        <MessageCircle size={26} />
      </button>

      <BranchPickerSheet
        mode="whatsapp"
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
