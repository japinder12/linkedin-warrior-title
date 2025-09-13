"use client";
import { useEffect, useState } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark" || saved === "light") {
      setDarkMode(saved === "dark");
      if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", saved === "dark");
      return;
    }
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(!!prefersDark);
    if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", !!prefersDark);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return { darkMode, setDarkMode, isDark: darkMode } as const;
}

