<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import { showFailToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

defineOptions({
  name: 'UserIndex',
})


const route = useRoute()
const router = useRouter()

const store = useUserStore();
const { currentUserInfo } = storeToRefs(store);


// // 验证用户是否登录
// onMounted(async () => {
//
//   await store.getCurrentUserInfo();
//   if (!currentUserInfo.value || Object.keys(currentUserInfo.value).length === 0) {
//     await router.replace({
//       path: 'user/login',
//       query: {
//         backUrl: route.fullPath
//       }
//     })
//     showFailToast('请先登录');
//   }
// })

const doEdit = (editKey: string, editName: string, currentValue: unknown) => {
  // 将 currentValue 转换为字符串
  const stringifyValue = typeof currentValue === 'string' ? currentValue : JSON.stringify(currentValue);

  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      "currentValue": stringifyValue
    }
  })
}
</script>

<template v-if="userInfo">
  <van-cell title="昵称" :value="currentUserInfo.username" is-link @click="doEdit('username', '昵称', currentUserInfo.username)"/>
  <van-cell title="用户名" :value="currentUserInfo.userAccount" />
  <van-cell title="头像" is-link @click="doEdit('avatarUrl', '头像', currentUserInfo.avatarUrl)" >
    <img :src="currentUserInfo.avatarUrl" style="height: 40px;">
  </van-cell>
  <van-cell title="个人简介" :value="currentUserInfo.profile" is-link @click="doEdit('profile', '个人简介', currentUserInfo.profile)" />
  <van-cell title="性别" :value="currentUserInfo.gender === 0 ? '男' : '女'" is-link @click="doEdit('gender', '性别', currentUserInfo.gender)" />
  <van-cell title="电话" :value="currentUserInfo.phone" is-link @click="doEdit('phone', '电话', currentUserInfo.phone)" />
  <van-cell title="邮箱" :value="currentUserInfo.email" is-link @click="doEdit('email', '邮箱', currentUserInfo.email) "/>
  <van-cell title="创建时间" :value="currentUserInfo.createTime ? new Date(currentUserInfo.createTime).toDateString(): ''" />
</template>

<style scoped>

</style>
