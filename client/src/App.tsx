import React, { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import chuckDanceGif from "./assets/images/chuck-dancing.gif";
import { useModal } from "./utils/useModal";

const RandomFact = lazy(() => import("./pages/RandomFact/RandomFact"));
const Categories = lazy(() => import("./pages/Categories/Categories"));
const Modal = lazy(() => import("./components/Modal/Modal"));
const FactByFreeText = lazy(
  () => import("./pages/FactByFreeText/FactByFreeText")
);
const SearchByCategorySection = lazy(
  () => import("./components/SearchByCategorySection/SearchByCategorySection")
);

const App: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <main
      className="flex flex-col min-h-screen max-h-max justify-center items-center bg-gradient-to-br from-zinc-300 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 overflow-hidden font-Poppins py-20"
      role="main"
    >
      <Header />

      <img
        src={chuckDanceGif}
        className="w-20 sm:w-24 xs:landscape:mt-10 sm:landscape:mt-2 md:w-28 z-50"
        alt="Chuck Norris dancing animation"
        aria-hidden="true"
        loading="lazy"
      />

      <Suspense fallback={<LoadingFallback />}>
        <RandomFact />
        <SearchByCategorySection onOpenModal={openModal} />
        <FactByFreeText />

        {isModalOpen && (
          <Suspense fallback={<LoadingBackdrop />}>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              aria-labelledby="categories-modal-title"
            >
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
  <div
    className="flex flex-col items-center justify-center space-y-4 mb-3 animate-pulse"
    role="status"
    aria-label="Loading content"
  >
    <div
      className="w-64 h-12 bg-zinc-400 dark:bg-zinc-600 rounded-lg"
      aria-hidden="true"
    ></div>
    <div
      className="w-64 h-12 bg-zinc-400 dark:bg-zinc-600 rounded-lg"
      aria-hidden="true"
    ></div>
    <div
      className="w-64 h-12 bg-zinc-400 dark:bg-zinc-600 rounded-lg"
      aria-hidden="true"
    ></div>
    <div
      className="w-64 h-12 bg-zinc-400 dark:bg-zinc-600 rounded-lg"
      aria-hidden="true"
    ></div>
    <span className="sr-only">Loading content...</span>
  </div>
);

const LoadingBackdrop: React.FC = () => (
  <div
    className="fixed inset-0 z-50 bg-gray-800 bg-opacity-80"
    role="dialog"
    aria-modal="true"
    aria-busy="true"
    aria-label="Loading modal content"
  >
    <div className="sr-only">Loading modal content...</div>
  </div>
);

export default App;
