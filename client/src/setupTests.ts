import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

import i18n from "./i18n";

// Testing Library only registers its own teardown when the test globals are
// injected. They are not, so without this the DOM from one test is still
// mounted while the next one queries it.
afterEach(cleanup);

// Assertions are written against the English copy; without pinning it the suite
// would pass or fail depending on the machine's locale.
beforeEach(async () => {
  await i18n.changeLanguage("en");
});

// jsdom ships no matchMedia, and the theme hook reads it on first render to
// pick up the OS preference.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// Radix primitives measure their triggers on mount; jsdom implements neither.
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}
