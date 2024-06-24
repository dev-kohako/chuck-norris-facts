import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_RANDOM_CHUCK_NORRIS_FACT } from '../queries';

const RandomFact: React.FC = () => {
  const [getFact, { loading, data, error }] = useLazyQuery(GET_RANDOM_CHUCK_NORRIS_FACT, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getFact();
  }, [getFact]);

  const handleClick = () => {
    getFact();
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <section
      className="p-4 sm:p-6 md:px-8 md:py-6 bg-gradient-to-tl from-zinc-300 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 shadow-neumorphism dark:shadow-dark-neumorphism dark:text-zinc-200 rounded-lg text-center text-pretty xs:max-w-[85%] xs:min-w-[85%] sm:max-w-[80%] sm:min-w-[80%] md:max-w-[70%] md:min-w-[70%] sm:landscape:min-w-[70%] sm:landscape:max-w-[70%] md:landscape:min-w-[60%] md:landscape:max-w-[60%] xl:landscape:min-w-[40%] xl:landscape:max-w-[40%]"
      aria-live="polite"
      aria-busy={loading}
    >
      <h2 className="pb-2 text-lg md:text-2xl font-semibold text-sky-500">Chuck Norris Random Fact</h2>
      {loading && !error && (
        <div className="flex items-center justify-center mb-2">
          <article
            className="mr-1.5 h-5 w-5 md:h-6 md:w-6 rounded-full animate-spin border-2 border-l-zinc-700 dark:border-l-zinc-200 border-r-zinc-700 dark:border-r-zinc-200 border-b-zinc-700 dark:border-b-zinc-200 border-t-sky-500"
            role="status"
            aria-label="Loading Spinner"
          ></article>
          <p
            className="flex flex-row-reverse gap-x-1 md:text-lg text-zinc-700 dark:text-zinc-200 animate-pulse"
            aria-label="Loading Fact"
          >
            Loading a new Fact...
          </p>
        </div>
      )}
      {error && (
        <div className="p-4 rounded-lg text-red-600 text-sm sm:text-base md:text-lg font-semibold">
          <p role="alert" className="text-sm sm:text-base md:text-lg">
            Error: {error.message}
          </p>
        </div>
      )}
      {data && data.getChuckNorrisFact && (
        <>
          <p className="text-lg md:text-xl text-zinc-800 dark:text-zinc-300 z-[100]">
            {data.getChuckNorrisFact}
          </p>
          <button
            onClick={handleClick}
            className="mt-4 p-1 px-3 text-sm md:text-lg font-medium text-zinc-700 dark:text-zinc-200 hover:text-sky-500 dark:hover:text-sky-500 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg duration-150"
          >
            Get a New Fact
          </button>
        </>
      )}
    </section>
  );
};

export default RandomFact;