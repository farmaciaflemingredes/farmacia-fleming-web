"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Flower2,
  Moon,
  Gem,
  Blend,
  Clock,
  MapPin,
  CheckCircle2,
  MessageCircle,
  RotateCcw,
  Droplet,
} from "lucide-react";
import {
  QUESTIONS,
  PERSONALIDAD_OPTIONS,
  GENERO_LABEL,
  OCASION_LABEL,
  FAMILIA_DESC,
  FAMILIAS,
  FAMILIA_COLOR,
  ORDEN_SUCURSALES,
  stockCodeToSlug,
  familiaLabel,
  getResultado,
  type Genero,
  type PerfumeAnswers,
  type PerfumeItem,
} from "@/lib/perfumeQuiz";
import { getBranchBySlug } from "@/lib/branches";
import BranchPickerSheet from "./BranchPickerSheet";

const OPTION_ICON = {
  spark: Sparkles,
  flor: Flower2,
  luna: Moon,
  gema: Gem,
  mix: Blend,
} as const;

type Stage = "intro" | "quiz" | "result";

function getQuestionForStep(step: number, genero?: Genero) {
  const q = QUESTIONS[step];
  if (q.key === "personalidad") {
    return { ...q, options: PERSONALIDAD_OPTIONS[genero ?? "unisex"] };
  }
  return q;
}

export default function PerfumeQuiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PerfumeAnswers>({});
  const [ticket] = useState(() => Math.floor(1000 + Math.random() * 8999));

  function selectOption(value: string) {
    const key = QUESTIONS[step].key;
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setTimeout(() => {
      if (step === QUESTIONS.length - 1) {
        setStage("result");
      } else {
        setStep((s) => s + 1);
      }
    }, 220);
  }

  function goBack() {
    if (step === 0) {
      setStage("intro");
    } else {
      setStep((s) => s - 1);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setStage("intro");
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="card-radius overflow-hidden border border-linea bg-blanco shadow-brand-md">
        {stage === "intro" && <IntroScreen onStart={() => setStage("quiz")} />}
        {stage === "quiz" && (
          <QuestionScreen
            key={step}
            step={step}
            genero={answers.genero}
            onSelect={selectOption}
            onBack={goBack}
          />
        )}
        {stage === "result" &&
          answers.genero &&
          answers.personalidad &&
          answers.ocasion &&
          answers.notas && (
            <ResultScreen
              answers={answers as Required<PerfumeAnswers>}
              ticket={ticket}
              onRestart={restart}
            />
          )}
      </div>
    </div>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="p-6 sm:p-8">
      <h2 className="font-heading text-xl font-semibold leading-tight text-ink sm:text-2xl">
        ¿Cómo funciona?
      </h2>
      <p className="mt-3 text-base leading-relaxed text-ink/70">
        Respondé 4 preguntas rápidas y te decimos qué perfume de Fleming es
        para vos, hoy.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <Feature
          icon={Clock}
          title="Menos de 1 minuto"
          text="Solo 4 preguntas, sin vueltas"
        />
        <Feature
          icon={Sparkles}
          title="Según tus gustos"
          text="Personalidad, ocasión y notas que preferís"
        />
        <Feature
          icon={MapPin}
          title="Disponible en Fleming"
          text="En todas nuestras sucursales"
        />
      </div>

      <p className="mt-6 text-xs font-medium uppercase tracking-wide text-gris">
        Familias que vas a descubrir
      </p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {FAMILIAS.map((f) => (
          <span
            key={f}
            className="inline-flex items-center gap-1.5 rounded-full border border-linea px-3 py-1.5 text-xs font-medium text-ink"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: FAMILIA_COLOR[f] }}
              aria-hidden="true"
            />
            {familiaLabel(f, "unisex")}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-verde text-base font-semibold text-blanco transition-colors hover:bg-verde-deep"
      >
        Empezar el quiz
      </button>
      <p className="mt-2.5 text-center text-xs text-gris">
        Tarda menos de 1 minuto
      </p>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Clock;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-verde-pale text-verde-deep">
        <Icon size={19} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm font-medium text-ink">{title}</span>
        <span className="block text-xs text-gris">{text}</span>
      </span>
    </div>
  );
}

function QuestionScreen({
  step,
  genero,
  onSelect,
  onBack,
}: {
  step: number;
  genero?: Genero;
  onSelect: (value: string) => void;
  onBack: () => void;
}) {
  const q = getQuestionForStep(step, genero);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-6 sm:p-8">
      <div
        className="mb-6 flex gap-1.5"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={QUESTIONS.length}
      >
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i <= step ? "bg-verde" : "bg-linea"
            }`}
          />
        ))}
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-verde-deep">
        {q.eyebrow}
      </p>
      <h2 className="mt-1.5 font-heading text-xl font-semibold text-ink sm:text-2xl">
        {q.title}
      </h2>
      <p className="mt-1.5 text-sm text-gris">{q.sub}</p>

      <div className="mt-5 flex flex-col gap-2.5">
        {q.options.map((o) => {
          const Icon = o.icon ? OPTION_ICON[o.icon] : null;
          const isSelected = selected === o.value;
          return (
            <button
              key={o.value}
              type="button"
              disabled={selected !== null}
              onClick={() => {
                setSelected(o.value);
                onSelect(o.value);
              }}
              className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                isSelected
                  ? "border-verde bg-verde-pale"
                  : "border-linea hover:border-verde hover:bg-verde-pale/40"
              }`}
            >
              {Icon && (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-verde-pale text-verde-deep">
                  <Icon size={17} aria-hidden="true" />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-ink">
                  {o.label}
                </span>
                {o.desc && (
                  <span className="block text-xs text-gris">{o.desc}</span>
                )}
              </span>
              {isSelected && (
                <CheckCircle2
                  size={19}
                  className="shrink-0 text-verde-deep"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-5 text-sm font-medium text-gris hover:text-ink"
      >
        {step === 0 ? "← Inicio" : "← Volver"}
      </button>
    </div>
  );
}

function AvailabilityChips({ item }: { item: PerfumeItem }) {
  if (item.sucursales.length === 0) {
    return (
      <p className="mt-2 flex items-center gap-1.5 text-xs text-gris">
        <MapPin size={13} className="shrink-0" aria-hidden="true" />
        Confirmá disponibilidad por WhatsApp
      </p>
    );
  }
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {ORDEN_SUCURSALES.map((code) => {
        const disponible = item.sucursales.includes(code);
        const name = getBranchBySlug(stockCodeToSlug(code))?.name ?? code;
        return (
          <span
            key={code}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
              disponible ? "bg-verde-pale text-verde-deep" : "bg-bg text-gris/70"
            }`}
          >
            {disponible && <CheckCircle2 size={11} aria-hidden="true" />}
            {name}
          </span>
        );
      })}
    </div>
  );
}

function ResultScreen({
  answers,
  ticket,
  onRestart,
}: {
  answers: Required<PerfumeAnswers>;
  ticket: number;
  onRestart: () => void;
}) {
  // getResultado() elige al azar dentro del pool filtrado: se calcula una
  // sola vez al entrar al resultado, para que no cambie de perfume si el
  // componente se re-renderiza (por ejemplo, al abrir el selector de WhatsApp).
  const [r] = useState(() => getResultado(answers));
  const [pickerOpen, setPickerOpen] = useState(false);
  const whatsappMessage = `Hola! Hice el test de perfumes en la web y me recomendó ${r.principal.nombre} de ${r.principal.marca} (familia ${familiaLabel(r.principalFam, r.genero)}). ¿Lo tienen disponible?`;
  const mismoProducto =
    r.alternativa.nombre === r.principal.nombre &&
    r.alternativa.marca === r.principal.marca;

  return (
    <div>
      {/* Encabezado estilo "ticket" */}
      <div className="bg-ink px-6 pb-5 pt-6 text-blanco sm:px-8">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Image
              src="/brand/badge.png"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px]"
            />
            Farmacia Fleming
          </span>
          <span className="font-mono text-xs text-blanco/60">
            Perfil Olfativo Nº {ticket}
          </span>
        </div>
        <h2 className="mt-3 font-heading text-xl font-semibold sm:text-2xl">
          Tu perfume recomendado
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-blanco/15 px-3 py-1 text-xs font-medium">
            {familiaLabel(r.principalFam, r.genero)}
          </span>
          <span className="rounded-full bg-blanco/15 px-3 py-1 text-xs font-medium">
            {GENERO_LABEL[r.genero]}
          </span>
          <span className="rounded-full bg-blanco/15 px-3 py-1 text-xs font-medium">
            {OCASION_LABEL[answers.ocasion]}
          </span>
        </div>
      </div>

      {/* Borde perforado tipo ticket */}
      <div
        aria-hidden="true"
        className="h-3 bg-blanco"
        style={{
          backgroundImage:
            "radial-gradient(circle at 6px 0, transparent 6px, var(--ink) 6px)",
          backgroundSize: "12px 6px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top",
        }}
      />

      <div className="p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-gris">
          Perfume recomendado
        </p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-ink">
          {r.principal.nombre}
        </h3>
        <p className="text-sm text-gris">{r.principal.marca}</p>

        <p className="mt-4 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gris">
          <MapPin size={13} aria-hidden="true" />
          Disponible en
        </p>
        <AvailabilityChips item={r.principal} />

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-start gap-2.5 text-sm text-ink">
            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0 text-verde-deep"
              aria-hidden="true"
            />
            <span>Familia: {familiaLabel(r.principalFam, r.genero)}</span>
          </div>
          <div className="flex items-start gap-2.5 text-sm text-ink">
            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0 text-verde-deep"
              aria-hidden="true"
            />
            <span>{FAMILIA_DESC[r.principalFam]}</span>
          </div>
        </div>

        {!mismoProducto && (
          <>
            <p className="mt-5 text-xs font-medium uppercase tracking-wide text-gris">
              También podés probar
            </p>
            <div className="card-radius mt-2 border border-linea bg-bg/60 p-4">
              <p className="text-sm font-medium text-ink">
                {r.alternativa.marca}
              </p>
              <p className="text-sm text-gris">{r.alternativa.nombre}</p>
              <AvailabilityChips item={r.alternativa} />
            </div>
          </>
        )}

        {r.otrasOpciones > 0 && (
          <p className="mt-2 text-xs text-gris">
            + {r.otrasOpciones} opciones más de esta familia en Fleming
          </p>
        )}

        <div className="card-radius mt-4 border border-ambar-ic/30 bg-ambar-bg p-4 text-sm leading-relaxed text-ambar-tx">
          {r.tip}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-verde-pale/60 p-4 text-sm leading-relaxed text-ink/80">
          <Droplet
            size={18}
            className="mt-0.5 shrink-0 text-verde-deep"
            aria-hidden="true"
          />
          <p>
            Un perfume no huele igual en todas las pieles: probalo en tu piel
            y esperá unos minutos antes de decidir.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-verde text-sm font-semibold text-blanco transition-colors hover:bg-verde-deep"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Consultar disponibilidad en mi Fleming
          </button>
          <p className="text-xs text-gris">
            Elegís tu sucursal y te lleva directo a WhatsApp
          </p>
          <Link
            href="/sucursales"
            className="text-sm font-medium text-verde-deep hover:underline"
          >
            Ver todas las sucursales
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-gris hover:text-ink"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Volver a hacer el quiz
          </button>
        </div>
      </div>

      <BranchPickerSheet
        mode="whatsapp"
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        whatsappMessage={whatsappMessage}
        title="Elegí tu sucursal para consultar por WhatsApp"
      />
    </div>
  );
}
