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
      className='xs:max-w-[85%] xs:min-w-[85%] sm:max-w-[80%] sm:min-w-[80%] sm:landscape:min-w-[70%] sm:landscape:max-w-[70%] md:landscape:min-w-[60%] md:landscape:max-w-[60%] p-4 bg-zinc-900/80 rounded-lg text-center text-pretty font-Poppins'
      aria-live="polite"
      aria-busy={loading}
    >
      <h2 className='pb-2 text-sky-500 text-lg font-semibold sm:text-xl'>Chuck Norris Random Fact</h2>
      {loading && (
        <p
          className='flex justify-center items-center text-zinc-300 flex-row-reverse gap-x-1 mt-2'
          aria-label="Loading"
        >
          Loading Fact...
          <article
            className="xs:h-5 xs:w-5 rounded-full animate-spin border-2 border-l-zinc-100 border-r-zinc-100 border-b-zinc-100 border-t-sky-500"
            role="status"
            aria-label="Loading Spinner"
          ></article>
        </p>
      )}
      {error && (
        <p role="alert" className="text-red-500">
          Error: {error.message}
        </p>
      )}
      {data && data.getChuckNorrisFact && (
        <p className="text-base text-zinc-300">
          {data.getChuckNorrisFact}
        </p>
      )}
    </section>
  );
};

export default RandomFact;