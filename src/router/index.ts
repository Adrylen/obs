import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory('/obs/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/overlay/steam-achievements',
      name: 'overlay-steam-achievements',
      component: () => import('../views/overlay/steam-achievements/AchievementPage.vue'),
    },
  ],
})

export default router
