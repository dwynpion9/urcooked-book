import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, Clock, Users, Play, Minus, Plus, ImagePlus,
  ImageOff, Wallpaper, Lock, Unlock, Delete,
} from "lucide-react";
import type { Recipe, Step as StepType } from "../lib/types";
import { scaleStepText, scaleQty } from "../lib/types";
import { getIcon } from "./IconPicker";
import type { Language } from "../lib/useSettings";
import { translateTerm, translateUI, translatePhrase } from "../lib/translate";

interface RecipeDetailProps {
  recipe: Recipe;
  lang: Language;
  onBack: () => void;
  onCook: (recipe: Recipe) => void;
  onUpdate: (recipe: Recipe) => void;
}

export function RecipeDetail({ recipe, lang, onBack, onCook, onUpdate }: RecipeDetailProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [sessionUnlocked, setSessionUnlocked] = useState(false);
  const [lockPinInput, setLockPinInput] = useState("");
  const [lockPinStep, setLockPinStep] = useState<"set" | "confirm" | "unlock">("set");
  const [lockPinConfirm, setLockPinConfirm] = useState("");
  const [lockPinError, setLockPinError] = useState("");
  const [showSetLockModal, setShowSetLockModal] = useState(false);
  const [lockPadShake, setLockPadShake] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const wallRef = useRef<HTMLInputElement>(null);
  const lockPadInputRef = useRef<HTMLInputElement>(null);
  const lockModalInputRef = useRef<HTMLInputElement>(null);

  const t = (s: string) => translateUI(s, lang);
  const tt = (s: string) => translateTerm(s, lang);
  const tp = (s: string) => translatePhrase(s, lang);

  // Use baseServings when available to compute a stable scale ratio
  const base = (recipe as any).baseServings ?? recipe.servings ?? 1;
  const scale = servings / base;
  const totalTime = recipe.steps.reduce((sum, s) => sum + (s.timerMinutes || 0), 0);

  const formatQty = (qty: number) => scaleQty(qty, scale);

  const handleThumbnail = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      onUpdate({ ...recipe, thumbnail: reader.result as string, updatedAt: Date.now() });
    };
    reader.readAsDataURL(file);
  };

  const handleWallpaper = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      onUpdate({ ...recipe, wallpaper: reader.result as string, updatedAt: Date.now() });
    };
    reader.readAsDataURL(file);
  };

  const removeThumbnail = () => {
    const { thumbnail, ...rest } = recipe;
    void thumbnail;
    onUpdate({ ...rest, updatedAt: Date.now() });
  };

  const removeWallpaper = () => {
    const { wallpaper, ...rest } = recipe;
    void wallpaper;
    onUpdate({ ...rest, updatedAt: Date.now() });
  };

  // Full-screen lock overlay handlers
  const pressLockPadDigit = (digit: string) => {
    if (lockPinInput.length < 4) {
      setLockPinInput(lockPinInput + digit);
    }
  };

  const pressLockPadBackspace = () => {
    setLockPinInput(lockPinInput.slice(0, -1));
    setLockPadShake(false);
  };

  const tryUnlockRecipe = () => {
    if (lockPinInput === recipe.lockPin) {
      setLockPinInput("");
      setSessionUnlocked(true);
    } else {
      setLockPadShake(true);
      setTimeout(() => {
        setLockPinInput("");
        setLockPadShake(false);
      }, 600);
    }
  };

  useEffect(() => {
    if (lockPinInput.length === 4 && sessionUnlocked === false) {
      tryUnlockRecipe();
    }
  }, [lockPinInput, sessionUnlocked]);

  // Modal lock/unlock handlers
  const pressLockModalDigit = (digit: string) => {
    if (lockPinStep === "set" && lockPinInput.length < 4) {
      setLockPinInput(lockPinInput + digit);
    } else if (lockPinStep === "confirm" && lockPinConfirm.length < 4) {
      setLockPinConfirm(lockPinConfirm + digit);
    } else if (lockPinStep === "unlock" && lockPinInput.length < 4) {
      setLockPinInput(lockPinInput + digit);
    }
  };

  const pressLockModalBackspace = () => {
    setLockPinError("");
    if (lockPinStep === "set") {
      setLockPinInput(lockPinInput.slice(0, -1));
    } else if (lockPinStep === "confirm") {
      setLockPinConfirm(lockPinConfirm.slice(0, -1));
    } else if (lockPinStep === "unlock") {
      setLockPinInput(lockPinInput.slice(0, -1));
    }
  };

  const handleSetLock = () => {
    if (lockPinStep === "set" && lockPinInput.length === 4) {
      setLockPinStep("confirm");
    } else if (lockPinStep === "confirm" && lockPinConfirm.length === 4) {
      if (lockPinInput === lockPinConfirm) {
        // Save the lock with the new PIN
        onUpdate({
          ...recipe,
          locked: true,
          lockPin: lockPinInput,
          updatedAt: Date.now(),
        });
        setShowSetLockModal(false);
        setLockPinInput("");
        setLockPinConfirm("");
        setLockPinStep("set");
      } else {
        setLockPinError(t("PINs do not match"));
        setLockPinConfirm("");
        setLockPinStep("set");
        setLockPinInput("");
      }
    }
  };

  const handleUnlock = () => {
    if (lockPinInput.length === 4) {
      if (lockPinInput === recipe.lockPin) {
        // Remove the lock
        const { lockPin, ...rest } = recipe;
        void lockPin;
        onUpdate({ ...rest, locked: false, updatedAt: Date.now() });
        setShowSetLockModal(false);
        setLockPinInput("");
        setLockPinError("");
        setLockPinStep("set");
      } else {
        setLockPinError(t("Wrong PIN"));
        setLockPinInput("");
      }
    }
  };

  const toggleLock = () => {
    if (recipe.locked) {
      // Recipe is locked, show unlock modal
      setLockPinStep("unlock");
      setShowSetLockModal(true);
    } else {
      // Recipe is not locked, show set lock modal
      setLockPinStep("set");
      setShowSetLockModal(true);
    }
  };

  // Keyboard support for lock overlay
  useEffect(() => {
    if (!recipe.locked || sessionUnlocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        pressLockPadDigit(e.key);
      } else if (e.key === "Backspace") {
        pressLockPadBackspace();
      } else if (e.key === "Escape") {
        onBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [recipe.locked, sessionUnlocked]);

  // Keyboard support for lock modal
  useEffect(() => {
    if (!showSetLockModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        pressLockModalDigit(e.key);
      } else if (e.key === "Backspace") {
        pressLockModalBackspace();
      } else if (e.key === "Escape") {
        setShowSetLockModal(false);
        setLockPinInput("");
        setLockPinConfirm("");
        setLockPinStep("set");
        setLockPinError("");
      } else if (e.key === "Enter") {
        if (lockPinStep === "set" || lockPinStep === "confirm") {
          handleSetLock();
        } else if (lockPinStep === "unlock") {
          handleUnlock();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSetLockModal, lockPinStep, lockPinInput, lockPinConfirm]);

  // Auto-focus hidden input for mobile keyboard
  useEffect(() => {
    if (recipe.locked && !sessionUnlocked) {
      lockPadInputRef.current?.focus();
    }
  }, [recipe.locked, sessionUnlocked]);

  useEffect(() => {
    if (showSetLockModal) {
      lockModalInputRef.current?.focus();
    }
  }, [showSetLockModal]);

  // Full-screen lock overlay (when recipe.locked && !sessionUnlocked)
  if (recipe.locked && !sessionUnlocked) {
    const Dots = ({ filled }: { filled: number }) => (
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-4 w-4 rounded-full border-2 transition-all duration-200 ${
            i < filled
              ? "border-amber-300 bg-amber-300"
              : "border-amber-700/50 bg-transparent"
          }`} />
        ))}
      </div>
    );

    const LockPadButton = ({ digit }: { digit: string }) => (
      <button
        onClick={() => pressLockPadDigit(digit)}
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-800/30 bg-amber-950/40 text-xl font-medium text-amber-100 transition-all hover:bg-amber-800/40 active:scale-90"
      >
        {digit}
      </button>
    );

    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80">
        <input
          ref={lockPadInputRef}
          type="tel"
          inputMode="numeric"
          maxLength={4}
          value=""
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, "");
            for (const c of d) {
              pressLockPadDigit(c);
            }
          }}
          className="absolute opacity-0 pointer-events-none w-1 h-1"
          aria-hidden="true"
        />

        <div className={`relative z-10 flex flex-col items-center gap-6 rounded-3xl border border-amber-900/30 bg-gradient-to-b from-[#2a1f15] to-[#1a120a] px-8 py-10 shadow-2xl sm:px-12 ${lockPadShake ? 'animate-shake' : ''}`}>
          <div className="flex flex-col items-center gap-3">
            <Lock size={36} className="text-amber-400" />
            <h2 className="text-lg font-semibold text-amber-200">{recipe.title}</h2>
            <p className="text-xs text-amber-300/50">{t("Enter recipe PIN")}</p>
          </div>

          <Dots filled={lockPinInput.length} />

          <div className="grid grid-cols-3 gap-3">
            {(["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const).map((d) => (
              <LockPadButton key={d} digit={d} />
            ))}
            <div className="h-14 w-14 sm:h-16 sm:w-16" />
            <LockPadButton digit="0" />
            <button
              onClick={pressLockPadBackspace}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-800/30 bg-amber-950/40 text-amber-100 transition-all hover:bg-amber-800/40 active:scale-90"
            >
              <Delete size={20} />
            </button>
          </div>

          <button
            onClick={onBack}
            className="text-xs text-amber-300/40 underline hover:text-amber-300/70"
          >
            {t("Back")}
          </button>
        </div>
      </div>
    );
  }

  // Helper: rebuild step text from tokens (if available) so scaling is deterministic
  function buildScaledStepText(step: StepType, scale: number) {
    // Use tokens if present
    const tokens = (step as any).tokens as { value: number; unit?: string; start: number; end: number; raw: string }[] | undefined;
    if (tokens && tokens.length) {
      let out = "";
      let last = 0;
      for (const tk of tokens) {
        out += step.text.slice(last, tk.start);
        out += `${scaleQty(tk.value, scale)}${tk.unit ? ' ' + tt(tk.unit) : ''}`;
        last = tk.end;
      }
      out += step.text.slice(last);
      return out;
    }
    // fallback to regex-based scaling on the raw step text
    return scaleStepText(step.text, scale);
  }

  return (
    <div className="relative mx-auto max-w-2xl space-y-6 pb-20">
      {recipe.wallpaper && (
        <div
          className="pointer-events-none fixed inset-0 -z-5 bg-cover bg-center"
          style={{ backgroundImage: `url(${recipe.wallpaper})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Set/Unlock PIN Modal */}
      {showSetLockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex w-80 flex-col items-center gap-5 rounded-2xl border border-amber-900/30 bg-[#1a120a] p-8 shadow-2xl">
            <Lock size={26} className="text-amber-400" />
            <h2 className="text-lg font-semibold text-amber-200">
              {lockPinStep === "unlock" ? t("Unlock Recipe") : t("Set Recipe PIN")}
            </h2>

            <input
              ref={lockModalInputRef}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value=""
              onChange={(e) => {
                if (/\d/.test(e.target.value)) {
                  pressLockModalDigit(e.target.value);
                }
              }}
              className="absolute opacity-0 pointer-events-none w-1 h-1"
              aria-hidden="true"
            />

            <div className="text-center space-y-2">
              <p className="text-sm text-amber-300/70">
                {lockPinStep === "set" && t("Enter new 4-digit PIN")}
                {lockPinStep === "confirm" && t("Confirm new PIN")}
                {lockPinStep === "unlock" && t("Enter current recipe PIN")}
              </p>
              <div className="flex items-center justify-center gap-3">
                {Array.from({ length: 4 }).map((_, i) => {
                  const activePin = lockPinStep === "confirm" ? lockPinConfirm : lockPinInput;
                  return (
                    <div
                      key={i}
                      className={`h-4 w-4 rounded-full border-2 transition-all ${
                        i < activePin.length
                          ? "border-amber-300 bg-amber-300"
                          : "border-amber-700/50"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {lockPinError && <p className="text-xs text-red-400">{lockPinError}</p>}

            <div className="grid grid-cols-3 gap-2.5">
              {(["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => pressLockModalDigit(d)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-800/30 bg-amber-950/40 text-lg font-medium text-amber-100 transition active:scale-90"
                >
                  {d}
                </button>
              ))}
              <div className="h-12 w-12" />
              <button
                onClick={() => pressLockModalDigit("0")}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-800/30 bg-amber-950/40 text-lg font-medium text-amber-100 transition active:scale-90"
              >
                0
              </button>
              <button
                onClick={pressLockModalBackspace}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-800/30 bg-amber-950/40 text-amber-100 transition active:scale-90"
              >
                <Delete size={16} />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSetLockModal(false);
                  setLockPinInput("");
                  setLockPinConfirm("");
                  setLockPinStep("set");
                  setLockPinError("");
                }}
                className="text-xs text-amber-300/40 underline hover:text-amber-300/70"
              >
                {t("Cancel")}
              </button>
              <button
                onClick={lockPinStep === "unlock" ? handleUnlock : handleSetLock}
                disabled={
                  (lockPinStep === "set" && lockPinInput.length < 4) ||
                  (lockPinStep === "confirm" && lockPinConfirm.length < 4) ||
                  (lockPinStep === "unlock" && lockPinInput.length < 4)
                }
                className="text-xs font-semibold text-amber-300 underline hover:text-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {lockPinStep === "set" || lockPinStep === "confirm" ? t("Next") : t("Unlock")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
        >
          <ArrowLeft size={16} /> {t("Back")}
        </button>
        <button
          onClick={toggleLock}
          className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10"
          title={recipe.locked ? t("Unlock Recipe") : t("Lock Recipe")}
        >
          {recipe.locked ? <Lock size={16} className="text-amber-400" /> : <Unlock size={16} />}
        </button>
      </div>

      {/* Recipe profile */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
        {recipe.thumbnail && (
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${recipe.thumbnail})` }}
          />
        )}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">{recipe.title}</h1>
          {recipe.description && (
            <p className="mt-2 text-sm text-white/50">{recipe.description}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
              <Clock size={18} className="text-amber-400" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">{t("Total Time")}</p>
                <p className="text-sm font-semibold text-white">{totalTime} {tt("min")}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
              <Users size={18} className="text-amber-400" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">{t("Servings")}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-white/70 hover:bg-white/20"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">{servings}</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-white/70 hover:bg-white/20"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleThumbnail(f);
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10"
            >
              <ImagePlus size={14} /> {recipe.thumbnail ? t("Change Photo") : t("Add Photo")}
            </button>
            {recipe.thumbnail && (
              <button
                onClick={removeThumbnail}
                className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10"
              >
                <ImageOff size={14} /> {t("Remove Photo")}
              </button>
            )}
            <input
              ref={wallRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleWallpaper(f);
              }}
            />
            <button
              onClick={() => wallRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10"
            >
              <Wallpaper size={14} /> {recipe.wallpaper ? t("Change Photo") : t("Set Wallpaper")}
            </button>
            {recipe.wallpaper && (
              <button
                onClick={removeWallpaper}
                className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10"
              >
                <ImageOff size={14} /> {t("Remove Wallpaper")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
          {t("Ingredients")}
        </h3>
        <div className="space-y-2">
          {recipe.ingredients.map((ing) => {
            const Icon = getIcon(ing.icon);
            return (
              <div key={ing.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <Icon size={16} className="text-white/60" />
                </div>
                <span className="w-24 shrink-0 text-sm font-medium text-amber-300">
                  {formatQty(ing.quantity)} {tt(ing.unit)}
                </span>
                <span className="text-sm text-white/80">{tt(ing.name)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Steps overview */}
      <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
          {t("Directions")}
        </h3>
        <div className="space-y-3">
          {recipe.steps.map((step, idx) => (
            <div key={step.id} className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-300">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm text-white/80">
                  {tp(buildScaledStepText(step, scale))}
                </p>
                <div className="mt-1.5 flex gap-3 text-xs text-white/40">
                  <span
                    className={`rounded px-1.5 py-0.5 ${
                      step.heat === "High"
                        ? "bg-red-500/30 text-red-300"
                        : step.heat === "Med-High"
                          ? "bg-red-400/30 text-red-200"
                          : step.heat === "Med"
                            ? "bg-orange-400/30 text-orange-200"
                            : "bg-yellow-400/30 text-yellow-200"
                    }`}
                  >
                    {tt(step.heat)}
                  </span>
                  {step.timerMinutes > 0 && <span>{step.timerMinutes} {tt("min")}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onCook(recipe)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 text-lg font-semibold text-amber-950 transition hover:bg-amber-400"
      >
        <Play size={20} /> {t("Start Cooking")}
      </button>
    </div>
  );
}
