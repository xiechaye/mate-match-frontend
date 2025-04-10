import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/index.vue'
import TeamPage from '@/views/teamPage.vue'
import UserPage from '@/views/userPage.vue'
import SearchPage from '@/views/searchPage.vue'
import UserEditPage from '@/views/userEditPage.vue'
import SearchResultPage from '@/views/searchResultPage.vue'
import UserLoginPage from '@/views/userLoginPage.vue'
import { useUserStore } from '@/stores/user'

const authUrls = ['/team', '/user', '/user/edit'];

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

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const store = useUserStore();
  store.getCurrentUserInfo();
  if(!authUrls.includes(to.path)) {
    next();
    return;
  }
  if(store.currentUserInfo === null || Object.keys(store.currentUserInfo).length === 0) {
    // 如果当前用户信息为空，则跳转到登录页面
    next('/user/login');
    return;
  }
  next();
})

export default router
