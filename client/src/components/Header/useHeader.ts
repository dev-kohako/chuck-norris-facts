import { useEffect, useState } from "react";
import { ThemePreference } from "../../types/types";

export const useHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const storedTheme = localStorage.getItem("theme") as ThemePreference | null;
      return storedTheme
        ? storedTheme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      return false;
    }
  });

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";

    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.error("Error saving theme preference:", e);
    }

    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return { isDarkMode, toggleTheme };
};
