// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000', 
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    video: true,                     
    videosFolder: 'assets/videos',   
    screenshotsFolder: 'cypress/screenshots',
    viewportWidth: 1366,
    viewportHeight: 768,
  }
})
