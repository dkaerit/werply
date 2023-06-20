import Vue from 'vue'
import { createRouter, createWebHistory } from "vue-router";
//import store from '../store/index'
//const guard = (to, from, next) => { (store.state.token)? next(): next('/') }

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: (to:any) => ({ path: '/login', query: { q: to.params.searchText }})
    //component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]


export const router = createRouter({
  history: createWebHistory(),
  routes,
});