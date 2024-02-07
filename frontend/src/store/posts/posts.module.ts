// @ts-ignore
import { Commit, Dispatch } from 'vuex'
import axios from 'axios'
import { uri } from '../index';
import { PostData } from './posts.interface'

interface Triggers { commit: Commit, dispatch: Dispatch }

interface PostsState {
   posts: PostData[];
}

interface filtersInterface {
   globalAuthorType?: string;
   authors?: [];
   loadSide?: string;
   referenceDate?: string;
}

export default {
   namespaced: true,
   state: (): PostsState => ({
      posts: [] as PostData[],
   }),

   mutations: {
      /**
       * Añadir un nuevo post al estado.
       * #param {PostsState} state - Estado Vuex de los posts.
       * #param {PostData} post - Nuevo post a añadir.
       * #param {string} side - Lado en el que añadir el post, 'top' o 'bottom'.
       */
      addPost(state: PostsState, post: PostData, side: string = 'top') {
         (side === 'top') ?
            state.posts.unshift(post) :  // Añadir el nuevo post al principio del array
            state.posts.push(post); // Añadir el nuevo post al final del array
      },

      /**
       * Añadir nuevos posts al estado.
       * #param {PostsState} state - Estado Vuex de los posts.
       * #param {PostData[]} newPosts - Nuevos posts a añadir.
       * #param {string} side - Lado en el que añadir los posts, 'top' o 'bottom'.
       */
      addPosts(state: PostsState, newPosts: PostData[], side: string = 'bottom') {
         (side === 'top') ?
            state.posts = newPosts.concat(state.posts) : // Añadir al principio
            state.posts = state.posts.concat(newPosts); // Añadir al final (puedes ajustarlo según tu lógica)
      },

      /**
       * Reemplazar los posts actuales con una nueva lista de posts.
       * #param {PostsState} state - Estado Vuex de los posts.
       * #param {PostData[]} posts - Lista de nuevos posts.
       */
      fetchPosts(state: PostsState, posts: PostData[]) {
         state.posts = posts;
      },

      /**
       * Eliminar un post del estado.
       * #param {PostsState} state - Estado Vuex de los posts.
       * #param {string} postId - ID del post a eliminar.
       */
      removePost(state: PostsState, postId: string) {
         state.posts = state.posts.filter(post => post._id !== postId);
      },
   },
   actions: {

      /**
       * Acción para crear un nuevo post en el servidor y actualizar el estado con el resultado.
       * #param {Triggers} context - Contexto de la tienda Vuex.
       * #param {PostData} postData - Datos del nuevo post a crear.
       */

      async CREATE_POST({ commit }: Triggers, postData: PostData) {
         try {
            const response = await axios.post(`${uri}/posts/create`, postData);
            await commit("addPost", postData);
            return response.data
         } catch (error) {
            console.error('Error creating post:', error);
         }
      },

      /**
       * Acción para recuperar posts del servidor y actualizar el estado con los resultados durante la carga inicial.
       * #param {Triggers} context - Contexto de la tienda Vuex.
       * #param {Object} payload - Parámetros de la solicitud, incluyendo la página, el tamaño de la página y los filtros.
       * #throws {Error} Si ocurre un error durante la solicitud.
       * #returns {Array} La lista de posts recuperados.
       */

      async FETCH_INITIAL_POSTS({ commit }: Triggers, { page, pageSize, filters }: { tab: string, page: number, pageSize: number, filters: filtersInterface }) {
         try {
            const response = await axios.post(`${uri}/posts/read?pageSize=${pageSize}&page=${page}`, filters);
            const newPosts = response.data;
            await commit('fetchPosts', newPosts);
            return newPosts;
         } catch (error) {
            console.error('Error fetching initial posts:', error);
            throw error;
         }
      },


      /**
       * Acción para recuperar posts del servidor y actualizar el estado con los resultados.
       * #param {Object} context - El contexto de la tienda Vuex.
       * #param {Object} payload - Los parámetros de la solicitud, incluyendo la página, el tamaño de la página y los filtros.
       * #param {string} payload.tab - La pestaña o categoría de posts a recuperar.
       * #param {number} payload.page - El número de página que se va a recuperar.
       * #param {number} payload.pageSize - El tamaño de la página, es decir, la cantidad de posts por página.
       * #param {Object} payload.filters - Los filtros para la consulta, como definido por la interfaz filtersInterface.
       *    globalAuthorType (string) - Tipo global de autor para filtrar posts.
       *    authors (AuthorDto[]) - Lista de autores para filtrar posts.
       *    loadType (string) Indica el tipo de carga, si mas nuevos a la fecha dada (top), o mas viejos a la fecha dada (bottom).
       *    referenceDate (Date) - la fecha de referencia o fecha dada
       * #throws {Error} Si ocurre un error durante la solicitud.
       * #returns {Array} La lista de posts recuperados.
       */
      async FETCH_ADDITIONAL_POSTS({ commit }: Triggers, { page, pageSize, filters }: { tab: string, page: number, pageSize: number, filters: filtersInterface }) {
         try {
            console.log("filters", filters)
            const response = await axios.post(`${uri}/posts/read?pageSize=${pageSize}&page=${page}`, filters);
            const newPosts = response.data;
            console.log(response.data)
            await commit('addPosts', newPosts, filters?.loadSide);
            return newPosts;
         } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
         }
      },

      /**
       * Acción para eliminar un post del servidor y actualizar el estado con el resultado.
       * #param {Triggers} context - Contexto de la tienda Vuex.
       * #param {string} postId - ID del post a eliminar.
       */

      async DELETE_POST({ commit }: Triggers, postId: string) {
         try {
            await axios.delete(`${uri}/posts/delete/id:${postId}`);
            commit("removePost", postId);
         } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
         }
      },

   }
};