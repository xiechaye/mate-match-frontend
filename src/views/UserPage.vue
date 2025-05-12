<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { useUserStore } from '@/stores/User.ts'
import { storeToRefs } from 'pinia'
import { userLogout } from '@/api/user.ts'
import { useTeamStore } from '@/stores/Team.ts'
import { useRouter } from 'vue-router'
import ikun from '@/assets/ikun.jpg'

defineOptions({
  name: 'UserPage',
})
const router = useRouter()
const store = useUserStore();
const teamStore = useTeamStore();
const { currentUserInfo } = storeToRefs(store);

const logout = async () => {
  const res = await userLogout();
  if(res.code === 0) {
    store.clearCurrentUserInfo()
    teamStore.clearCreateTeamList()
    teamStore.clearJoinTeamList()
    await router.push('/')
  }
}
</script>

<template v-if="userInfo">
  <BasicLayout>
    <van-cell title="昵称" :value="currentUserInfo.username"/>
    <van-cell title="头像" >
      <img :src="currentUserInfo.avatarUrl === null ? ikun : currentUserInfo.avatarUrl"
           style="height: 40px;">
    </van-cell>
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/team/my/create" />
    <van-cell title="我加入的队伍" is-link to="/team/my/join" />
    <div id="logout" @click="logout">
      <van-cell title="退出登录"/>
    </div>
  </BasicLayout>
</template>

<style scoped>
#logout :deep(.van-cell) {
  background-color: #f2f2f2;
  margin-top: 16px;
  border-radius: 8px;
  font-size: 18px;
  text-align: center;
}
</style>
