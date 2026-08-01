import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    // React 19 ships `react/compiler-runtime`, so the preset needs no `target`
    // and the `react-compiler-runtime` shim is gone.
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
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
          if (/node_modules[/\\](i18next|react-i18next)/.test(id)) {
            return "i18n";
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
