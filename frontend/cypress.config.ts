import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: false,
    // setupNodeEvents can be defined in either
    // the e2e or component configuration
  },
})