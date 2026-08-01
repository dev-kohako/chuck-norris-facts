import React from "react";

import { SearchByCategorySectionProps } from "../../types/types";
import { useSearchByCategorySection } from "./useSearchByCategorySection";

const SearchByCategorySection: React.FC<SearchByCategorySectionProps> = ({
  onOpenModal,
}) => {
  const { handleClick, handleKeyDown } = useSearchByCategorySection(onOpenModal);

  return (
    <section
      className="content-width flex flex-col items-center justify-center"
      aria-labelledby="categorySearchHeading"
    >
      <h2
        id="categorySearchHeading"
        className="text-center text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400 md:text-base"
      >
        Search for facts using Categories
      </h2>

      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="btn-neumorphic mt-2 w-full p-2 text-lg font-semibold md:text-xl"
        aria-label="Open categories modal"
        aria-haspopup="dialog"
      >
        Get Categories
      </button>
    </section>
  );
};

export default SearchByCategorySection;
