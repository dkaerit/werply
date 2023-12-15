import { defineConfig } from 'cypress'
import '@cypress/code-coverage/support'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    // supportFile: false,
    // setupNodeEvents can be defined in either
    // the e2e or component configuration
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...
      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    },
  },
})