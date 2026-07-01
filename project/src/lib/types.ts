export type HeatLevel = "High" | "Med-High" | "Med" | "Low";

export interface Ingredient {
  id: string;
  quantity: number;
  unit: string;
  name: string;
  icon: string; // icon name
}

export interface Step {
  id: string;
  text: string;
  heat: HeatLevel;
  timerMinutes: number; // 0 = no timer
  proTip: string;
  ingredientIds: string[]; // which ingredients are used in this step
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  servings: number;
  ingredients: Ingredient[];
  steps: Step[];
  thumbnail?: string; // base64 image data
  wallpaper?: string; // base64 image data for per-recipe background
  locked?: boolean; // per-recipe PIN lock
  lockPin?: string; // per-recipe custom 4-digit PIN
  createdAt: number;
  updatedAt: number;
}

export const UNITS = [
  "cup", "cups", "tbsp", "tsp", "oz", "lb", "g", "kg",
  "ml", "l", "piece", "clove", "slice", "can", "pinch", "dash", "whole",
];

export const HEAT_LEVELS: HeatLevel[] = ["High", "Med-High", "Med", "Low"];

export const HEAT_COLORS: Record<HeatLevel, string> = {
  High: "bg-red-500/90 text-white",
  "Med-High": "bg-red-400/90 text-white",
  Med: "bg-orange-400/90 text-white",
  Low: "bg-yellow-400/90 text-white",
};

export type CardTheme = "glass" | "water" | "wooden";

// Regex to find number+unit patterns in step text for live serving scaler
export const STEP_MEASURE_REGEX =
  /(\d+(?:\.\d+)?)\s*(cups?|tbsps?|tsps?|tablespoons?|teaspoons?|oz|ounces?|lbs?|pounds?|g\b|grams?|kg|kilograms?|ml|milliliters?|liters?|l\b|pieces?|cloves?|slices?|cans?|pinches?|dashes?)/gi;

export function scaleQty(value: number, scale: number): string {
  const scaled = value * scale;
  if (scaled % 1 === 0) return String(scaled);
  const frac = scaled % 1;
  const whole = Math.floor(scaled);
  if (Math.abs(frac - 0.25) < 0.015) return whole ? `${whole} 1/4` : "1/4";
  if (Math.abs(frac - 0.33) < 0.02) return whole ? `${whole} 1/3` : "1/3";
  if (Math.abs(frac - 0.5) < 0.015) return whole ? `${whole} 1/2` : "1/2";
  if (Math.abs(frac - 0.67) < 0.02) return whole ? `${whole} 2/3` : "2/3";
  if (Math.abs(frac - 0.75) < 0.015) return whole ? `${whole} 3/4` : "3/4";
  return scaled.toFixed(2).replace(/\.?0+$/, "");
}

export function scaleStepText(text: string, scale: number): string {
  if (scale === 1 || !text) return text;
  return text.replace(STEP_MEASURE_REGEX, (match, numStr, unit) => {
    const num = parseFloat(numStr);
    if (isNaN(num)) return match;
    return `${scaleQty(num, scale)} ${unit}`;
  });
}
