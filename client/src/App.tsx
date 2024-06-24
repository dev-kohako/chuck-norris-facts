import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import chuckDanceGif from './images/chuck-dancing.gif';
import DarkModeButton from './components/DarkModeButton';

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

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col min-h-screen max-h-max justify-center items-center bg-gradient-to-br from-zinc-300 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 overflow-hidden font-Poppins py-20">
      <Header />
      <img 
        src={chuckDanceGif} 
        className="w-20 sm:w-24 xs:landscape:mt-10 sm:landscape:mt-2 md:w-28 z-50" 
        alt="Chuck Norris dancing" 
        aria-label="Chuck Norris dancing"
      />
      <DarkModeButton onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <Suspense fallback={<LoadingFallback />}>
        <RandomFact />
        <SearchByCategorySection onOpenModal={openModal} />
        <FactByFreeText />
        {isModalOpen && (
          <Suspense fallback={<LoadingBackdrop />}>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <Categories />
            </Modal>
          </Suspense>
        )}
        <Footer />
      </Suspense>
    </main>
  );
};

const LoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 mb-3 animate-pulse">
    <div className="w-64 h-12 bg-zinc-400 dark:bg-zinc-600 rounded-lg"></div>
    <div className="w-64 h-12 bg-zinc-400 dark:bg-zinc-600 rounded-lg"></div>
    <div className="w-64 h-12 bg-zinc-400 dark:bg-zinc-600 rounded-lg"></div>
    <div className="w-64 h-12 bg-zinc-400 dark:bg-zinc-600 rounded-lg"></div>
  </div>
);

const LoadingBackdrop: React.FC = () => (
  <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-80"></div>
);

export default App;
