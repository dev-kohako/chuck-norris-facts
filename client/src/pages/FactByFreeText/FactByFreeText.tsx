import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useFactByFreeText } from "./useFactByFreeText";

const FactByFreeText = () => {
  const {
    sectionId,
    inputId,
    freeText,
    handleInputChange,
    handleSubmit,
    loading,
    inputError,
    hasSubmitted,
    error,
    errorId,
    data,
  } = useFactByFreeText();
  const { t } = useTranslation();

  return (
    <section aria-live="polite" aria-busy={loading} aria-labelledby={sectionId}>
      <Card>
        <CardHeader>
          <h2
            id={sectionId}
            className="font-heading text-base font-semibold tracking-tight"
          >
            {t("search.sectionTitle")}
          </h2>
        </CardHeader>

        <CardContent className="space-y-3">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2"
            noValidate
            role="search"
            aria-label={t("search.formAria")}
          >
            <label htmlFor={inputId} className="sr-only">
              {t("search.label")}
            </label>
            <Input
              id={inputId}
              type="text"
              value={freeText}
              onChange={handleInputChange}
              placeholder={t("search.placeholder")}
              name="freeText"
              aria-required="true"
              aria-invalid={inputError ? "true" : "false"}
              aria-describedby={inputError ? errorId : undefined}
              disabled={loading}
              autoComplete="off"
              maxLength={100}
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading || !freeText.trim()}
              aria-label={
                loading ? t("search.submittingAria") : t("search.submitAria")
              }
            >
              {loading ? (
                <>
                  <span className="sr-only">{t("search.srSearching")}</span>
                  <span aria-hidden="true">{t("search.submitting")}</span>
                </>
              ) : (
                <>
                  <Search aria-hidden="true" />
                  {t("search.submit")}
                </>
              )}
            </Button>
          </form>

          {loading && (
            <div
              className="text-muted-foreground flex items-center justify-center gap-2 py-3 text-sm"
              role="status"
              aria-label={t("randomFact.loadingAria")}
            >
              <Spinner />
              {t("search.loading")}
            </div>
          )}

          {error && (
            <p
              role="alert"
              aria-live="assertive"
              className="text-destructive text-sm font-medium"
            >
              <span className="sr-only">{t("common.errorPrefix")}</span>{" "}
              {error.message}
            </p>
          )}

          {inputError && (
            <p
              id={errorId}
              role="alert"
              aria-live="assertive"
              className="text-destructive text-sm font-medium"
            >
              {t("search.required")}
            </p>
          )}

          {!loading && hasSubmitted && !data?.searchFacts && !error && (
            <p
              role="status"
              aria-live="polite"
              className="text-muted-foreground text-sm"
            >
              {t("search.empty")}
            </p>
          )}

          {!loading && data?.searchFacts && (
            <article
              className="bg-muted/50 animate-in fade-in slide-in-from-bottom-1 rounded-lg p-4 duration-300"
              aria-live="polite"
            >
              <h3 className="text-primary text-sm font-semibold">
                {t("search.resultTitle")}
              </h3>
              <p className="mt-2 text-balance leading-relaxed">
                {data.searchFacts}
              </p>
            </article>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default FactByFreeText;
