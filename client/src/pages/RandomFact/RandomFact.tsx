import React from "react";

import { useRandomFact } from "./useRandomFact";

const RandomFact: React.FC = () => {
  const { loading, error, data, handleClick } = useRandomFact();

  return (
    <section
      className="surface content-width rounded-2xl p-5 text-center text-pretty sm:p-6 md:px-8 md:py-7"
      aria-live="polite"
      aria-busy={loading}
    >
      <h2
        id="random-fact-heading"
        className="text-accent pb-3 text-lg font-semibold md:text-2xl"
      >
        Chuck Norris Random Fact
      </h2>

      {loading && (
        <div
          className="flex items-center justify-center gap-2"
          role="status"
          aria-label="Loading fact"
        >
          <span
            className="spinner-ring h-5 w-5 animate-spin md:h-6 md:w-6"
            aria-hidden="true"
          />
          <span className="animate-pulse text-zinc-600 dark:text-zinc-400 md:text-lg">
            Loading a new Fact...
          </span>
        </div>
      )}

      {error && (
        <div role="alert" aria-live="assertive">
          <p className="text-danger text-sm font-semibold sm:text-base md:text-lg">
            Error: {error.message}
          </p>
        </div>
      )}

      {data && data.getChuckNorrisFact && (
        <div className="animate-fade-in-up">
          <p className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 md:text-xl">
            {data.getChuckNorrisFact}
          </p>
          <button
            onClick={handleClick}
            className="btn-neumorphic mt-5 px-4 py-1.5 text-sm font-medium md:text-lg"
            aria-label="Get a new random Chuck Norris fact"
          >
            Get a New Fact
          </button>
        </div>
      )}
    </section>
  );
};

export default RandomFact;
