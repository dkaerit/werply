import axios from 'axios'
import { Commit, Dispatch } from 'vuex'
import { uri } from '../index';
import { LoginPayload, EndpointWithPayload } from "./auth.interfaces"
interface Triggers { commit: Commit, dispatch: Dispatch }

const fieldMapping: { [key: string]: string } = {
    '/auth/login/email': 'email',
    '/auth/login/tlfn': 'tlfn',
    '/auth/login/username': 'username',
};

export default {
    namespaced: true,

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

        setToken: (state: any, token: string) => {
            state.token = token
        }
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

        async DISMISS_ACTION({ commit }: Triggers): Promise<void> {
            await commit('setToken', undefined);
            location.reload();
        },

        /**
         * Acción para autenticar al usuario.
         * #param commit - Función de commit de Vuex
         * #param endpoint - Endpoint para la autenticación
         * #param payload - Carga útil para la autenticación
         */

        async AUTHENTICATE({ commit }: Triggers, { endpoint, payload }: EndpointWithPayload): Promise<void> {
            const field = fieldMapping[endpoint]; // fields "email", "tlfn" or "username"
            const response = await axios.post(`${uri}${endpoint}`,
                { [field]: payload.identifier, "passwd": payload.password });

            const token = response.data.token
            //console.log("token(AUTHENTICATE)", token);
            await commit('setToken', token);
        },

        /**
         * Acción de autenticación con email.
         * #param dispatch - Función de dispatch de Vuex
         * #param payload - Carga útil para la autenticación
         */

        async AUTHENTICATION_ACTION_EMAIL({ dispatch }: Triggers, payload: LoginPayload): Promise<void> {
            await dispatch('AUTHENTICATE', { endpoint: '/auth/login/email', payload });
        },

        /**
         * Acción de autenticación con teléfono.
         * #param dispatch - Función de dispatch de Vuex
         * #param payload - Carga útil para la autenticación
         */

        async AUTHENTICATION_ACTION_TELEFONO({ dispatch }: Triggers, payload: LoginPayload): Promise<void> {
            await dispatch('AUTHENTICATE', { endpoint: '/auth/login/tlfn', payload });
        },

        /**
         * Acción de autenticación con nombre de usuario.
         * #param dispatch - Función de dispatch de Vuex
         * #param payload - Carga útil para la autenticación
         */

        async AUTHENTICATION_ACTION_USERNAME({ dispatch }: Triggers, payload: LoginPayload): Promise<void> {
            await dispatch('AUTHENTICATE', { endpoint: '/auth/login/username', payload });
        },
    },
}