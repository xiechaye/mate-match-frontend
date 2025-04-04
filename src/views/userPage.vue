<script setup lang="ts">
import router from '@/router'

defineOptions({
  name: 'UserIndex',
})
const userInfo = {
  username: "Suave",
  userAccount: "Suave",
  avatarUrl: "https://web-tlias-suave.oss-cn-hangzhou.aliyuncs.com/0fed2382-edd5-45bd-a7b5-ecafa62e1cef.jpg",
  gender: "男",
  phone: "12345678901",
  email: "dsfdsaf@qq.com",
  createTime: new Date(),
}

const doEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}
</script>

<template>
  <van-cell title="昵称" :value="userInfo.username" is-link @click="doEdit('username', '昵称', userInfo.username)"/>
  <van-cell title="用户名" :value="userInfo.userAccount" />
  <van-cell title="头像" is-link @click="doEdit('avatarUrl', '头像', userInfo.avatarUrl)" >
    <img :src="userInfo.avatarUrl" style="height: 40px;">
  </van-cell>
  <van-cell title="性别" :value="userInfo.gender" is-link @click="doEdit('gender', '性别', userInfo.gender)" />
  <van-cell title="电话" :value="userInfo.phone" is-link @click="doEdit('phone', '电话', userInfo.phone)" />
  <van-cell title="邮箱" :value="userInfo.email" is-link @click="doEdit('email', '邮箱', userInfo.email) "/>
  <van-cell title="创建时间" :value="userInfo.createTime.toDateString()" />
</template>

<style scoped>

</style>
