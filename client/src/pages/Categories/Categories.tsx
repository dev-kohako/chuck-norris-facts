import React from "react";
import { useCategories } from "./useCategories";

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
        className="flex items-center justify-center mb-4"
        role="status"
        aria-label="Loading categories"
      >
        <span
          className="mr-1.5 h-5 w-5 animate-spin rounded-full border-2 border-l-zinc-700 dark:border-l-zinc-200 border-r-zinc-700 dark:border-r-zinc-200 border-b-zinc-700 dark:border-b-zinc-200 border-t-sky-500 dark:border-t-sky-500 xs:h-5 md:h-6 xs:w-5 md:w-6"
          aria-hidden="true"
        />
        <span className="flex items-center justify-center gap-x-1 text-zinc-700 dark:text-zinc-200 text-lg md:text-xl">
          Loading Categories...
        </span>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <p
        role="alert"
        className="text-red-600 text-center mb-4 font-semibold text-lg md:text-xl"
        aria-live="assertive"
      >
        Error loading categories: {categoriesError.message}
      </p>
    );
  }

  return (
    <section
      className="flex flex-col items-center justify-center min-h-[80%] max-h-max rounded-lg"
      aria-labelledby="categories-heading"
    >
      <h2
        id="categories-heading"
        className="mb-5 font-semibold text-sky-500 uppercase tracking-wide xs:text-2xl sm:text-3xl md:text-4xl"
      >
        Categories
      </h2>

      <ul
        className="flex flex-wrap items-center justify-center gap-3"
        role="list"
        aria-label="Chuck Norris fact categories"
      >
        {categoriesData?.getChuckNorrisCategories.map((category: string) => (
          <li key={category}>
            <button
              className={`px-2 py-1 text-lg text-zinc-700 transition duration-150 ease-in-out bg-gradient-to-tl from-zinc-300 to-zinc-200 rounded-full cursor-pointer hover:from-zinc-200/40 hover:to-zinc-100/40 hover:text-sky-500 shadow-button-neumorphism dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 dark:text-zinc-200 dark:shadow-dark-button-neumorphism sm:text-xl md:px-4 md:text-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50
              ${selectedCategory === category ? "ring-2 ring-sky-500" : ""}`}
              onClick={() => handleCategoryClick(category)}
              onKeyDown={(e) => handleKeyDown(e, category)}
              aria-label={`Get fact about ${category}`}
              aria-pressed={selectedCategory === category}
            >
              {category[0].toUpperCase() + category.substring(1)}
            </button>
          </li>
        ))}
      </ul>

      <article
        className="flex flex-col items-center justify-center w-full mt-8"
        aria-live="polite"
      >
        {factLoading ? (
          <div
            className="flex items-center justify-center mb-4"
            role="status"
            aria-label="Loading fact"
          >
            <span
              className="mr-1.5 h-5 w-5 animate-spin rounded-full border-2 border-l-zinc-700 border-r-zinc-700 border-b-zinc-700 border-t-sky-500 xs:h-5 md:h-6 xs:w-5 md:w-6 dark:border-l-zinc-200 dark:border-r-zinc-200 dark:border-b-zinc-200"
              aria-hidden="true"
            />
            <span className="flex items-center justify-center gap-x-1 text-lg text-zinc-700 dark:text-zinc-200 md:text-xl">
              Loading {selectedCategory} fact...
            </span>
          </div>
        ) : factError ? (
          <p
            role="alert"
            className="text-red-500 p-4 bg-gradient-to-tl from-zinc-300 to-zinc-200 rounded-lg shadow-button-neumorphism dark:from-zinc-800 dark:to-zinc-700 dark:shadow-dark-button-neumorphism"
            aria-live="assertive"
          >
            Error loading fact: {factError.message}
          </p>
        ) : (
          <div className="w-full p-4 text-lg font-semibold text-center text-zinc-700 bg-gradient-to-tl from-zinc-300 to-zinc-200 rounded-lg shadow-button-neumorphism dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-200 dark:shadow-dark-button-neumorphism hover:from-zinc-200/40 hover:to-zinc-100/40 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 md:text-lg mb-4">
            {factData?.getChuckNorrisFactByCategory ? (
              <>
                <h3 className="text-sky-500 mb-2">
                  Fact about {selectedCategory}:
                </h3>
                <p>{factData.getChuckNorrisFactByCategory}</p>
              </>
            ) : (
              <p>Select a category to view a fact</p>
            )}
          </div>
        )}
      </article>
    </section>
  );
};

export default Categories;
