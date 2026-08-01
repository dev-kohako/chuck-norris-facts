import React, { ReactNode } from "react";

import { useFactByFreeText } from "./useFactByFreeText";

/** The four result states below were four copies of the same panel markup. */
const Panel = ({
  children,
  ...props
}: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className="surface-raised rounded-xl p-4" {...props}>
    {children}
  </div>
);

const FactByFreeText: React.FC = () => {
  const {
    sectionId,
    inputId,
    freeText,
    handleInputChange,
    handleSubmit,
    loading,
    inputError,
    hasSubmitted,
    error,
    errorId,
    data,
  } = useFactByFreeText();

  return (
    <section
      className="content-width"
      aria-live="polite"
      aria-busy={loading}
      aria-labelledby={sectionId}
    >
      <h2
        id={sectionId}
        className="text-center text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400 md:text-base"
      >
        Get Facts by Free Text
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-2 flex"
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
          className="w-full rounded-s-lg bg-zinc-50 py-1.5 pl-3 pr-3 text-lg outline-none
                    transition-colors duration-200 placeholder:text-zinc-400
                    focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500
                    disabled:opacity-60 sm:pl-4 md:py-2 md:text-xl
                    dark:bg-zinc-600 dark:text-zinc-100 dark:placeholder:text-zinc-400"
          aria-required="true"
          aria-invalid={inputError ? "true" : "false"}
          aria-describedby={inputError ? errorId : undefined}
          disabled={loading}
          autoComplete="off"
          maxLength={100}
        />
        <button
          type="submit"
          className="btn-neumorphic text-nowrap rounded-s-none rounded-e-lg px-3 py-1 text-lg
                    font-semibold disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
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

      <div className="mt-4 w-full space-y-4 text-center md:mt-6">
        {loading && (
          <Panel role="status" aria-label="Loading fact">
            <span className="flex items-center justify-center gap-2">
              <span
                className="spinner-ring h-5 w-5 animate-spin md:h-6 md:w-6"
                aria-hidden="true"
              />
              <span className="text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
                Loading Fact...
              </span>
            </span>
          </Panel>
        )}

        {error && (
          <Panel role="alert" aria-live="assertive">
            <p className="text-danger text-sm font-semibold sm:text-base md:text-lg">
              <span className="sr-only">Error:</span> {error.message}
            </p>
          </Panel>
        )}

        {inputError && (
          <Panel id={errorId} role="alert" aria-live="assertive">
            <p className="text-danger text-sm font-semibold sm:text-base md:text-lg">
              Please enter a search query.
            </p>
          </Panel>
        )}

        {!loading && hasSubmitted && !data?.searchFacts && !error && (
          <Panel role="status" aria-live="polite">
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 sm:text-base md:text-lg">
              No facts found for your search. Try a different term.
            </p>
          </Panel>
        )}

        {data?.searchFacts && (
          <article
            className="surface-raised animate-fade-in-up rounded-xl p-5 sm:p-6"
            aria-live="polite"
          >
            <h3 className="text-accent text-xl font-semibold md:text-3xl">
              Search Result:
            </h3>
            <p className="mt-2 text-center text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 md:text-xl">
              {data.searchFacts}
            </p>
          </article>
        )}
      </div>
    </section>
  );
};

export default FactByFreeText;
