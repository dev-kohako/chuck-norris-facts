import React from "react";
import { DarkModeButtonProps } from "../../types/types";
import { Moon, Sun } from "lucide-react";
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
      className={`flex items-center justify-center rounded h-8 w-8
                hover:bg-zinc-400/50 dark:hover:bg-zinc-700/70 
                transition-colors duration-200 ${className}`}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      aria-pressed={isDarkMode}
    >
      <span className="sr-only">{isDarkMode ? "Light" : "Dark"} Mode</span>
      {isDarkMode ? (
        <Sun color="#e4e4e7" className="w-5 h-5" />
      ) : (
        <Moon color="#27272a" className="w-5 h-5" />
      )}
    </button>
  );
};

export default DarkModeButton;
