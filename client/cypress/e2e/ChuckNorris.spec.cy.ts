/// <reference types="cypress" />

import type { Result } from "axe-core";

describe("Chuck Norris Facts - E2E Tests", () => {
  const DEFAULT_TIMEOUT = 10000;
  const TEST_QUERY = "funny";
  const TEST_CATEGORY = "dev";

  before(() => {
    cy.log("Iniciando testes E2E para Chuck Norris Facts");
  });

  beforeEach(() => {
    // The assertions below are written against the English copy. i18next
    // otherwise picks the language up from the browser, so on a pt-BR machine
    // the whole suite would fail on translated strings.
    cy.visit("/", {
      onBeforeLoad: (win) => win.localStorage.setItem("i18nextLng", "en"),
    });
    cy.get("main", { timeout: DEFAULT_TIMEOUT }).should("be.visible");
    cy.injectAxe();
  });

  context("1. Fato Aleatório", () => {
    it("1.1 Deve carregar e exibir um fato aleatório", () => {
      cy.get('[role="status"]').contains("Loading a new Fact...").should("be.visible");
      cy.get("h2#random-fact-heading").should("be.visible").and("contain.text", "Chuck Norris Random Fact");
      cy.contains(/chuck norris/i, { timeout: DEFAULT_TIMEOUT }).should("be.visible");
      cy.get("button").contains("Get a New Fact").should("be.visible").and("have.attr", "aria-label", "Get a new random Chuck Norris fact");
    });

    it("1.2 Deve permitir buscar novo fato aleatório", () => {
      cy.contains(/chuck norris/i, { timeout: DEFAULT_TIMEOUT }).should("exist");
      cy.get("button").contains("Get a New Fact").click();
      cy.contains("Loading a new Fact...").should("be.visible");
      cy.contains(/chuck norris/i, { timeout: DEFAULT_TIMEOUT }).should("exist");
    });
  });

  context("2. Busca por Texto Livre", () => {
    it("2.1 Deve permitir buscar fatos por texto livre", () => {
      cy.get("input#freeTextInput").should("have.attr", "placeholder", "Enter your search term").and("have.attr", "aria-required", "true").type(TEST_QUERY);
      cy.get('button[type="submit"]').contains("Get Fact").should("be.enabled").click();
      cy.get('[role="status"]').contains("Loading Fact...").should("be.visible");
      cy.contains(TEST_QUERY, { timeout: DEFAULT_TIMEOUT, matchCase: false }).should("exist");
      cy.get("h3").contains("Search Result:").should("be.visible");
    });

    it("2.2 Deve lidar com erro na busca", () => {
      cy.intercept("POST", "**/graphql", {
        statusCode: 500,
        body: { errors: [{ message: "Internal Server Error" }] },
      }).as("searchError");

      cy.get("input#freeTextInput").type("error-test");
      cy.get('button[type="submit"]').contains("Get Fact").click();
      cy.wait("@searchError");
      cy.get('[role="alert"]').should("be.visible").and("contain.text", "Error: Response not successful: Received status code 500");
    });
  });

  context("3. Busca por Categoria", () => {
    it("3.1 Deve buscar fatos por categoria", () => {
      cy.get("section").contains("h2", "Categories").should("be.visible");
      cy.get("button").contains("Get Categories", { matchCase: false }).click();
      cy.get("button").contains(TEST_CATEGORY, { matchCase: false }).click();
      cy.contains(`Loading ${TEST_CATEGORY} fact...`).should("be.visible");
      cy.contains(`Fact about ${TEST_CATEGORY}:`, { timeout: DEFAULT_TIMEOUT }).should("be.visible");
    });

    it("3.2 Deve permitir alternar entre categorias", () => {
      cy.get("button").contains("Get Categories", { matchCase: false }).click();
      cy.get("button").contains(TEST_CATEGORY, { matchCase: false }).click();
      cy.contains(`Loading ${TEST_CATEGORY} fact...`).should("be.visible");
      cy.get("button").contains("animal", { matchCase: false }).click();
      cy.contains("Loading animal fact...").should("be.visible");
      cy.get("button").contains("animal", { matchCase: false }).should("have.attr", "aria-pressed", "true");
      cy.get("button").contains(TEST_CATEGORY, { matchCase: false }).should("have.attr", "aria-pressed", "false");
    });
  });

  context("4. Alternância de Tema", () => {
    beforeEach(() => {
      cy.visit("/", {
        onBeforeLoad: (win) => {
          win.localStorage.setItem("theme", "light");
          win.localStorage.setItem("i18nextLng", "en");
        },
      });
      cy.get("main").should("be.visible");
    });

    it("4.1 Deve alternar entre modo claro e escuro", () => {
      cy.get("html").should("not.have.class", "dark");
      cy.window().its("localStorage.theme").should("eq", "light");
      cy.get("button[aria-label='Switch to dark mode']").should("be.visible").click();
      cy.get("html").should("have.class", "dark");
      cy.window().its("localStorage.theme").should("eq", "dark");
      cy.get("button[aria-label='Switch to light mode']").should("be.visible").click();
      cy.get("html").should("not.have.class", "dark");
      cy.window().its("localStorage.theme").should("eq", "light");
    });

    it("4.2 Deve manter o tema ao recarregar a página", () => {
      cy.get("button[aria-label='Switch to dark mode']").click();
      cy.get("html").should("have.class", "dark");
      cy.window().its("localStorage.theme").should("eq", "dark");
      cy.reload();
      cy.get("main").should("be.visible");
      cy.get("html").should("have.class", "dark");
      cy.window().its("localStorage.theme").should("eq", "dark");
    });
  });

  context("5. Estados de Loading", () => {
    it("5.1 Deve mostrar indicadores de loading adequados", () => {
      cy.get('[role="status"]').should("contain", "Loading").and("be.visible");
      cy.get('[aria-hidden="true"]').should("exist").and("have.class", "animate-spin");
    });
  });

  context("6. Navegação por Teclado", () => {
    it("6.1 Deve permitir navegação por teclado nas categorias", () => {
      cy.get("button").contains("Get Categories", { matchCase: false }).click();
      cy.get("button").contains(TEST_CATEGORY, { matchCase: false }).click();
      cy.focused().type("{enter}");
      cy.get("button").contains(TEST_CATEGORY, { matchCase: false }).should("have.attr", "aria-pressed", "true");
    });

    it("6.2 Deve permitir navegação por teclado no formulário de busca", () => {
      cy.get("input#freeTextInput").focus().type(TEST_QUERY);
      cy.get('button[type="submit"]').focus().type("{enter}");
      cy.contains("Loading Fact...").should("be.visible");
    });
  });

  context("7. Responsividade", () => {
    it("7.1 Deve funcionar em dispositivos móveis", () => {
      cy.viewport("iphone-x");
      cy.get("main").should("be.visible");
      cy.get("h2").contains("Chuck Norris Random Fact").should("be.visible");
      cy.get("input#freeTextInput").should("be.visible").type(TEST_QUERY);
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("7.2 Deve funcionar em tablets", () => {
      cy.viewport("ipad-2");
      cy.get("main").should("be.visible");
      cy.get("h2").contains("Chuck Norris Random Fact").should("be.visible");
      cy.get("input#freeTextInput").should("be.visible").type(TEST_QUERY);
      cy.get('button[type="submit"]').should("be.visible");
    });
  });

  context("8. Acessibilidade", () => {
    // `cy.injectAxe()` already ran in the outer beforeEach, but nothing ever
    // asserted on it — axe was loaded into every test and then ignored. These
    // are the checks that make it mean something.

    /** Prints the offending rules to the terminal, not just the browser log. */
    const reportViolations = (violations: Result[]) => {
      cy.task(
        "log",
        `${violations.length} violação(ões) de acessibilidade:\n` +
          violations
            .map(
              (violation) =>
                `  [${violation.impact}] ${violation.id} — ${violation.help}\n` +
                violation.nodes
                  .map((node) => `      ${node.target.join(" ")}`)
                  .join("\n")
            )
            .join("\n")
      );
    };

    const visitWith = (theme: "light" | "dark", language: "en" | "pt") => {
      cy.visit("/", {
        onBeforeLoad: (win) => {
          win.localStorage.setItem("theme", theme);
          win.localStorage.setItem("i18nextLng", language);
        },
      });
      cy.get("main", { timeout: DEFAULT_TIMEOUT }).should("be.visible");
      // Waiting for the fact means axe sees the loaded card, not the skeleton.
      cy.contains(/chuck norris/i, { timeout: DEFAULT_TIMEOUT }).should(
        "be.visible"
      );
      cy.injectAxe();
    };

    // Contrast is the failure mode most likely to come back, and it depends on
    // both the theme and the copy, so every combination is covered.
    (["light", "dark"] as const).forEach((theme) => {
      (["en", "pt"] as const).forEach((language) => {
        it(`8.x Não deve ter violações no tema ${theme} em ${language}`, () => {
          visitWith(theme, language);
          cy.checkA11y(undefined, undefined, reportViolations);
        });
      });
    });

    (["light", "dark"] as const).forEach((theme) => {
      it(`8.y Não deve ter violações com o modal aberto no tema ${theme}`, () => {
        visitWith(theme, "en");
        cy.get("button").contains("Get Categories", { matchCase: false }).click();
        // Scoped to the dialog on purpose: an unscoped `contains("h2", ...)`
        // matches the section heading "Search for facts using Categories" on the
        // page behind it, so it would pass without the dialog title ever
        // existing.
        cy.get('[data-slot="dialog-content"]')
          .contains("h2", "Categories")
          .should("be.visible");
        // The dialog animates in; checking mid-transition reads a stale opacity.
        cy.get('[data-slot="dialog-content"]').should("have.css", "opacity", "1");
        // The category list arrives in a lazy chunk — wait for it so axe sees
        // the finished dialog rather than the skeleton.
        cy.get('[data-slot="dialog-content"] li button').should("have.length.at.least", 1);
        // Radix marks the page behind the dialog `aria-hidden`, and the overlay
        // dims it. Left in scope, axe reports the dimmed page text as a contrast
        // failure — content that is both inert and hidden from assistive tech,
        // which is the whole point of a modal.
        cy.checkA11y(
          { exclude: ['[aria-hidden="true"]'] },
          undefined,
          reportViolations
        );
      });
    });
  });
});