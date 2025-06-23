import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true } // Para proteger la ruta
  },
   // ...existing code...
    {
      path: '/post/:id',
      name: 'PostDetail',
      component: () => import('../views/PostDetail.vue'),
      props: true // Esto permite pasar el id como prop
    },
  // ...existing code...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verificar si el usuario está autenticado
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router