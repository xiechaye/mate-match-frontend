<script setup lang="ts">
  import BasicLayout from '@/layouts/BasicLayout.vue'
  import type { UserType } from '@/model/user'
  import { ref } from 'vue'
  import { onMounted } from 'vue'
  import { recommendUsers } from '@/api/user.ts'
  import UserCartList from '@/components/userCartList.vue'

  defineOptions({
    name: 'HomeIndex',
  })
  const userInfoList = ref<UserType[]>([])

  // 根据标签过滤用户信息
  onMounted(async () => {
    const res = await recommendUsers();
    userInfoList.value = res?.data as UserType[];
    userInfoList.value.forEach(userInfo => {
      if(userInfo.tags && typeof userInfo.tags === 'string') {
        userInfo.tags = JSON.parse(userInfo.tags);
      }
    })
  })
</script>

<template>
  <BasicLayout>
    <van-empty v-if="!userInfoList || userInfoList.length < 1" description="搜索结果为空" />
    <UserCartList :user-info-list="userInfoList" />
  </BasicLayout>
</template>

<style scoped>

</style>
