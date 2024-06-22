import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_FACTS } from '../queries';

const FactByFreeText: React.FC = () => {
  const [freeText, setFreeText] = useState('');
  const [searchFacts, { loading, data, error }] = useLazyQuery(SEARCH_FACTS, {
    variables: { query: freeText },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchFacts({ variables: { query: freeText } });
  };

  return (
    <section
      className='xs:max-w-[85%] xs:min-w-[85%] sm:landscape:max-w-[70%] sm:landscape:min-w-[70%] mt-4 font-Poppins'
      aria-live="polite"
      aria-busy={loading}
    >
      <h2 className='uppercase font-semibold text-zinc-900/80 text-center'>Get Facts by Free Text</h2>
      <form onSubmit={handleSubmit} className='flex'>
        <label htmlFor="freeTextInput" className="sr-only">Enter your Search</label>
        <input
          id="freeTextInput"
          type="text"
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          placeholder="Enter your Search"
          name="freeText"
          className='placeholder:text-zinc-400 w-full py-1 pl-3 rounded-s-lg -outline-offset-1 focus:outline-zinc-700/80'
        />
        <button
          className='bg-zinc-900/80 text-zinc-200 py-1 px-3 rounded-e-lg text-nowrap hover:text-sky-500 duration-150'
          type="submit"
          aria-label="Get Fact"
        >
          Get Fact
        </button>
      </form>
      <div className='w-full bg-zinc-900/80 rounded-lg mt-4'>
        {loading && (
          <p
            className='flex justify-center items-center text-zinc-300 flex-row-reverse gap-x-1 py-4'
            aria-label="Loading"
          >
            Loading Fact...
            <article
              className="h-5 w-5 rounded-full animate-spin border-2 border-l-zinc-100 border-r-zinc-100 border-b-zinc-100 border-t-zinc-900"
              role="status"
              aria-label="Loading Spinner"
            ></article>
          </p>
        )}
        {error && (
          <p role="alert" className='text-red-600 font-semibold text-sm py-4 px-3'>
            Error: {error.message}
          </p>
        )}
        {data && (
          <p className="text-center p-4 text-zinc-200">
            {data.searchFacts}
          </p>
        )}
      </div>
    </section>
  );
};

export default FactByFreeText;