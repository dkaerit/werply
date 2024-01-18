// @ts-ignore
import { Commit, Dispatch } from 'vuex'
import axios from 'axios'

import { uri } from '../index';
interface Triggers { commit: Commit, dispatch: Dispatch }
import { UserState, RootState } from "./users.interfaces"


export default {
   namespaced: true,

   /////////////////////////////////////////////////////////////////////////////////////////////////
   //                                                                                             //
   //                                           STATE                                             //
   //                                                                                             //
   /////////////////////////////////////////////////////////////////////////////////////////////////

   state: () => ({
      user: {
         avatar: '',
         nickname: '',
         username: '',
      } as UserState,
   }),

   /////////////////////////////////////////////////////////////////////////////////////////////////
   //                                                                                             //
   //                                         MUTATIONS                                           //
   //                                                                                             //
   /////////////////////////////////////////////////////////////////////////////////////////////////

   mutations: {

      /**
       * Mutation to set the user information in the state.
       * #param state - Vuex module state
       * #param user - User information to set
       */

      setUser(state: RootState, user: UserState) {
         state.user = user;
      },
   },

   /////////////////////////////////////////////////////////////////////////////////////////////////
   //                                                                                             //
   //                                         ACTIONS                                             //
   //                                                                                             //
   /////////////////////////////////////////////////////////////////////////////////////////////////

   actions: {

      /**
       * Action to fetch user information from the backend.
       * #param triggers - Vuex action triggers (commit, dispatch)
       * #param username - Username of the user to fetch
       * #throws Error if there's an issue fetching user information
       */

      async FETCH_USER({ commit, dispatch }: Triggers, identifier: string) {
         try {
            // Hacer una solicitud al backend para obtener la información del usuario
            const response = await axios.get(`${uri}/users/read:${identifier}`);
            commit('setUser', response.data);
            dispatch('CHARACTERS/FETCH_CHARACTERS_BY_USER_ID', response.data._id);
         } catch (error) {
            // Manejar errores (por ejemplo, usuario no autenticado)
            throw new Error('Error al obtener información del usuario:');
         }
      },

      /**
       * Action to fetch user information from the backend.
       * #param triggers - Vuex action triggers (commit, dispatch)
       * #param username - Username of the user to fetch
       * #throws Error if there's an issue fetching user information
       */

      async GET_USER({ }: Triggers, identifier: string): Promise<UserState> {
         try {
            // Hacer una solicitud al backend para obtener la información del usuario
            const response = await axios.get(`${uri}/users/read:${identifier}`);
            return response.data;
         } catch (error) {
            // Manejar errores (por ejemplo, usuario no autenticado)
            throw new Error('Error al obtener información del usuario:');
         }
      },

      /**
 * Action to fetch user information from the backend.
 * #param triggers - Vuex action triggers (commit, dispatch)
 * #param username - Username of the user to fetch
 * #throws Error if there's an issue fetching user information
 */

      async GET_USER_BY_ID({ }: Triggers, identifier: string): Promise<UserState> {
         try {
            // Hacer una solicitud al backend para obtener la información del usuario
            const response = await axios.get(`${uri}/users/id:${identifier}`);
            return response.data;
         } catch (error) {
            // Manejar errores (por ejemplo, usuario no autenticado)
            throw new Error('Error al obtener información del usuario:');
         }
      },
   }
}