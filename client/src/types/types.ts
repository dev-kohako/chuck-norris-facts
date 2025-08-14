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
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
}

export interface DarkModeButtonProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
  className?: string;
}

export interface ModalState {
  show: boolean;
  isMounted: boolean;
}
