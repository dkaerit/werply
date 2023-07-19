import Vue from 'vue'
import { createRouter, createWebHistory } from "vue-router";
//import store from '../store/index'
//const guard = (to, from, next) => { (store.state.token)? next(): next('/') }

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: (to:any) => ({ path: '/home', query: { q: to.params.searchText }})
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../templates/views/Home.vue')
    }
  ]
});