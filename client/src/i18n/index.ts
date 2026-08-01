import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

/**
 * Both dictionaries are bundled rather than fetched. Together they are under
 * 4 kB — a lazy backend would trade that for a render-blocking round trip on
 * first paint, and a flash of untranslated keys behind it.
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES.map((language) => language.code),
    // `pt-BR` and `pt-PT` both resolve to `pt`; there is one Portuguese here.
    load: "languageOnly",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      // React escapes for us; doing it twice mangles accented characters.
      escapeValue: false,
    },
  });

/**
 * Screen readers and hyphenation both key off `<html lang>`, and axe fails the
 * document without it. i18next does not touch the DOM on its own.
 */
const syncDocumentLanguage = (language: string) => {
  document.documentElement.lang = language.split("-")[0];
};

syncDocumentLanguage(i18n.resolvedLanguage ?? "en");
i18n.on("languageChanged", syncDocumentLanguage);

export default i18n;
