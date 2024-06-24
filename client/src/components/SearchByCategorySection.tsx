import React from 'react';

interface SearchByCategorySectionProps {
  onOpenModal: () => void;
}

const SearchByCategorySection: React.FC<SearchByCategorySectionProps> = ({ onOpenModal }) => {
  return (
    <section className="flex flex-col items-center justify-center mt-4 xs:min-w-[85%] xs:max-w-[85%] sm:min-w-[80%] sm:max-w-[80%] md:min-w-[70%] md:max-w-[70%] xl:landscape:min-w-[40%] xl:landscape:max-w-[40%] sm:landscape:min-w-[70%] md:landscape:min-w-[60%] md:landscape:max-w-[60%]">
      <h1 className="text-center font-semibold uppercase text-zinc-700 dark:text-zinc-200 md:text-xl z-50">
        Search for facts using Categories
      </h1>
      <button
        onClick={onOpenModal}
        className="w-full p-2 text-lg font-semibold text-zinc-700 bg-gradient-to-tl from-zinc-300 to-zinc-200 rounded-lg shadow-button-neumorphism hover:from-zinc-200/40 hover:to-zinc-100/40 dark:from-zinc-800 dark:to-zinc-700 dark:shadow-dark-button-neumorphism dark:text-zinc-200 dark:hover:from-zinc-800/40 dark:hover:to-zinc-700/40 dark:hover:text-sky-500 hover:text-sky-500 duration-150 md:p-3 md:text-xl md:mt-1"
        aria-label="Open categories modal"
      >
        Get Categories
      </button>
    </section>
  );
};

export default SearchByCategorySection;