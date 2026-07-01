// Helper functions for creating icon components
const roundFruit = (color: string, stemColor: string, seedColor?: string) => (props: { size?: number; className?: string }) => {
  const size = props.size || 24;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
      <circle cx="32" cy="32" r="24" fill={color} />
      <ellipse cx="28" cy="26" rx="6" ry="8" fill={color} opacity="0.7" />
      <path d="M32 8 Q35 5 38 8" stroke={stemColor} strokeWidth="2" fill="none" strokeLinecap="round" />
      {seedColor && <circle cx="32" cy="32" r="2" fill={seedColor} />}
    </svg>
  );
};

const longVeg = (bodyColor: string, tipColor: string, stemColor: string) => (props: { size?: number; className?: string }) => {
  const size = props.size || 24;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
      <ellipse cx="32" cy="36" rx="8" ry="22" fill={bodyColor} />
      <ellipse cx="32" cy="14" rx="6" ry="8" fill={tipColor} />
      <path d="M30 12 Q28 8 32 6 Q36 8 34 12" fill={stemColor} />
    </svg>
  );
};

const leafIcon = (fillColor: string, stemColor: string) => (props: { size?: number; className?: string }) => {
  const size = props.size || 24;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
      <path d="M32 48 Q20 32 24 16 Q32 8 40 16 Q44 32 32 48" fill={fillColor} />
      <path d="M32 48 L32 12" stroke={stemColor} strokeWidth="2" />
      <path d="M28 28 Q32 24 36 28" stroke={stemColor} strokeWidth="1" opacity="0.6" fill="none" />
    </svg>
  );
};

const jar = (labelColor: string, bodyColor: string, lidColor: string) => (props: { size?: number; className?: string }) => {
  const size = props.size || 24;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
      <rect x="16" y="14" width="32" height="4" fill={lidColor} rx="1" />
      <path d="M18 18 L18 48 Q18 52 22 52 L42 52 Q46 52 46 48 L46 18 Z" fill={bodyColor} stroke="#333" strokeWidth="1" />
      <rect x="24" y="28" width="16" height="8" fill={labelColor} opacity="0.7" />
      <text x="32" y="35" textAnchor="middle" fontSize="6" fill="#333">Label</text>
    </svg>
  );
};

const bottle = (bodyColor: string, capColor: string) => (props: { size?: number; className?: string }) => {
  const size = props.size || 24;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
      <rect x="26" y="8" width="12" height="6" fill={capColor} rx="1" />
      <path d="M24 14 L22 22 Q20 28 20 40 Q20 48 28 50 L36 50 Q44 48 44 40 Q44 28 42 22 L40 14 Z" fill={bodyColor} stroke="#333" strokeWidth="1" />
    </svg>
  );
};

const bagIcon = (color: string, label: string) => (props: { size?: number; className?: string }) => {
  const size = props.size || 24;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
      <path d="M18 18 L20 52 Q20 56 24 56 L40 56 Q44 56 44 52 L46 18 Z" fill={color} stroke="#333" strokeWidth="1" />
      <line x1="20" y1="18" x2="44" y2="18" stroke="#333" strokeWidth="1" />
      <text x="32" y="40" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">{label}</text>
    </svg>
  );
};

const meatCut = (color: string, fatColor: string) => (props: { size?: number; className?: string }) => {
  const size = props.size || 24;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
      <ellipse cx="32" cy="32" rx="22" ry="20" fill={color} />
      <ellipse cx="28" cy="28" rx="8" ry="6" fill={fatColor} opacity="0.6" />
      <ellipse cx="38" cy="36" rx="6" ry="8" fill={fatColor} opacity="0.6" />
      <path d="M20 32 Q24 28 28 32 Q24 36 20 32" fill={fatColor} opacity="0.4" />
    </svg>
  );
};

const fishBody = (bodyColor: string, finColor: string) => (props: { size?: number; className?: string }) => {
  const size = props.size || 24;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
      <ellipse cx="28" cy="32" rx="18" ry="12" fill={bodyColor} />
      <polygon points="46,32 54,24 54,40" fill={finColor} />
      <circle cx="42" cy="28" r="2" fill="#333" />
      <path d="M20 26 L14 20 L16 26 Z" fill={finColor} />
      <path d="M20 38 L14 44 L16 38 Z" fill={finColor} />
    </svg>
  );
};

const bowl = (color: string, contentColor: string) => (props: { size?: number; className?: string }) => {
  const size = props.size || 24;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
      <path d="M20 32 Q20 44 32 50 Q44 44 44 32" fill={color} stroke="#333" strokeWidth="1" />
      <ellipse cx="32" cy="32" rx="12" ry="4" fill={contentColor} opacity="0.7" />
    </svg>
  );
};

// Category names
export const ICON_CATEGORIES = [
  "Vegetables & Fresh Produce",
  "Fruits & Berries",
  "Meat, Poultry & Game",
  "Fish, Seafood & Marine",
  "Dairy, Eggs & Plant Milks",
  "Grains, Flours, Rice & Pasta",
  "Beans, Legumes, Tofu & Nuts",
  "Herbs, Spices & Seasonings",
  "Condiments, Oils & Liquids",
  "Sugars, Sweets & Baking Agents"
];

// All 300 icons
export const ICON_DICT = [
  // Category 1: Vegetables & Fresh Produce (1-30)
  { id: 1, name: "Garlic", category: ICON_CATEGORIES[0], render: bagIcon("#F5DEB3", "G") },
  { id: 2, name: "Red Onion", category: ICON_CATEGORIES[0], render: roundFruit("#8B0000", "#228B22") },
  { id: 3, name: "Ginger", category: ICON_CATEGORIES[0], render: longVeg("#D2B48C", "#8B6914", "#654321") },
  { id: 4, name: "Tomato", category: ICON_CATEGORIES[0], render: roundFruit("#DC143C", "#228B22", "#FFD700") },
  { id: 5, name: "Calamansi", category: ICON_CATEGORIES[0], render: roundFruit("#7FCD16", "#228B22") },
  { id: 6, name: "Chili Pepper", category: ICON_CATEGORIES[0], render: longVeg("#DC143C", "#8B0000", "#228B22") },
  { id: 7, name: "Green Long Chili", category: ICON_CATEGORIES[0], render: longVeg("#228B22", "#006400", "#1A4D1A") },
  { id: 8, name: "Carrot", category: ICON_CATEGORIES[0], render: longVeg("#FF8C00", "#FF6347", "#228B22") },
  { id: 9, name: "Potato", category: ICON_CATEGORIES[0], render: roundFruit("#8B7355", "#654321") },
  { id: 10, name: "Cabbage", category: ICON_CATEGORIES[0], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="24" fill="#7CB342" />
        <circle cx="32" cy="32" r="22" fill="#8BC34A" />
        <path d="M15 32 Q15 20 32 12 Q49 20 49 32" fill="#7CB342" opacity="0.6" />
        <path d="M15 32 Q15 44 32 52 Q49 44 49 32" fill="#6BA82E" opacity="0.6" />
      </svg>
    );
  } },
  { id: 11, name: "Eggplant", category: ICON_CATEGORIES[0], render: longVeg("#4B0082", "#3A0066", "#228B22") },
  { id: 12, name: "String Beans", category: ICON_CATEGORIES[0], render: longVeg("#228B22", "#006400", "#1A4D1A") },
  { id: 13, name: "Bitter Melon", category: ICON_CATEGORIES[0], render: longVeg("#7CB342", "#5A7824", "#228B22") },
  { id: 14, name: "Squash", category: ICON_CATEGORIES[0], render: roundFruit("#FFD700", "#FFA500") },
  { id: 15, name: "Sayote", category: ICON_CATEGORIES[0], render: roundFruit("#90EE90", "#228B22") },
  { id: 16, name: "Moringa Leaves", category: ICON_CATEGORIES[0], render: leafIcon("#228B22", "#1A4D1A") },
  { id: 17, name: "Bok Choy", category: ICON_CATEGORIES[0], render: leafIcon("#7CB342", "#228B22") },
  { id: 18, name: "Kang Kong", category: ICON_CATEGORIES[0], render: leafIcon("#3CB371", "#228B22") },
  { id: 19, name: "Sweet Potato", category: ICON_CATEGORIES[0], render: roundFruit("#CD5C5C", "#8B4513") },
  { id: 20, name: "Taro", category: ICON_CATEGORIES[0], render: roundFruit("#A0522D", "#654321") },
  { id: 21, name: "Radish", category: ICON_CATEGORIES[0], render: roundFruit("#FF69B4", "#228B22") },
  { id: 22, name: "Okra", category: ICON_CATEGORIES[0], render: longVeg("#7CB342", "#6BA82E", "#228B22") },
  { id: 23, name: "Scallion", category: ICON_CATEGORIES[0], render: leafIcon("#7CB342", "#228B22") },
  { id: 24, name: "Sweet Potato Leaves", category: ICON_CATEGORIES[0], render: leafIcon("#9ACD32", "#7CB342") },
  { id: 25, name: "Cucumber", category: ICON_CATEGORIES[0], render: longVeg("#7CB342", "#6BA82E", "#228B22") },
  { id: 26, name: "Bell Pepper", category: ICON_CATEGORIES[0], render: longVeg("#DC143C", "#8B0000", "#228B22") },
  { id: 27, name: "Celery", category: ICON_CATEGORIES[0], render: leafIcon("#7CB342", "#228B22") },
  { id: 28, name: "Lemongrass", category: ICON_CATEGORIES[0], render: leafIcon("#9ACD32", "#7CB342") },
  { id: 29, name: "White Onion", category: ICON_CATEGORIES[0], render: roundFruit("#FFFACD", "#F0E68C") },
  { id: 30, name: "Jicama", category: ICON_CATEGORIES[0], render: roundFruit("#F5DEB3", "#DAA520") },

  // Category 2: Fruits & Berries (31-60)
  { id: 31, name: "Ripe Mango", category: ICON_CATEGORIES[1], render: roundFruit("#FFD700", "#FFA500") },
  { id: 32, name: "Green Mango", category: ICON_CATEGORIES[1], render: roundFruit("#7CB342", "#6BA82E") },
  { id: 33, name: "Banana (Saba)", category: ICON_CATEGORIES[1], render: longVeg("#FFD700", "#FFA500", "#DAA520") },
  { id: 34, name: "Banana (Latundan)", category: ICON_CATEGORIES[1], render: longVeg("#FFEB3B", "#FDD835", "#DAA520") },
  { id: 35, name: "Pineapple", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="36" rx="18" ry="22" fill="#FFD700" />
        <path d="M32 10 L28 18 L36 18 Z" fill="#7CB342" />
        <path d="M26 16 L30 22 M32 14 L32 22 M38 16 L34 22" stroke="#7CB342" strokeWidth="1" />
        <line x1="22" y1="28" x2="42" y2="28" stroke="#F4A460" strokeWidth="0.5" opacity="0.5" />
        <line x1="20" y1="34" x2="44" y2="34" stroke="#F4A460" strokeWidth="0.5" opacity="0.5" />
        <line x1="22" y1="40" x2="42" y2="40" stroke="#F4A460" strokeWidth="0.5" opacity="0.5" />
      </svg>
    );
  } },
  { id: 36, name: "Papaya (Green)", category: ICON_CATEGORIES[1], render: roundFruit("#7CB342", "#6BA82E", "#FFD700") },
  { id: 37, name: "Papaya (Ripe)", category: ICON_CATEGORIES[1], render: roundFruit("#FF8C00", "#FFD700", "#000") },
  { id: 38, name: "Coconut (Young)", category: ICON_CATEGORIES[1], render: roundFruit("#D2B48C", "#C19A6B") },
  { id: 39, name: "Coconut (Mature)", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="24" fill="#8B7355" />
        <path d="M20 20 L16 12 L20 16 M44 20 L48 12 L44 16 M32 16 L32 8 L28 14 L36 14" fill="#8B7355" />
        <circle cx="32" cy="32" r="20" fill="#A0826D" />
        <path d="M18 32 L28 28 L28 36 Z M46 32 L36 28 L36 36 Z" fill="#654321" opacity="0.3" />
      </svg>
    );
  } },
  { id: 40, name: "Avocado", category: ICON_CATEGORIES[1], render: roundFruit("#6B8E23", "#556B2F", "#8B7355") },
  { id: 41, name: "Watermelon", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="24" fill="#FF1493" />
        <circle cx="32" cy="32" r="22" fill="#DC143C" />
        <path d="M20 20 Q32 16 44 24 Q40 32 32 36 Q24 32 20 20" fill="#FFB6C1" />
        <circle cx="26" cy="24" r="1.5" fill="#000" />
        <circle cx="32" cy="28" r="1.5" fill="#000" />
        <circle cx="38" cy="26" r="1.5" fill="#000" />
        <path d="M32 8 L28 12 L32 14 L36 12 Z" fill="#228B22" />
      </svg>
    );
  } },
  { id: 42, name: "Calamansi Fruit", category: ICON_CATEGORIES[1], render: roundFruit("#FFEB3B", "#FDD835") },
  { id: 43, name: "Jackfruit", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="32" rx="20" ry="24" fill="#FFB90F" />
        <path d="M16 24 L22 18 M20 32 L24 28 M16 40 L22 46 M48 24 L42 18 M44 32 L40 28 M48 40 L42 46" stroke="#CD8500" strokeWidth="2" />
        <path d="M32 8 L28 14 L32 16 L36 14 Z" fill="#7CB342" />
      </svg>
    );
  } },
  { id: 44, name: "Tamarind", category: ICON_CATEGORIES[1], render: roundFruit("#8B6914", "#654321") },
  { id: 45, name: "Guava", category: ICON_CATEGORIES[1], render: roundFruit("#C1FFC1", "#7CB342", "#FFD700") },
  { id: 46, name: "Santol", category: ICON_CATEGORIES[1], render: roundFruit("#F4A460", "#CD853F") },
  { id: 47, name: "Star Apple", category: ICON_CATEGORIES[1], render: roundFruit("#9370DB", "#8B008B") },
  { id: 48, name: "Sugar Apple", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="24" fill="#90EE90" />
        <circle cx="24" cy="24" r="8" fill="#7CB342" />
        <circle cx="40" cy="24" r="8" fill="#7CB342" />
        <circle cx="32" cy="38" r="8" fill="#7CB342" />
        <circle cx="28" cy="44" r="6" fill="#6BA82E" />
        <circle cx="36" cy="44" r="6" fill="#6BA82E" />
        <path d="M32 12 L30 18 L32 20 L34 18 Z" fill="#228B22" />
      </svg>
    );
  } },
  { id: 49, name: "Soursop", category: ICON_CATEGORIES[1], render: roundFruit("#90EE90", "#7CB342") },
  { id: 50, name: "Apple (Red)", category: ICON_CATEGORIES[1], render: roundFruit("#DC143C", "#228B22") },
  { id: 51, name: "Orange", category: ICON_CATEGORIES[1], render: roundFruit("#FFA500", "#FF8C00") },
  { id: 52, name: "Grapes", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="28" cy="24" r="6" fill="#9370DB" />
        <circle cx="36" cy="24" r="6" fill="#9370DB" />
        <circle cx="32" cy="32" r="6" fill="#9370DB" />
        <circle cx="24" cy="36" r="6" fill="#9370DB" />
        <circle cx="40" cy="36" r="6" fill="#9370DB" />
        <circle cx="28" cy="44" r="6" fill="#9370DB" />
        <circle cx="36" cy="44" r="6" fill="#9370DB" />
        <path d="M32 18 L30 12 L32 14 L34 12 Z" fill="#7CB342" />
      </svg>
    );
  } },
  { id: 53, name: "Melon (Cantaloupe)", category: ICON_CATEGORIES[1], render: roundFruit("#FF8C00", "#FFA500") },
  { id: 54, name: "Pear", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="36" rx="14" ry="18" fill="#9ACD32" />
        <ellipse cx="32" cy="22" rx="12" ry="14" fill="#ADFF2F" />
        <path d="M32 10 L30 16 L32 18 L34 16 Z" fill="#7CB342" />
      </svg>
    );
  } },
  { id: 55, name: "Strawberry", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M24 24 Q20 32 24 44 Q32 50 40 44 Q44 32 40 24 Q32 20 32 20 Q32 20 24 24" fill="#DC143C" />
        <circle cx="26" cy="30" r="1.5" fill="#FFD700" />
        <circle cx="32" cy="28" r="1.5" fill="#FFD700" />
        <circle cx="38" cy="30" r="1.5" fill="#FFD700" />
        <circle cx="28" cy="38" r="1.5" fill="#FFD700" />
        <circle cx="36" cy="38" r="1.5" fill="#FFD700" />
        <path d="M28 14 L26 20 L28 18 M32 12 L30 18 L32 16 M36 14 L34 20 L36 18 Z" fill="#228B22" />
      </svg>
    );
  } },
  { id: 56, name: "Lychee", category: ICON_CATEGORIES[1], render: roundFruit("#FF1493", "#DC143C") },
  { id: 57, name: "Dragon Fruit", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="32" rx="20" ry="22" fill="#FF1493" />
        <circle cx="28" cy="28" r="2" fill="#FFD700" />
        <circle cx="36" cy="28" r="2" fill="#FFD700" />
        <circle cx="32" cy="36" r="2" fill="#FFD700" />
        <circle cx="26" cy="40" r="2" fill="#FFD700" />
        <circle cx="38" cy="40" r="2" fill="#FFD700" />
        <path d="M20 14 L18 8 L22 12 M32 10 L30 4 L34 10 M44 14 L46 8 L42 12" fill="#FFD700" />
      </svg>
    );
  } },
  { id: 58, name: "Pomelo", category: ICON_CATEGORIES[1], render: roundFruit("#FFD700", "#FFA500") },
  { id: 59, name: "Lime", category: ICON_CATEGORIES[1], render: roundFruit("#90EE90", "#7CB342") },
  { id: 60, name: "Raisins", category: ICON_CATEGORIES[1], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="24" cy="24" r="5" fill="#8B4513" />
        <circle cx="40" cy="24" r="5" fill="#8B4513" />
        <circle cx="32" cy="34" r="5" fill="#8B4513" />
        <circle cx="20" cy="44" r="5" fill="#8B4513" />
        <circle cx="36" cy="44" r="5" fill="#8B4513" />
        <path d="M28 16 L26 10 L28 14 L30 10 Z" fill="#654321" />
      </svg>
    );
  } },

  // Category 3: Meat, Poultry & Game (61-90)
  { id: 61, name: "Pork Belly", category: ICON_CATEGORIES[2], render: meatCut("#DC143C", "#FFB6C1") },
  { id: 62, name: "Pork Shoulder", category: ICON_CATEGORIES[2], render: meatCut("#CD5C5C", "#F08080") },
  { id: 63, name: "Pork Chops", category: ICON_CATEGORIES[2], render: meatCut("#C41E3A", "#FF6B6B") },
  { id: 64, name: "Ground Pork", category: ICON_CATEGORIES[2], render: bowl("#DC143C", "#CD5C5C") },
  { id: 65, name: "Pork Pata", category: ICON_CATEGORIES[2], render: meatCut("#8B4513", "#A0522D") },
  { id: 66, name: "Pork Ribs", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="16" y="16" width="32" height="32" fill="#8B4513" rx="2" />
        <line x1="20" y1="20" x2="20" y2="44" stroke="#A0522D" strokeWidth="2" />
        <line x1="28" y1="20" x2="28" y2="44" stroke="#A0522D" strokeWidth="2" />
        <line x1="36" y1="20" x2="36" y2="44" stroke="#A0522D" strokeWidth="2" />
        <line x1="44" y1="20" x2="44" y2="44" stroke="#A0522D" strokeWidth="2" />
      </svg>
    );
  } },
  { id: 67, name: "Pork Liver", category: ICON_CATEGORIES[2], render: meatCut("#8B0000", "#DC143C") },
  { id: 68, name: "Chicken Breast", category: ICON_CATEGORIES[2], render: meatCut("#FFA07A", "#FFB6C1") },
  { id: 69, name: "Chicken Thigh", category: ICON_CATEGORIES[2], render: meatCut("#CD5C5C", "#F08080") },
  { id: 70, name: "Chicken Drumsticks", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="24" cy="28" rx="8" ry="14" fill="#FF8C69" />
        <circle cx="24" cy="44" r="5" fill="#DAA520" />
        <ellipse cx="40" cy="28" rx="8" ry="14" fill="#FF8C69" />
        <circle cx="40" cy="44" r="5" fill="#DAA520" />
      </svg>
    );
  } },
  { id: 71, name: "Chicken Wings", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="32" rx="10" ry="8" fill="#FF8C69" />
        <path d="M18 28 L10 20 L16 26 Z" fill="#FFB6C1" />
        <path d="M46 28 L54 20 L48 26 Z" fill="#FFB6C1" />
      </svg>
    );
  } },
  { id: 72, name: "Whole Chicken", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="28" rx="14" ry="12" fill="#FF8C69" />
        <circle cx="32" cy="14" r="6" fill="#FFB6C1" />
        <path d="M22 34 L16 44 L22 40 Z" fill="#FFB6C1" />
        <path d="M42 34 L48 44 L42 40 Z" fill="#FFB6C1" />
      </svg>
    );
  } },
  { id: 73, name: "Chicken Liver", category: ICON_CATEGORIES[2], render: meatCut("#8B4513", "#A0522D") },
  { id: 74, name: "Chicken Gizzard", category: ICON_CATEGORIES[2], render: meatCut("#CD853F", "#DAA520") },
  { id: 75, name: "Beef Shank", category: ICON_CATEGORIES[2], render: meatCut("#8B0000", "#DC143C") },
  { id: 76, name: "Beef Brisket", category: ICON_CATEGORIES[2], render: meatCut("#654321", "#8B4513") },
  { id: 77, name: "Ground Beef", category: ICON_CATEGORIES[2], render: bowl("#8B0000", "#DC143C") },
  { id: 78, name: "Beef Sirloin", category: ICON_CATEGORIES[2], render: meatCut("#A0522D", "#8B4513") },
  { id: 79, name: "Bacon", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="20" width="8" height="24" fill="#DC143C" rx="1" />
        <rect x="30" y="20" width="8" height="24" fill="#DC143C" rx="1" />
        <rect x="42" y="20" width="8" height="24" fill="#DC143C" rx="1" />
        <ellipse cx="22" cy="18" rx="5" ry="2" fill="#FFB6C1" />
        <ellipse cx="34" cy="18" rx="5" ry="2" fill="#FFB6C1" />
        <ellipse cx="46" cy="18" rx="5" ry="2" fill="#FFB6C1" />
      </svg>
    );
  } },
  { id: 80, name: "Ham", category: ICON_CATEGORIES[2], render: meatCut("#FF6B6B", "#FFB6C1") },
  { id: 81, name: "Hotdog", category: ICON_CATEGORIES[2], render: longVeg("#DC143C", "#8B0000", "#654321") },
  { id: 82, name: "Corned Beef", category: ICON_CATEGORIES[2], render: meatCut("#8B4513", "#A0522D") },
  { id: 83, name: "Luncheon Meat", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="20" width="28" height="24" fill="#DC143C" rx="2" />
        <rect x="20" y="22" width="24" height="20" fill="#FF6B6B" />
        <line x1="20" y1="26" x2="44" y2="26" stroke="#DC143C" strokeWidth="1" />
        <line x1="20" y1="30" x2="44" y2="30" stroke="#DC143C" strokeWidth="1" />
      </svg>
    );
  } },
  { id: 84, name: "Pork Sausages", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M18 22 Q20 18 24 20 Q26 24 24 28 Q20 30 18 26 Z" fill="#CD5C5C" />
        <path d="M28 20 Q30 16 34 18 Q36 22 34 26 Q30 28 28 24 Z" fill="#CD5C5C" />
        <path d="M38 22 Q40 18 44 20 Q46 24 44 28 Q40 30 38 26 Z" fill="#CD5C5C" />
      </svg>
    );
  } },
  { id: 85, name: "Chorizo", category: ICON_CATEGORIES[2], render: longVeg("#8B0000", "#DC143C", "#654321") },
  { id: 86, name: "Pork Bones", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="24" y="28" width="16" height="8" fill="#FFFACD" rx="2" />
        <circle cx="18" cy="32" r="4" fill="#FFFACD" />
        <circle cx="46" cy="32" r="4" fill="#FFFACD" />
      </svg>
    );
  } },
  { id: 87, name: "Beef Bones", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="22" y="26" width="20" height="12" fill="#D2B48C" rx="2" />
        <circle cx="16" cy="32" r="5" fill="#D2B48C" />
        <circle cx="48" cy="32" r="5" fill="#D2B48C" />
      </svg>
    );
  } },
  { id: 88, name: "Chicken Bones", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="26" y="30" width="12" height="6" fill="#F5DEB3" rx="1" />
        <circle cx="20" cy="33" r="3" fill="#F5DEB3" />
        <circle cx="44" cy="33" r="3" fill="#F5DEB3" />
      </svg>
    );
  } },
  { id: 89, name: "Goat Meat", category: ICON_CATEGORIES[2], render: meatCut("#8B4513", "#CD853F") },
  { id: 90, name: "Pepperoni", category: ICON_CATEGORIES[2], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="28" cy="28" r="6" fill="#DC143C" />
        <circle cx="40" cy="28" r="6" fill="#DC143C" />
        <circle cx="34" cy="40" r="6" fill="#DC143C" />
        <circle cx="26" cy="48" r="5" fill="#DC143C" />
      </svg>
    );
  } },

  // Category 4: Fish, Seafood & Marine (91-120)
  { id: 91, name: "Milkfish", category: ICON_CATEGORIES[3], render: fishBody("#C0C0C0", "#87CEEB") },
  { id: 92, name: "Tilapia", category: ICON_CATEGORIES[3], render: fishBody("#A9A9A9", "#4169E1") },
  { id: 93, name: "Shrimp/Prawn", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M20 32 Q24 28 32 28 Q40 28 44 32 Q40 36 32 36 Q24 36 20 32" fill="#FF69B4" />
        <circle cx="44" cy="32" r="2" fill="#333" />
        <path d="M44 30 L48 26 M44 30 L50 28 M44 34 L48 38 M44 34 L50 36" stroke="#FF69B4" strokeWidth="1" />
      </svg>
    );
  } },
  { id: 94, name: "Squid", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="24" r="10" fill="#8B008B" />
        <circle cx="26" cy="22" r="2" fill="#FFF" />
        <circle cx="38" cy="22" r="2" fill="#FFF" />
        <path d="M22 34 L18 50 M26 34 L24 50 M32 34 L32 50 M38 34 L40 50 M42 34 L46 50" stroke="#8B008B" strokeWidth="2" />
      </svg>
    );
  } },
  { id: 95, name: "Tuna (Canned)", category: ICON_CATEGORIES[3], render: jar("#4169E1", "#C0C0C0", "#DAA520") },
  { id: 96, name: "Tuna (Fresh)", category: ICON_CATEGORIES[3], render: fishBody("#4169E1", "#1E90FF") },
  { id: 97, name: "Sardines (Canned)", category: ICON_CATEGORIES[3], render: jar("#FF6347", "#DAA520", "#DAA520") },
  { id: 98, name: "Mackerel (Canned)", category: ICON_CATEGORIES[3], render: jar("#708090", "#DAA520", "#DAA520") },
  { id: 99, name: "Anchovies", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="22" cy="32" rx="6" ry="10" fill="#2C3E50" />
        <ellipse cx="32" cy="32" rx="6" ry="10" fill="#2C3E50" />
        <ellipse cx="42" cy="32" rx="6" ry="10" fill="#2C3E50" />
        <circle cx="20" cy="30" r="1" fill="#FFD700" />
        <circle cx="30" cy="30" r="1" fill="#FFD700" />
        <circle cx="40" cy="30" r="1" fill="#FFD700" />
      </svg>
    );
  } },
  { id: 100, name: "Mussels", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M24 24 L20 44 Q20 48 24 48 L28 48 Q32 48 32 44 L28 24 Z" fill="#4B0082" />
        <path d="M40 24 L36 44 Q36 48 40 48 L44 48 Q48 48 48 44 L44 24 Z" fill="#6A0DAD" />
        <line x1="24" y1="24" x2="28" y2="24" stroke="#333" strokeWidth="1" />
        <line x1="40" y1="24" x2="44" y2="24" stroke="#333" strokeWidth="1" />
      </svg>
    );
  } },
  { id: 101, name: "Clams", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M20 32 Q20 20 32 16 Q44 20 44 32 Q44 44 32 48 Q20 44 20 32" fill="#D3D3D3" />
        <line x1="32" y1="16" x2="32" y2="48" stroke="#333" strokeWidth="2" />
        <path d="M24 28 Q28 26 32 26" stroke="#333" strokeWidth="1" fill="none" />
        <path d="M40 28 Q36 26 32 26" stroke="#333" strokeWidth="1" fill="none" />
      </svg>
    );
  } },
  { id: 102, name: "Crab", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="36" rx="14" ry="12" fill="#DC143C" />
        <circle cx="20" cy="36" r="5" fill="#DC143C" />
        <circle cx="44" cy="36" r="5" fill="#DC143C" />
        <circle cx="28" cy="22" r="3" fill="#DC143C" />
        <circle cx="36" cy="22" r="3" fill="#DC143C" />
        <path d="M16 34 L8 26 M16 36 L8 36 M16 38 L8 46 M48 34 L56 26 M48 36 L56 36 M48 38 L56 46" stroke="#DC143C" strokeWidth="2" />
      </svg>
    );
  } },
  { id: 103, name: "Salmon Belly", category: ICON_CATEGORIES[3], render: meatCut("#FF6B6B", "#FFB6C1") },
  { id: 104, name: "Salmon Fillet", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="22" width="28" height="20" fill="#FF7F50" rx="2" />
        <ellipse cx="42" cy="32" rx="3" ry="2" fill="#FFB6C1" />
        <ellipse cx="46" cy="28" rx="2" ry="3" fill="#FFB6C1" />
      </svg>
    );
  } },
  { id: 105, name: "Snapper", category: ICON_CATEGORIES[3], render: fishBody("#FF6347", "#FF8C69") },
  { id: 106, name: "Grouper", category: ICON_CATEGORIES[3], render: fishBody("#696969", "#808080") },
  { id: 107, name: "Catfish", category: ICON_CATEGORIES[3], render: fishBody("#2C3E50", "#34495E") },
  { id: 108, name: "Smoked Fish", category: ICON_CATEGORIES[3], render: fishBody("#8B4513", "#A0522D") },
  { id: 109, name: "Dried Fish (Dilis)", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="28" cy="32" rx="6" ry="12" fill="#8B7355" />
        <ellipse cx="40" cy="32" rx="6" ry="12" fill="#8B7355" />
        <circle cx="26" cy="30" r="1" fill="#333" />
        <circle cx="38" cy="30" r="1" fill="#333" />
      </svg>
    );
  } },
  { id: 110, name: "Dried Fish (Daing)", category: ICON_CATEGORIES[3], render: fishBody("#A0826D", "#8B7355") },
  { id: 111, name: "Fish Balls", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="24" cy="28" r="6" fill="#D3D3D3" />
        <circle cx="40" cy="28" r="6" fill="#D3D3D3" />
        <circle cx="32" cy="40" r="6" fill="#D3D3D3" />
        <circle cx="23" cy="27" r="1" fill="#333" />
        <circle cx="39" cy="27" r="1" fill="#333" />
        <circle cx="31" cy="39" r="1" fill="#333" />
      </svg>
    );
  } },
  { id: 112, name: "Squid Balls", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="24" cy="28" r="6" fill="#8B008B" />
        <circle cx="40" cy="28" r="6" fill="#8B008B" />
        <circle cx="32" cy="40" r="6" fill="#8B008B" />
      </svg>
    );
  } },
  { id: 113, name: "Crab Sticks", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="16" y="20" width="6" height="28" fill="#FF7F50" rx="2" />
        <rect x="26" y="20" width="6" height="28" fill="#FF7F50" rx="2" />
        <rect x="36" y="20" width="6" height="28" fill="#FF7F50" rx="2" />
        <rect x="46" y="20" width="6" height="28" fill="#FF7F50" rx="2" />
      </svg>
    );
  } },
  { id: 114, name: "Bagoong Alamang", category: ICON_CATEGORIES[3], render: jar("#C41E3A", "#696969", "#DAA520") },
  { id: 115, name: "Bagoong Isda", category: ICON_CATEGORIES[3], render: jar("#8B4513", "#A0522D", "#DAA520") },
  { id: 116, name: "Nori Sheet", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="16" y="18" width="32" height="32" fill="#1C1C1C" />
        <line x1="24" y1="18" x2="24" y2="50" stroke="#333" strokeWidth="0.5" />
        <line x1="32" y1="18" x2="32" y2="50" stroke="#333" strokeWidth="0.5" />
        <line x1="40" y1="18" x2="40" y2="50" stroke="#333" strokeWidth="0.5" />
        <line x1="16" y1="26" x2="48" y2="26" stroke="#333" strokeWidth="0.5" />
        <line x1="16" y1="34" x2="48" y2="34" stroke="#333" strokeWidth="0.5" />
      </svg>
    );
  } },
  { id: 117, name: "Seaweed (Guso)", category: ICON_CATEGORIES[3], render: leafIcon("#1C5533", "#0D2E1F") },
  { id: 118, name: "Scallops", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M24 32 Q20 24 24 16 Q24 32 24 48 Z" fill="#FF69B4" />
        <path d="M40 32 Q44 24 40 16 Q40 32 40 48 Z" fill="#FF1493" />
        <line x1="28" y1="16" x2="36" y2="16" stroke="#333" strokeWidth="2" />
      </svg>
    );
  } },
  { id: 119, name: "Octopus", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="20" r="8" fill="#8B008B" />
        <circle cx="26" cy="18" r="2" fill="#FFF" />
        <circle cx="38" cy="18" r="2" fill="#FFF" />
        <path d="M22 28 L18 50 M26 28 L24 50 M30 28 L30 50 M34 28 L34 50 M38 28 L40 50 M42 28 L46 50" stroke="#8B008B" strokeWidth="2" />
      </svg>
    );
  } },
  { id: 120, name: "Oysters", category: ICON_CATEGORIES[3], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M20 28 Q16 24 16 32 Q16 44 20 48 Q20 36 20 28" fill="#C0C0C0" />
        <path d="M44 28 Q48 24 48 32 Q48 44 44 48 Q44 36 44 28" fill="#C0C0C0" />
        <line x1="20" y1="28" x2="44" y2="28" stroke="#333" strokeWidth="2" />
      </svg>
    );
  } },

  // Category 5: Dairy, Eggs & Plant Milks (121-150)
  { id: 121, name: "Chicken Egg", category: ICON_CATEGORIES[4], render: roundFruit("#FFFACD", "#F0E68C") },
  { id: 122, name: "Salted Egg", category: ICON_CATEGORIES[4], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="22" fill="#DAA520" />
        <circle cx="32" cy="32" r="20" fill="#FFD700" />
        <circle cx="32" cy="28" r="8" fill="#FFA500" />
        <circle cx="32" cy="28" r="5" fill="#FF8C00" />
      </svg>
    );
  } },
  { id: 123, name: "Quail Egg", category: ICON_CATEGORIES[4], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="32" rx="12" ry="16" fill="#F5F5DC" />
        <circle cx="28" cy="28" r="2" fill="#8B7355" />
        <circle cx="36" cy="28" r="2" fill="#8B7355" />
        <circle cx="32" cy="38" r="2" fill="#8B7355" />
      </svg>
    );
  } },
  { id: 124, name: "Heavy Cream", category: ICON_CATEGORIES[4], render: bottle("#F5F5F5", "#DAA520") },
  { id: 125, name: "Evaporated Milk", category: ICON_CATEGORIES[4], render: jar("#F5F5F5", "#FFFACD", "#DAA520") },
  { id: 126, name: "Condensed Milk", category: ICON_CATEGORIES[4], render: jar("#F0E68C", "#FFF8DC", "#DAA520") },
  { id: 127, name: "Whole Milk", category: ICON_CATEGORIES[4], render: bottle("#F5F5F5", "#DAA520") },
  { id: 128, name: "Powdered Milk", category: ICON_CATEGORIES[4], render: bagIcon("#F5F5F5", "Milk") },
  { id: 129, name: "Unsalted Butter", category: ICON_CATEGORIES[4], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="20" width="28" height="24" fill="#FFD700" rx="3" />
        <rect x="20" y="22" width="24" height="20" fill="#FFEC8B" />
        <line x1="20" y1="26" x2="44" y2="26" stroke="#DAA520" strokeWidth="0.5" opacity="0.5" />
      </svg>
    );
  } },
  { id: 130, name: "Salted Butter", category: ICON_CATEGORIES[4], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="20" width="28" height="24" fill="#FFD700" rx="3" />
        <rect x="20" y="22" width="24" height="20" fill="#FFEC8B" />
        <circle cx="26" cy="28" r="1" fill="#FFF" />
        <circle cx="32" cy="32" r="1" fill="#FFF" />
        <circle cx="38" cy="30" r="1" fill="#FFF" />
      </svg>
    );
  } },
  { id: 131, name: "Margarine", category: ICON_CATEGORIES[4], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="20" width="28" height="24" fill="#F5DEB3" rx="3" />
        <rect x="20" y="22" width="24" height="20" fill="#FAEBD7" />
      </svg>
    );
  } },
  { id: 132, name: "Cheddar Cheese", category: ICON_CATEGORIES[4], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="20" y="24" width="24" height="20" fill="#FFD700" rx="2" />
        <path d="M44 24 L48 20 L48 36 Z" fill="#FFD700" />
      </svg>
    );
  } },
  { id: 133, name: "Quickmelt Cheese", category: ICON_CATEGORIES[4], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="16" y="22" width="32" height="4" fill="#FFEC8B" rx="1" />
        <rect x="16" y="28" width="32" height="4" fill="#FFEC8B" rx="1" />
        <rect x="16" y="34" width="32" height="4" fill="#FFEC8B" rx="1" />
      </svg>
    );
  } },
  { id: 134, name: "Mozzarella Cheese", category: ICON_CATEGORIES[4], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="28" cy="32" r="10" fill="#FFF8DC" />
        <circle cx="40" cy="32" r="10" fill="#FFF8DC" />
        <circle cx="34" cy="44" r="8" fill="#FFF8DC" />
      </svg>
    );
  } },
  { id: 135, name: "Parmesan Cheese", category: ICON_CATEGORIES[4], render: bagIcon("#F5DEB3", "Parm") },
  { id: 136, name: "Cream Cheese", category: ICON_CATEGORIES[4], render: jar("#F5F5F5", "#F0F0F0", "#DAA520") },
  { id: 137, name: "Coconut Milk", category: ICON_CATEGORIES[4], render: bottle("#F5F5DC", "#DAA520") },
  { id: 138, name: "Coconut Cream", category: ICON_CATEGORIES[4], render: bottle("#FFFACD", "#DAA520") },
  { id: 139, name: "Soy Milk", category: ICON_CATEGORIES[4], render: bottle("#F5DEB3", "#DAA520") },
  { id: 140, name: "Almond Milk", category: ICON_CATEGORIES[4], render: bottle("#F5F5DC", "#DAA520") },
  { id: 141, name: "Oat Milk", category: ICON_CATEGORIES[4], render: bottle("#DEB887", "#DAA520") },
  { id: 142, name: "Plain Yogurt", category: ICON_CATEGORIES[4], render: bowl("#F0F0F0", "#FFFACD") },
  { id: 143, name: "Greek Yogurt", category: ICON_CATEGORIES[4], render: bowl("#F5F5F5", "#FFF8DC") },
  { id: 144, name: "Sour Cream", category: ICON_CATEGORIES[4], render: bowl("#F5F5F5", "#F0F0F0") },
  { id: 145, name: "Whey Protein", category: ICON_CATEGORIES[4], render: bagIcon("#FAFAFA", "Whey") },
  { id: 146, name: "Condensed Creamer", category: ICON_CATEGORIES[4], render: bottle("#F5DEB3", "#DAA520") },
  { id: 147, name: "Buttermilk", category: ICON_CATEGORIES[4], render: bottle("#F5F5F5", "#DAA520") },
  { id: 148, name: "Skim Milk", category: ICON_CATEGORIES[4], render: bottle("#F5F5F5", "#DAA520") },
  { id: 149, name: "Low Fat Milk", category: ICON_CATEGORIES[4], render: bottle("#F5F5F5", "#DAA520") },
  { id: 150, name: "Cheese Powder", category: ICON_CATEGORIES[4], render: bagIcon("#FFEC8B", "Chz") },

  // Category 6: Grains, Flours, Rice & Pasta (151-180)
  { id: 151, name: "Jasmine Rice", category: ICON_CATEGORIES[5], render: bowl("#F5DEB3", "#F4A460") },
  { id: 152, name: "White Rice", category: ICON_CATEGORIES[5], render: bowl("#FFFACD", "#F0E68C") },
  { id: 153, name: "Brown Rice", category: ICON_CATEGORIES[5], render: bowl("#8B6914", "#A0826D") },
  { id: 154, name: "Glutinous Rice", category: ICON_CATEGORIES[5], render: bowl("#F5DEB3", "#D2B48C") },
  { id: 155, name: "All-Purpose Flour", category: ICON_CATEGORIES[5], render: bagIcon("#F5F5DC", "APF") },
  { id: 156, name: "Cornstarch", category: ICON_CATEGORIES[5], render: bagIcon("#F5F5F5", "CrnS") },
  { id: 157, name: "Rice Flour", category: ICON_CATEGORIES[5], render: bagIcon("#F5DEB3", "RF") },
  { id: 158, name: "Glutinous Rice Flour", category: ICON_CATEGORIES[5], render: bagIcon("#DEB887", "GRF") },
  { id: 159, name: "Breadcrumbs", category: ICON_CATEGORIES[5], render: bagIcon("#D2B48C", "BC") },
  { id: 160, name: "Spaghetti", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="18" rx="8" ry="3" fill="#D2B48C" />
        <path d="M26 18 L24 48 M32 18 L32 48 M38 18 L40 48" stroke="#D2B48C" strokeWidth="2" />
      </svg>
    );
  } },
  { id: 161, name: "Macaroni", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M20 24 Q20 16 28 16 Q28 24 20 24" fill="#D2B48C" stroke="#8B6914" strokeWidth="1" />
        <path d="M32 24 Q32 16 40 16 Q40 24 32 24" fill="#D2B48C" stroke="#8B6914" strokeWidth="1" />
        <path d="M20 32 Q20 40 28 40 Q28 32 20 32" fill="#D2B48C" stroke="#8B6914" strokeWidth="1" />
        <path d="M32 32 Q32 40 40 40 Q40 32 32 32" fill="#D2B48C" stroke="#8B6914" strokeWidth="1" />
      </svg>
    );
  } },
  { id: 162, name: "Bihon Noodles", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M18 32 Q22 24 26 32 Q30 40 34 32 Q38 24 42 32 Q46 40 50 32" stroke="#FFD700" strokeWidth="2" fill="none" />
        <circle cx="32" cy="32" r="14" fill="none" stroke="#F4A460" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  } },
  { id: 163, name: "Canton Noodles", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="16" fill="#DAA520" stroke="#8B6914" strokeWidth="1" />
        <path d="M20 32 Q32 26 44 32 Q32 38 20 32" fill="#FFD700" opacity="0.5" />
      </svg>
    );
  } },
  { id: 164, name: "Sotanghon Noodles", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="14" fill="#F5F5DC" stroke="#8B6914" strokeWidth="1" />
        <path d="M24 28 L40 36 M24 36 L40 28" stroke="#D3D3D3" strokeWidth="1" opacity="0.7" />
      </svg>
    );
  } },
  { id: 165, name: "Instant Ramen", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="16" fill="#FFD700" stroke="#8B6914" strokeWidth="1" />
        <path d="M22 24 Q32 20 42 24 Q32 40 22 24" fill="#F4A460" opacity="0.6" />
      </svg>
    );
  } },
  { id: 166, name: "Lumpia Wrapper", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="20" y="24" width="24" height="24" fill="#FFFACD" stroke="#8B6914" strokeWidth="1" />
        <line x1="20" y1="32" x2="44" y2="32" stroke="#F0E68C" strokeWidth="0.5" />
        <line x1="20" y1="40" x2="44" y2="40" stroke="#F0E68C" strokeWidth="0.5" />
      </svg>
    );
  } },
  { id: 167, name: "Wonton Wrapper", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <polygon points="32,20 44,32 32,44 20,32" fill="#F5F5DC" stroke="#8B6914" strokeWidth="1" />
        <line x1="32" y1="26" x2="32" y2="38" stroke="#F0E68C" strokeWidth="0.5" />
      </svg>
    );
  } },
  { id: 168, name: "Rolled Oats", category: ICON_CATEGORIES[5], render: bowl("#8B7355", "#D2B48C") },
  { id: 169, name: "Bread Flour", category: ICON_CATEGORIES[5], render: bagIcon("#F5F5DC", "BF") },
  { id: 170, name: "Cake Flour", category: ICON_CATEGORIES[5], render: bagIcon("#FAFAFA", "CF") },
  { id: 171, name: "Baking Powder", category: ICON_CATEGORIES[5], render: bagIcon("#F5F5F5", "BP") },
  { id: 172, name: "Baking Soda", category: ICON_CATEGORIES[5], render: bagIcon("#F5F5F5", "BS") },
  { id: 173, name: "Yeast", category: ICON_CATEGORIES[5], render: bagIcon("#D4A574", "Y") },
  { id: 174, name: "Penne", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="20" cy="32" rx="4" ry="8" fill="#DAA520" transform="rotate(-30 20 32)" />
        <ellipse cx="32" cy="32" rx="4" ry="8" fill="#DAA520" transform="rotate(0 32 32)" />
        <ellipse cx="44" cy="32" rx="4" ry="8" fill="#DAA520" transform="rotate(30 44 32)" />
      </svg>
    );
  } },
  { id: 175, name: "Fettuccine", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="18" rx="10" ry="3" fill="#D2B48C" />
        <path d="M24 18 L22 48 M32 18 L32 48 M40 18 L42 48" stroke="#D2B48C" strokeWidth="2" />
      </svg>
    );
  } },
  { id: 176, name: "Lasagna Sheets", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="16" y="20" width="32" height="4" fill="#DAA520" />
        <rect x="16" y="28" width="32" height="4" fill="#D2B48C" />
        <rect x="16" y="36" width="32" height="4" fill="#DAA520" />
      </svg>
    );
  } },
  { id: 177, name: "Macaroni Salad", category: ICON_CATEGORIES[5], render: bowl("#D2B48C", "#FFEC8B") },
  { id: 178, name: "Flour Tortillas", category: ICON_CATEGORIES[5], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="18" fill="#F5DEB3" stroke="#8B6914" strokeWidth="1" />
        <line x1="20" y1="32" x2="44" y2="32" stroke="#D2B48C" strokeWidth="0.5" opacity="0.5" />
        <line x1="32" y1="20" x2="32" y2="44" stroke="#D2B48C" strokeWidth="0.5" opacity="0.5" />
      </svg>
    );
  } },
  { id: 179, name: "Cornmeal", category: ICON_CATEGORIES[5], render: bagIcon("#FFD700", "Corn") },
  { id: 180, name: "Tapioca Starch", category: ICON_CATEGORIES[5], render: bagIcon("#F5F5DC", "Tap") },

  // Category 7: Beans, Legumes, Tofu & Nuts (181-210)
  { id: 181, name: "Firm Tofu", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="20" width="28" height="28" fill="#F5F5F5" stroke="#999" strokeWidth="1" />
        <line x1="18" y1="32" x2="46" y2="32" stroke="#D3D3D3" strokeWidth="0.5" />
        <line x1="32" y1="20" x2="32" y2="48" stroke="#D3D3D3" strokeWidth="0.5" />
      </svg>
    );
  } },
  { id: 182, name: "Silken Tofu", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="20" width="28" height="28" fill="#FFFACD" stroke="#999" strokeWidth="1" rx="2" />
      </svg>
    );
  } },
  { id: 183, name: "Mung Beans", category: ICON_CATEGORIES[6], render: bowl("#7CB342", "#90EE90") },
  { id: 184, name: "Red Kidney Beans", category: ICON_CATEGORIES[6], render: bowl("#DC143C", "#FF6B6B") },
  { id: 185, name: "Chickpeas", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="24" cy="28" r="4" fill="#D2B48C" />
        <circle cx="32" cy="32" r="4" fill="#D2B48C" />
        <circle cx="40" cy="28" r="4" fill="#D2B48C" />
        <circle cx="28" cy="40" r="4" fill="#D2B48C" />
        <circle cx="36" cy="40" r="4" fill="#D2B48C" />
      </svg>
    );
  } },
  { id: 186, name: "Peanuts", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="24" cy="32" rx="6" ry="10" fill="#8B4513" />
        <ellipse cx="32" cy="32" rx="6" ry="10" fill="#8B4513" />
        <ellipse cx="40" cy="32" rx="6" ry="10" fill="#8B4513" />
      </svg>
    );
  } },
  { id: 187, name: "Green Peas", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="24" cy="24" r="4" fill="#7CB342" />
        <circle cx="40" cy="24" r="4" fill="#7CB342" />
        <circle cx="32" cy="36" r="4" fill="#7CB342" />
        <circle cx="20" cy="42" r="4" fill="#7CB342" />
        <circle cx="44" cy="42" r="4" fill="#7CB342" />
      </svg>
    );
  } },
  { id: 188, name: "Black Beans", category: ICON_CATEGORIES[6], render: bowl("#1C1C1C", "#333") },
  { id: 189, name: "Baked Beans", category: ICON_CATEGORIES[6], render: bowl("#DC143C", "#8B0000") },
  { id: 190, name: "Cashew Nuts", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M24 28 Q20 24 22 18 Q26 16 30 20 Q28 24 24 28" fill="#D2B48C" />
        <path d="M36 28 Q32 24 34 18 Q38 16 42 20 Q40 24 36 28" fill="#D2B48C" />
      </svg>
    );
  } },
  { id: 191, name: "Almonds", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="24" cy="32" rx="5" ry="10" fill="#D2B48C" />
        <ellipse cx="32" cy="32" rx="5" ry="10" fill="#C19A6B" />
        <ellipse cx="40" cy="32" rx="5" ry="10" fill="#D2B48C" />
      </svg>
    );
  } },
  { id: 192, name: "Walnut Halves", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M20 32 Q16 28 16 20 Q20 16 28 20 Q26 28 20 32" fill="#654321" />
        <path d="M44 32 Q48 28 48 20 Q44 16 36 20 Q38 28 44 32" fill="#654321" />
      </svg>
    );
  } },
  { id: 193, name: "Peanut Butter (Creamy)", category: ICON_CATEGORIES[6], render: jar("#8B4513", "#A0522D", "#DAA520") },
  { id: 194, name: "Peanut Butter (Crunchy)", category: ICON_CATEGORIES[6], render: jar("#654321", "#8B4513", "#DAA520") },
  { id: 195, name: "Fried Tofu Puffs", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="24" cy="32" rx="8" ry="10" fill="#D2B48C" />
        <ellipse cx="40" cy="32" rx="8" ry="10" fill="#D2B48C" />
        <path d="M24 24 Q22 20 24 18" stroke="#A0826D" strokeWidth="1" fill="none" />
        <path d="M40 24 Q38 20 40 18" stroke="#A0826D" strokeWidth="1" fill="none" />
      </svg>
    );
  } },
  { id: 196, name: "Sesame Seeds (White)", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="24" cy="26" r="2" fill="#F5F5F5" />
        <circle cx="32" cy="22" r="2" fill="#F5F5F5" />
        <circle cx="40" cy="26" r="2" fill="#F5F5F5" />
        <circle cx="28" cy="34" r="2" fill="#F5F5F5" />
        <circle cx="36" cy="34" r="2" fill="#F5F5F5" />
        <circle cx="32" cy="42" r="2" fill="#F5F5F5" />
      </svg>
    );
  } },
  { id: 197, name: "Sesame Seeds (Black)", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="24" cy="26" r="2" fill="#1C1C1C" />
        <circle cx="32" cy="22" r="2" fill="#1C1C1C" />
        <circle cx="40" cy="26" r="2" fill="#1C1C1C" />
        <circle cx="28" cy="34" r="2" fill="#1C1C1C" />
        <circle cx="36" cy="34" r="2" fill="#1C1C1C" />
        <circle cx="32" cy="42" r="2" fill="#1C1C1C" />
      </svg>
    );
  } },
  { id: 198, name: "Chia Seeds", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="22" cy="28" r="1.5" fill="#333" />
        <circle cx="28" cy="24" r="1.5" fill="#333" />
        <circle cx="34" cy="26" r="1.5" fill="#333" />
        <circle cx="40" cy="30" r="1.5" fill="#333" />
        <circle cx="26" cy="36" r="1.5" fill="#333" />
        <circle cx="36" cy="38" r="1.5" fill="#333" />
      </svg>
    );
  } },
  { id: 199, name: "Soybeans", category: ICON_CATEGORIES[6], render: bowl("#8B4513", "#A0522D") },
  { id: 200, name: "Edamame", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="32" cy="24" rx="8" ry="6" fill="#7CB342" />
        <circle cx="28" cy="32" r="4" fill="#90EE90" />
        <circle cx="36" cy="32" r="4" fill="#90EE90" />
      </svg>
    );
  } },
  { id: 201, name: "Green Lentils", category: ICON_CATEGORIES[6], render: bowl("#7CB342", "#90EE90") },
  { id: 202, name: "Red Lentils", category: ICON_CATEGORIES[6], render: bowl("#DC143C", "#FF6B6B") },
  { id: 203, name: "White Beans", category: ICON_CATEGORIES[6], render: bowl("#F5F5F5", "#FFFACD") },
  { id: 204, name: "Lima Beans", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <ellipse cx="28" cy="32" rx="8" ry="6" fill="#DEB887" />
        <ellipse cx="40" cy="32" rx="8" ry="6" fill="#D2B48C" />
      </svg>
    );
  } },
  { id: 205, name: "Pigeon Peas", category: ICON_CATEGORIES[6], render: bowl("#DAA520", "#FFD700") },
  { id: 206, name: "Pistachios", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <path d="M20 32 L24 20 L28 32 Z" fill="#7CB342" />
        <path d="M28 32 L32 20 L36 32 Z" fill="#6BA82E" />
        <path d="M36 32 L40 20 L44 32 Z" fill="#7CB342" />
      </svg>
    );
  } },
  { id: 207, name: "Sunflower Seeds", category: ICON_CATEGORIES[6], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="32" cy="32" r="12" fill="#FFD700" />
        <circle cx="28" cy="28" r="2" fill="#333" />
        <circle cx="36" cy="28" r="2" fill="#333" />
        <circle cx="32" cy="36" r="2" fill="#333" />
      </svg>
    );
  } },
  { id: 208, name: "Coconut Flakes", category: ICON_CATEGORIES[6], render: bagIcon("#FFFACD", "Coco") },
  { id: 209, name: "Almond Flour", category: ICON_CATEGORIES[6], render: bagIcon("#D2B48C", "AF") },
  { id: 210, name: "Tahini", category: ICON_CATEGORIES[6], render: jar("#D2B48C", "#C19A6B", "#DAA520") },

  // Category 8: Herbs, Spices & Seasonings (211-240)
  { id: 211, name: "Black Pepper", category: ICON_CATEGORIES[7], render: bagIcon("#1C1C1C", "BP") },
  { id: 212, name: "Black Peppercorns", category: ICON_CATEGORIES[7], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="24" cy="28" r="3" fill="#1C1C1C" />
        <circle cx="32" cy="24" r="3" fill="#1C1C1C" />
        <circle cx="40" cy="28" r="3" fill="#1C1C1C" />
        <circle cx="28" cy="36" r="3" fill="#1C1C1C" />
        <circle cx="36" cy="36" r="3" fill="#1C1C1C" />
      </svg>
    );
  } },
  { id: 213, name: "Iodized Salt", category: ICON_CATEGORIES[7], render: bagIcon("#F5F5F5", "Salt") },
  { id: 214, name: "Rock Salt", category: ICON_CATEGORIES[7], render: jar("#FFFACD", "#F0E68C", "#DAA520") },
  { id: 215, name: "MSG", category: ICON_CATEGORIES[7], render: bagIcon("#F5F5F5", "MSG") },
  { id: 216, name: "Magic Sarap", category: ICON_CATEGORIES[7], render: bagIcon("#FFD700", "Magic") },
  { id: 217, name: "Sinigang Mix", category: ICON_CATEGORIES[7], render: bagIcon("#8B4513", "Sini") },
  { id: 218, name: "Chicken Bouillon", category: ICON_CATEGORIES[7], render: jar("#FFD700", "#D2B48C", "#DAA520") },
  { id: 219, name: "Pork Bouillon", category: ICON_CATEGORIES[7], render: jar("#D2B48C", "#A0826D", "#DAA520") },
  { id: 220, name: "Beef Bouillon", category: ICON_CATEGORIES[7], render: jar("#8B4513", "#654321", "#DAA520") },
  { id: 221, name: "Bay Leaves", category: ICON_CATEGORIES[7], render: leafIcon("#7CB342", "#228B22") },
  { id: 222, name: "Star Anise", category: ICON_CATEGORIES[7], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <g>
          <ellipse cx="32" cy="20" rx="2" ry="6" fill="#8B6914" />
          <ellipse cx="32" cy="20" rx="2" ry="6" fill="#8B6914" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="20" rx="2" ry="6" fill="#8B6914" transform="rotate(120 32 32)" />
          <ellipse cx="32" cy="20" rx="2" ry="6" fill="#8B6914" transform="rotate(180 32 32)" />
          <ellipse cx="32" cy="20" rx="2" ry="6" fill="#8B6914" transform="rotate(240 32 32)" />
          <ellipse cx="32" cy="20" rx="2" ry="6" fill="#8B6914" transform="rotate(300 32 32)" />
        </g>
        <circle cx="32" cy="32" r="2" fill="#654321" />
      </svg>
    );
  } },
  { id: 223, name: "Annatto Powder", category: ICON_CATEGORIES[7], render: bagIcon("#FF6347", "Ann") },
  { id: 224, name: "Annatto Seeds", category: ICON_CATEGORIES[7], render: jar("#FF6347", "#DC143C", "#DAA520") },
  { id: 225, name: "Curry Powder", category: ICON_CATEGORIES[7], render: bagIcon("#FFD700", "Curry") },
  { id: 226, name: "Turmeric Powder", category: ICON_CATEGORIES[7], render: bagIcon("#FFD700", "Turmeric") },
  { id: 227, name: "Garlic Powder", category: ICON_CATEGORIES[7], render: bagIcon("#F5DEB3", "Garlic") },
  { id: 228, name: "Onion Powder", category: ICON_CATEGORIES[7], render: bagIcon("#D2B48C", "Onion") },
  { id: 229, name: "Chili Flakes", category: ICON_CATEGORIES[7], render: bagIcon("#DC143C", "Chili") },
  { id: 230, name: "Chili Powder", category: ICON_CATEGORIES[7], render: bagIcon("#FF6347", "Chili") },
  { id: 231, name: "Paprika Powder", category: ICON_CATEGORIES[7], render: bagIcon("#FF4500", "Paprika") },
  { id: 232, name: "Cayenne Pepper", category: ICON_CATEGORIES[7], render: bagIcon("#DC143C", "Cayenne") },
  { id: 233, name: "Cinnamon Powder", category: ICON_CATEGORIES[7], render: bagIcon("#8B4513", "Cinn") },
  { id: 234, name: "Five-Spice Powder", category: ICON_CATEGORIES[7], render: bagIcon("#A0522D", "5-Spice") },
  { id: 235, name: "Dried Oregano", category: ICON_CATEGORIES[7], render: leafIcon("#8B4513", "#654321") },
  { id: 236, name: "Fresh Basil", category: ICON_CATEGORIES[7], render: leafIcon("#228B22", "#1A4D1A") },
  { id: 237, name: "Ground White Pepper", category: ICON_CATEGORIES[7], render: bagIcon("#D3D3D3", "WP") },
  { id: 238, name: "Vanilla Pod", category: ICON_CATEGORIES[7], render: longVeg("#8B4513", "#654321", "#333") },
  { id: 239, name: "Nutmeg Powder", category: ICON_CATEGORIES[7], render: bagIcon("#A0522D", "Nutmeg") },
  { id: 240, name: "Taco Seasoning", category: ICON_CATEGORIES[7], render: bagIcon("#FF6347", "Taco") },

  // Category 9: Condiments, Oils & Liquids (241-270)
  { id: 241, name: "Soy Sauce", category: ICON_CATEGORIES[8], render: bottle("#2C3E50", "#DAA520") },
  { id: 242, name: "Fish Sauce", category: ICON_CATEGORIES[8], render: bottle("#8B4513", "#DAA520") },
  { id: 243, name: "Cane Vinegar", category: ICON_CATEGORIES[8], render: bottle("#D2B48C", "#DAA520") },
  { id: 244, name: "Coconut Vinegar", category: ICON_CATEGORIES[8], render: bottle("#DEB887", "#DAA520") },
  { id: 245, name: "Oyster Sauce", category: ICON_CATEGORIES[8], render: bottle("#654321", "#DAA520") },
  { id: 246, name: "Banana Ketchup", category: ICON_CATEGORIES[8], render: bottle("#FFD700", "#DAA520") },
  { id: 247, name: "Tomato Ketchup", category: ICON_CATEGORIES[8], render: bottle("#DC143C", "#DAA520") },
  { id: 248, name: "Tomato Sauce", category: ICON_CATEGORIES[8], render: jar("#FF6347", "#DC143C", "#DAA520") },
  { id: 249, name: "Tomato Paste", category: ICON_CATEGORIES[8], render: jar("#8B0000", "#DC143C", "#DAA520") },
  { id: 250, name: "Mayonnaise", category: ICON_CATEGORIES[8], render: jar("#FFFACD", "#F0E68C", "#DAA520") },
  { id: 251, name: "Liquid Seasoning", category: ICON_CATEGORIES[8], render: bottle("#FFD700", "#DAA520") },
  { id: 252, name: "Lechon Sauce", category: ICON_CATEGORIES[8], render: jar("#8B4513", "#654321", "#DAA520") },
  { id: 253, name: "Sweet Chili Sauce", category: ICON_CATEGORIES[8], render: jar("#FF6347", "#DC143C", "#DAA520") },
  { id: 254, name: "Hot Sauce", category: ICON_CATEGORIES[8], render: jar("#DC143C", "#8B0000", "#DAA520") },
  { id: 255, name: "Vinegar with Chilies", category: ICON_CATEGORIES[8], render: jar("#8B4513", "#DC143C", "#DAA520") },
  { id: 256, name: "Sesame Oil", category: ICON_CATEGORIES[8], render: bottle("#8B6914", "#DAA520") },
  { id: 257, name: "Chili Oil", category: ICON_CATEGORIES[8], render: bottle("#FF6347", "#DAA520") },
  { id: 258, name: "Vegetable Oil", category: ICON_CATEGORIES[8], render: bottle("#FFD700", "#DAA520") },
  { id: 259, name: "Palm Oil", category: ICON_CATEGORIES[8], render: bottle("#FF8C00", "#DAA520") },
  { id: 260, name: "Coconut Oil", category: ICON_CATEGORIES[8], render: bottle("#F5DEB3", "#DAA520") },
  { id: 261, name: "Olive Oil", category: ICON_CATEGORIES[8], render: bottle("#7CB342", "#DAA520") },
  { id: 262, name: "Worcestershire Sauce", category: ICON_CATEGORIES[8], render: bottle("#654321", "#DAA520") },
  { id: 263, name: "Hoisin Sauce", category: ICON_CATEGORIES[8], render: bottle("#8B0000", "#DAA520") },
  { id: 264, name: "Teriyaki Sauce", category: ICON_CATEGORIES[8], render: bottle("#2C3E50", "#DAA520") },
  { id: 265, name: "Mirin", category: ICON_CATEGORIES[8], render: bottle("#D2B48C", "#DAA520") },
  { id: 266, name: "Rice Wine", category: ICON_CATEGORIES[8], render: bottle("#F5DEB3", "#DAA520") },
  { id: 267, name: "Barbecue Sauce", category: ICON_CATEGORIES[8], render: jar("#8B4513", "#654321", "#DAA520") },
  { id: 268, name: "Mustard", category: ICON_CATEGORIES[8], render: jar("#FFD700", "#DAA520", "#DAA520") },
  { id: 269, name: "Apple Cider Vinegar", category: ICON_CATEGORIES[8], render: bottle("#A0522D", "#DAA520") },
  { id: 270, name: "White Vinegar", category: ICON_CATEGORIES[8], render: bottle("#F5F5F5", "#DAA520") },

  // Category 10: Sugars, Sweets & Baking Agents (271-300)
  { id: 271, name: "Brown Sugar", category: ICON_CATEGORIES[9], render: bagIcon("#8B6914", "Brown") },
  { id: 272, name: "White Sugar", category: ICON_CATEGORIES[9], render: bagIcon("#F5F5F5", "White") },
  { id: 273, name: "Washed Sugar", category: ICON_CATEGORIES[9], render: bagIcon("#F5DEB3", "Wash") },
  { id: 274, name: "Dark Brown Sugar", category: ICON_CATEGORIES[9], render: bagIcon("#654321", "DBrown") },
  { id: 275, name: "Powdered Sugar", category: ICON_CATEGORIES[9], render: bagIcon("#FFFACD", "Pwd") },
  { id: 276, name: "Pure Honey", category: ICON_CATEGORIES[9], render: jar("#FFD700", "#FFA500", "#DAA520") },
  { id: 277, name: "Vanilla Extract", category: ICON_CATEGORIES[9], render: bottle("#8B4513", "#DAA520") },
  { id: 278, name: "Cocoa Powder", category: ICON_CATEGORIES[9], render: bagIcon("#3B2414", "Cocoa") },
  { id: 279, name: "Chocolate Chips", category: ICON_CATEGORIES[9], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <circle cx="24" cy="26" r="3" fill="#3B2414" />
        <circle cx="32" cy="22" r="3" fill="#3B2414" />
        <circle cx="40" cy="26" r="3" fill="#3B2414" />
        <circle cx="28" cy="36" r="3" fill="#3B2414" />
        <circle cx="36" cy="36" r="3" fill="#3B2414" />
        <circle cx="32" cy="44" r="3" fill="#3B2414" />
      </svg>
    );
  } },
  { id: 280, name: "Dark Chocolate Bar", category: ICON_CATEGORIES[9], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="22" width="28" height="20" fill="#3B2414" rx="2" />
        <line x1="22" y1="22" x2="22" y2="42" stroke="#2A1810" strokeWidth="0.5" />
        <line x1="26" y1="22" x2="26" y2="42" stroke="#2A1810" strokeWidth="0.5" />
        <line x1="30" y1="22" x2="30" y2="42" stroke="#2A1810" strokeWidth="0.5" />
        <line x1="34" y1="22" x2="34" y2="42" stroke="#2A1810" strokeWidth="0.5" />
        <line x1="38" y1="22" x2="38" y2="42" stroke="#2A1810" strokeWidth="0.5" />
        <line x1="42" y1="22" x2="42" y2="42" stroke="#2A1810" strokeWidth="0.5" />
      </svg>
    );
  } },
  { id: 281, name: "Agar-Agar", category: ICON_CATEGORIES[9], render: bagIcon("#D8BFD8", "Agar") },
  { id: 282, name: "Gelatin Powder", category: ICON_CATEGORIES[9], render: bagIcon("#F5F5F5", "Gelat") },
  { id: 283, name: "Ube Halaya", category: ICON_CATEGORIES[9], render: jar("#9370DB", "#8B008B", "#DAA520") },
  { id: 284, name: "Ube Extract", category: ICON_CATEGORIES[9], render: bottle("#9370DB", "#DAA520") },
  { id: 285, name: "Pandan Extract", category: ICON_CATEGORIES[9], render: bottle("#90EE90", "#DAA520") },
  { id: 286, name: "Cream of Tartar", category: ICON_CATEGORIES[9], render: bagIcon("#F5DEB3", "CoT") },
  { id: 287, name: "Maple Syrup", category: ICON_CATEGORIES[9], render: bottle("#8B4513", "#DAA520") },
  { id: 288, name: "Corn Syrup", category: ICON_CATEGORIES[9], render: bottle("#FFD700", "#DAA520") },
  { id: 289, name: "Chocolate Condensed Milk", category: ICON_CATEGORIES[9], render: jar("#8B4513", "#654321", "#DAA520") },
  { id: 290, name: "Chocolate Syrup", category: ICON_CATEGORIES[9], render: bottle("#3B2414", "#DAA520") },
  { id: 291, name: "Caramel Sauce", category: ICON_CATEGORIES[9], render: jar("#8B6914", "#6B5310", "#DAA520") },
  { id: 292, name: "Graham Crumbs", category: ICON_CATEGORIES[9], render: bagIcon("#D2B48C", "Graham") },
  { id: 293, name: "Marshmallows", category: ICON_CATEGORIES[9], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <rect x="18" y="22" width="8" height="8" fill="#F5F5F5" />
        <rect x="28" y="22" width="8" height="8" fill="#F5F5F5" />
        <rect x="38" y="22" width="8" height="8" fill="#F5F5F5" />
        <rect x="18" y="32" width="8" height="8" fill="#F5F5F5" />
        <rect x="28" y="32" width="8" height="8" fill="#F5F5F5" />
      </svg>
    );
  } },
  { id: 294, name: "Sprinkles", category: ICON_CATEGORIES[9], render: (props) => {
    const size = props.size || 24;
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={props.className}>
        <line x1="16" y1="28" x2="20" y2="20" stroke="#FF1493" strokeWidth="2" />
        <line x1="24" y1="26" x2="28" y2="18" stroke="#FFD700" strokeWidth="2" />
        <line x1="32" y1="24" x2="36" y2="16" stroke="#00BFFF" strokeWidth="2" />
        <line x1="40" y1="26" x2="44" y2="18" stroke="#32CD32" strokeWidth="2" />
        <line x1="48" y1="28" x2="52" y2="20" stroke="#FF6347" strokeWidth="2" />
      </svg>
    );
  } },
  { id: 295, name: "Food Coloring Red", category: ICON_CATEGORIES[9], render: bottle("#DC143C", "#DAA520") },
  { id: 296, name: "Food Coloring Yellow", category: ICON_CATEGORIES[9], render: bottle("#FFD700", "#DAA520") },
  { id: 297, name: "Food Coloring Green", category: ICON_CATEGORIES[9], render: bottle("#228B22", "#DAA520") },
  { id: 298, name: "Food Coloring Blue", category: ICON_CATEGORIES[9], render: bottle("#4169E1", "#DAA520") },
  { id: 299, name: "Coconut Sugar", category: ICON_CATEGORIES[9], render: bagIcon("#8B6914", "Coco") },
  { id: 300, name: "Stevia", category: ICON_CATEGORIES[9], render: leafIcon("#90EE90", "#7CB342") }
];

// Create mapping for lookups
export const ICON_DICT_MAP: Record<string, number> = {};
ICON_DICT.forEach(icon => {
  ICON_DICT_MAP[icon.name.toLowerCase()] = icon.id;
});

// Helper functions for lookups
export function getIconById(id: number) {
  const icon = ICON_DICT.find(i => i.id === id);
  return icon ? icon.render : null;
}

export function getIconByName(name: string) {
  const id = ICON_DICT_MAP[name.toLowerCase()];
  return id ? getIconById(id) : null;
}
