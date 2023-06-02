import axios from 'axios'
import { Commit, Dispatch } from 'vuex'
interface Triggers { commit:Commit, dispatch:Dispatch }
const uri:string = "http://localhost:3000"

export default {
    namespathed: true, 
    state: () => ({ // variables globales de la aplicación
        token: undefined,
    }),
    mutations: {
       getToken: (state:any, token:string) => { state.token = token } 
    },
    actions: {
        async autenticationAction({commit}:Triggers, usuario:any): Promise<void> {
            const response = await axios.post(`${uri}/login`, usuario);
            commit('getToken', response.data.token);
        },
    
        async dismissAction({commit}:Triggers): Promise<void> {
            await commit('getToken', undefined);
            location.reload();
        }
    },   
}