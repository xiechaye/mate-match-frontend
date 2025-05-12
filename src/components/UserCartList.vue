<script setup lang="ts">
import type { UserType } from '@/model/User'
import ikun from '@/assets/ikun.jpg'
import { ref } from 'vue'

interface UserCartListProps {
  userInfoList: UserType[],
  loading: boolean
}
const props = withDefaults(defineProps<UserCartListProps>(), {
  loading: true
})

const phone = ref('')
const email = ref('')
const showDialog = ref(false)
const contact = (id: number) => {
  showDialog.value = true
  const userInfo = props.userInfoList.find(userInfo => userInfo.id === id)
  if(userInfo) {
    phone.value = userInfo.phone
    email.value = userInfo.email
  }
}

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
      :thumb="userInfo.avatarUrl === null ? ikun : userInfo.avatarUrl"
    >
      <template #tags>
        <van-tag v-for="tag in userInfo.tags"
                 :key="tag"
                 plain
                 type="primary"
                 style="margin-right: 8px; margin-top: 8px">{{ tag }}
        </van-tag>
      </template>
      <template #footer >
        <van-button @click="contact(userInfo.id)" size="mini">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
  <van-dialog v-model:show="showDialog" title="联系方式">
    <van-cell-group>
      <van-cell title="电话" :value="phone" />
      <van-cell title="邮箱" :value="email" />
    </van-cell-group>
  </van-dialog>
</template>

<style scoped>

</style>
