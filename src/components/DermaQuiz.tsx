"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Droplet,
  Sparkles,
  Blend,
  ShieldAlert,
  Clock,
  MapPin,
  CheckCircle2,
  Sun,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import {
  QUESTIONS,
  PIEL_LABEL,
  OBJ_LABEL,
  MARCA_SLUG,
  getResultado,
  type PielKey,
  type ObjetivoKey,
  type EdadKey,
} from "@/lib/dermaQuiz";
import { brands } from "@/lib/brands";
import BranchPickerSheet from "./BranchPickerSheet";

const OPTION_ICON = {
  drop: Droplet,
  shine: Sparkles,
  mix: Blend,
  shield: ShieldAlert,
} as const;

type Answers = {
  piel?: PielKey;
  objetivo?: ObjetivoKey;
  edad?: EdadKey;
};

type Stage = "intro" | "quiz" | "result";

export default function DermaQuiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
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
            onSelect={selectOption}
            onBack={goBack}
          />
        )}
        {stage === "result" &&
          answers.piel &&
          answers.objetivo &&
          answers.edad && (
            <ResultScreen
              piel={answers.piel}
              objetivo={answers.objetivo}
              edad={answers.edad}
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
        Respondé 3 preguntas rápidas y te decimos qué línea dermocosmética es
        para tu piel, hoy.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <Feature
          icon={Clock}
          title="Menos de 1 minuto"
          text="Solo 3 preguntas, sin vueltas"
        />
        <Feature
          icon={Sparkles}
          title="Según tu tipo de piel"
          text="Orientativo, no reemplaza una consulta profesional"
        />
        <Feature
          icon={MapPin}
          title="Disponible en Fleming"
          text="En todas nuestras sucursales"
        />
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
  onSelect,
  onBack,
}: {
  step: number;
  onSelect: (value: string) => void;
  onBack: () => void;
}) {
  const q = QUESTIONS[step];
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6 flex gap-1.5" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={QUESTIONS.length}>
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

function ResultScreen({
  piel,
  objetivo,
  edad,
  ticket,
  onRestart,
}: {
  piel: PielKey;
  objetivo: ObjetivoKey;
  edad: EdadKey;
  ticket: number;
  onRestart: () => void;
}) {
  const r = getResultado(piel, objetivo, edad);
  const principalSlug = MARCA_SLUG[r.principal.marcaKey];
  const principalBrand = brands.find((b) => b.slug === principalSlug);
  const productos = r.principal.productos ?? (r.principal.producto ? [r.principal.producto] : []);
  const [pickerOpen, setPickerOpen] = useState(false);
  const whatsappMessage = `Hola! Hice el quiz de rutina ideal en la web y me recomendaron ${r.principal.marcaLabel}${
    productos.length ? ` (${productos.join(", ")})` : ""
  }. ¿Tienen disponibilidad?`;

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
            Diagnóstico Nº {ticket}
          </span>
        </div>
        <h2 className="mt-3 font-heading text-xl font-semibold sm:text-2xl">
          Tu rutina recomendada
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-blanco/15 px-3 py-1 text-xs font-medium">
            {PIEL_LABEL[piel]}
          </span>
          <span className="rounded-full bg-blanco/15 px-3 py-1 text-xs font-medium">
            {OBJ_LABEL[objetivo]}
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
          Línea recomendada
        </p>
        <div className="mt-2 flex items-center gap-3">
          {principalBrand ? (
            <div className="flex h-12 items-center rounded-xl border border-linea bg-bg/60 px-4">
              <Image
                src={`/logos/${principalBrand.file}`}
                alt={r.principal.marcaLabel}
                width={130}
                height={40}
                className="h-auto max-h-7 w-auto max-w-[130px] object-contain"
              />
            </div>
          ) : (
            <h3 className="font-heading text-xl font-semibold text-verde-deep">
              {r.principal.marcaLabel}
            </h3>
          )}
        </div>
        <p className="mt-2 text-sm text-gris">
          Disponible en tu Farmacia Fleming
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {productos.map((p) => (
            <div key={p} className="flex items-start gap-2.5 text-sm text-ink">
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-verde-deep"
                aria-hidden="true"
              />
              <span>{p}</span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-gris">
          También podés probar
        </p>
        <div className="card-radius mt-2 border border-linea bg-bg/60 p-4">
          <p className="text-sm font-medium text-ink">
            {r.alternativa.marcaLabel}
          </p>
          <p className="text-sm text-gris">{r.alternativa.producto}</p>
        </div>

        <div className="card-radius mt-4 border border-ambar-ic/30 bg-ambar-bg p-4 text-sm leading-relaxed text-ambar-tx">
          {r.tip}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-verde-pale/60 p-4 text-sm leading-relaxed text-ink/80">
          <Sun size={18} className="mt-0.5 shrink-0 text-verde-deep" aria-hidden="true" />
          <p>
            En Salta el sol pega fuerte casi todo el año: sumá protector
            solar todas las mañanas, sin excepción.
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
