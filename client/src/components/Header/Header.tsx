import React from "react";
import logo from "../../assets/images/KWK.png";
import { useHeader } from "./useHeader";
import DarkModeButton from "../DarkModeButton/DarkModeButton";

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useHeader();

  return (
    <header className="w-full flex justify-between items-center fixed top-0 bg-zinc-300/95 dark:bg-zinc-800/95 backdrop-blur-sm border-b border-zinc-400/50 dark:border-zinc-700 shadow-lg px-4 py-2 z-50" role="banner" aria-label="Site header">
      <a href="/" className="flex items-center gap-2" aria-label="Go to homepage">
        <img className="w-5 h-5 invert dark:invert-0" src={logo} alt="KWK Logo" aria-hidden="true" />
        <span className="sr-only">KWK</span>
      </a>

      <div className="flex items-center">
        <nav aria-label="Primary navigation">
          <a href="/" className="text-zinc-900 dark:text-zinc-200 py-1 px-2 transition-colors duration-200 hidden xs:block" aria-current="page">
            Chuck Norris Facts
          </a>
        </nav>
        <DarkModeButton onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </div>
    </header>
  );
};

export default Header;
