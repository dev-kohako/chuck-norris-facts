import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

import chuckDanceGif from "./assets/images/chuck-dancing.gif";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Skeleton } from "./components/ui/skeleton";

const RandomFact = lazy(() => import("./pages/RandomFact/RandomFact"));
const FactByFreeText = lazy(
  () => import("./pages/FactByFreeText/FactByFreeText")
);
const SearchByCategorySection = lazy(
  () => import("./components/SearchByCategorySection/SearchByCategorySection")
);

const App = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <main
        className="mx-auto w-full max-w-3xl flex-1 px-4
                  pt-[calc(var(--header-height)+2rem)]
                  pb-[calc(var(--footer-height)+2rem)]"
      >
        {/* The mascot used to float above the content on its own, reading as a
            stray image. It anchors the title now, so the two land as one block. */}
        <section className="flex flex-col items-center text-center">
          <img
            src={chuckDanceGif}
            className="h-24 w-24 [image-rendering:pixelated] sm:h-28 sm:w-28"
            alt={t("common.mascotAlt")}
            width={112}
            height={112}
            decoding="async"
            fetchPriority="high"
          />
          <h1 className="font-display mt-3 text-3xl leading-none tracking-tight sm:text-4xl">
            {t("app.title")}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            {t("app.tagline")}
          </p>
        </section>

        <Suspense fallback={<LoadingFallback />}>
          <div className="mt-8 space-y-4">
            <RandomFact />

            <div className="grid items-start gap-4 md:grid-cols-2">
              <SearchByCategorySection />
              <FactByFreeText />
            </div>
          </div>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

const LoadingFallback = () => {
  const { t } = useTranslation();

  return (
    <div
      className="mt-8 space-y-4"
      role="status"
      aria-label={t("common.loadingContent")}
    >
      <Skeleton className="h-44 w-full rounded-xl" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <span className="sr-only">{t("common.loadingContent")}</span>
    </div>
  );
};

export default App;
