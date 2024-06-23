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
        <div className='flex justify-center items-center'><article className="xs:h-5 md:h-6 xs:w-5 md:w-6 mr-1.5 rounded-full animate-spin border-2 border-l-zinc-200 border-r-zinc-200 border-b-zinc-200 border-t-sky-500" role="status" aria-label="Loading Spinner"></article><p className='flex justify-center items-center sm:text-lg flex-row-reverse gap-x-1 md:text-xl text-zinc-200 animate-pulse' aria-label="Loading">
        Loading Fact...
      </p></div>
    );
  }

  if (categoriesError) {
    return <p role="alert" className="text-red-500">Error: {categoriesError.message}</p>;
  }

  return (
    <section className='min-h-[80%] max-h-max flex flex-col justify-center items-center rounded-lg text-zinc-200'>
      <h2 className='font-semibold mb-5 xs:text-2xl sm:text-3xl md:text-4xl uppercase xs:tracking-wide text-sky-500'>Categories</h2>
      <ul className='flex justify-center items-center flex-wrap gap-3'>
        {categoriesData.getChuckNorrisCategories.map((category: string) => (
          <li
            className='duration-150 hover:cursor-pointer outline outline-2 outline-zinc-200 hover:bg-zinc-300 hover:text-sky-500 px-2 md:px-4 py-1 rounded-full sm:text-xl md:text-2xl'
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
      <article className='w-full flex justify-center items-center mt-8'>
        {factLoading ? (
            <><article className="xs:h-5 md:h-6 xs:w-5 md:w-6 mr-1.5 rounded-full animate-spin border-2 border-l-zinc-200 border-r-zinc-200 border-b-zinc-200 border-t-sky-500" role="status" aria-label="Loading Spinner"></article><p className='text-lg md:text-xl flex flex-row-reverse gap-x-1 text-zinc-200 animate-pulse' aria-label="Loading Fact">
            Loading Fact...
          </p></>
        ) : factError ? (
          <p role="alert" className="text-red-500">Error: {factError.message}</p>
        ) : (
          <p className='w-full text-center md:text-lg p-4 rounded-lg border-2 border-zinc-300 text-zinc-200 font-semibold' aria-live="polite">
            {factData?.getChuckNorrisFactByCategory || "Click a category to get a fact"}
          </p>
        )}
      </article>
    </section>
  );
};

export default Categories;