import type { Recipe } from "./types";

const DB_NAME = "urcooked-book";
const VERSION = 2;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = (e) => {
      const db = req.result;
      if (!db.objectStoreNames.contains("recipes")) {
        db.createObjectStore("recipes", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "key" });
      }
      void e;
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("recipes", "readonly");
    const req = tx.objectStore("recipes").getAll();
    req.onsuccess = () => {
      const recipes = (req.result as Recipe[]).sort(
        (a, b) => b.updatedAt - a.updatedAt
      );
      resolve(recipes);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveRecipe(recipe: Recipe): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("recipes", "readwrite");
    tx.objectStore("recipes").put(recipe);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteRecipe(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("recipes", "readwrite");
    tx.objectStore("recipes").delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function importRecipes(recipes: Recipe[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("recipes", "readwrite");
    for (const r of recipes) tx.objectStore("recipes").put(r);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
