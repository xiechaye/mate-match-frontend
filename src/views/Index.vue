<script setup lang="ts">
  import BasicLayout from '@/layouts/BasicLayout.vue'
  import type { UserType } from '@/model/User'
  import { ref, watchEffect } from 'vue'
  import UserCartList from '@/components/UserCartList.vue'
  import { useUserStore } from '@/stores/User.ts'
  import { defineOptions } from 'vue'
  import { useRouter } from 'vue-router'

  defineOptions({
    name: 'HomeIndex',
  })
  const router = useRouter()
  const store = useUserStore()
  const userInfoList = ref<UserType[]>([{} as UserType ,
    {} as UserType,
    {} as UserType,
    {} as UserType,
    {} as UserType])
  const loading = ref(true)


  // 是否是匹配模式
  const isMatchMode = ref(false)

  // 根据当前模式获取用户信息
  const loadUserInfoList = async () => {
    // 心动模式
    if(isMatchMode.value){
      //  没有登录则跳转到登录页面
      if(store.currentUserInfo === null || Object.keys(store.currentUserInfo).length === 0){
        // 尝试获取当前登录对象
        await store.getCurrentUserInfo()
        if(store.currentUserInfo === null || Object.keys(store.currentUserInfo).length === 0){
          await router.push('/user/login')
        }
      }

      if(!store.matchUserList || store.matchUserList.length < 1) {
        await store.getMatchUserListAct(10)
      }
      userInfoList.value = store.matchUserList;
    }else {
      // 默认模式
      if(!store.recommendUserList || store.recommendUserList.length < 1) {
        await store.getRecommendUserListAct()
      }
      userInfoList.value = store.recommendUserList
    }
    userInfoList.value.forEach(userInfo => {
      if(userInfo.tags && typeof userInfo.tags === 'string') {
        userInfo.tags = JSON.parse(userInfo.tags);
      }
    })
  }

  watchEffect(async () => {
    loading.value = true
    await loadUserInfoList()
    loading.value = false
  })
</script>

<template>
  <BasicLayout>
    <van-cell center title="心动模式">
      <template #right-icon>
        <van-switch v-model="isMatchMode" />
      </template>
    </van-cell>
    <van-empty v-if="!userInfoList || userInfoList.length < 1" description="搜索结果为空" />
    <UserCartList :user-info-list="userInfoList" :loading="loading" />

  </BasicLayout>
</template>

<style scoped>

</style>
