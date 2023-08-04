import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

// modulos
import AUTH from './auth/auth.module';
import MENU from './menu/menu.module';

const backendHost = import.meta.env.BACKEND_HOST || "localhost";
const backendPort = import.meta.env.BACKEND_PORT || 3000;
export const uri: string = `http://${backendHost}:${backendPort}`;

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export const store = createStore({
  state: () => ({}),
  modules: { AUTH, MENU },
  plugins: [vuexLocal.plugin]
})