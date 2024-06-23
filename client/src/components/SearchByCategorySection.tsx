import React from 'react';

interface SearchByCategorySectionProps {
  onOpenModal: () => void;
}

const SearchByCategorySection: React.FC<SearchByCategorySectionProps> = ({ onOpenModal }) => {
  return (
    <section className='flex flex-col justify-center items-center sm:landscape:min-w-[70%] md:landscape:min-w-[60%] md:landscape:max-w-[60%] mt-4 xs:min-w-[85%] xs:max-w-[85%] sm:max-w-[80%] sm:min-w-[80%] md:max-w-[70%] md:min-w-[70%] xl:landscape:min-w-[40%] xl:landscape:max-w-[40%]'>
      <h1 className='uppercase font-semibold text-zinc-900/80 dark:text-zinc-200 text-center md:text-xl'>
        Search for facts using Categories
      </h1>
      <button
        onClick={onOpenModal}
        className="w-full p-2 md:p-3 bg-zinc-900/80 border-2 border-transparent dark:border-zinc-300 text-zinc-200 dark:text-zinc-200 rounded-lg dark:hover:text-sky-500 hover:text-sky-500 duration-150 text-lg md:text-xl md:mt-1"
        aria-label="Open categories modal"
      >
        Get Categories
      </button>
    </section>
  );
};

export default SearchByCategorySection;