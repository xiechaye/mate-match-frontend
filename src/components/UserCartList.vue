<script setup lang="ts">
import type { UserType } from '@/model/user'

interface UserCartListProps {
  userInfoList: UserType[]
}
const props = defineProps<UserCartListProps>()
</script>

<template>
  <van-card
    v-for="userInfo in userInfoList"
    :key="userInfo.id"
    :desc="userInfo.profile"
    :title="userInfo.username"
    :thumb="userInfo.avatarUrl"
  >
    <template #tags>
      <van-tag v-for="tag in userInfo.tags"
               :key="tag"
               plain
               type="primary"
               style="margin-right: 8px; margin-top: 8px">{{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>
