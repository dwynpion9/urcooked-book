// Icon dictionary: maps cooking terms to icon names,
// plus exposes the full pool of available icons for the searchable grid.

export const COOKING_ICON_MAP: Record<string, string> = {
  // Proteins
  beef: "beef", steak: "beef", meat: "beef", pork: "beef", lamb: "beef",
  chicken: "chicken", poultry: "chicken", turkey: "chicken", duck: "chicken",
  bacon: "beef", ham: "beef", sausage: "beef",
  fish: "fish", salmon: "fish", tuna: "fish", cod: "fish", tilapia: "fish",
  shrimp: "fish", prawn: "fish", crab: "fish", lobster: "fish",
  egg: "egg", eggs: "egg",
  tofu: "leaf", tempeh: "leaf",
  // Dairy
  milk: "milk", cream: "milk", yogurt: "milk", cheese: "cheese", butter: "milk",
  // Produce - fruits
  apple: "apple", banana: "banana", cherry: "apple", grape: "apple",
  lemon: "lemon", lime: "lemon", orange: "lemon", peach: "apple",
  pear: "apple", plum: "apple", strawberry: "apple", blueberry: "apple",
  raspberry: "apple", watermelon: "apple", melon: "apple", pineapple: "apple",
  mango: "apple", kiwi: "apple", avocado: "apple",
  // Produce - vegetables
  carrot: "carrot", potato: "potato", onion: "onion", garlic: "garlic",
  tomato: "tomato", celery: "leaf", spinach: "leaf",
  kale: "leaf", lettuce: "leaf", cabbage: "leaf",
  broccoli: "broccoli", cauliflower: "broccoli", cucumber: "carrot",
  zucchini: "carrot", pumpkin: "carrot", squash: "carrot", corn: "corn",
  mushroom: "mushroom", pepper: "pepper", chili: "chili",
  // Grains & carbs
  rice: "rice", pasta: "rice", noodle: "rice", bread: "bread",
  flour: "rice", wheat: "rice", grain: "rice", oat: "rice",
  cereal: "rice", quinoa: "rice", barley: "rice",
  // Liquids
  water: "water", juice: "water", soda: "water",
  wine: "wine", beer: "wine", coffee: "coffee", tea: "coffee",
  broth: "soup", stock: "soup", soup: "soup",
  oil: "oil", vinegar: "water", sauce: "soup",
  // Spices & seasonings
  salt: "salt", sugar: "sugar", honey: "sugar", cinnamon: "leaf",
  cumin: "leaf", paprika: "leaf", turmeric: "leaf", ginger: "leaf",
  basil: "leaf", oregano: "leaf", thyme: "leaf", rosemary: "leaf",
  parsley: "leaf", cilantro: "leaf", mint: "leaf",
  pepper_spice: "leaf", spice: "leaf", herb: "leaf",
  // Sweets
  chocolate: "cookie", cookie: "cookie", cake: "cake", donut: "cake",
  icecream: "cake", dessert: "cake", candy: "cookie",
  // Cooking tools
  pot: "pot", pan: "pot", oven: "pot",
  knife: "utensils", fork: "utensils", spoon: "utensils",
  utensils: "utensils", chef: "chef_hat", bowl: "soup",
  plate: "utensils", cup: "coffee", glass: "wine",
  // Misc
  salad: "leaf", sandwich: "bread", pizza: "bread",
  nut: "leaf", almond: "leaf", walnut: "leaf", pecan: "leaf",
  bean: "leaf", lentil: "leaf", pea: "leaf",
  leaf: "leaf", greens: "leaf", vegetable: "carrot",
  fruit: "apple", berry: "apple",
};

// Lookup function: tries exact match, then keyword search in term
export function findIconForTerm(term: string): string {
  const lower = term.toLowerCase().trim();
  if (COOKING_ICON_MAP[lower]) return COOKING_ICON_MAP[lower];
  for (const key of Object.keys(COOKING_ICON_MAP)) {
    if (lower.includes(key) || key.includes(lower)) return COOKING_ICON_MAP[key];
  }
  return "utensils";
}
