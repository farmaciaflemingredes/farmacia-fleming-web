import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function DermaQuizTeaser() {
  return (
    <section className="px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="card-radius mx-auto flex max-w-6xl flex-col items-center gap-5 border border-linea bg-verde-pale/50 p-6 text-center sm:flex-row sm:justify-between sm:p-8 sm:text-left">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blanco text-verde-deep">
            <Sparkles size={22} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">
              ¿No sabés qué producto elegir?
            </h2>
            <p className="mt-1 text-sm text-ink/70">
              Hacé nuestro quiz de 1 minuto y descubrí tu rutina ideal.
            </p>
          </div>
        </div>
        <Link
          href="/rutina-ideal"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-verde px-6 text-sm font-semibold text-blanco transition-colors hover:bg-verde-deep"
        >
          Empezar el quiz
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
