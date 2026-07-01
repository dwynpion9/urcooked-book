export const UNIT_SYNONYMS: Record<string, string> = {
  cup: 'cup',
  cups: 'cup',
  tasa: 'cup',
  tbsp: 'tbsp',
  tablespoon: 'tbsp',
  tablespoons: 'tbsp',
  tsp: 'tsp',
  teaspoon: 'tsp',
  teaspoons: 'tsp',
  g: 'g',
  gram: 'g',
  grams: 'g',
  kg: 'kg',
  milliliter: 'ml',
  ml: 'ml',
  l: 'l',
  liter: 'l',
  oz: 'oz',
  ounce: 'oz',
  ounces: 'oz',
  pint: 'pt',
  pt: 'pt',
  can: 'can',
  clove: 'clove',
  cloves: 'clove',
  slice: 'slice',
  slices: 'slice',
  piece: 'piece',
  pieces: 'piece',
};

export function normalizeUnit(u?: string): string {
  if (!u) return '';
  const key = u.toLowerCase().replace(/\./g, '').trim();
  return UNIT_SYNONYMS[key] ?? u;
}
