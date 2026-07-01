import { useState } from "react";
import { X, Pencil, Sparkles } from "lucide-react";
import type { Recipe } from "../lib/types";
import { ManualBuilder } from "./ManualBuilder";
import { SmartImporter } from "./SmartImporter";
import type { Language } from "../lib/useSettings";
import { translateUI } from "../lib/translate";

interface CreateRecipeProps {
  onSave: (recipe: Recipe) => void;
  onClose: () => void;
  lang: Language;
}

type Tab = "manual" | "ai";

export function CreateRecipe({ onSave, onClose, lang }: CreateRecipeProps) {
  const [tab, setTab] = useState<Tab>("manual");
  const t = (s: string) => translateUI(s, lang);

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="min-h-full px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{t("Create Recipe")}</h2>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6 flex gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
            <button
              onClick={() => setTab("manual")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
                tab === "manual" ? "bg-amber-500 text-amber-950" : "text-white/60 hover:bg-white/5"
              }`}
            >
              <Pencil size={16} /> {t("Manual Builder")}
            </button>
            <button
              onClick={() => setTab("ai")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
                tab === "ai" ? "bg-amber-500 text-amber-950" : "text-white/60 hover:bg-white/5"
              }`}
            >
              <Sparkles size={16} /> {t("AI Smart Importer")}
            </button>
          </div>

          {tab === "manual" ? (
            <ManualBuilder onSave={onSave} onCancel={onClose} lang={lang} />
          ) : (
            <SmartImporter onSave={onSave} onCancel={onClose} lang={lang} />
          )}
        </div>
      </div>
    </div>
  );
}
