/**
 * plugins/vuetify.ts
 * Framework documentation: https://vuetifyjs.com`
 */

import { createVuetify } from 'vuetify' // Composables

// Incons
import '@mdi/font/css/materialdesignicons.css'
import { aliases as mdiAliases, mdi } from 'vuetify/iconsets/mdi'
import { aliases as faAliases, fa } from 'vuetify/iconsets/fa'

// Themes
import 'vuetify/styles'
import { darkTheme } from './themes/dark.theme'
import { lightTheme } from './themes/light.theme'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      lightTheme,
      darkTheme
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
