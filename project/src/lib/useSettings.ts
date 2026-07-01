import { useEffect, useState, useCallback } from "react";
import { getSetting, setSetting } from "./settingsStore";
import type { LangCode } from "./multiLangDict";
import type { CardTheme } from "./types";

export type Language = LangCode;

export function useLanguage() {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    getSetting("language").then((l) => {
      if (l && typeof l === "string") setLang(l as Language);
    });
  }, []);

  const changeLang = useCallback((l: Language) => {
    setLang(l);
    setSetting("language", l);
  }, []);

  return { lang, changeLang };
}

export function useSoundSettings() {
  const [muted, setMuted] = useState(true);
  const [volume, setVol] = useState(0.15);

  useEffect(() => {
    Promise.all([getSetting("soundMuted"), getSetting("soundVolume")]).then(
      ([m, v]) => {
        if (typeof m === "boolean") setMuted(m);
        if (typeof v === "number") setVol(v);
      }
    );
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      setSetting("soundMuted", next);
      return next;
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    setVol(v);
    setSetting("soundVolume", v);
  }, []);

  return { muted, toggleMute, volume, setVolume };
}

export function useCardTheme() {
  const [theme, setTheme] = useState<CardTheme>("glass");

  useEffect(() => {
    getSetting("cardTheme").then((t) => {
      if (t && typeof t === "string") setTheme(t as CardTheme);
    });
  }, []);

  const changeTheme = useCallback((t: CardTheme) => {
    setTheme(t);
    setSetting("cardTheme", t);
  }, []);

  return { theme, changeTheme };
}
