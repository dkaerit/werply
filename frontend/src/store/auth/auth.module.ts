import axios from 'axios'
import { Commit, Dispatch } from 'vuex'
import { uri } from '../index';
interface Triggers { commit:Commit, dispatch:Dispatch }


export default {
    namespathed: true, 

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                             //
    //                                           STATE                                             //
    //                                                                                             //
    /////////////////////////////////////////////////////////////////////////////////////////////////

    state: () => ({ // variables globales de la aplicación
        token: undefined,
    }),

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                             //
    //                                         MUTATIONS                                           //
    //                                                                                             //
    /////////////////////////////////////////////////////////////////////////////////////////////////

    mutations: {

       /**
        * Mutación para establecer el token en el estado de la store.
        * #param state - Estado de la store
        * #param token - Token de autenticación
        */

       setToken: (state:any, token:string) => { state.token = token } 
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                             //
    //                                         ACTIONS                                             //
    //                                                                                             //
    /////////////////////////////////////////////////////////////////////////////////////////////////

    actions: {   
        /**
         * Acción para desautenticar al usuario.
         * #param commit - Función de commit de Vuex
         */

        async dismissAction({ commit }: Triggers): Promise<void> {
            await commit('setToken', undefined);
            location.reload();
        },

        /**
         * Acción de autenticación con email.
         * #param commit - Función de commit de Vuex
         * #param loginIdentifier - Email para autenticación
         */

        async authenticationActionEmail({ commit }: Triggers, loginIdentifier: string): Promise<void> {
            const response = await axios.post(`${uri}/auth/login/email`, { email: loginIdentifier });
            commit('setToken', response.data.token);
        },

        /**
         * Acción de autenticación con teléfono.
         * #param commit - Función de commit de Vuex
         * #param loginIdentifier - Teléfono para autenticación
         */

        async authenticationActionTelefono({ commit }: Triggers, loginIdentifier: string): Promise<void> {
            const response = await axios.post(`${uri}/auth/login/tlfn`, { telefono: loginIdentifier });
            commit('setToken', response.data.token);
        },

        /**
         * Acción de autenticación con nombre de usuario.
         * #param commit - Función de commit de Vuex
         * #param loginIdentifier - Nombre de usuario para autenticación
         */

        async authenticationActionUsername({ commit }: Triggers, loginIdentifier: string): Promise<void> {
            const response = await axios.post(`${uri}/auth/login/username`, { username: loginIdentifier });
            commit('setToken', response.data.token);
        },
    },   
}