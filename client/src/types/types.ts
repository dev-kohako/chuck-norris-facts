import { ReactNode } from "react";

export type ThemePreference = "light" | "dark";

export interface CategoriesData {
  getChuckNorrisCategories: string[];
}

export interface FactDataCategory {
  getChuckNorrisFactByCategory: string;
}

export interface FactDataSearch {
  searchFacts: string;
}

export interface SearchByCategorySectionProps {
  onOpenModal: () => void;
}

export interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  /** Accessible name for the dialog. */
  ariaLabel?: string;
}

export interface DarkModeButtonProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
  className?: string;
}
