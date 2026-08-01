import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage", "cypress/screenshots", "cypress/videos"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // Ships the compiler's own diagnostics — `react-hooks/immutability`,
      // `refs`, `preserve-manual-memoization` and friends report the patterns
      // that silently opt a component out of compilation.
      reactHooks.configs.flat["recommended-latest"],
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
  {
    files: ["cypress/**/*.ts", "cypress.config.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
      },
    },
    rules: {
      // Cypress pulls plugin types in through triple-slash references and
      // augments its own namespace — both are the documented way to do it.
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-namespace": "off",
    },
  }
);
