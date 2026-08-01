import { RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useRandomFact } from "./useRandomFact";

const RandomFact = () => {
  const { loading, error, data, handleClick } = useRandomFact();
  const { t } = useTranslation();

  return (
    <section
      aria-live="polite"
      aria-busy={loading}
      aria-labelledby="random-fact-heading"
    >
      <Card>
        <CardHeader>
          <h2
            id="random-fact-heading"
            className="font-heading text-primary text-base font-semibold tracking-tight"
          >
            {t("randomFact.title")}
          </h2>
        </CardHeader>

        <CardContent className="flex min-h-28 flex-col items-center justify-center gap-4 text-center">
          {loading && (
            <div
              className="text-muted-foreground flex items-center gap-2 text-sm"
              role="status"
              aria-label={t("randomFact.loadingAria")}
            >
              <Spinner />
              {t("randomFact.loading")}
            </div>
          )}

          {error && (
            <p
              role="alert"
              aria-live="assertive"
              className="text-destructive text-sm font-medium"
            >
              {t("common.errorPrefix")} {error.message}
            </p>
          )}

          {!loading && data?.getChuckNorrisFact && (
            <p className="animate-in fade-in slide-in-from-bottom-1 text-balance text-lg leading-relaxed duration-300 sm:text-xl">
              {data.getChuckNorrisFact}
            </p>
          )}

          {data?.getChuckNorrisFact && (
            <Button
              onClick={handleClick}
              disabled={loading}
              size="lg"
              aria-label={t("randomFact.buttonAria")}
            >
              <RefreshCw aria-hidden="true" />
              {t("randomFact.button")}
            </Button>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default RandomFact;
