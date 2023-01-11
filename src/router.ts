import HomeView from '@/routes/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  routes: [
    {
      path: '/',
      component: HomeView,
      name: 'home',
    },
  ],
  history: createWebHistory(),
})
