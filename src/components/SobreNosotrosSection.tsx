import { Truck, Users, MapPinned, Clock3 } from "lucide-react";

const puntos = [
  {
    icon: MapPinned,
    title: "Cerca tuyo",
    text: "Cinco sucursales distribuidas en Salta Capital y San Lorenzo, pensadas para que siempre tengas una farmacia Fleming a mano.",
  },
  {
    icon: Clock3,
    title: "Horarios extendidos",
    text: "Nuestra sucursal Centro atiende las 24 horas, los 365 días del año. El resto sostiene horarios amplios para acompañarte.",
  },
  {
    icon: Truck,
    title: "Envío gratis",
    text: "Pedís por WhatsApp y te lo llevamos a domicilio sin cargo, desde cualquiera de nuestras sucursales.",
  },
  {
    icon: Users,
    title: "Atención personalizada",
    text: "Un equipo que conoce a sus clientes por nombre y responde rápido, ya sea en el mostrador o por WhatsApp.",
  },
];

export default function SobreNosotrosSection() {
  return (
    <section
      id="sobre-nosotros"
      aria-labelledby="sobre-nosotros-heading"
      className="scroll-mt-20 bg-blanco"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <h2
            id="sobre-nosotros-heading"
            className="font-heading text-2xl font-semibold text-ink sm:text-3xl"
          >
            Sobre Farmacia Fleming
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            Somos una farmacia salteña que crece sucursal a sucursal sin
            perder lo que nos distingue: atención cercana y personalizada.
            Acompañamos a nuestros vecinos en el cuidado diario de su salud y
            su bienestar, con el mismo compromiso desde el primer mostrador
            hasta el último local que abrimos.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {puntos.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="card-radius border border-linea bg-bg/60 p-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-verde-pale text-verde-deep">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-base font-medium text-ink">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gris">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
