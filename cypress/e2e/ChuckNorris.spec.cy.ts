// cypress/e2e/ChuckNorris.spec.cy.ts
/// <reference types="cypress" />

describe('Chuck Norris Facts', () => {
  it('loads a random fact', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Chuck Norris Random Fact');
    cy.contains('Loading Fact...');
  });

  it('searches facts by free text', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[name="freeText"]').type('funny');
    cy.get('button[type="submit"]').click();
    cy.contains('Loading Fact...');
  });

  it('fetches fact by category', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Get Categories').click();
    cy.contains('Dev').click();
    cy.contains('Loading Fact...');
  });
});
