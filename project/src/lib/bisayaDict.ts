// Offline English ↔ Bisaya (Cebuano) food & cooking dictionary.
// Scoped to ingredients, units, cooking verbs, and kitchen terms.

export const BISAYA_DICT: Record<string, string> = {
  // Proteins
  beef: "karne sa baka", pork: "karne sa baboy", chicken: "manok",
  turkey: "pabo", duck: "itik", lamb: "karne sa karnero",
  fish: "isda", salmon: "salmon", tuna: "tuna", cod: "bakasaw",
  shrimp: "hipon", prawn: "hipon", crab: "kasag", lobster: "kasag",
  bacon: "bacon", ham: "hamonado", sausage: "longganisa",
  egg: "itlog", eggs: "itlog", tofu: "tokwa", tempeh: "tempeh",

  // Dairy
  milk: "gatas", cream: "krema", yogurt: "yogurt", cheese: "keso",
  butter: "mantikilya",

  // Fruits
  apple: "mansanas", banana: "saging", cherry: "seresa",
  grape: "ubas", lemon: "lemon", lime: "lime", orange: "kahel",
  peach: "melokoton", pear: "peras", plum: "plum",
  strawberry: "strawberry", blueberry: "blueberry",
  watermelon: "pakwan", melon: "melon", pineapple: "pinya",
  mango: "mango", kiwi: "kiwi", avocado: "abokado",

  // Vegetables
  carrot: "karot", potato: "patatas", onion: "sibuyas",
  garlic: "ahos", tomato: "kamatis", celery: "selery",
  spinach: "spinach", kale: "kale", lettuce: "letsugas",
  cabbage: "repolyo", broccoli: "broccoli", cauliflower: "cauliflower",
  cucumber: "pipino", zucchini: "zucchini", pumpkin: "kalabasa",
  squash: "kalabasa", corn: "mais", mushroom: "uhong",
  pepper: "sili", chili: "sili", eggplant: "talong",
  radish: "labanos", beet: "beet", asparagus: "asparagus",

  // Grains & carbs
  rice: "kan-on", pasta: "pasta", noodle: "pancit", bread: "pan",
  flour: "harina", wheat: "trigo", grain: "bugas", oat: "oats",
  cereal: "cereal", quinoa: "quinoa", barley: "barley",

  // Liquids
  water: "tubig", juice: "jus", soda: "soda", wine: "bino",
  beer: "serbesa", coffee: "kape", tea: "tsaa",
  broth: "sabaw", stock: "sabaw", soup: "sabaw",
  oil: "lana", vinegar: "suka", sauce: "sarsa",

  // Spices & seasonings
  salt: "asin", sugar: "asukar", honey: " dugos", cinnamon: "cinnamon",
  cumin: "cumin", paprika: "paprika", turmeric: "turmeric",
  ginger: "luy-a", basil: "basil", oregano: "oregano",
  thyme: "thyme", rosemary: "rosemary", parsley: "parsley",
  cilantro: "cilantro", mint: "mint", spice: "rempuyo",
  herb: "herbal", pepper_spice: "rempuyo",

  // Sweets
  chocolate: "tsokolate", cookie: "galleta", cake: "keyk",
  donut: "donut", icecream: "sorbetes", dessert: "panghimas",
  candy: "kendi",

  // Cooking tools
  pot: "kaldero", pan: "kaha", oven: "hurno", knife: "kutsilyo",
  fork: "tenedor", spoon: "kutsara", utensils: "kutson",
  chef: "tagaluto", bowl: "bowl", plate: "plato", cup: "kopa",
  glass: "baso",

  // Units
  cups: "kopa", tbsp: "kutsara", tsp: "kutsarita",
  oz: "onsa", lb: "libra", g: "grama", kg: "kilograma",
  ml: "millilitro", l: "litro", piece: "piraso", clove: "cloves",
  can: "lata", pinch: "tipik", dash: "dash",
  whole: "tibuok",

  // Cooking verbs
  saute: "gisa", simmer: "halo-halo", marinate: "marinate",
  boil: "abaga", fry: "prito", bake: "luto", grill: "ihaw",
  roast: "roast", steam: "asing-asing", chop: "puta",
  slice: "hiwa", mix: "halo", stir: "ukay", whisk: "bati",
  heat: "init", cook: "luto", season: "lasa", drain: "tulo",
  flip: "balikbad", pour: "bubo", add: "dugang", remove: "kuha",
  cut: "puta", peel: "panit", wash: "hugas", garnish: "garnish",
  preheat: "pa-initan", brown: "brown", soften: "humok",
  thicken: "kapoy", reduce: "reduce", blend: "blend",
  knead: "masa", rise: "tubo", coat: "tabon", dip: "lunod",
  spread: "lapad", sprinkle: "wisik", stuff: "sud-od",
  wrap: "putos", fold: "tupi", toss: "sagbut", drain_water: "taya",

  // Kitchen terms
  ingredient: "sangkap", recipe: "resipe", step: "hakbang",
  serving: "serbisyu", servings: "serbisyu", timer: "timer",
  heat_level: "lebel sa kainit", high: "taas", "med-high": "medyo-taas",
  medium: "tunga", low: "ubos", minute: "minuto", minutes: "minuto",
  hour: "oras", hours: "oras", second: "segundo", seconds: "segundo",

  // Common phrases in steps
  "heat oil": "inita ang lana", "add to": "idugang sa",
  "until soft": "hangtod humok", "until golden": "hangtod bulawan",
  "until brown": "hangtod brown", "set aside": "ibutang sa kilid",
  "serve hot": "iserbi mainit", "let cool": "pabugnawa",
  "bring to boil": "paaboka", "reduce heat": "paubosa ang kainit",
  "stir occasionally": "ukay-usahay", "stir well": "ukay maayo",
  "mix well": "halo maayo", "season with": "lasaha sa",
  "cook for": "lutoa sa", "minutes or until": "minuto o hangtod",
};

// UI label translations
export const BISAYA_UI: Record<string, string> = {
  "URCOOKED BOOK": "URCOOKED BOOK",
  "Enter your 4-digit PIN": "Ibutang ang imong 4-digit PIN",
  "Default PIN: 1234": "Default PIN: 1234",
  "recipes in your book": "resipe sa imong libro",
  "New Recipe": "Bag-ong Resipe",
  "Export Book": "I-export ang Libro",
  "Import Book": "I-import ang Libro",
  "Create Recipe": "Paghimo og Resipe",
  "Manual Builder": "Manwal nga Builder",
  "AI Smart Importer": "AI Smart Importer",
  "Recipe Title": "Titulo sa Resipe",
  "Description": "Pagdul-ong",
  "Servings": "Serbisyu",
  "Ingredients": "Sangkap",
  "Directions": "Mga Lakang",
  "Add Row": "Dugang Row",
  "Add Step": "Dugang Lakang",
  "Heat": "Kainit",
  "Timer": "Timer",
  "min": "min",
  "Pro-Tip / Avoid (optional)": "Pro-Tip / Likayi (opsyonal)",
  "Save to Book": "I-save sa Libro",
  "Cancel": "Kanselahon",
  "Paste Raw Recipe Text": "I-paste ang Hilaw nga Resipe Text",
  "Analyze & Format": "Analisa & I-format",
  "Review & Approve": "Susihon & Pagsugot",
  "Start Cooking": "pagsugod sa pagluto",
  "Total Time": "Tibook nga Oras",
  "Steps Overview": "Overview sa mga Lakang",
  "Cook": "Lutoa",
  "View": "Tan-awa",
  "Back": "Balik",
  "Exit": "Gawas",
  "Sunod": "Sunod",
  "Balik": "Balik",
  "Ingredients for this step": "Sangkap alang niining lakanga",
  "Start Timer": "pagsugod sa timer",
  "Stop Timer": "undanga ang timer",
  "Timer complete": "tapos na ang timer",
  "Pro Tip": "Pro Tip",
  "Change PIN": "Usba ang PIN",
  "Enter new PIN": "Ibutang ang bag-ong PIN",
  "Confirm new PIN": "Kumpirma ang bag-ong PIN",
  "Mute": "Pahilum",
  "Unmute": "Pagsulti",
  "Volume": "Volume",
  "Add Photo": "Dugang Photo",
  "Change Photo": "Usba ang Photo",
  "Remove Photo": "Kuhaa ang Photo",
  "Set Wallpaper": "Ibutang ang Wallpaper",
  "Remove Wallpaper": "Kuhaa ang Wallpaper",
  "Lock Recipe": "Selda ang Resipe",
  "Unlock Recipe": "Ablihi ang Resipe",
  "This recipe is locked": "Kini nga resipe naka-selda",
  "Enter PIN to unlock": "Ibutang ang PIN aron maabli",
  "made by DWYN": "made by DWYN",
};

// Translate a single word or phrase
export function translateWord(word: string): string {
  const lower = word.toLowerCase().trim();
  if (BISAYA_DICT[lower]) return BISAYA_DICT[lower];
  // Try partial match
  for (const key of Object.keys(BISAYA_DICT)) {
    if (lower.includes(key)) return BISAYA_DICT[key];
  }
  return word; // fallback to original
}

// Translate a full phrase/sentence word-by-word with fallback
export function translatePhrase(text: string): string {
  if (!text) return text;
  // Check full phrase first
  const lower = text.toLowerCase().trim();
  if (BISAYA_DICT[lower]) return BISAYA_DICT[lower];

  // Word-by-word
  return text
    .split(/\s+/)
    .map((w) => {
      const clean = w.replace(/[^a-zA-Z-]/g, "").toLowerCase();
      const prefix = w.match(/^[^a-zA-Z]*/)?.[0] || "";
      const suffix = w.match(/[^a-zA-Z]*$/)?.[0] || "";
      const translated = BISAYA_DICT[clean];
      return translated ? prefix + translated + suffix : w;
    })
    .join(" ");
}

// Translate UI label
export function translateUI(label: string): string {
  return BISAYA_UI[label] || label;
}
