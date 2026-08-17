import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { branches } from "@/lib/branches";
import { site } from "@/lib/site";
import Logo from "./Logo";
import { InstagramIcon, FacebookIcon } from "./icons/SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-linea bg-blanco">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gris">
            Farmacia en Salta con sucursales en Centro, San Lorenzo, Ciudad
            Judicial, Alto La Loma y San Luis. Siempre cerca tuyo.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Farmacia Fleming"
              className="grid h-9 w-9 place-items-center rounded-full border border-linea text-ink transition-colors hover:border-verde hover:text-verde-deep"
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Farmacia Fleming"
              className="grid h-9 w-9 place-items-center rounded-full border border-linea text-ink transition-colors hover:border-verde hover:text-verde-deep"
            >
              <FacebookIcon size={17} />
            </a>
          </div>
        </div>

        <nav aria-label="Sucursales">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
            Sucursales
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-gris">
            {branches.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/sucursales/${b.slug}`}
                  className="hover:text-verde-deep"
                >
                  Farmacia Fleming {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Enlaces">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
            Enlaces
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-gris">
            <li>
              <Link href="/marcas" className="hover:text-verde-deep">
                Marcas
              </Link>
            </li>
            <li>
              <Link href="/#sobre-nosotros" className="hover:text-verde-deep">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/politica-de-privacidad"
                className="hover:text-verde-deep"
              >
                Política de privacidad
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
            Escribinos
          </h2>
          <p className="mt-4 text-sm text-gris">
            Elegí tu sucursal más cercana y consultanos por WhatsApp.
          </p>
          <Link
            href="/sucursales"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-verde px-4 py-2.5 text-sm font-bold text-blanco transition-colors hover:bg-verde-deep"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Ver sucursales
          </Link>
        </div>
      </div>

      <div className="border-t border-linea">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-gris sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} Farmacia Fleming — Salta, Argentina.
          </p>
          <p>Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
