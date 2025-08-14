/// <reference types="cypress" />
/// <reference types="cypress-axe" />
/// <reference types="@testing-library/cypress" />

import '@testing-library/cypress/add-commands';
import 'cypress-axe';
import type { ByRoleOptions } from '@testing-library/cypress';

Cypress.Commands.add('toggleDarkMode', () => {
  cy.get('button[aria-label*="Switch to"]').click();
});

Cypress.Commands.add('checkTheme', (expectedTheme: 'light' | 'dark') => {
  const html = cy.get('html');
  const button = cy.get('button[aria-label*="Switch to"]');
  
  if (expectedTheme === 'dark') {
    html.should('have.class', 'dark');
    button.should('contain', 'Light');
  } else {
    html.should('not.have.class', 'dark');
    button.should('contain', 'Dark');
  }
});

declare global {
  namespace Cypress {
    interface Chainable {
      toggleDarkMode(): Chainable<void>;
      checkTheme(expectedTheme: 'light' | 'dark'): Chainable<void>;
      findByRole(role: string, options?: ByRoleOptions): Chainable<JQuery<HTMLElement>>;
    }
  }
}