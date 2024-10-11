import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Admin from '@/views/Admin.vue';
import LiveUpdates from '@/views/LiveUpdates.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true },
  },
  {
    path: '/live-updates',
    name: 'LiveUpdates',
    component: LiveUpdates,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// if router is /admin, check if the user is authenticated
if (router.currentRoute.value.path === '/admin') {
  if (!localStorage.getItem('token')) {
    router.push('/');
  }
}


export default router;