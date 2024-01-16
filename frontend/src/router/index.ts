import { createRouter, createWebHistory } from "vue-router";

const isAuthenticated = () => {
  const token = localStorage.getItem("TokenSession");
  return token !== null;
};

const redirectToHomeIfAuthenticated = (to:any, from:any, next:any) => {
  // Si el usuario está autenticado, redirige a /home
  if (isAuthenticated()) {
    next('/home');
  } else {
    next();
  }
};

const redirectToLoginIfNotAuthenticated = (to:any, from:any, next:any) => {
  // Si el usuario no está autenticado, redirige a /login
  if (!isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
};

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/register',
      component: () => import('../components/views/Register.vue'),
      beforeEnter: redirectToHomeIfAuthenticated,
    },
    {
      path: '/login',
      component: () => import('../components/views/Login.vue'),
      beforeEnter: redirectToHomeIfAuthenticated,
    },
    {
      path: '/',
      component: () => import('../components/layouts/NavWrapLayout.vue'),
      children: [
        {
          path: 'home',
          component: () => import('../components/views/Dashboard.vue'),
          beforeEnter: redirectToLoginIfNotAuthenticated,
        },
        {
          path: 'profile',
          children: [
            {
              path: 'user/:username',
              component: () => import('../components/views/UserProfile.vue'),
            },
            {
              path: 'pj/:nickname',
              component: () => import('../components/views/CharacterProfile.vue'),
            },
          ],
        },
      ]
    }
  ]
});