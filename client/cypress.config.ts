import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 5000,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });

      return config;
    },
  },
  env: {
    apiUrl: "https://api.chucknorris.io/jokes",
  }
});