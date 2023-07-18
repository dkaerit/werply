import App from './App.vue' // components
import { createApp } from 'vue' // composables
import { registerPlugins } from '@/plugins' // plugins
import { store } from './store' // store
import './styles/variables.scss' // custom styles

const app = createApp(App)
app.use(store)
registerPlugins(app)

app.mount('#app')
