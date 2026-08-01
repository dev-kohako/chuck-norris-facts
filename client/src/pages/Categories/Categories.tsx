import React from "react";

import { useCategories } from "./useCategories";

const titleCase = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const Categories: React.FC = () => {
  const {
    categoriesLoading,
    categoriesError,
    categoriesData,
    selectedCategory,
    handleKeyDown,
    handleCategoryClick,
    factLoading,
    factError,
    factData,
  } = useCategories();

  if (categoriesLoading) {
    return (
      <div
        className="flex items-center justify-center gap-2"
        role="status"
        aria-label="Loading categories"
      >
        <span
          className="spinner-ring h-5 w-5 animate-spin md:h-6 md:w-6"
          aria-hidden="true"
        />
        <span className="text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
          Loading Categories...
        </span>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <p
        role="alert"
        className="text-danger text-center text-lg font-semibold md:text-xl"
        aria-live="assertive"
      >
        Error loading categories: {categoriesError.message}
      </p>
    );
  }

  return (
    <section
      className="flex flex-col items-center justify-center"
      aria-labelledby="categories-heading"
    >
      <h2
        id="categories-heading"
        className="text-accent mb-6 font-semibold uppercase tracking-wide xs:text-2xl sm:text-3xl md:text-4xl"
      >
        Categories
      </h2>

      <ul
        className="flex flex-wrap items-center justify-center gap-2.5"
        aria-label="Chuck Norris fact categories"
      >
        {categoriesData?.getChuckNorrisCategories.map((category: string) => {
          const isSelected = selectedCategory === category;

          return (
            <li key={category}>
              <button
                // Selection reads as a pressed key rather than a ring bolted on
                // top of a raised one — the two used to fight each other.
                className={`focus-ring rounded-full px-3 py-1 text-lg transition-[color,box-shadow] duration-150 sm:text-xl md:px-4 md:text-2xl ${
                  isSelected
                    ? "surface-pressed text-accent font-semibold"
                    : "surface-raised text-zinc-700 hover:text-sky-600 dark:text-zinc-200 dark:hover:text-sky-400"
                }`}
                onClick={() => handleCategoryClick(category)}
                onKeyDown={(e) => handleKeyDown(e, category)}
                aria-label={`Get fact about ${category}`}
                aria-pressed={isSelected}
              >
                {titleCase(category)}
              </button>
            </li>
          );
        })}
      </ul>

      <article
        className="mt-8 flex w-full flex-col items-center justify-center"
        aria-live="polite"
      >
        {factLoading ? (
          <div
            className="flex items-center justify-center gap-2"
            role="status"
            aria-label="Loading fact"
          >
            <span
              className="spinner-ring h-5 w-5 animate-spin md:h-6 md:w-6"
              aria-hidden="true"
            />
            <span className="text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
              Loading {selectedCategory} fact...
            </span>
          </div>
        ) : factError ? (
          <p
            role="alert"
            className="surface-raised text-danger w-full rounded-xl p-4 text-center font-semibold"
            aria-live="assertive"
          >
            Error loading fact: {factError.message}
          </p>
        ) : (
          <div className="surface-raised w-full rounded-xl p-5 text-center">
            {factData?.getChuckNorrisFactByCategory ? (
              <div className="animate-fade-in-up">
                <h3 className="text-accent mb-2 font-semibold">
                  Fact about {selectedCategory}:
                </h3>
                <p className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {factData.getChuckNorrisFactByCategory}
                </p>
              </div>
            ) : (
              <p className="text-zinc-600 dark:text-zinc-400">
                Select a category to view a fact
              </p>
            )}
          </div>
        )}
      </article>
    </section>
  );
};

export default Categories;
