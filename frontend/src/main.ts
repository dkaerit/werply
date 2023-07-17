
import App from './App.vue'
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'

import vuetify from '@plugins/vuetify'
import { createPinia } from 'pinia'
import { loadFonts } from '@plugins/webfontloader'
loadFonts()

// Create vue app
const app = createApp(App)

// use plugins
app.use(router)
app.use(store)
app.use(vuetify)

// Mount vue app
app.mount('#app')
