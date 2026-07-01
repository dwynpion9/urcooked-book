import { useState } from "react";
import {
  Plus, Clock, Users, ChefHat, Trash2, Play, BookOpen,
  Volume2, VolumeX, Globe, Lock, Unlock, ChevronDown,
  Layers, Settings2,
} from "lucide-react";
import type { Recipe } from "../lib/types";
import type { CardTheme } from "../lib/types";
import { getIcon } from "./IconPicker";
import type { Language } from "../lib/useSettings";
import { LANGUAGES } from "../lib/multiLangDict";
import { translateTerm, translateUI } from "../lib/translate";

interface RecipeListProps {
  recipes: Recipe[];
  lang: Language;
  cardTheme: CardTheme;
  onChangeTheme: (t: CardTheme) => void;
  onCreate: () => void;
  onOpen: (recipe: Recipe) => void;
  onCook: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
  onImport: () => void;
  onChangeLang: (lang: Language) => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  soundVolume: number;
  onVolumeChange: (v: number) => void;
  onToggleLock: (recipe: Recipe) => void;
  onChangePin: () => void;
}

const CARD_THEMES: { key: CardTheme; label: string; icon: string }[] = [
  { key: "glass", label: "Glass", icon: "◈" },
  { key: "water", label: "Water", icon: "≋" },
  { key: "wooden", label: "Wooden", icon: "▤" },
];

function cardClass(theme: CardTheme): string {
  if (theme === "water")
    return "rounded-2xl border border-sky-300/20 bg-sky-500/8 backdrop-blur-sm overflow-hidden transition hover:border-sky-400/30 hover:bg-sky-500/12";
  if (theme === "wooden")
    return "rounded-2xl border border-amber-800/40 overflow-hidden transition hover:border-amber-600/50"
      + " bg-gradient-to-br from-amber-900/35 via-amber-800/20 to-amber-900/30 backdrop-blur-sm";
  // glass (default)
  return "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition hover:border-amber-400/30 hover:bg-white/10";
}

export function RecipeList({
  recipes, lang, cardTheme, onChangeTheme, onCreate, onOpen, onCook, onDelete, onExport, onImport,
  onChangeLang, soundMuted, onToggleSound, soundVolume, onVolumeChange, onToggleLock, onChangePin,
}: RecipeListProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const t = (s: string) => translateUI(s, lang);
  const tt = (s: string) => translateTerm(s, lang);
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20">
            <ChefHat size={24} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">URCOOKED BOOK</h1>
            <p className="text-xs text-white/40">
              {recipes.length} {tt("recipe")}{recipes.length !== 1 ? "s" : ""} {t("in your book")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Language */}
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setSoundOpen(false); setThemeOpen(false); setSettingsOpen(false); }}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-white/10">
              <Globe size={14} /> {currentLang.flag} <ChevronDown size={12} />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 top-12 z-20 max-h-80 w-44 overflow-y-auto rounded-xl border border-white/15 bg-[#1a1a2e] p-1.5 shadow-2xl">
                  {LANGUAGES.map((l) => (
                    <button key={l.code} onClick={() => { onChangeLang(l.code); setLangOpen(false); }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${lang === l.code ? "bg-amber-500/20 text-amber-300" : "text-white/70 hover:bg-white/10"}`}>
                      <span className="w-8 text-xs font-bold">{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sound */}
          <div className="relative">
            <button onClick={() => { setSoundOpen(!soundOpen); setLangOpen(false); setThemeOpen(false); setSettingsOpen(false); }}
              className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white/70 transition hover:bg-white/10">
              {soundMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            {soundOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSoundOpen(false)} />
                <div className="absolute right-0 top-12 z-20 w-48 rounded-xl border border-white/15 bg-[#1a1a2e] p-3 shadow-2xl">
                  <button onClick={onToggleSound}
                    className="mb-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10">
                    {soundMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    {soundMuted ? t("Unmute") : t("Mute")}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">Vol</span>
                    <input type="range" min="0" max="0.5" step="0.01" value={soundVolume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="flex-1 accent-amber-400" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Card Theme */}
          <div className="relative">
            <button onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); setSoundOpen(false); setSettingsOpen(false); }}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/70 transition hover:bg-white/10"
              title="Card theme">
              <Layers size={14} /> <ChevronDown size={12} />
            </button>
            {themeOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setThemeOpen(false)} />
                <div className="absolute right-0 top-12 z-20 w-40 rounded-xl border border-white/15 bg-[#1a1a2e] p-1.5 shadow-2xl">
                  {CARD_THEMES.map((th) => (
                    <button key={th.key} onClick={() => { onChangeTheme(th.key); setThemeOpen(false); }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${cardTheme === th.key ? "bg-amber-500/20 text-amber-300" : "text-white/70 hover:bg-white/10"}`}>
                      <span className="text-base">{th.icon}</span> {th.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Settings (Change PIN) */}
          <div className="relative">
            <button onClick={() => { setSettingsOpen(!settingsOpen); setLangOpen(false); setSoundOpen(false); setThemeOpen(false); }}
              className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white/70 transition hover:bg-white/10">
              <Settings2 size={16} />
            </button>
            {settingsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSettingsOpen(false)} />
                <div className="absolute right-0 top-12 z-20 w-44 rounded-xl border border-white/15 bg-[#1a1a2e] p-1.5 shadow-2xl">
                  <button onClick={() => { onChangePin(); setSettingsOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10">
                    <Lock size={14} /> Change App PIN
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Book menu */}
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10">
              <BookOpen size={16} /> {t("Export Book").split(" ")[0]}
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-12 z-20 w-48 rounded-xl border border-white/15 bg-[#1a1a2e] p-2 shadow-2xl">
                  <button onClick={() => { onExport(); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10">
                    <BookOpen size={14} /> {t("Export Book")}
                  </button>
                  <button onClick={() => { onImport(); setMenuOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10">
                    <BookOpen size={14} /> {t("Import Book")}
                  </button>
                </div>
              </>
            )}
          </div>

          <button onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-400">
            <Plus size={18} /> {t("New Recipe")}
          </button>
        </div>
      </div>

      {/* Recipe grid */}
      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/5 py-20">
          <ChefHat size={48} className="text-white/20" />
          <p className="text-white/40">{t("Your cookbook is empty.")}</p>
          <button onClick={onCreate}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 font-semibold text-amber-950 transition hover:bg-amber-400">
            <Plus size={18} /> {t("Create your first recipe")}
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {recipes.map((recipe) => {
            const totalTime = recipe.steps.reduce((sum, s) => sum + (s.timerMinutes || 0), 0);
            return (
              <div key={recipe.id} className={cardClass(cardTheme)}>
                {recipe.thumbnail ? (
                  <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${recipe.thumbnail})` }}>
                    <div className="flex h-full w-full items-end bg-gradient-to-t from-black/70 to-transparent p-3">
                      <h3 className="cursor-pointer text-lg font-semibold text-white transition hover:text-amber-300"
                        onClick={() => onOpen(recipe)}>
                        {recipe.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className={`flex h-24 items-center justify-center gap-1.5 border-b ${cardTheme === "wooden" ? "border-amber-800/30 bg-amber-900/20" : "border-white/10 bg-white/5"}`}>
                    {recipe.ingredients.slice(0, 6).map((ing) => {
                      const Icon = getIcon(ing.icon);
                      return (
                        <div key={ing.id} className={`flex h-10 w-10 items-center justify-center rounded-lg border ${cardTheme === "wooden" ? "border-amber-700/30 bg-amber-900/30" : "border-white/10 bg-white/5"}`}>
                          <Icon size={18} className="text-white/50" />
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="p-4">
                  {!recipe.thumbnail && (
                    <div className="mb-2">
                      <h3 className="cursor-pointer text-lg font-semibold text-white transition hover:text-amber-300"
                        onClick={() => onOpen(recipe)}>
                        {recipe.title}
                      </h3>
                    </div>
                  )}

                  {recipe.description && (
                    <p className="mb-3 line-clamp-2 text-sm text-white/50">{recipe.description}</p>
                  )}

                  <div className="mb-4 flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1"><Users size={12} /> {recipe.servings} {tt("serving")}{recipe.servings !== 1 ? "s" : ""}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {totalTime} {tt("min")}</span>
                    <span className="flex items-center gap-1"><ChefHat size={12} /> {recipe.ingredients.length} {tt("ingredient")}{recipe.ingredients.length !== 1 ? "s" : ""}</span>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => onCook(recipe)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500/20 py-2.5 text-sm font-medium text-amber-300 transition hover:bg-amber-500/30">
                      <Play size={16} /> {t("Cook")}
                    </button>
                    <button onClick={() => onOpen(recipe)}
                      className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10">
                      {t("View")}
                    </button>
                    <button onClick={() => onToggleLock(recipe)}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-white/50 transition hover:bg-white/10"
                      title={recipe.locked ? t("Unlock Recipe") : t("Lock Recipe")}>
                      {recipe.locked ? <Lock size={16} className="text-amber-400" /> : <Unlock size={16} />}
                    </button>
                    <button
                      onClick={() => { if (confirm(`Delete "${recipe.title}"?`)) onDelete(recipe.id); }}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-white/30 transition hover:bg-red-500/20 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
