<script setup lang="ts">
import type { UserType } from '@/model/User'

interface UserCartListProps {
  userInfoList: UserType[],
  loading: boolean
}
const props = withDefaults(defineProps<UserCartListProps>(), {
  loading: true
})

</script>

<template>
  <van-skeleton title avatar
                :row="3"
                :loading="loading"
                v-for="userInfo in userInfoList"
                :key="userInfo.id">
    <van-card
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
  </van-skeleton>
</template>

<style scoped>

</style>
