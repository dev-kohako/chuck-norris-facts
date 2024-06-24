import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_CHUCK_NORRIS_CATEGORIES, GET_CHUCK_NORRIS_FACT_BY_CATEGORY } from '../queries';

const Categories: React.FC = () => {
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CHUCK_NORRIS_CATEGORIES);
  const [getFact, { loading: factLoading, data: factData, error: factError }] = useLazyQuery(GET_CHUCK_NORRIS_FACT_BY_CATEGORY, {
    fetchPolicy: 'network-only',
  });

  const handleCategoryClick = (category: string) => {
    console.log('Fetching fact for category:', category);
    getFact({ variables: { category } });
  };

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center mb-4">
        <article
          className="mr-1.5 h-5 w-5 animate-spin rounded-full border-2 border-l-zinc-700 dark:border-l-zinc-200 border-r-zinc-700 dark:border-r-zinc-200 border-b-zinc-700 dark:border-b-zinc-200 border-t-sky-500 dark:border-t-sky-500 xs:h-5 md:h-6 xs:w-5 md:w-6"
          role="status"
          aria-label="Loading Spinner"
        ></article>
        <p
          className="flex items-center justify-center gap-x-1 text-zinc-200 animate-pulse text-lg md:text-xl"
          aria-label="Loading"
        >
          Loading Fact...
        </p>
      </div>
    );
  }

  if (categoriesError) {
    return <p role="alert" className="text-red-600 text-center mb-4 font-semibold text-lg md:text-xl">Error: {categoriesError.message}</p>;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[80%] max-h-max rounded-lg text-zinc-200">
      <h2 className="mb-5 font-semibold text-sky-500 uppercase tracking-wide xs:text-2xl sm:text-3xl md:text-4xl">Categories</h2>
      <ul className="flex flex-wrap items-center justify-center gap-3">
        {categoriesData.getChuckNorrisCategories.map((category: string) => (
          <li
            className="px-2 py-1 text-lg text-zinc-700 transition duration-150 ease-in-out bg-gradient-to-tl from-zinc-300 to-zinc-200 rounded-full cursor-pointer hover:from-zinc-200/40 hover:to-zinc-100/40 hover:text-sky-500 shadow-button-neumorphism dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 dark:text-zinc-200 dark:shadow-dark-button-neumorphism sm:text-xl md:px-4 md:text-2xl"
            key={category}
            onClick={() => handleCategoryClick(category)}
            role="button"
            tabIndex={0}
            aria-label={`Fetch fact for category ${category}`}
          >
            {category[0].toUpperCase() + category.substring(1)}
          </li>
        ))}
      </ul>
      <article className="flex items-center justify-center w-full mt-8">
        {factLoading ? (
          <>
            <article
              className="mr-1.5 h-5 w-5 animate-spin rounded-full border-2 border-l-zinc-700 border-r-zinc-700 border-b-zinc-700 border-t-sky-500 xs:h-5 md:h-6 xs:w-5 md:w-6 mb-4 dark:border-l-zinc-200 dark:border-r-zinc-200 dark:border-b-zinc-200"
              role="status"
              aria-label="Loading Spinner"
            ></article>
            <p
              className="flex flex-row-reverse items-center justify-center gap-x-1 text-lg text-zinc-700 animate-pulse mb-4 md:text-xl dark:text-zinc-200"
              aria-label="Loading Fact"
            >
              Loading Fact...
            </p>
          </>
        ) : factError ? (
          <p role="alert" className="text-red-500">Error: {factError.message}</p>
        ) : (
          <p
            className="w-full p-4 text-lg font-semibold text-center text-zinc-700 bg-gradient-to-tl from-zinc-300 to-zinc-200 rounded-lg shadow-button-neumorphism dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-200 dark:shadow-dark-button-neumorphism hover:from-zinc-200/40 hover:to-zinc-100/40 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 md:text-lg mb-4"
            aria-live="polite"
          >
            {factData?.getChuckNorrisFactByCategory || "Click a category to get a fact"}
          </p>
        )}
      </article>
    </section>
  );
};

export default Categories;
