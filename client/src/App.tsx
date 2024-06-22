import React, { useState, Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import chuckDanceGif from './images/chuck-dancing.gif';
const RandomFact = lazy(() => import('./pages/RandomFact'));
const Categories = lazy(() => import('./pages/Categories'));
const Modal = lazy(() => import('./components/Modal'));
const FactByFreeText = lazy(() => import('./pages/FactByFreeText'));
const SearchByCategorySection = lazy(() => import('./components/SearchByCategorySection'));

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
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main className={`flex flex-col xs:min-h-screen xs:max-h-max xs:pb-[4em] sm:landscape:h-auto justify-center items-center bg-zinc-300 dark:bg-zinc-900 overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      <Header />
      <img 
        src={chuckDanceGif} 
        className='w-20 sm:w-24 pt-10 md:w-28 md:pt-20' 
        alt='Chuck Norris dancing' 
        aria-label='Chuck Norris dancing'
      />

<button onClick={toggleTheme} className="p-2 bg-gray-300 rounded">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

      <Suspense fallback={<div>Loading...</div>}>
        <RandomFact />
      </Suspense>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Categories />
        </Modal>
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <SearchByCategorySection onOpenModal={openModal} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <FactByFreeText />
      </Suspense>
      <Footer />
    </main>
  );
};

export default App;