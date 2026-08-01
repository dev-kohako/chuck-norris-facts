import { Moon, Sun } from "lucide-react";
import React from "react";

import { DarkModeButtonProps } from "../../types/types";
import { useDarkModeButton } from "./useDarkModeButton";

const DarkModeButton: React.FC<DarkModeButtonProps> = ({
  onToggleTheme,
  isDarkMode,
  className = "",
}) => {
  const { handleKeyDown } = useDarkModeButton(onToggleTheme);

  return (
    <button
      onClick={onToggleTheme}
      onKeyDown={handleKeyDown}
      className={`focus-ring flex h-8 w-8 items-center justify-center rounded-lg
                text-zinc-800 transition-colors duration-200 hover:bg-zinc-400/50
                dark:text-zinc-200 dark:hover:bg-zinc-700/70 ${className}`}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      aria-pressed={isDarkMode}
    >
      <span className="sr-only">{isDarkMode ? "Light" : "Dark"} Mode</span>
      {/* `currentColor` keeps the icon on the button's own colour instead of the
          two hard-coded hexes, which ignored hover and forced-colours modes. */}
      {isDarkMode ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default DarkModeButton;
