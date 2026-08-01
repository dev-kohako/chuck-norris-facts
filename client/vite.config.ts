import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    // React 18 has no bundled compiler runtime, so `target: "18"` makes the
    // compiler emit against `react-compiler-runtime` instead of
    // `react/compiler-runtime`.
    babel({ presets: [reactCompilerPreset({ target: "18" })] }),
  ],
  server: {
    // Kept on CRA's port so the Cypress baseUrl and the docker-compose mapping
    // carry over unchanged.
    port: 3000,
    proxy: {
      // Same-origin in dev too, matching Vercel and the nginx image — the
      // Apollo client never needs an absolute URL.
      "/api/graphql": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/graphql/, "/graphql"),
      },
    },
  },
  preview: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        // Apollo and graphql together outweigh the app and change far less
        // often, so they get a cache-stable chunk of their own.
        manualChunks(id) {
          if (/node_modules[/\\](@apollo|graphql)[/\\]/.test(id)) {
            return "apollo";
          }
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    css: false,
  },
});
