import type { Ingredient, Step, Recipe, HeatLevel } from "./types";
import { findIconForTerm } from "./iconDictionary";

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// Parse a quantity like "1 1/2", "2.5", "1/2", "3"
function parseQuantity(s: string): number {
  s = s.trim();
  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return parseInt(mixed[1]) + parseInt(mixed[2]) / parseInt(mixed[3]);
  const frac = s.match(/^(\d+)\/(\d+)$/);
  if (frac) return parseInt(frac[1]) / parseInt(frac[2]);
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

const UNITS_SET = [
  "cups", "cup", "tablespoons", "tablespoon", "tbsp", "tbsps",
  "teaspoons", "teaspoon", "tsp", "tsps",
  "ounces", "ounce", "oz", "lbs", "lb", "pounds", "pound",
  "grams", "gram", "g", "kg", "kilograms", "kilogram",
  "ml", "milliliters", "milliliter", "l", "liters", "liter",
  "cloves", "clove", "slices", "slice", "cans", "can",
  "pieces", "piece", "whole", "pinch", "dash", "sticks", "stick",
];

const HEAT_KEYWORDS: { kw: string; level: HeatLevel }[] = [
  { kw: "high heat", level: "High" },
  { kw: "medium-high", level: "Med-High" },
  { kw: "medium high", level: "Med-High" },
  { kw: "medium heat", level: "Med" },
  { kw: "medium", level: "Med" },
  { kw: "low heat", level: "Low" },
  { kw: "low", level: "Low" },
  { kw: "simmer", level: "Low" },
  { kw: "high", level: "High" },
];

function detectHeat(text: string): HeatLevel {
  const lower = text.toLowerCase();
  for (const h of HEAT_KEYWORDS) {
    if (lower.includes(h.kw)) return h.level;
  }
  return "Med";
}

// Parse time strings like "3-5 mins", "10 minutes", "1 hour", "1.5 hours"
function parseTime(text: string): number {
  const lower = text.toLowerCase();
  let total = 0;
  // Range: 3-5 mins
  const range = lower.match(/(\d+)\s*[-–to]+\s*(\d+)\s*(min|mins|minute|minutes)/);
  if (range) return (parseInt(range[1]) + parseInt(range[2])) / 2;
  // Hours
  const hours = lower.match(/(\d+(?:\.\d+)?)\s*(?:hr|hrs|hour|hours)/);
  if (hours) total += parseFloat(hours[1]) * 60;
  // Minutes
  const mins = lower.match(/(\d+(?:\.\d+)?)\s*(?:min|mins|minute|minutes)/);
  if (mins) total += parseFloat(mins[1]);
  // Seconds (small, round up to 1 min minimum if present)
  const secs = lower.match(/(\d+)\s*(?:sec|secs|second|seconds)/);
  if (secs && total === 0) total = 1;
  return Math.round(total);
}

export interface ParsedRecipe {
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export function parseRawRecipe(raw: string): ParsedRecipe {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) {
    return { title: "", description: "", ingredients: [], steps: [] };
  }

  // Title: first non-empty line that doesn't look like an ingredient or step
  let title = "Untitled Recipe";
  let titleIdx = 0;
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const line = lines[i];
    const looksLikeIngredient = /^\d/.test(line) || /\d+\s*(cup|tbsp|tsp|oz|lb|g|kg|ml|l)\b/i.test(line);
    const looksLikeStep = /^\d+[.)\]]/.test(line);
    if (!looksLikeIngredient && !looksLikeStep && line.length > 2) {
      title = line.replace(/^#+\s*/, "").replace(/^["']|["']$/g, "");
      titleIdx = i;
      break;
    }
  }

  // Description: line after title if it's prose (not ingredient/step)
  let description = "";
  if (titleIdx + 1 < lines.length) {
    const next = lines[titleIdx + 1];
    const looksLikeIngredient = /^\d/.test(next);
    const looksLikeStep = /^\d+[.)\]]/.test(next);
    if (!looksLikeIngredient && !looksLikeStep && next.length > 10) {
      description = next;
    }
  }

  const ingredients: Ingredient[] = [];
  const steps: Step[] = [];

  const unitRegex = new RegExp(
    `^(\\d+(?:\\s+\\d+/\\d+)?(?:\\.\\d+)?|\\d+/\\d+)\\s*(${UNITS_SET.join("|")})?\\s+(.+)$`,
    "i"
  );

  for (const line of lines) {
    const stepMatch = line.match(/^(\d+)\s*[.)\]]\s*(.+)/);
    if (stepMatch) {
      const stepText = stepMatch[2].trim();
      const timer = parseTime(stepText);
      const heat = detectHeat(stepText);
      steps.push({
        id: uid(),
        text: stepText,
        heat,
        timerMinutes: timer,
        proTip: "",
        ingredientIds: [],
      });
      continue;
    }

    const ingMatch = line.match(unitRegex);
    if (ingMatch) {
      const qty = parseQuantity(ingMatch[1]);
      const unit = (ingMatch[2] || "piece").toLowerCase();
      const name = ingMatch[3].replace(/[,;].*$/, "").trim();
      ingredients.push({
        id: uid(),
        quantity: qty,
        unit,
        name,
        icon: findIconForTerm(name),
      });
      continue;
    }

    // If line starts with a bullet or dash, treat as ingredient without quantity
    if (/^[•\-*]\s+/.test(line)) {
      const name = line.replace(/^[•\-*]\s+/, "").trim();
      ingredients.push({
        id: uid(),
        quantity: 1,
        unit: "piece",
        name,
        icon: findIconForTerm(name),
      });
    }
  }

  // Auto-link ingredients to steps by keyword matching
  for (const step of steps) {
    const lowerText = step.text.toLowerCase();
    for (const ing of ingredients) {
      if (ing.name.length > 2 && lowerText.includes(ing.name.toLowerCase())) {
        step.ingredientIds.push(ing.id);
      }
    }
  }

  return { title, description, ingredients, steps };
}

export function parsedToRecipe(parsed: ParsedRecipe): Recipe {
  const now = Date.now();
  return {
    id: uid(),
    title: parsed.title || "Untitled Recipe",
    description: parsed.description,
    servings: 4,
    ingredients: parsed.ingredients,
    steps: parsed.steps,
    createdAt: now,
    updatedAt: now,
  };
}
