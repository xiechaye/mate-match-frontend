<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

const onClickLeft = () => router.back()
const onClickRight = () => router.push('/search')

const active = ref(0);
</script>

<template>
  <van-nav-bar
    title="标题"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <router-view/>

  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" name="index" to="/layout">首页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="user-o" name="user" to="/user">用户</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>

