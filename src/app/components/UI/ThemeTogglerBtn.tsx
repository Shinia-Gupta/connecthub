"use client";

import { useThemeStore } from "@/src/store/themeStore";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@mui/material";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        color: theme === "dark" ? "#fff" : "#3b393960",
        transition: "color 0.3s",
      }}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  );
}
