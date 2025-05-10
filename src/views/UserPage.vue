<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { useUserStore } from '@/stores/User.ts'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'UserPage',
})
const store = useUserStore();
const { currentUserInfo } = storeToRefs(store);
</script>

<template v-if="userInfo">
  <BasicLayout>
    <van-cell title="昵称" :value="currentUserInfo.username"/>
    <van-cell title="头像" >
      <img :src="currentUserInfo.avatarUrl" style="height: 40px;">
    </van-cell>
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/team/my/create" />
    <van-cell title="我加入的队伍" is-link to="/team/my/join" />
  </BasicLayout>
</template>

<style scoped>

</style>
