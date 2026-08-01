import { useTranslation } from "react-i18next";

import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { useCategories } from "./useCategories";

const titleCase = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const Categories = () => {
  const {
    categoriesLoading,
    categoriesError,
    categoriesData,
    selectedCategory,
    handleKeyDown,
    handleCategoryClick,
    factLoading,
    factError,
    factData,
  } = useCategories();
  const { t } = useTranslation();

  // The section carries no `aria-labelledby` and the title no `id`: Radix
  // generates its own id for the dialog's accessible name, and overriding it
  // leaves the dialog pointing at an element that no longer carries that id.
  return (
    <section>
      <DialogHeader>
        <DialogTitle className="font-heading text-xl font-semibold tracking-tight">
          {t("categories.title")}
        </DialogTitle>
        <DialogDescription>{t("categories.sectionTitle")}</DialogDescription>
      </DialogHeader>

      {categoriesLoading ? (
        <div
          className="mt-6 flex flex-wrap gap-2"
          role="status"
          aria-label={t("categories.loadingAria")}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <Skeleton key={index} className="h-8 w-20 rounded-lg" />
          ))}
          <span className="sr-only">{t("categories.loading")}</span>
        </div>
      ) : categoriesError ? (
        <p
          role="alert"
          aria-live="assertive"
          className="text-destructive mt-6 text-sm font-medium"
        >
          {t("categories.loadError", { message: categoriesError.message })}
        </p>
      ) : (
        <ul
          className="mt-6 flex flex-wrap justify-center gap-2"
          aria-label={t("categories.listAria")}
        >
          {categoriesData?.getChuckNorrisCategories.map((category: string) => {
            const isSelected = selectedCategory === category;

            return (
              <li key={category}>
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(category)}
                  onKeyDown={(e) => handleKeyDown(e, category)}
                  aria-label={t("categories.getFactAria", { category })}
                  aria-pressed={isSelected}
                >
                  {titleCase(category)}
                </Button>
              </li>
            );
          })}
        </ul>
      )}

      {/* The min-height is what the centring actually centres against — without
          it the panel collapses onto its content and the box jumps between the
          empty, loading and loaded states. */}
      <div
        className="bg-muted/50 mt-6 flex min-h-28 items-center justify-center rounded-lg p-4 text-center"
        aria-live="polite"
      >
        {factLoading ? (
          <div
            className="text-muted-foreground flex items-center justify-center gap-2 py-4 text-sm"
            role="status"
            aria-label={t("randomFact.loadingAria")}
          >
            <Spinner />
            {t("categories.factLoading", { category: selectedCategory })}
          </div>
        ) : factError ? (
          <p
            role="alert"
            aria-live="assertive"
            className="text-destructive text-center text-sm font-medium"
          >
            {t("categories.factError", { message: factError.message })}
          </p>
        ) : factData?.getChuckNorrisFactByCategory ? (
          <div className="animate-in fade-in slide-in-from-bottom-1 text-center duration-300">
            <h3 className="text-primary text-sm font-semibold">
              {t("categories.factAbout", { category: selectedCategory })}
            </h3>
            <p className="mt-2 text-balance leading-relaxed">
              {factData.getChuckNorrisFactByCategory}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground py-4 text-center text-sm">
            {t("categories.empty")}
          </p>
        )}
      </div>
    </section>
  );
};

export default Categories;
