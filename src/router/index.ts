import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AchievementPage from '../views/overlay/steam-achievements/AchievementPage.vue';

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
      component: AchievementPage,
    },
  ],
})

export default router
