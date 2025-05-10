import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Index.vue'
import TeamPage from '@/views/teamPage.vue'
import UserPage from '@/views/UserPage.vue'
import SearchPage from '@/views/SearchPage.vue'
import UserEditPage from '@/views/UserEditPage.vue'
import SearchResultPage from '@/views/SearchResultPage.vue'
import UserLoginPage from '@/views/UserLoginPage.vue'
import AddTeamPage from '@/views/AddTeamPage.vue'
import { useUserStore } from '@/stores/User'
import UpdateTeamPage from '@/views/UpdateTeamPage.vue'
import CreateTeamPage from '@/views/CreateTeamPage.vue'
import JoinTeamPage from '@/views/JoinTeamPage.vue'
import UserUpdatePage from '@/views/UserUpdatePage.vue'

const authUrls = ['/team', '/user', '/user/edit', '/team/add'];

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
    },
    {
      path: '/team/add',
      component: AddTeamPage
    },
    {
      path: '/team/update',
      component: UpdateTeamPage
    },
    {
      path: '/user/update',
      component: UserUpdatePage
    },
    {
      path: '/team/my/create',
      component: CreateTeamPage
    },
    {
      path: '/team/my/join',
      component: JoinTeamPage
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
