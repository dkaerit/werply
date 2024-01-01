import axios, { AxiosError } from 'axios'
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
        //token: undefined,
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

        setToken: (token: string) => {
            //state.token = token
            localStorage.setItem("TokenSession", token); 
            location.reload();
        },

        /**
         * Mutación para desautenticar al usuario.
         * #param commit - Función de commit de Vuex
         */

        dismissToken: () => {
            localStorage.removeItem("TokenSession");
            location.reload();
        }
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                             //
    //                                         ACTIONS                                             //
    //                                                                                             //
    /////////////////////////////////////////////////////////////////////////////////////////////////

    actions: {

        async DISMISS_TOKEN({ commit }: Triggers): Promise<void> {
            await commit('dismissToken');
        },

        async CHECK_TOKEN_EXPIRATION({ commit }: Triggers): Promise<void> {
            const token = localStorage.TokenSession;
            if (!token) return;
            const response = await axios.get(`${uri}/auth/expiration`, { headers: { authorization: token } } );
            if (response.data.expired) commit('dismissToken'); // if expired dismiss token
        },

        /**
         * Acción para autenticar al usuario.
         * #param commit - Función de commit de Vuex
         * #param endpoint - Endpoint para la autenticación
         * #param payload - Carga útil para la autenticación
         */

        async AUTHENTICATE({ commit }: Triggers, { endpoint, payload }: EndpointWithPayload): Promise<void | { error: string }> {
            const field = fieldMapping[endpoint];

            try {
                const response = await axios.post(`${uri}${endpoint}`, { [field]: payload.identifier, "passwd": payload.password });
                const token = response.data.token;
                await commit('setToken', token);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    if(error.code == "ERR_NETWORK") throw new Error('Servidor no disponible');
                    if (axiosError.response?.status === 401 || axiosError.response?.status === 404) throw new Error('Usuario o contraseña incorrectos'); 
                }

                throw new Error('Error desconocido'); 
            }
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