"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/faq";
import JsonLd from "./JsonLd";

export default function FAQAccordion({
  items,
  idPrefix,
}: {
  items: FaqItem[];
  idPrefix: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          const open = openIndex === i;
          const panelId = `${idPrefix}-panel-${i}`;
          const buttonId = `${idPrefix}-button-${i}`;
          return (
            <div
              key={item.question}
              className="card-radius border border-linea bg-blanco"
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex min-h-12 w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-ink sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 text-verde-deep transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className="px-5 pb-4 text-sm leading-relaxed text-ink/70"
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
