import { useEffect, useState } from "react";
import { PinLock, ChangePinModal } from "./components/PinLock";
import { ForestBackground, useTimeOfDay } from "./components/ForestBackground";
import { StarfieldBackground } from "./components/StarfieldBackground";
import { RecipeList } from "./components/RecipeList";
import { RecipeDetail } from "./components/RecipeDetail";
import { ExecutionView } from "./components/ExecutionView";
import { CreateRecipe } from "./components/CreateRecipe";
import type { Recipe } from "./lib/types";
import {
  getAllRecipes, saveRecipe, deleteRecipe, importRecipes,
} from "./lib/storage";
import { useLanguage, useSoundSettings, useCardTheme } from "./lib/useSettings";
import { startAmbient, stopAmbient, setVolume as setAmbientVolume } from "./lib/ambientSound";

type View = "list" | "detail" | "cook" | "create";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const tod = useTimeOfDay();
  const { lang, changeLang } = useLanguage();
  const { muted, toggleMute, volume, setVolume } = useSoundSettings();
  const { theme, changeTheme } = useCardTheme();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [view, setView] = useState<View>("list");
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);

  useEffect(() => {
    if (!unlocked) return;
    getAllRecipes().then(setRecipes).catch(console.error);
  }, [unlocked]);

  useEffect(() => {
    if (!unlocked) return;
    if (!muted) {
      startAmbient();
      setAmbientVolume(volume);
    } else {
      stopAmbient();
    }
  }, [unlocked, muted, volume]);

  const refresh = () => getAllRecipes().then(setRecipes);

  const handleSaveRecipe = async (recipe: Recipe) => {
    await saveRecipe(recipe);
    await refresh();
    setShowCreate(false);
    setActiveRecipe(recipe);
    setView("detail");
  };

  const handleDelete = async (id: string) => {
    await deleteRecipe(id);
    await refresh();
  };

  const handleOpen = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    setView("detail");
  };

  const handleCook = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    setView("cook");
  };

  const handleUpdateRecipe = async (recipe: Recipe) => {
    await saveRecipe(recipe);
    await refresh();
    setActiveRecipe(recipe);
  };

  const handleToggleLock = async (recipe: Recipe) => {
    // From the list view, just toggle locked flag without changing PIN
    // (The full PIN flow is in RecipeDetail)
    const updated = { ...recipe, locked: !recipe.locked, updatedAt: Date.now() };
    if (!updated.locked) updated.lockPin = undefined;
    await handleUpdateRecipe(updated);
  };

  const handleExport = () => {
    const data = JSON.stringify(recipes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "urcooked-book.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text) as Recipe[];
        if (!Array.isArray(data)) throw new Error("Invalid format");
        await importRecipes(data);
        await refresh();
        alert(`Imported ${data.length} recipe(s).`);
      } catch {
        alert("Failed to import. Please select a valid URCOOKED BOOK JSON file.");
      }
    };
    input.click();
  };

  if (!unlocked) {
    return (
      <>
        <ForestBackground tod={tod} />
        <PinLock onUnlock={() => setUnlocked(true)} />
      </>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ForestBackground tod={tod} />
      <StarfieldBackground />

      <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-8">
        {view === "list" && (
          <RecipeList
            recipes={recipes}
            lang={lang}
            cardTheme={theme}
            onChangeTheme={changeTheme}
            onCreate={() => setShowCreate(true)}
            onOpen={handleOpen}
            onCook={handleCook}
            onDelete={handleDelete}
            onExport={handleExport}
            onImport={handleImport}
            onChangeLang={changeLang}
            soundMuted={muted}
            onToggleSound={toggleMute}
            soundVolume={volume}
            onVolumeChange={setVolume}
            onToggleLock={handleToggleLock}
            onChangePin={() => setShowChangePin(true)}
          />
        )}

        {view === "detail" && activeRecipe && (
          <RecipeDetail
            recipe={activeRecipe}
            lang={lang}
            onBack={() => setView("list")}
            onCook={handleCook}
            onUpdate={handleUpdateRecipe}
          />
        )}

        {view === "cook" && activeRecipe && (
          <ExecutionView
            recipe={activeRecipe}
            lang={lang}
            onExit={() => setView("detail")}
          />
        )}
      </div>

      {showCreate && (
        <CreateRecipe onSave={handleSaveRecipe} onClose={() => setShowCreate(false)} lang={lang} />
      )}

      {showChangePin && (
        <ChangePinModal onClose={() => setShowChangePin(false)} />
      )}

      {/* Watermark */}
      <div className="pointer-events-none fixed bottom-2 left-1/2 z-20 -translate-x-1/2 text-[10px] tracking-widest text-white/15">
        made by DWYN
      </div>
    </div>
  );
}
