import { useTranslation } from "react-i18next";

import logo from "@/assets/images/KWK.png";
import DarkModeButton from "@/components/DarkModeButton/DarkModeButton";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

import { useHeader } from "./useHeader";

const Header = () => {
  const { isDarkMode, toggleTheme } = useHeader();
  const { t } = useTranslation();

  return (
    <header
      className="bg-background/80 fixed inset-x-0 top-0 z-50 h-[var(--header-height)]
                border-b backdrop-blur-md"
      aria-label="Site header"
    >
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        <a
          href="/"
          className="focus-visible:ring-ring flex items-center gap-2 rounded-md
                    outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label={t("header.homepage")}
        >
          {/* The mark is a white-on-transparent PNG. It used to be flipped with
              `invert dark:invert-0`, which left it white-on-white in light mode —
              invisible. Painting it as a mask in `currentColor` means it simply
              follows the text beside it, in either theme. */}
          <span
            className="size-5 shrink-0 bg-current"
            style={{
              maskImage: `url(${logo})`,
              WebkitMaskImage: `url(${logo})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
            aria-hidden="true"
          />
          <span className="font-display text-base leading-none">
            {t("app.title")}
          </span>
        </a>

        <nav className="flex items-center gap-1" aria-label={t("header.nav")}>
          <LanguageSwitcher />
          <DarkModeButton onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
