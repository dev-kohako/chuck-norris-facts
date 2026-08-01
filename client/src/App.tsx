import React, { lazy, Suspense } from "react";

import chuckDanceGif from "./assets/images/chuck-dancing.gif";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
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
      className="font-Poppins flex min-h-screen flex-col items-center justify-center gap-5
                bg-gradient-to-br from-zinc-300 to-zinc-200 px-4
                pt-[calc(var(--header-height)+2rem)] pb-[calc(var(--footer-height)+2rem)]
                dark:from-zinc-800 dark:to-zinc-700"
    >
      <Header />

      {/* The page led with an h2 and no h1 above it, which axe flags and screen
          readers read as a document with no title. The visible wordmark lives in
          the header, so the heading itself is only exposed to assistive tech. */}
      <h1 className="sr-only">Chuck Norris Facts</h1>

      <img
        src={chuckDanceGif}
        className="w-20 sm:w-24 md:w-28"
        alt="Chuck Norris dancing animation"
        aria-hidden="true"
        width={112}
        height={112}
        loading="lazy"
        decoding="async"
      />

      <Suspense fallback={<LoadingFallback />}>
        <RandomFact />
        <SearchByCategorySection onOpenModal={openModal} />
        <FactByFreeText />

        {isModalOpen && (
          <Suspense fallback={<LoadingBackdrop />}>
            <Modal
              onClose={closeModal}
              ariaLabel="Chuck Norris fact categories"
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
    className="flex w-full max-w-[85%] flex-col items-center gap-4 md:max-w-[70%]"
    role="status"
    aria-label="Loading content"
  >
    {[0, 1, 2, 3].map((row) => (
      <div
        key={row}
        className="h-12 w-full animate-pulse rounded-lg bg-zinc-400/70 dark:bg-zinc-600/70"
        aria-hidden="true"
      />
    ))}
    <span className="sr-only">Loading content...</span>
  </div>
);

const LoadingBackdrop: React.FC = () => (
  <div
    className="fixed inset-0 z-50 bg-zinc-900/80 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-busy="true"
    aria-label="Loading modal content"
  >
    <div className="sr-only">Loading modal content...</div>
  </div>
);

export default App;
