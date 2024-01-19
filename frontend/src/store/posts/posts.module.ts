// @ts-ignore
import { Commit, Dispatch } from 'vuex'
import axios from 'axios'
import { uri } from '../index';
import { PostData } from './posts.interface'

interface Triggers { commit: Commit, dispatch: Dispatch }

interface PostsState {
   posts: PostData[];
}

export default {
   namespaced: true,
   state: (): PostsState => ({
      posts: [] as PostData[],
   }),

   mutations: {
      addPost(state:PostsState, post:PostData) {
         state.posts.unshift(post); // Añadir el nuevo post al principio del array
      },

      fetchPosts(state:PostsState, posts:PostData[]) {
         state.posts = posts;
      },

      removePost(state: PostsState, postId: string) {
         state.posts = state.posts.filter(post => post._id !== postId);
      },
   },
   actions: {
      async CREATE_POST({ commit }: Triggers, postData: PostData) {
         try {
            const response = await axios.post(`${uri}/posts/create`, postData);
            commit("addPost", postData);
            return response.data
         } catch (error) {
            console.error('Error creating post:', error);
         }
      },

      async FETCH_POSTS({ commit }: Triggers, { page, pageSize }: { tab: string, page: number, pageSize: number }) {
         try {
            const response = await axios.get(`${uri}/posts/read?pageSize=${pageSize}&page=${page}`);
            commit('fetchPosts', response.data);
            return response.data;
         } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
         }
      },

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