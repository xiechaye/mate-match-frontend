<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { searchUsersByTags } from '@/api/user.ts'
import type { UserType } from '@/model/user'
import BasicLayout from '@/layouts/BasicLayout.vue'
import UserCartList from '@/components/userCartList.vue'

defineOptions({
  name: 'SearchResultPage',
})

const route = useRoute();

const tagNameList = route.query.tags as string[];

const userInfoList = ref<UserType[]>([]);

// 根据标签过滤用户信息
onMounted(async () => {
  const res = await searchUsersByTags(tagNameList);
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
    <UserCartList :user-info-list="userInfoList"/>
  </BasicLayout>
</template>

<style scoped>

</style>
