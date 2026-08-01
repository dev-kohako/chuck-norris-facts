import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it } from "vitest";

import RandomFact from "@/pages/RandomFact/RandomFact";
import { GET_RANDOM_CHUCK_NORRIS_FACT } from "@/queries/getChuckNorrisFact";

import i18n, { SUPPORTED_LANGUAGES } from "./index";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

const FACT = "Chuck Norris counted to infinity. Twice.";

const renderRandomFact = () =>
  render(
    <MockedProvider
      mocks={[
        {
          request: { query: GET_RANDOM_CHUCK_NORRIS_FACT },
          result: { data: { getChuckNorrisFact: FACT } },
        },
      ]}
    >
      <RandomFact />
    </MockedProvider>
  );

/** Every leaf path in an object, as `a.b.c`. */
const paths = (value: unknown, prefix = ""): string[] =>
  typeof value === "object" && value !== null
    ? Object.entries(value).flatMap(([key, child]) =>
        paths(child, prefix ? `${prefix}.${key}` : key)
      )
    : [prefix];

describe("i18n", () => {
  it("renders English copy by default", async () => {
    renderRandomFact();

    expect(
      await screen.findByRole("heading", { name: "Chuck Norris Random Fact" })
    ).toBeInTheDocument();
  });

  it("swaps the copy when the language changes", async () => {
    renderRandomFact();
    await screen.findByText(FACT);

    await act(async () => {
      await i18n.changeLanguage("pt");
    });

    expect(
      screen.getByRole("heading", { name: "Fato Aleatório do Chuck Norris" })
    ).toBeInTheDocument();
  });

  it("keeps document.documentElement.lang in step", async () => {
    await act(async () => {
      await i18n.changeLanguage("pt");
    });
    expect(document.documentElement.lang).toBe("pt");

    await act(async () => {
      await i18n.changeLanguage("en");
    });
    expect(document.documentElement.lang).toBe("en");
  });

  it("has no key present in one locale and missing from the other", () => {
    // A missing key falls back silently to English, so the gap only shows up
    // as untranslated copy in front of a user.
    expect(paths(pt).sort()).toEqual(paths(en).sort());
  });

  it("ships a dictionary for every advertised language", () => {
    for (const language of SUPPORTED_LANGUAGES) {
      expect(i18n.hasResourceBundle(language.code, "translation")).toBe(true);
    }
  });
});
