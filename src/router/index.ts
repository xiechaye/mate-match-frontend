import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Index.vue'
import TeamPage from '@/views/TeamPage.vue'
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
import UserRegisterPage from '@/views/UserRegisterPage.vue'

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
          component: TeamPage,
          meta: { title: '找队伍' }
        },
        {
          path: '/user',
          component: UserPage,
          meta: { title: '个人信息' }
        }
      ]
    },
    {
      path: '/search',
      component: SearchPage,
      meta: { title: '找伙伴' }
    },
    {
      path: '/user/edit',
      component: UserEditPage,
      meta: { title: '编辑信息' }
    },
    {
      path: '/user/list',
      component: SearchResultPage,
      meta: { title: '用户列表' }
    },
    {
      path: '/user/login',
      component:UserLoginPage,
      meta: { title: '登录' }
    },
    {
      path: '/user/register',
      component: UserRegisterPage,
      meta: { title: '注册' }
    },
    {
      path: '/team/add',
      component: AddTeamPage,
      meta: { title: '创建队伍' }
    },
    {
      path: '/team/update',
      component: UpdateTeamPage,
      meta: { title: '更新队伍' }
    },
    {
      path: '/user/update',
      component: UserUpdatePage,
      meta: { title: '更新信息' }
    },
    {
      path: '/team/my/create',
      component: CreateTeamPage,
      meta: { title: '我创建队伍' }
    },
    {
      path: '/team/my/join',
      component: JoinTeamPage,
      meta: { title: '我加入队伍' }
    }
  ],
})

// 全局前置守卫
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const store = useUserStore();

  // 如果不需要权限的页面，直接放行
  if (!authUrls.includes(to.path)) {
    next();
    return;
  }

  // 如果用户信息为空，尝试获取
  if (store.currentUserInfo === null || Object.keys(store.currentUserInfo).length === 0) {
    await store.getCurrentUserInfo();
  }

  // 再次检查用户信息（可能是刚获取的）
  if (store.currentUserInfo === null || Object.keys(store.currentUserInfo).length === 0) {
    // 如果仍然为空，跳转到登录页
    next({
      path: '/user/login',
      query: { backUrl: to.fullPath }
    });
    return;
  }

  // 有用户信息且是需要权限的页面，放行
  next();
});

export default router
