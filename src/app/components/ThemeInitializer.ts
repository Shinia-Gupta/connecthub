"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/src/store/themeStore";

export default function ThemeInitializer() {
  const { setTheme } = useThemeStore();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved || "light";
    document.body.classList.add(initial);
    setTheme(initial);
  }, [setTheme]);

  return null;
}
