import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_CHUCK_NORRIS_CATEGORIES, GET_CHUCK_NORRIS_FACT_BY_CATEGORY } from '../queries';

const Categories: React.FC = () => {
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CHUCK_NORRIS_CATEGORIES);
  const [getFact, { loading: factLoading, data: factData, error: factError }] = useLazyQuery(GET_CHUCK_NORRIS_FACT_BY_CATEGORY);

  const handleCategoryClick = (category: string) => {
    console.log('Fetching fact for category:', category);
    getFact({ variables: { category } });
  };

  if (categoriesLoading) return (
    <div className='flex justify-center items-center' role="status" aria-label="Loading categories">
      <article
        className="h-8 w-8 mt-4 rounded-full animate-spin border-4 border-l-zinc-500 border-r-zinc-500 border-b-zinc-500 border-t-sky-500"
        role="status"
        aria-label="Loading Spinner"
      ></article>
    </div>
  );

  if (categoriesError) return <p role="alert" className="text-red-500">Error: {categoriesError.message}</p>;

  return (
    <section className='min-h-[80%] max-h-max flex flex-col justify-center items-center rounded-lg text-zinc-200 font-Poppins'>
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
      {factLoading && (
        <p
          className='flex justify-center items-center sm:text-lg flex-row-reverse gap-x-1 mt-5 md:text-xl'
          aria-label="Loading"
        >
          Loading Fact...
          <article
            className="xs:h-5 md:h-6 xs:w-5 md:w-6 rounded-full animate-spin border-2 border-l-zinc-200 border-r-zinc-200 border-b-zinc-200 border-t-sky-500"
            role="status"
            aria-label="Loading Spinner"
          ></article>
        </p>
      )}
      {factError && <p role="alert" className="text-red-500">Error: {factError.message}</p>}
      {factData && (
        <><h1 className='mt-5 lg:mt-8 text-2xl md:text-4xl text-sky-500 font-semibold'>Fact:</h1><p className='text-center sm:text-lg md:text-xl'>{factData.getChuckNorrisFactByCategory}</p></>
      )}
    </section>
  );
};

export default Categories;