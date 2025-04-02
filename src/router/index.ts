import { createRouter, createWebHistory } from 'vue-router'
import HomeIndex from '@/views/index.vue'
import TeamIndex from '@/views/team.vue'
import UserIndex from '@/views/user.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/layout',
      children: [
        {
          path: '/layout',
          component: HomeIndex
        },
        {
          path: '/team',
          component: TeamIndex
        },
        {
          path: '/user',
          component: UserIndex
        }
      ]
    }
  ],
})

export default router
