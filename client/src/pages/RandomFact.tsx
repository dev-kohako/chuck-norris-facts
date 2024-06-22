import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CHUCK_NORRIS_FACT } from '../queries';

const RandomFact: React.FC = () => {
  const [getFact, { loading, data, error }] = useLazyQuery(GET_CHUCK_NORRIS_FACT);

  useEffect(() => {
    getFact();
  }, [getFact]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <section
      className='xs:max-w-[85%] xs:min-w-[85%] sm:max-w-[80%] sm:min-w-[80%] md:max-w-[70%] md:min-w-[70%] sm:landscape:min-w-[70%] sm:landscape:max-w-[70%] md:landscape:min-w-[60%] md:landscape:max-w-[60%] p-4 sm:p-6 md:px-8 md:py-6 bg-zinc-900/80 rounded-lg text-center text-pretty font-Poppins'
      aria-live="polite"
      aria-busy={loading}
    >
      <h2 className='pb-2 text-sky-500 font-semibold text-xl md:text-2xl'>Chuck Norris Random Fact</h2>
      {loading && (
        <p
          className='flex justify-center items-center text-zinc-300 flex-row-reverse gap-x-1 mt-2 text-lg md:text-xl'
          aria-label="Loading"
        >
          Loading Fact...
          <article
            className="h-5 md:h-6 w-5 md:w-6 rounded-full animate-spin border-2 border-l-zinc-100 border-r-zinc-100 border-b-zinc-100 border-t-sky-500"
            role="status"
            aria-label="Loading Spinner"
          ></article>
        </p>
      )}
      {error && (
        <p role="alert" className="text-red-600 font-semibold text-sm sm:text-base md:text-lg">
          Error: {error.message}
        </p>
      )}
      {data && data.getChuckNorrisFact && (
        <p className="text-zinc-300 text-lg md:text-xl">
          {data.getChuckNorrisFact}
        </p>
      )}
    </section>
  );
};

export default RandomFact;