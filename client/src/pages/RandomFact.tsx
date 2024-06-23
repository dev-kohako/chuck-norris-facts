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
      className='xs:max-w-[85%] xs:min-w-[85%] sm:max-w-[80%] sm:min-w-[80%] md:max-w-[70%] md:min-w-[70%] sm:landscape:min-w-[70%] sm:landscape:max-w-[70%] md:landscape:min-w-[60%] md:landscape:max-w-[60%] xl:landscape:min-w-[40%] xl:landscape:max-w-[40%] p-4 sm:p-6 md:px-8 md:py-6 bg-zinc-900/80 dark:text-zinc-200 dark:border-2 dark:border-zinc-300 rounded-lg text-center text-pretty cursor-pointer'
      aria-live="polite"
      aria-busy={loading}
    >
      <h2 className='pb-2 text-sky-500 font-semibold text-lg md:text-2xl'>Chuck Norris Random Fact</h2>
      {loading && !error && (
        <div className='flex justify-center items-center mb-2'><article className="xs:h-5 md:h-6 xs:w-5 md:w-6 mr-1.5 rounded-full animate-spin border-2 border-l-zinc-200 border-r-zinc-200 border-b-zinc-200 border-t-sky-500" role="status" aria-label="Loading Spinner"></article><p className='text-lg md:text-xl flex flex-row-reverse gap-x-1 text-zinc-200 animate-pulse' aria-label="Loading Fact">
        Loading a new Fact...
      </p></div>
      )}
      {error && (
        <div className='rounded-lg py-4 bg-red-100 dark:bg-red-600 text-red-600 dark:text-red-200'>
          <p role="alert" className='text-sm sm:text-base md:text-lg'>
            Error: {error.message}
          </p>
        </div>
      )}
      {data && data.getChuckNorrisFact && (
        <><p className="text-zinc-200 text-lg md:text-xl">
          {data.getChuckNorrisFact}
        </p><button onClick={handleClick} className='md:text-lg bg-zinc-200 text-zinc-900/80 border-transparent text-sm p-1 px-3 hover:text-sky-500 dark:hover:text-sky-500 duration-150 border-2 dark:border-zinc-200 dark:bg-transparent dark:text-zinc-200 hover:bg-zinc-100 rounded-lg mt-4 font-medium'>Get a New Fact</button></>
      )}
    </section>
  );
};

export default RandomFact;
