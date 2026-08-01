import { useLazyQuery, useQuery } from "@apollo/client";
import { useState } from "react";

import { GET_CHUCK_NORRIS_FACT_BY_CATEGORY } from "../../queries/getChuckNorrisByCategories";
import { GET_CHUCK_NORRIS_CATEGORIES } from "../../queries/getChuckNorrisCategories";
import { CategoriesData, FactDataCategory } from "../../types/types";

export const useCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery<CategoriesData>(GET_CHUCK_NORRIS_CATEGORIES);

  const [getFact, { loading: factLoading, data: factData, error: factError }] =
    useLazyQuery<FactDataCategory>(GET_CHUCK_NORRIS_FACT_BY_CATEGORY, {
      fetchPolicy: "network-only",
    });

  // The React Compiler memoizes both handlers, so their identities stay stable
  // across renders without `useCallback` wrappers.
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    getFact({ variables: { category } });
  };

  const handleKeyDown = (e: React.KeyboardEvent, category: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCategoryClick(category);
    }
  };

  return {
    selectedCategory,
    setSelectedCategory,
    handleCategoryClick,
    handleKeyDown,
    categoriesLoading,
    categoriesError,
    categoriesData,
    factLoading,
    factData,
    factError,
  };
};
