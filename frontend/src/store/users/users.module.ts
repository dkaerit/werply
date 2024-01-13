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
         pjs: [],
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

      setUser(state:RootState, user:UserState) {
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

      async FETCH_USER({ commit }: Triggers, identifier:string) {
         try {
           // Hacer una solicitud al backend para obtener la información del usuario
           const response = await axios.get(`${uri}/users/read:${identifier}`);
           console.log("FETCH_USER", identifier, response)
           alert(response)
           commit('setUser', response.data);
         } catch (error) {
           // Manejar errores (por ejemplo, usuario no autenticado)
           throw new Error('Error al obtener información del usuario:');
         }
       },
   }
}