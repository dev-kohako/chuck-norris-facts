import React, { useState, Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import chuckDanceGif from './images/chuck-dancing.gif';
import DarkModeButton from './components/DarkModeButton';
import { delay } from './utils/delay';

const RandomFact = lazy(async () => {
  await delay(500);
  return import('./pages/RandomFact');
});
const Categories = lazy(async () => {
  await delay(500);
  return import('./pages/Categories');
});
const Modal = lazy(async () => {
  await delay(0);
  return import('./components/Modal');
});
const FactByFreeText = lazy(async () => {
  await delay(500);
  return import('./pages/FactByFreeText');
});
const SearchByCategorySection = lazy(async () => {
  await delay(500);
  return import('./components/SearchByCategorySection');
});

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme === 'dark' : false;
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
      <main className="flex flex-col xs:min-h-screen xs:max-h-max xs:pb-[4em] sm:landscape:h-auto justify-center items-center bg-zinc-300 dark:bg-zinc-900 overflow-hidden font-Poppins">
      <Header />
      <img 
        src={chuckDanceGif} 
        className='w-20 sm:w-24 pt-10 xs:landscape:mt-10 sm:landscape:mt-2 md:w-28 md:pt-20' 
        alt='Chuck Norris dancing' 
        aria-label='Chuck Norris dancing'
      />
        <DarkModeButton onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Suspense fallback={<div className="bg-zinc-400 dark:bg-zinc-600 h-40 xs:max-w-[85%] xs:min-w-[85%] sm:max-w-[80%] sm:min-w-[80%] md:max-w-[70%] md:min-w-[70%] sm:landscape:min-w-[70%] sm:landscape:max-w-[70%] md:landscape:min-w-[60%] md:landscape:max-w-[60%] xl:landscape:min-w-[40%] xl:landscape:max-w-[40%] mb-3 animate-pulse rounded-lg"></div>}>
          <RandomFact />
          <SearchByCategorySection onOpenModal={openModal} />
          <FactByFreeText />
        </Suspense>
        {isModalOpen && (
        <Suspense fallback={<div className="backdrop-blur-lg h-screen w-screen fixed "></div>}>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Categories />
          </Modal>
        </Suspense>
      )}
      <Footer />
    </main>
  );
};

export default App;
