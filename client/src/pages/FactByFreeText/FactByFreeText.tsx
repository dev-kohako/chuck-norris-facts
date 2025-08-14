import React from "react";
import { useFactByFreeText } from "./useFactByFreeText";

const FactByFreeText: React.FC = () => {
  const { sectionId, inputId, freeText, handleInputChange, handleSubmit, loading, inputError, hasSubmitted, error, errorId, data } = useFactByFreeText();
  
  return (
    <section
      className="mt-4 w-full max-w-[85%] sm:max-w-[80%] md:max-w-[70%] 
                landscape:sm:max-w-[70%] landscape:md:max-w-[60%] landscape:xl:max-w-[40%]"
      aria-live="polite"
      aria-busy={loading}
      aria-labelledby={sectionId}
    >
      <h2
        id={sectionId}
        className="text-center font-semibold text-zinc-900/80 dark:text-zinc-200 uppercase md:text-xl"
      >
        Get Facts by Free Text
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex md:mt-1"
        noValidate
        role="search"
        aria-label="Search Chuck Norris facts"
      >
        <label htmlFor={inputId} className="sr-only">
          Search for Chuck Norris facts
        </label>
        <input
          id={inputId}
          type="text"
          value={freeText}
          onChange={handleInputChange}
          placeholder="Enter your search term"
          name="freeText"
          className="w-full py-1 pl-3 pr-3 md:py-2 sm:pl-4 rounded-s-lg 
                    bg-zinc-50 focus:bg-zinc-100 dark:bg-zinc-500 dark:focus:bg-zinc-600 
                    dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 
                    text-lg md:text-xl z-50 outline-none transition-colors duration-200
                    focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
          aria-required="true"
          aria-invalid={inputError ? "true" : "false"}
          aria-describedby={inputError ? errorId : undefined}
          disabled={loading}
          autoComplete="off"
          maxLength={100}
        />
        <button
          type="submit"
          className="py-1 px-3 text-lg md:text-xl font-semibold text-nowrap 
                    text-zinc-700 dark:text-zinc-200 
                    bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 
                    dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 
                    shadow-button-neumorphism dark:shadow-dark-button-neumorphism 
                    rounded-e-lg hover:text-sky-500 dark:hover:text-sky-500 duration-150
                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50
                    disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !freeText.trim()}
          aria-label={loading ? "Searching for facts..." : "Search for facts"}
        >
          {loading ? (
            <>
              <span className="sr-only">Searching</span>
              <span aria-hidden="true">Searching...</span>
            </>
          ) : (
            "Get Fact"
          )}
        </button>
      </form>

      <div className="w-full text-center mt-4 md:mt-6 space-y-4">
        {loading && (
          <div
            className="flex items-center justify-center py-4 mb-4 
                      bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 
                      dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 
                      shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg"
            role="status"
            aria-label="Loading fact"
          >
            <span
              className="mr-1.5 h-5 w-5 md:h-6 md:w-6 rounded-full animate-spin 
                        border-2 border-l-zinc-700 dark:border-l-zinc-200 border-r-zinc-700 dark:border-r-zinc-200 
                        border-b-zinc-700 dark:border-b-zinc-200 border-t-sky-500 dark:border-t-sky-500"
              aria-hidden="true"
            />
            <span className="flex items-center justify-center text-lg md:text-xl text-zinc-700 dark:text-zinc-200 gap-x-1">
              Loading Fact...
            </span>
          </div>
        )}

        {error && (
          <div
            className="p-4 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 
                      dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 
                      shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-sm sm:text-base md:text-lg font-semibold text-red-600">
              <span className="sr-only">Error:</span> {error.message}
            </p>
          </div>
        )}

        {inputError && (
          <div
            id={errorId}
            className="p-4 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 
                      dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 
                      shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-sm sm:text-base md:text-lg font-semibold text-red-600">
              Please enter a search query.
            </p>
          </div>
        )}

        {!loading && hasSubmitted && !data?.searchFacts && !error && (
          <div
            className="p-4 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 
                      dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 
                      shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm sm:text-base md:text-lg font-semibold text-zinc-700 dark:text-zinc-200">
              No facts found for your search. Try a different term.
            </p>
          </div>
        )}

        {data?.searchFacts && (
          <article
            className="mt-4 md:mt-6 bg-gradient-to-tl from-zinc-300 to-zinc-200 hover:from-zinc-200/40 hover:to-zinc-100/40 
                      dark:from-zinc-800 dark:to-zinc-700 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 
                      shadow-button-neumorphism dark:shadow-dark-button-neumorphism rounded-lg"
            aria-live="polite"
          >
            <h3 className="pt-5 text-xl md:text-3xl font-semibold text-sky-500">
              Search Result:
            </h3>
            <p className="p-4 pt-1 sm:pt-1 sm:p-6 text-lg md:text-xl text-center text-zinc-700 dark:text-zinc-200">
              {data.searchFacts}
            </p>
          </article>
        )}
      </div>
    </section>
  );
};

export default FactByFreeText;
