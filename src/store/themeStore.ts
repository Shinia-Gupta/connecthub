"use client";
import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme:
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as "light" | "dark") || "light"
      : "light",

  toggleTheme: () => {
    const newTheme = get().theme === "dark" ? "light" : "dark";
    set({ theme: newTheme });
    if (typeof window !== "undefined") {
      document.body.classList.remove(get().theme);
      document.body.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  },

  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  },
}));
