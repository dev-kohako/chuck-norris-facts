// cypress/e2e/ChuckNorris.spec.cy.ts
/// <reference types="cypress" />

describe('Chuck Norris Facts Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display a random Chuck Norris fact', () => {
    cy.get('.random-fact', { timeout: 5000 }).should('not.be.empty');
  });  

  it('should display categories', () => {
    cy.contains('Categories', { timeout: 5000 });
    cy.get('.bg-red-700 ul li', { timeout: 5000 }).should('have.length.greaterThan', 0);
  });

  it('should display a joke for a selected category', () => {
    const category = 'animal';
    cy.get('input[name="category"]', { timeout: 5000 }).type(category);
    cy.contains('Get Joke', { timeout: 5000 }).click();
    cy.get('.category-joke', { timeout: 5000 }).should('not.be.empty');
  });
});
