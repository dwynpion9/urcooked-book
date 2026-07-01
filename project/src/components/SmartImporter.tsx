import { useState, useRef, useEffect } from "react";
import { Sparkles, Check, X, Wand2, Mic, MicOff } from "lucide-react";
import type { Recipe } from "../lib/types";
import { parseRawRecipe, parsedToRecipe, type ParsedRecipe } from "../lib/recipeParser";
import { getIcon } from "./IconPicker";
import type { Language } from "../lib/useSettings";
import { translateUI } from "../lib/translate";

interface SmartImporterProps {
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
  lang: Language;
}

export function SmartImporter({ onSave, onCancel, lang }: SmartImporterProps) {
  const t = (s: string) => translateUI(s, lang);
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState<ParsedRecipe | null>(null);
  const [editing, setEditing] = useState<ParsedRecipe | null>(null);
  const [listening, setListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<unknown>(null);

  // Check speech recognition support
  useEffect(() => {
    const SR = (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (!SR) setSpeechSupported(false);
  }, []);

  const startListening = () => {
    const SR = (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR() as {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onresult: ((e: unknown) => void) | null;
      onend: (() => void) | null;
      onerror: (() => void) | null;
      start: () => void;
      stop: () => void;
    };
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (e: unknown) => {
      const event = e as { results: Record<number, Record<number, { transcript: string }>> };
      let transcript = "";
      const len = Object.keys(event.results).length;
      for (let i = 0; i < len; i++) {
        transcript += event.results[i]?.[0]?.transcript || "";
      }
      setRaw(transcript);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    const rec = recognitionRef.current as { stop?: () => void } | null;
    rec?.stop?.();
    setListening(false);
  };

  const handleAnalyze = () => {
    if (!raw.trim()) return;
    const result = parseRawRecipe(raw);
    setParsed(result);
    setEditing({ ...result });
  };

  const handleSave = () => {
    if (!editing) return;
    const recipe = parsedToRecipe(editing);
    onSave(recipe);
  };

  const updateIng = (id: string, field: string, value: string | number) => {
    if (!editing) return;
    setEditing({
      ...editing,
      ingredients: editing.ingredients.map((i) =>
        i.id === id ? { ...i, [field]: value } : i
      ),
    });
  };

  const updateStep = (id: string, field: string, value: string | number) => {
    if (!editing) return;
    setEditing({
      ...editing,
      steps: editing.steps.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  if (parsed && editing) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 pb-20">
        <div className="flex items-center gap-2 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
          <Check size={20} className="text-amber-400" />
          <p className="text-sm text-amber-200">
            {t("Review the parsed recipe below, then click Save to Book.")}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">{t("Recipe Title")}</label>
          <input
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-lg text-white outline-none focus:border-amber-400/50"
          />
          <label className="mb-2 mt-3 block text-xs font-medium uppercase tracking-wider text-white/40">{t("Description")}</label>
          <textarea
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            rows={2}
            className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 outline-none focus:border-amber-400/50"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
            {t("Ingredients")} ({editing.ingredients.length})
          </h3>
          <div className="space-y-2">
            {editing.ingredients.map((ing) => {
              const Icon = getIcon(ing.icon);
              return (
                <div key={ing.id} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2">
                  <Icon size={16} className="shrink-0 text-white/60" />
                  <input
                    type="number"
                    step="0.25"
                    value={ing.quantity || ""}
                    onChange={(e) => updateIng(ing.id, "quantity", parseFloat(e.target.value) || 0)}
                    className="w-16 rounded-md border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none"
                  />
                  <input
                    value={ing.unit}
                    onChange={(e) => updateIng(ing.id, "unit", e.target.value)}
                    className="w-20 rounded-md border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white/80 outline-none"
                  />
                  <input
                    value={ing.name}
                    onChange={(e) => updateIng(ing.id, "name", e.target.value)}
                    className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white outline-none"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">
            {t("Directions")} ({editing.steps.length})
          </h3>
          <div className="space-y-3">
            {editing.steps.map((step, idx) => (
              <div key={step.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-300">
                    {idx + 1}
                  </span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                    step.heat === "High" ? "bg-red-500/80 text-white" :
                    step.heat === "Med-High" ? "bg-red-400/80 text-white" :
                    step.heat === "Med" ? "bg-orange-400/80 text-white" :
                    "bg-yellow-400/80 text-white"
                  }`}>{step.heat}</span>
                  {step.timerMinutes > 0 && <span className="text-xs text-white/50">{step.timerMinutes} min</span>}
                </div>
                <textarea
                  value={step.text}
                  onChange={(e) => updateStep(step.id, "text", e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 outline-none focus:border-amber-400/50"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} className="flex-1 rounded-xl bg-amber-500 py-3 font-semibold text-amber-950 transition hover:bg-amber-400">
            {t("Save to Book")}
          </button>
          <button onClick={() => { setParsed(null); setEditing(null); }} className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white/70 transition hover:bg-white/10">
            {t("Back")}
          </button>
          <button onClick={onCancel} className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white/70 transition hover:bg-white/10">
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Wand2 size={20} className="text-amber-400" />
          <h3 className="text-lg font-semibold text-white">{t("Paste Raw Recipe Text")}</h3>
        </div>
        <p className="mb-4 text-sm text-white/50">
          {t("Paste any recipe text — or use voice input to dictate. The offline parser will extract the title, ingredients, steps, timers, and auto-map icons. No internet required.")}
        </p>

        <div className="relative">
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={`Example:\n\nGrandma's Beef Stew\nA hearty winter stew.\n\n2 lb beef chuck, cut into cubes\n1 cup onion, diced\n3 cloves garlic, minced\n2 cups beef broth\n1. Heat oil in a large pot over medium-high heat. Brown the beef for 5 minutes.\n2. Add onion and garlic. Cook for 3-5 mins until soft.\n3. Pour in broth, bring to boil, then reduce to low heat. Simmer for 60 minutes.`}
            rows={14}
            className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 font-mono text-sm text-white/90 outline-none transition focus:border-amber-400/50 focus:bg-white/10"
          />
          {/* Mic button */}
          <button
            onClick={listening ? stopListening : startListening}
            disabled={!speechSupported}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border transition ${
              !speechSupported
                ? "cursor-not-allowed border-white/10 bg-white/5 text-white/20"
                : listening
                  ? "border-red-400/50 bg-red-500/20 text-red-400"
                  : "border-white/15 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
            title={!speechSupported ? "Voice input not supported on this browser" : listening ? "Stop recording" : "Start voice input"}
          >
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleAnalyze}
            disabled={!raw.trim()}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-amber-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Sparkles size={18} /> {t("Analyze & Format")}
          </button>
          <button
            onClick={onCancel}
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white/70 transition hover:bg-white/10"
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
