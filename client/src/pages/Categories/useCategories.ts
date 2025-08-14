import { useLazyQuery, useQuery } from "@apollo/client";
import { CategoriesData, FactDataCategory } from "../../types/types";
import { useCallback, useState } from "react";
import { GET_CHUCK_NORRIS_CATEGORIES } from "../../queries/getChuckNorrisCategories";
import { GET_CHUCK_NORRIS_FACT_BY_CATEGORY } from "../../queries/getChuckNorrisByCategories";

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
      onError: (error) => {
        console.error("Error fetching fact:", error.message);
      },
    });

  const handleCategoryClick = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      getFact({ variables: { category } });
    },
    [getFact]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, category: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCategoryClick(category);
      }
    },
    [handleCategoryClick]
  );

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
