/// <reference types="cypress" />

describe("Chuck Norris Facts - E2E Tests", () => {
  const DEFAULT_TIMEOUT = 10000;
  const TEST_QUERY = "funny";
  const TEST_CATEGORY = "dev";

  before(() => {
    cy.log("Iniciando testes E2E para Chuck Norris Facts");
  });

  beforeEach(() => {
    cy.visit("/");
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
      cy.window().then((win) => {
        win.localStorage.setItem("theme", "light");
      });
      cy.visit("/");
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
});