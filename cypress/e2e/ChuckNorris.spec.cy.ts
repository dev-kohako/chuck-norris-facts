// cypress/e2e/ChuckNorris.spec.cy.ts
/// <reference types="cypress" />

describe('Chuck Norris Facts', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('loads a random fact', () => {
    cy.contains('Chuck Norris Random Fact');
    cy.contains('Loading Fact...');
  });

  it('searches facts by free text', () => {
    cy.get('input[name="freeText"]').type('funny');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading Fact...');
  });

  it('fetches fact by category', () => {
    cy.contains('Get Categories').click();
    cy.contains('Dev').click();
    cy.contains('Loading Fact...');
  });

  it('toggles dark mode', () => {
    // Check initial state (assuming light mode by default)
    cy.get('body').should('have.class', '');

    // Toggle to dark mode
    cy.get('button').contains('Light').click();
    cy.get('body').should('have.class', 'dark');

    // Toggle back to light mode
    cy.get('button').contains('Dark').click();
    cy.get('body').should('have.class', '');

  });
});
