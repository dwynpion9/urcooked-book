// Translation engine: translates food terms, UI labels, and full phrases
// across 14 languages, 100% offline.
import { FOOD_DICT } from "./multiLangDict";
import { UI_DICT } from "./uiDict";
import type { LangCode } from "./multiLangDict";

// Translate a single food/ingredient/unit/verb term
export function translateTerm(term: string, lang: LangCode): string {
  if (lang === "en" || !term) return term;
  const lower = term.toLowerCase().trim();
  const entry = FOOD_DICT[lower];
  if (entry && entry[lang]) return entry[lang]!;
  // Try partial match
  for (const key of Object.keys(FOOD_DICT)) {
    if (lower.includes(key)) {
      const t = FOOD_DICT[key][lang];
      if (t) return t;
    }
  }
  return term; // fallback to original
}

// Translate a UI label
export function translateUI(label: string, lang: LangCode): string {
  if (lang === "en" || !label) return label;
  const entry = UI_DICT[label];
  if (entry && entry[lang]) return entry[lang]!;
  return label;
}

// Translate a full phrase/sentence word-by-word with fallback
export function translatePhrase(text: string, lang: LangCode): string {
  if (lang === "en" || !text) return text;
  return text
    .split(/\s+/)
    .map((w) => {
      const clean = w.replace(/[^a-zA-Z-]/g, "").toLowerCase();
      const prefix = w.match(/^[^a-zA-Z]*/)?.[0] || "";
      const suffix = w.match(/[^a-zA-Z]*$/)?.[0] || "";
      const entry = FOOD_DICT[clean];
      const translated = entry?.[lang];
      return translated ? prefix + translated + suffix : w;
    })
    .join(" ");
}

// Translate a recipe's step text (phrase-level)
export function translateStepText(text: string, lang: LangCode): string {
  return translatePhrase(text, lang);
}

// Translate a recipe's ingredient name
export function translateIngredientName(name: string, lang: LangCode): string {
  return translateTerm(name, lang);
}

// Translate a unit
export function translateUnit(unit: string, lang: LangCode): string {
  return translateTerm(unit, lang);
}
