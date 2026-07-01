import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Timer, Lightbulb, Check, X, Home,
  Volume2, Pause, RotateCcw, Play,
} from "lucide-react";
import type { Recipe } from "../lib/types";
import { getIcon } from "./IconPicker";
import type { Language } from "../lib/useSettings";
import { translateTerm, translateUI, translatePhrase } from "../lib/translate";

interface ExecutionViewProps {
  recipe: Recipe;
  lang: Language;
  onExit: () => void;
}

export function ExecutionView({ recipe, lang, onExit }: ExecutionViewProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [checkedIgs, setCheckedIgs] = useState<Set<string>>(new Set());
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerDone, setTimerDone] = useState(false);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = (s: string) => translateUI(s, lang);
  const tt = (s: string) => translateTerm(s, lang);
  const tp = (s: string) => translatePhrase(s, lang);

  const step = recipe.steps[stepIdx];
  const stepIngredients = (step?.ingredientIds || [])
    .map((id) => recipe.ingredients.find((i) => i.id === id))
    .filter(Boolean) as Recipe["ingredients"];

  const totalTime = recipe.steps.reduce((sum, s) => sum + (s.timerMinutes || 0), 0);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          const nav = navigator as unknown as { wakeLock: { request: (t: string) => Promise<WakeLockSentinel> } };
          wakeLockRef.current = await nav.wakeLock.request("screen");
        }
      } catch { /* */ }
    };
    requestWakeLock();
    return () => {
      wakeLockRef.current?.release().catch(() => {});
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopTTS();
    };
  }, []);

  const startTimer = () => {
    if (!step || !step.timerMinutes) return;
    setTimerSeconds(step.timerMinutes * 60);
    setTimerDone(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimerDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimerSeconds(null);
    setTimerDone(false);
  };

  const stopTTS = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setTtsPlaying(false);
  };

  const playTTS = () => {
    if (!step || !("speechSynthesis" in window)) return;
    stopTTS();
    const utter = new SpeechSynthesisUtterance(step.text);
    utter.onend = () => setTtsPlaying(false);
    utter.onerror = () => setTtsPlaying(false);
    window.speechSynthesis.speak(utter);
    setTtsPlaying(true);
  };

  const pauseTTS = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setTtsPlaying(false);
    }
  };

  useEffect(() => {
    stopTimer();
    stopTTS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx]);

  const toggleCheck = (ingId: string) => {
    setCheckedIgs((prev) => {
      const next = new Set(prev);
      if (next.has(ingId)) next.delete(ingId);
      else next.add(ingId);
      return next;
    });
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  if (!step) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-white/60">This recipe has no steps yet.</p>
        <button onClick={onExit} className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-amber-950">
          {t("Back")}
        </button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-2xl space-y-5 pb-24">
      {recipe.wallpaper && (
        <div
          className="pointer-events-none fixed inset-0 -z-5 bg-cover bg-center"
          style={{ backgroundImage: `url(${recipe.wallpaper})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
        >
          <Home size={16} /> {t("Exit")}
        </button>
        <div className="text-right">
          <h2 className="text-lg font-semibold text-white">{recipe.title}</h2>
          <p className="text-xs text-white/40">
            {t("Step")} {stepIdx + 1} {t("of")} {recipe.steps.length} · {t("Total:")}: {totalTime} {tt("min")}
          </p>
        </div>
      </div>

      {/* Step card */}
      <div key={step.id} className="slide-in rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-lg font-bold text-amber-300">
            {stepIdx + 1}
          </span>
          <span className={`rounded-lg px-3 py-1 text-sm font-medium ${
            step.heat === "High" ? "bg-red-500/80 text-white" :
            step.heat === "Med-High" ? "bg-red-400/80 text-white" :
            step.heat === "Med" ? "bg-orange-400/80 text-white" :
            "bg-yellow-400/80 text-white"
          }`}>
            {tt(step.heat)} {t("Heat")}
          </span>
        </div>

        {/* Ingredient sticker strip */}
        {stepIngredients.length > 0 && (
          <div className="mb-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
              {t("Ingredients for this step (tap to check off)")}
            </p>
            <div className="flex flex-wrap gap-2">
              {stepIngredients.map((ing) => {
                const Icon = getIcon(ing.icon);
                const checked = checkedIgs.has(ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleCheck(ing.id)}
                    className={`relative flex flex-col items-center gap-1 rounded-xl border p-3 transition ${
                      checked ? "border-green-400/50 bg-green-500/20" : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                    style={{ width: 80 }}
                  >
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      {/* Solid filled circle behind icon when checked */}
                      <div className={`absolute inset-0 rounded-full transition-all duration-200 ${
                        checked ? "bg-green-500 scale-100 opacity-100" : "bg-transparent scale-75 opacity-0"
                      }`} />
                      {/* Outlined circle when unchecked */}
                      <div className={`absolute inset-0 rounded-full border-2 transition-all duration-200 ${
                        checked ? "border-transparent opacity-0" : "border-white/20 opacity-100"
                      }`} />
                      <Icon
                        size={22}
                        className={`relative z-10 transition-colors duration-200 ${checked ? "text-white" : "text-white/70"}`}
                      />
                      {checked && (
                        <div className="absolute -right-1 -top-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 ring-2 ring-black/30">
                          <Check size={11} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span className={`text-center text-[10px] leading-tight transition-colors ${checked ? "text-green-300/70 line-through" : "text-white/60"}`}>
                      {tt(ing.name)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step text */}
        <p className="text-base leading-relaxed text-white/90">{tp(step.text)}</p>

        {/* TTS controls */}
        <div className="mt-4 flex items-center gap-2">
          <button onClick={playTTS} className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10">
            <Play size={14} /> {t("Read")}
          </button>
          <button onClick={pauseTTS} className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10">
            <Pause size={14} /> {t("Pause")}
          </button>
          <button onClick={playTTS} className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10">
            <RotateCcw size={14} /> {t("Restart")}
          </button>
          {ttsPlaying && <Volume2 size={14} className="text-amber-400" />}
        </div>

        {/* Timer */}
        {step.timerMinutes > 0 && (
          <div className="mt-5">
            {timerSeconds === null ? (
              <button
                onClick={startTimer}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 py-4 text-amber-300 transition hover:bg-amber-500/20"
              >
                <Timer size={24} />
                <span className="text-lg font-semibold">{t("Start Timer")} · {step.timerMinutes} {tt("min")}</span>
              </button>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className={`flex h-32 w-32 items-center justify-center rounded-full border-4 text-3xl font-bold ${
                  timerDone ? "border-green-400 text-green-400 pulse-ring" : "border-amber-400/50 text-amber-300"
                }`}>
                  {formatTime(timerSeconds)}
                </div>
                {timerDone && <p className="text-sm font-medium text-green-400">{t("Timer complete!")}</p>}
                <button onClick={stopTimer} className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10">
                  <X size={14} /> {t("Stop Timer")}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pro tip */}
        {step.proTip && (
          <div className="slide-in mt-5 flex gap-3 rounded-xl border border-blue-400/20 bg-blue-500/10 p-4">
            <Lightbulb size={18} className="shrink-0 text-blue-400" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">{t("Pro Tip")}</p>
              <p className="mt-1 text-sm text-blue-100/80">{tp(step.proTip)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
          disabled={stepIdx === 0}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-4 text-lg font-semibold text-white/80 transition hover:bg-white/10 disabled:opacity-30"
        >
          <ArrowLeft size={20} /> {t("Balik")}
        </button>
        <button
          onClick={() => setStepIdx(Math.min(recipe.steps.length - 1, stepIdx + 1))}
          disabled={stepIdx === recipe.steps.length - 1}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 text-lg font-semibold text-amber-950 transition hover:bg-amber-400 disabled:opacity-30"
        >
          {t("Sunod")} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
