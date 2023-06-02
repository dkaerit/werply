import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

// modulos
import AUTH from './auth/auth.module';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export const store = createStore({
  state: () => ({}),
  mutations: {},
  actions: {},
  modules: { AUTH },
  plugins: [vuexLocal.plugin]
})