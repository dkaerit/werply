import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as dotenv from 'dotenv';
dotenv.config(); // Cargar las variables de entorno

// modulos
import AUTH from './auth/auth.module';

const backendHost = process.env.BACKEND_HOST || "localhost";
const backendPort = process.env.BACKEND_PORT || 3000;
export const uri: string = `http://${backendHost}:${backendPort}`;

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