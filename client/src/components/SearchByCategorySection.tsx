import React from 'react';

interface SearchByCategorySectionProps {
  onOpenModal: () => void;
}

const SearchByCategorySection: React.FC<SearchByCategorySectionProps> = ({ onOpenModal }) => {
  return (
    <section className='flex flex-col justify-center items-center sm:landscape:min-w-[70%] md:landscape:min-w-[60%] mt-4 font-Poppins xs:min-w-[85%] xs:max-w-[85%] sm:max-w-[80%] sm:min-w-[80%]'>
      <h1 className='uppercase font-semibold text-zinc-900/80 text-center'>
        Search for facts using Categories
      </h1>
      <button onClick={onOpenModal} className="w-full p-2 bg-zinc-900/80 text-zinc-200 rounded-lg hover:text-sky-500 duration-150" aria-label="Open categories modal">
        Get Categories
      </button>
    </section>
  );
};

export default SearchByCategorySection;