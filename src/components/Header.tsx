"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import BranchPickerSheet from "./BranchPickerSheet";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sucursales", label: "Sucursales" },
  { href: "/marcas", label: "Marcas" },
  { href: "/#sobre-nosotros", label: "Sobre nosotros" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-linea/80 bg-blanco/90 backdrop-blur supports-[backdrop-filter]:bg-blanco/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.95rem] font-medium text-ink/80 transition-colors hover:text-verde-deep"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => setWhatsappOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-verde px-4 text-sm font-semibold text-blanco shadow-sm transition-colors hover:bg-verde-deep"
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
          </button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-ink md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-linea bg-blanco px-4 pb-6 pt-2 md:hidden"
        >
          <nav
            className="flex flex-col"
            aria-label="Navegación principal móvil"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-linea/70 py-3.5 text-base font-semibold text-ink last:border-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setWhatsappOpen(true);
            }}
            className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-verde px-4 text-base font-semibold text-blanco shadow-sm"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Escribinos por WhatsApp
          </button>
        </div>
      )}

      <BranchPickerSheet
        mode="whatsapp"
        open={whatsappOpen}
        onClose={() => setWhatsappOpen(false)}
      />
    </header>
  );
}
