<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { searchUsersByTags } from '@/api/user.ts'
import type { UserType } from '@/model/user'

defineOptions({
  name: 'SearchResultPage',
})

const route = useRoute();

const tagNameList = route.query.tags as string[];

const userInfoList = ref<UserType[]>([]);

// 根据标签过滤用户信息
onMounted(async () => {
  const res = await searchUsersByTags(tagNameList);
  userInfoList.value = res?.data;
  userInfoList.value.forEach(userInfo => {
    if(userInfo.tags && typeof userInfo.tags === 'string') {
      userInfo.tags = JSON.parse(userInfo.tags);
    }
  })
})
</script>

<template>
  <van-empty v-if="!userInfoList || userInfoList.length < 1" description="搜索结果为空" />
  <van-card
    v-for="userInfo in userInfoList"
    :key="userInfo.userAccount"
    :desc="userInfo.profile"
    :title="userInfo.username"
    :thumb="userInfo.avatarUrl"
  >
    <template #tags>
      <van-tag v-for="tag in userInfo.tags"
               :key="tag"
               plain
               type="primary"
               style="margin-right: 8px; margin-top: 8px">{{ tag }}</van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>
