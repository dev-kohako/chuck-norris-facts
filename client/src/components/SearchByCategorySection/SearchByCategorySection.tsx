import { LayoutGrid } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";

import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Categories = lazy(() => import("@/pages/Categories/Categories"));

/**
 * The dialog lives here rather than in `App` now that Radix owns its open
 * state — the section that triggers it is the only thing that cares. Radix also
 * brings the focus trap, the inert background and the scroll lock the
 * hand-rolled portal never had.
 */
const SearchByCategorySection = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <section aria-labelledby="categorySearchHeading">
      <Card>
        <CardHeader>
          <h2
            id="categorySearchHeading"
            className="font-heading text-base font-semibold tracking-tight"
          >
            {t("categories.sectionTitle")}
          </h2>
        </CardHeader>

        <CardContent>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                aria-label={t("categories.openAria")}
              >
                <LayoutGrid aria-hidden="true" />
                {t("categories.open")}
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
              {/* The title sits outside the lazy boundary on purpose: Radix
                  names the dialog from it, and while the content chunk is still
                  loading there would otherwise be no title in the tree at all —
                  an unnamed dialog, which axe reports as `aria-dialog-name`. */}
              <DialogHeader>
                <DialogTitle className="font-heading text-xl font-semibold tracking-tight">
                  {t("categories.title")}
                </DialogTitle>
                <DialogDescription>
                  {t("categories.sectionTitle")}
                </DialogDescription>
              </DialogHeader>

              {/* Only loads when the dialog first opens — Radix unmounts the
                  content while closed. */}
              <Suspense fallback={<DialogLoading />}>
                <Categories />
              </Suspense>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </section>
  );
};

const DialogLoading = () => {
  const { t } = useTranslation();

  return (
    <div
      className="text-muted-foreground flex items-center justify-center gap-2 py-10"
      role="status"
      aria-label={t("categories.loadingAria")}
    >
      <Spinner />
      {t("categories.loading")}
    </div>
  );
};

export default SearchByCategorySection;
