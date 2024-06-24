import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CHUCK_NORRIS_FACT_BY_TEXT } from '../queries';

const FactByFreeText: React.FC = () => {
  const [freeText, setFreeText] = useState('');
  const [searchFacts, { loading, data, error }] = useLazyQuery(GET_CHUCK_NORRIS_FACT_BY_TEXT);
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (freeText.trim() !== '') {
      searchFacts({ variables: { query: freeText } });
      setInputError(false);
    } else {
      setInputError(true); 
    }
  };

  return (
    <section
      className="mt-4 xs:max-w-[85%] xs:min-w-[85%] sm:max-w-[80%] sm:min-w-[80%] md:max-w-[70%] md:min-w-[70%] sm:landscape:min-w-[70%] sm:landscape:max-w-[70%] md:landscape:min-w-[60%] md:landscape:max-w-[60%] xl:landscape:min-w-[40%] xl:landscape:max-w-[40%]"
      aria-live="polite"
      aria-busy={loading}
    >
      <h2 className="text-center font-semibold text-zinc-900/80 dark:text-zinc-200 uppercase md:text-xl">
        Get Facts by Free Text
      </h2>
      <form onSubmit={handleSubmit} className="flex md:mt-1">
        <label htmlFor="freeTextInput" className="sr-only">Enter your Search</label>
        <input
          id="freeTextInput"
          type="text"
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          placeholder="Enter your Search"
          name="freeText"
          className="w-full py-1 pl-3 pr-3 md:py-2 sm:pl-4 rounded-s-lg bg-zinc-50 focus:bg-zinc-100 dark:bg-zinc-500 dark:focus:bg-zinc-600 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-lg md:text-xl z-50 outline-none"
          aria-label="Enter your Search"
        />
        <button
          type="submit"
          className="py-1 px-3 text-lg md:text-xl font-semibold text-nowrap text-zinc-700 dark:text-zinc-200 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-e-lg hover:text-sky-500 dark:hover:text-sky-500 duration-150"
          aria-label="Get Fact"
        >
          Get Fact
        </button>
      </form>

      <div className="w-full text-center mt-4 md:mt-6">
        {loading && !inputError && (
          <div
            className="flex items-center justify-center py-4 mb-4 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg"
            aria-live="assertive"
          >
            <article
              className="mr-1.5 h-5 w-5 md:h-6 md:w-6 rounded-full animate-spin border-2 border-l-zinc-700 dark:border-l-zinc-200 border-r-zinc-700 dark:border-r-zinc-200 border-b-zinc-700 dark:border-b-zinc-200 border-t-sky-500 dark:border-t-sky-500"
              role="status"
              aria-label="Loading Spinner"
            ></article>
            <p className="flex items-center justify-center text-lg md:text-xl text-zinc-700 dark:text-zinc-200 gap-x-1">
              Loading Fact...
            </p>
          </div>
        )}
        {error && !inputError && (
          <div
            className="p-4 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg"
            aria-live="assertive"
          >
            <p role="alert" className="text-sm sm:text-base md:text-lg font-semibold text-red-600">
              Error: {error.message}
            </p>
          </div>
        )}
        {data && data.searchFacts && !inputError && (
          <div
            className="mt-4 md:mt-6 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg"
          >
            <h1 className="pt-5 text-xl md:text-3xl font-semibold text-sky-500">Fact:</h1>
            <p className="p-4 pt-1 sm:pt-1 sm:p-6 text-lg md:text-xl text-center text-zinc-700 dark:text-zinc-200">
              {data.searchFacts}
            </p>
          </div>
        )}
        {inputError && (
          <div
            className="p-4 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg"
            aria-live="assertive"
          >
            <p role="alert" className="text-sm sm:text-base md:text-lg font-semibold text-red-600">
              Please enter a search query.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FactByFreeText;