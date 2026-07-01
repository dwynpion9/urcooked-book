import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import type { Ingredient, Step, HeatLevel, Recipe } from "../lib/types";
import { UNITS, HEAT_LEVELS, HEAT_COLORS } from "../lib/types";
import { IconPicker, getIcon } from "./IconPicker";
import { findIconForTerm } from "../lib/iconDictionary";
import type { Language } from "../lib/useSettings";
import { translateUI, translateTerm } from "../lib/translate";

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

interface ManualBuilderProps {
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
  lang: Language;
}

export function ManualBuilder({ onSave, onCancel, lang }: ManualBuilderProps) {
  const t = (s: string) => translateUI(s, lang);
  const tt = (s: string) => translateTerm(s, lang);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState(4);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: uid(), quantity: 1, unit: "cup", name: "", icon: "utensils" },
  ]);
  const [steps, setSteps] = useState<Step[]>([
    { id: uid(), text: "", heat: "Med", timerMinutes: 0, proTip: "", ingredientIds: [] },
  ]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: uid(), quantity: 1, unit: "cup", name: "", icon: "utensils" },
    ]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((i) => i.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(
      ingredients.map((i) => {
        if (i.id !== id) return i;
        const updated = { ...i, [field]: value };
        if (field === "name" && typeof value === "string" && value.length > 1) {
          updated.icon = findIconForTerm(value);
        }
        return updated;
      })
    );
  };

  const addStep = () => {
    setSteps([
      ...steps,
      { id: uid(), text: "", heat: "Med", timerMinutes: 0, proTip: "", ingredientIds: [] },
    ]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const updateStep = (id: string, field: keyof Step, value: string | number | HeatLevel) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const toggleStepIngredient = (stepId: string, ingId: string) => {
    setSteps(
      steps.map((s) => {
        if (s.id !== stepId) return s;
        const has = s.ingredientIds.includes(ingId);
        return {
          ...s,
          ingredientIds: has
            ? s.ingredientIds.filter((i) => i !== ingId)
            : [...s.ingredientIds, ingId],
        };
      })
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a recipe title.");
      return;
    }
    const now = Date.now();
    const recipe: Recipe = {
      id: uid(),
      title: title.trim(),
      description: description.trim(),
      servings,
      ingredients: ingredients.filter((i) => i.name.trim()),
      steps: steps.filter((s) => s.text.trim()),
      createdAt: now,
      updatedAt: now,
    };
    onSave(recipe);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20">
      {/* Title section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
          {t("Recipe Title")}
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Grandma's Beef Stew"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-lg text-white outline-none transition focus:border-amber-400/50 focus:bg-white/10"
        />
        <label className="mb-2 mt-4 block text-xs font-medium uppercase tracking-wider text-white/40">
          {t("Description")}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A short description..."
          rows={2}
          className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 outline-none transition focus:border-amber-400/50 focus:bg-white/10"
        />
        <div className="mt-4 flex items-center gap-3">
          <label className="text-xs font-medium uppercase tracking-wider text-white/40">
            {t("Servings")}
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            >
              −
            </button>
            <span className="w-10 text-center text-lg font-semibold text-white">{servings}</span>
            <button
              onClick={() => setServings(servings + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Ingredients section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            {t("Ingredients")}
          </h3>
          <button
            onClick={addIngredient}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/30"
          >
            <Plus size={14} /> {t("Add Row")}
          </button>
        </div>

        <div className="space-y-2">
          {ingredients.map((ing, idx) => (
            <div
              key={ing.id}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2"
            >
              <GripVertical size={16} className="shrink-0 text-white/20" />
              <span className="w-6 shrink-0 text-center text-xs text-white/30">{idx + 1}</span>
              <input
                type="number"
                step="0.25"
                value={ing.quantity || ""}
                onChange={(e) => updateIngredient(ing.id, "quantity", parseFloat(e.target.value) || 0)}
                placeholder="Qty"
                className="w-16 shrink-0 rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-sm text-white outline-none focus:border-amber-400/50"
              />
              <select
                value={ing.unit}
                onChange={(e) => updateIngredient(ing.id, "unit", e.target.value)}
                className="w-20 shrink-0 rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-sm text-white/80 outline-none focus:border-amber-400/50"
              >
                {UNITS.map((u) => (
                  <option key={u} value={u} className="bg-[#1a1a2e]">
                    {u}
                  </option>
                ))}
              </select>
              <input
                value={ing.name}
                onChange={(e) => updateIngredient(ing.id, "name", e.target.value)}
                placeholder="Ingredient name"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-400/50"
              />
              <IconPicker
                value={ing.icon}
                onChange={(icon) => updateIngredient(ing.id, "icon", icon)}
              />
              <button
                onClick={() => removeIngredient(ing.id)}
                className="shrink-0 rounded-lg p-2 text-white/30 transition hover:bg-red-500/20 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Steps section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            {t("Directions")}
          </h3>
          <button
            onClick={addStep}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/30"
          >
            <Plus size={14} /> {t("Add Step")}
          </button>
        </div>

        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-300">
                  {idx + 1}
                </span>
                <button
                  onClick={() => removeStep(step.id)}
                  className="rounded-lg p-1.5 text-white/30 transition hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <textarea
                value={step.text}
                onChange={(e) => updateStep(step.id, "text", e.target.value)}
                placeholder="Describe this cooking step..."
                rows={2}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 outline-none focus:border-amber-400/50"
              />

              <div className="mt-3 flex flex-wrap items-center gap-3">
                {/* Heat selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-white/40">{t("Heat:")}</span>
                  {HEAT_LEVELS.map((h) => (
                    <button
                      key={h}
                      onClick={() => updateStep(step.id, "heat", h)}
                      className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                        step.heat === h
                          ? HEAT_COLORS[h]
                          : "bg-white/5 text-white/40 hover:bg-white/10"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>

                {/* Timer */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-white/40">{t("Timer:")}</span>
                  <input
                    type="number"
                    min="0"
                    value={step.timerMinutes || ""}
                    onChange={(e) =>
                      updateStep(step.id, "timerMinutes", parseInt(e.target.value) || 0)
                    }
                    placeholder="0"
                    className="w-14 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-amber-400/50"
                  />
                  <span className="text-xs text-white/40">{tt("min")}</span>
                </div>
              </div>

              {/* Pro tip */}
              <input
                value={step.proTip}
                onChange={(e) => updateStep(step.id, "proTip", e.target.value)}
                placeholder={t("Pro-Tip / Avoid (optional)")}
                className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 outline-none focus:border-amber-400/50"
              />

              {/* Ingredient link */}
              {ingredients.filter((i) => i.name.trim()).length > 0 && (
                <div className="mt-3">
                  <p className="mb-1.5 text-xs text-white/40">{t("Ingredients in this step:")}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ingredients
                      .filter((i) => i.name.trim())
                      .map((ing) => {
                        const Icon = getIcon(ing.icon);
                        const active = step.ingredientIds.includes(ing.id);
                        return (
                          <button
                            key={ing.id}
                            onClick={() => toggleStepIngredient(step.id, ing.id)}
                            className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs transition ${
                              active
                                ? "border-amber-400/50 bg-amber-500/20 text-amber-200"
                                : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
                            }`}
                          >
                            <Icon size={12} />
                            {ing.name}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 rounded-xl bg-amber-500 py-3 font-semibold text-amber-950 transition hover:bg-amber-400"
        >
          {t("Save to Book")}
        </button>
        <button
          onClick={onCancel}
          className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white/70 transition hover:bg-white/10"
        >
          {t("Cancel")}
        </button>
      </div>
    </div>
  );
}
