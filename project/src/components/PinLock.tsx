import { useEffect, useRef, useState } from "react";
import { Delete, Lock, Settings, Eye, EyeOff } from "lucide-react";
import { AnimatedBear } from "./AnimatedBear";
import { getSetting, setSetting } from "../lib/settingsStore";
import { translateUI } from "../lib/translate";
import type { LangCode } from "../lib/multiLangDict";

interface PinLockProps {
  onUnlock: () => void;
}

export function PinLock({ onUnlock }: PinLockProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [storedPin, setStoredPin] = useState("1234");
  const [showChangePin, setShowChangePin] = useState(false);
  const [changePinStep, setChangePinStep] = useState<"verify" | "newPin" | "confirmPin">("verify");
  const [verifyPin, setVerifyPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [changeError, setChangeError] = useState("");
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const t = (s: string) => translateUI(s, lang);

  useEffect(() => {
    getSetting("pin").then((p) => { if (p && typeof p === "string") setStoredPin(p); });
    getSetting("language").then((l) => { if (l && typeof l === "string") setLang(l as LangCode); });
  }, []);

  useEffect(() => {
    if (pin.length === 4 && !showChangePin) {
      if (pin === storedPin) {
        setTimeout(onUnlock, 200);
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => { setPin(""); setError(false); setShake(false); }, 600);
      }
    }
  }, [pin, storedPin, onUnlock, showChangePin]);

  useEffect(() => {
    if (!showChangePin) return;
    if (changePinStep === "verify" && verifyPin.length === 4) {
      if (verifyPin === storedPin) { setChangePinStep("newPin"); setVerifyPin(""); setChangeError(""); }
      else { setChangeError(t("Wrong PIN")); setVerifyPin(""); }
    }
    if (changePinStep === "newPin" && newPin.length === 4) { setChangePinStep("confirmPin"); }
    if (changePinStep === "confirmPin" && confirmPin.length === 4) {
      if (confirmPin === newPin) {
        setSetting("pin", newPin);
        setStoredPin(newPin);
        setChangeSuccess(true);
        setTimeout(() => {
          setShowChangePin(false); setChangePinStep("verify");
          setNewPin(""); setConfirmPin(""); setChangeSuccess(false); setChangeError("");
        }, 1200);
      } else {
        setChangeError(t("PINs do not match"));
        setConfirmPin(""); setChangePinStep("newPin"); setNewPin("");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyPin, newPin, confirmPin, changePinStep, storedPin, showChangePin]);

  const pressDigit = (d: string) => {
    if (!showChangePin) {
      if (pin.length < 4 && !error) setPin((p) => p + d);
      return;
    }
    if (changePinStep === "verify" && verifyPin.length < 4) setVerifyPin((p) => p + d);
    else if (changePinStep === "newPin" && newPin.length < 4) setNewPin((p) => p + d);
    else if (changePinStep === "confirmPin" && confirmPin.length < 4) setConfirmPin((p) => p + d);
  };

  const pressBack = () => {
    setChangeError("");
    if (!showChangePin) { setPin((p) => p.slice(0, -1)); setError(false); return; }
    if (changePinStep === "verify") setVerifyPin((p) => p.slice(0, -1));
    else if (changePinStep === "newPin") setNewPin((p) => p.slice(0, -1));
    else if (changePinStep === "confirmPin") setConfirmPin((p) => p.slice(0, -1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") { pressDigit(e.key); return; }
      if (e.key === "Backspace") { pressBack(); return; }
      if (e.key === "Escape") {
        if (showChangePin) {
          setShowChangePin(false); setChangePinStep("verify");
          setVerifyPin(""); setNewPin(""); setConfirmPin(""); setChangeError("");
        } else { setPin(""); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => { hiddenInputRef.current?.focus(); }, [showChangePin, changePinStep]);

  const activeDots = showChangePin
    ? (changePinStep === "verify" ? verifyPin : changePinStep === "newPin" ? newPin : confirmPin)
    : pin;

  const Dots = ({ filled }: { filled: number }) => (
    <div className="flex gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={`h-4 w-4 rounded-full border-2 transition-all duration-200 ${
          i < filled
            ? error ? "border-red-400 bg-red-400" : "border-amber-300 bg-amber-300"
            : "border-amber-700/50 bg-transparent"
        }`} />
      ))}
    </div>
  );

  const PadButton = ({ digit }: { digit: string }) => (
    <button onClick={() => pressDigit(digit)}
      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-800/30 bg-amber-950/40 text-xl font-medium text-amber-100 transition-all hover:bg-amber-800/40 active:scale-90 active:bg-amber-700/50 sm:h-16 sm:w-16">
      {digit}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1a2a3a] via-[#0f1c2d] to-[#0a1520]">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{
            width: Math.random() * 2 + 1 + "px", height: Math.random() * 2 + 1 + "px",
            top: Math.random() * 100 + "%", left: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2,
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
          }} />
        ))}
      </div>

      <input ref={hiddenInputRef} type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={4}
        value="" onChange={(e) => { const d = e.target.value.replace(/\D/g,""); for (const c of d) pressDigit(c); }}
        className="absolute opacity-0 pointer-events-none w-1 h-1" aria-hidden="true" />

      <div className={`relative z-10 flex flex-col items-center gap-6 rounded-3xl border border-amber-900/30 bg-gradient-to-b from-[#2a1f15] to-[#1a120a] px-8 py-10 shadow-2xl sm:px-12 ${shake ? "animate-shake" : ""}`} style={{ maxWidth: 380 }}>
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-20">
          <div className="absolute left-1/3 top-0 h-full w-px bg-amber-950/50" />
          <div className="absolute left-2/3 top-0 h-full w-px bg-amber-950/50" />
        </div>

        {showChangePin ? (
          <div className="flex w-full flex-col items-center gap-5">
            <Settings size={28} className="text-amber-300" />
            <h2 className="text-lg font-semibold text-amber-200">{t("Change PIN")}</h2>

            {changeSuccess ? (
              <p className="text-sm font-medium text-green-400">PIN updated!</p>
            ) : (
              <>
                <div className="text-center space-y-1">
                  <p className="text-xs text-amber-300/70">
                    {changePinStep === "verify" && "Enter current PIN"}
                    {changePinStep === "newPin" && t("Enter new PIN")}
                    {changePinStep === "confirmPin" && t("Confirm new PIN")}
                  </p>
                  <Dots filled={activeDots.length} />
                </div>
                {changeError && <p className="text-xs text-red-400">{changeError}</p>}
                <div className="grid grid-cols-3 gap-3">
                  {["1","2","3","4","5","6","7","8","9"].map((d) => <PadButton key={d} digit={d} />)}
                  <div className="h-14 w-14 sm:h-16 sm:w-16" />
                  <PadButton digit="0" />
                  <button onClick={pressBack}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-800/30 bg-amber-950/40 text-amber-100 transition active:scale-90 sm:h-16 sm:w-16">
                    <Delete size={18} />
                  </button>
                </div>
              </>
            )}
            <button onClick={() => { setShowChangePin(false); setChangePinStep("verify"); setVerifyPin(""); setNewPin(""); setConfirmPin(""); setChangeError(""); }}
              className="text-xs text-amber-300/40 underline hover:text-amber-300/70">{t("Cancel")}</button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <AnimatedBear size={100} />
              <div className="flex items-center gap-2 text-amber-200/80">
                <Lock size={16} />
                <h1 className="text-lg font-semibold tracking-wide">URCOOKED BOOK</h1>
              </div>
              <p className="text-xs text-amber-300/50">{t("Enter your 4-digit PIN")}</p>
            </div>
            <Dots filled={pin.length} />
            <div className="grid grid-cols-3 gap-3">
              {["1","2","3","4","5","6","7","8","9"].map((d) => <PadButton key={d} digit={d} />)}
              <div className="h-14 w-14 sm:h-16 sm:w-16" />
              <PadButton digit="0" />
              <button onClick={pressBack}
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-800/30 bg-amber-950/40 text-amber-100 transition-all hover:bg-amber-800/40 active:scale-90 sm:h-16 sm:w-16">
                <Delete size={20} />
              </button>
            </div>
            <button onClick={() => setShowChangePin(true)}
              className="text-[10px] text-amber-300/40 underline transition hover:text-amber-300/70">
              {t("Change PIN")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Standalone modal for changing PIN from within the unlocked app
interface ChangePinModalProps { onClose: () => void; }

export function ChangePinModal({ onClose }: ChangePinModalProps) {
  const [step, setStep] = useState<"verify" | "newPin" | "confirmPin" | "done">("verify");
  const [verifyPin, setVerifyPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [storedPin, setStoredPin] = useState("1234");
  const [showPinText, setShowPinText] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const hiddenRef = useRef<HTMLInputElement>(null);
  const t = (s: string) => translateUI(s, lang);

  useEffect(() => {
    getSetting("pin").then((p) => { if (p && typeof p === "string") setStoredPin(p); });
    getSetting("language").then((l) => { if (l && typeof l === "string") setLang(l as LangCode); });
  }, []);
  useEffect(() => { hiddenRef.current?.focus(); }, [step]);

  const active = step === "verify" ? verifyPin : step === "newPin" ? newPin : confirmPin;

  useEffect(() => {
    if (step === "verify" && verifyPin.length === 4) {
      if (verifyPin === storedPin) { setStep("newPin"); setVerifyPin(""); setError(""); }
      else { setError(t("Wrong PIN")); setVerifyPin(""); }
    }
    if (step === "newPin" && newPin.length === 4) setStep("confirmPin");
    if (step === "confirmPin" && confirmPin.length === 4) {
      if (confirmPin === newPin) { setSetting("pin", newPin); setStep("done"); setTimeout(onClose, 1200); }
      else { setError(t("PINs do not match")); setConfirmPin(""); setStep("newPin"); setNewPin(""); }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyPin, newPin, confirmPin, step, storedPin]);

  const pressDigit = (d: string) => {
    setError("");
    if (step === "verify" && verifyPin.length < 4) setVerifyPin((p) => p + d);
    else if (step === "newPin" && newPin.length < 4) setNewPin((p) => p + d);
    else if (step === "confirmPin" && confirmPin.length < 4) setConfirmPin((p) => p + d);
  };
  const pressBack = () => {
    setError("");
    if (step === "verify") setVerifyPin((p) => p.slice(0,-1));
    else if (step === "newPin") setNewPin((p) => p.slice(0,-1));
    else if (step === "confirmPin") setConfirmPin((p) => p.slice(0,-1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") pressDigit(e.key);
      else if (e.key === "Backspace") pressBack();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex w-80 flex-col items-center gap-5 rounded-2xl border border-amber-900/30 bg-[#1a120a] p-8 shadow-2xl">
        <Settings size={26} className="text-amber-400" />
        <h2 className="text-lg font-semibold text-amber-200">{t("Change PIN")}</h2>
        {step === "done" ? (
          <p className="text-sm font-medium text-green-400">PIN updated successfully!</p>
        ) : (
          <>
            <div className="text-center space-y-2">
              <p className="text-sm text-amber-300/70">
                {step === "verify" && "Enter current PIN"}
                {step === "newPin" && t("Enter new PIN")}
                {step === "confirmPin" && t("Confirm new PIN")}
              </p>
              <div className="flex items-center justify-center gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`h-4 w-4 rounded-full border-2 transition-all ${i < active.length ? "border-amber-300 bg-amber-300" : "border-amber-700/50"}`} />
                ))}
                {step !== "verify" && (
                  <button onClick={() => setShowPinText(!showPinText)} className="ml-1 text-amber-500/50 hover:text-amber-400">
                    {showPinText ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                )}
              </div>
              {showPinText && step !== "verify" && (
                <p className="font-mono text-lg tracking-widest text-amber-300">{active}</p>
              )}
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <input ref={hiddenRef} type="tel" inputMode="numeric" maxLength={1} value=""
              onChange={(e) => { if (/\d/.test(e.target.value)) pressDigit(e.target.value); }}
              className="absolute opacity-0 pointer-events-none w-1 h-1" aria-hidden="true" />
            <div className="grid grid-cols-3 gap-2.5">
              {["1","2","3","4","5","6","7","8","9"].map((d) => (
                <button key={d} onClick={() => pressDigit(d)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-800/30 bg-amber-950/40 text-lg font-medium text-amber-100 transition active:scale-90 active:bg-amber-700/50">
                  {d}
                </button>
              ))}
              <div className="h-12 w-12" />
              <button onClick={() => pressDigit("0")}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-800/30 bg-amber-950/40 text-lg font-medium text-amber-100 transition active:scale-90">0</button>
              <button onClick={pressBack}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-800/30 bg-amber-950/40 text-amber-100 transition active:scale-90">
                <Delete size={16} />
              </button>
            </div>
          </>
        )}
        <button onClick={onClose} className="text-xs text-amber-300/40 underline hover:text-amber-300/70">{t("Cancel")}</button>
      </div>
    </div>
  );
}
