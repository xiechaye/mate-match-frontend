import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/index.vue'
import TeamPage from '@/views/teamPage.vue'
import UserPage from '@/views/userPage.vue'
import SearchPage from '@/views/searchPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/layout',
      children: [
        {
          path: '/layout',
          component: HomePage
        },
        {
          path: '/team',
          component: TeamPage
        },
        {
          path: '/user',
          component: UserPage
        }
      ]
    },
    {
      path: '/search',
      component: SearchPage
    }
  ],
})

export default router
