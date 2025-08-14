import React from "react";
import { SearchByCategorySectionProps } from "../../types/types";
import { useSearchByCategorySection } from "./useSearchByCategorySection";

const SearchByCategorySection: React.FC<SearchByCategorySectionProps> = ({
  onOpenModal,
}) => {
  const { handleClick, handleKeyDown } = useSearchByCategorySection(onOpenModal);

  return (
    <section
      className="flex flex-col items-center justify-center mt-4 w-full max-w-[85%] 
                sm:max-w-[80%] md:max-w-[70%] 
                xl:landscape:max-w-[40%] 
                sm:landscape:max-w-[70%] 
                md:landscape:max-w-[60%]"
      aria-labelledby="categorySearchHeading"
    >
      <h2
        id="categorySearchHeading"
        className="text-center font-semibold uppercase text-zinc-700 dark:text-zinc-200 md:text-xl"
      >
        Search for facts using Categories
      </h2>

      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="w-full p-2 mt-2 text-lg font-semibold text-zinc-700 
                  bg-gradient-to-tl from-zinc-300 to-zinc-200 rounded-lg 
                  shadow-button-neumorphism hover:from-zinc-200/40 hover:to-zinc-100/40 
                  dark:from-zinc-800 dark:to-zinc-700 dark:shadow-dark-button-neumorphism 
                  dark:text-zinc-200 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 
                  hover:text-sky-500 dark:hover:text-sky-500 
                  transition-colors duration-150 md:text-xl"
        aria-label="Open categories modal"
        aria-haspopup="dialog"
      >
        Get Categories
      </button>
    </section>
  );
};

export default SearchByCategorySection;
