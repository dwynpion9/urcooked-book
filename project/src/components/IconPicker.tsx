import { useMemo, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import { ALL_ICON_NAMES } from "../lib/allIcons";
import { hasFoodIcon, renderFoodIcon } from "../lib/foodIcons";
import { ICON_DICT, ICON_CATEGORIES, getIconByName } from "../lib/iconDict";
import { Search, X, ChevronRight } from "lucide-react";

// Build a map of icon name -> Lucide component at module load
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {};
for (const name of ALL_ICON_NAMES) {
  const pascal = name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  const comp = (LucideIcons as Record<string, unknown>)[pascal] as
    | React.ComponentType<{ size?: number; className?: string }>
    | undefined;
  if (comp) ICON_MAP[name] = comp;
}

// Resolve an icon name to a renderable component
export function getIcon(name: string): React.ComponentType<{ size?: number; className?: string }> {
  // 1. Check new ICON_DICT by name
  const dictEntry = getIconByName(name);
  if (dictEntry) {
    const Wrapper = (props: { size?: number; className?: string }) => (
      <>{dictEntry.render(props)}</>
    );
    return Wrapper;
  }
  // 2. Check legacy food icons
  if (hasFoodIcon(name)) {
    const Wrapper = (props: { size?: number; className?: string }) => (
      <>{renderFoodIcon(name, props)}</>
    );
    return Wrapper;
  }
  // 3. Lucide icon
  return ICON_MAP[name] || LucideIcons.Utensils;
}

function renderIconName(name: string, size: number, className?: string) {
  const dictEntry = getIconByName(name);
  if (dictEntry) return dictEntry.render({ size, className });
  if (hasFoodIcon(name)) return renderFoodIcon(name, { size, className });
  const Icon = ICON_MAP[name] || LucideIcons.Utensils;
  return <Icon size={size} className={className} />;
}

const ALL_CATEGORY = "All";
const LEGACY_CATEGORY = "General";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = [ALL_CATEGORY, ...ICON_CATEGORIES, LEGACY_CATEGORY];

  const filtered = useMemo(() => {
    const lower = search.toLowerCase().trim();
    if (activeCategory === LEGACY_CATEGORY) {
      const legacyNames = ALL_ICON_NAMES.filter((n) => !getIconByName(n) && !hasFoodIcon(n));
      if (!lower) return legacyNames.slice(0, 200);
      return legacyNames.filter((n) => n.includes(lower)).slice(0, 200);
    }
    if (activeCategory === ALL_CATEGORY) {
      const dictItems = ICON_DICT.filter((e) => !lower || e.name.toLowerCase().includes(lower));
      const lucideItems = lower
        ? ALL_ICON_NAMES.filter((n) => !getIconByName(n) && !hasFoodIcon(n) && n.includes(lower)).slice(0, 50)
        : [];
      return [
        ...dictItems.map((e) => e.name),
        ...lucideItems,
      ].slice(0, 300);
    }
    // Specific category from ICON_DICT
    return ICON_DICT
      .filter((e) => e.category === activeCategory && (!lower || e.name.toLowerCase().includes(lower)))
      .map((e) => e.name);
  }, [search, activeCategory]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 transition hover:bg-white/10"
        title="Select icon"
      >
        {renderIconName(value, 18)}
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-30 w-96 rounded-xl border border-white/15 bg-[#1a1a2e] p-3 shadow-2xl">
          {/* Search */}
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <Search size={14} className="shrink-0 text-white/40" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="w-full bg-transparent text-sm text-white/90 outline-none placeholder:text-white/30"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} className="text-white/40 hover:text-white/70" />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="mb-2 flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {tabs.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                  activeCategory === cat
                    ? "bg-amber-500/30 text-amber-300"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {cat === ALL_CATEGORY ? "All" : cat === LEGACY_CATEGORY ? "More" : cat.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Icon grid */}
          <div className="grid max-h-64 grid-cols-6 gap-1 overflow-y-auto sm:grid-cols-8">
            {filtered.map((name) => {
              const active = value === name;
              return (
                <button
                  key={name}
                  onClick={() => { onChange(name); setOpen(false); }}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    active ? "bg-amber-500/30 ring-2 ring-amber-400" : "hover:bg-white/10"
                  }`}
                  title={name}
                >
                  {renderIconName(name, 16)}
                </button>
              );
            })}
          </div>

          {activeCategory !== LEGACY_CATEGORY && filtered.length === 0 && (
            <p className="mt-2 text-center text-xs text-white/30">No icons found</p>
          )}
        </div>
      )}
    </div>
  );
}
