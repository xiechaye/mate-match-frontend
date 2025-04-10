import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/index.vue'
import TeamPage from '@/views/teamPage.vue'
import UserPage from '@/views/userPage.vue'
import SearchPage from '@/views/searchPage.vue'
import UserEditPage from '@/views/userEditPage.vue'
import SearchResultPage from '@/views/searchResultPage.vue'
import UserLoginPage from '@/views/userLoginPage.vue'

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
    },
    {
      path: '/user/edit',
      component: UserEditPage
    },
    {
      path: '/user/list',
      component: SearchResultPage
    },
    {
      path: '/user/login',
      component:UserLoginPage
    }
  ],
})

export default router
