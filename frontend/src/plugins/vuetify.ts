/**
 * plugins/vuetify.ts
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify' // Composables
import { aliases as mdiAliases, mdi } from 'vuetify/iconsets/mdi'
import { aliases as faAliases, fa } from 'vuetify/iconsets/fa'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...mdiAliases,
      ...faAliases,
    },
    sets: {
      mdi, fa
    },
  },
})
