import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Testing Library only registers its own teardown when the test globals are
// injected. They are not, so without this the DOM from one test is still
// mounted while the next one queries it.
afterEach(cleanup);

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
