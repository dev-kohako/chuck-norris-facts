import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { DarkModeButtonProps } from "@/types/types";

import { useDarkModeButton } from "./useDarkModeButton";

const DarkModeButton = ({
  onToggleTheme,
  isDarkMode,
  className,
}: DarkModeButtonProps) => {
  const { handleKeyDown } = useDarkModeButton(onToggleTheme);
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleTheme}
      onKeyDown={handleKeyDown}
      className={className}
      aria-label={t("theme.switchTo", {
        mode: isDarkMode ? t("theme.light") : t("theme.dark"),
      })}
      aria-pressed={isDarkMode}
    >
      <span className="sr-only">
        {isDarkMode ? t("theme.lightLabel") : t("theme.darkLabel")}
      </span>
      {/* `currentColor` keeps the icon on the button's own colour instead of two
          hard-coded hexes, which ignored hover and forced-colours modes. */}
      {isDarkMode ? (
        <Sun className="size-[1.1rem]" aria-hidden="true" />
      ) : (
        <Moon className="size-[1.1rem]" aria-hidden="true" />
      )}
    </Button>
  );
};

export default DarkModeButton;
