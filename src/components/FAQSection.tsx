import { homeFaqs } from "@/lib/faq";
import FAQAccordion from "./FAQAccordion";

export default function FAQSection() {
  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 bg-bg py-14 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id="faq-heading"
          className="font-heading text-2xl font-semibold text-ink sm:text-3xl"
        >
          Preguntas frecuentes
        </h2>
        <p className="mt-2.5 text-base text-gris">
          Lo que más nos consultan sobre horarios, envíos y pedidos por
          WhatsApp.
        </p>
        <div className="mt-6">
          <FAQAccordion items={homeFaqs} idPrefix="home-faq" />
        </div>
      </div>
    </section>
  );
}
