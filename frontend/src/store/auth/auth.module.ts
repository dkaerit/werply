import axios from 'axios'
import { Commit, Dispatch } from 'vuex'
import { uri } from '../index';
import { LoginPayload, EndpointWithPayload } from "./auth.interfaces"
interface Triggers { commit:Commit, dispatch:Dispatch }

const fieldMapping: { [key: string]: string } = {
    '/auth/login/email': 'email',
    '/auth/login/tlfn': 'tlfn',
    '/auth/login/username': 'username',
  };

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
         * Acción para autenticar al usuario.
         * #param commit - Función de commit de Vuex
         * #param endpoint - Endpoint para la autenticación
         * #param payload - Carga útil para la autenticación
         */
        
        async authenticate({ commit }: Triggers, { endpoint, payload }: EndpointWithPayload): Promise<void> {
            const field = fieldMapping[endpoint]; // fields "email", "tlfn" or "username"
            const response = await axios.post(`${uri}${endpoint}`, 
            {[field]: payload.identifier, "passwd": payload.passwd});
            commit('setToken', response.data.token);
        },

        /**
         * Acción de autenticación con email.
         * #param dispatch - Función de dispatch de Vuex
         * #param payload - Carga útil para la autenticación
         */

        async authenticationActionEmail({ dispatch }: Triggers, payload: LoginPayload): Promise<void> {
            await dispatch('authenticate', { endpoint: '/auth/login/email', payload });
        },

        /**
         * Acción de autenticación con teléfono.
         * #param dispatch - Función de dispatch de Vuex
         * #param payload - Carga útil para la autenticación
         */

        async authenticationActionTelefono({ dispatch }: Triggers, payload: LoginPayload): Promise<void> {
            await dispatch('authenticate', { endpoint: '/auth/login/tlfn', payload });
        },

        /**
         * Acción de autenticación con nombre de usuario.
         * #param dispatch - Función de dispatch de Vuex
         * #param payload - Carga útil para la autenticación
         */

        async authenticationActionUsername({ dispatch }: Triggers, payload: LoginPayload): Promise<void> {
            await dispatch('authenticate', { endpoint: '/auth/login/username', payload });
        },
    },   
}