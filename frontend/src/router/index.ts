import Vue from 'vue'
import { createRouter, createWebHistory } from "vue-router";
//import store from '../store/index'
//const guard = (to, from, next) => { (store.state.token)? next(): next('/') }

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: (to:any) => ({ path: '/login', query: { q: to.params.searchText }})
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
});