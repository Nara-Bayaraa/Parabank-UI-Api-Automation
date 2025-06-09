const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://parabank.parasoft.com/parabank/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
