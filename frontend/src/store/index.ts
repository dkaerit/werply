import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal:any = new VuexPersistence({
  storage: window.localStorage
})

export const store = createStore({
  state: () => ({
    count: 1
  }),
  mutations: {},
  actions: {},
  modules: {},
  plugins: [vuexLocal]
})