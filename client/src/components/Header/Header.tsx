import React from "react";

import logo from "../../assets/images/KWK.png";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import { useHeader } from "./useHeader";

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useHeader();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex h-[var(--header-height)] items-center justify-between
                border-b border-zinc-400/50 bg-zinc-300/90 px-4 backdrop-blur
                dark:border-zinc-700 dark:bg-zinc-800/90"
      aria-label="Site header"
    >
      <a
        href="/"
        className="focus-ring flex items-center gap-2 rounded"
        aria-label="Go to homepage"
      >
        <img
          className="h-5 w-5 invert dark:invert-0"
          src={logo}
          alt="KWK Logo"
          width={20}
          height={20}
          aria-hidden="true"
        />
        <span className="sr-only">KWK</span>
      </a>

      <div className="flex items-center gap-1">
        <nav aria-label="Primary navigation">
          <a
            href="/"
            className="focus-ring hidden rounded px-2 py-1 text-sm font-medium text-zinc-900
                      transition-colors duration-200 hover:text-sky-600
                      xs:block dark:text-zinc-200 dark:hover:text-sky-400"
            aria-current="page"
          >
            Chuck Norris Facts
          </a>
        </nav>
        <DarkModeButton onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </div>
    </header>
  );
};

export default Header;
