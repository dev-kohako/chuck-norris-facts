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

export interface DarkModeButtonProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
  className?: string;
}
