"use client";

import { createContext, useCallback, useState } from "react";
import type { ReactNode } from "react";

export type Theme = "dark" | "light";

export const STORAGE_KEY = "game-store-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme: Theme) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = theme;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The pre-hydration inline script (root layout) already set the
  // `data-theme` attribute from storage; this state mirrors it for React.
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable — theme still applies for this session
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };